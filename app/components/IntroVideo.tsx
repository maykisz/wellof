"use client";

import { useEffect, useRef, useState } from "react";

type VideoElementWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

const INTRO_BLUR_DURATION_MS = 1600;
const INTRO_FALLBACK_DURATION_MS = 7000;
const MAX_CANVAS_PIXEL_RATIO = 2;
const CHROMA_KEY_COLOR = [133 / 255, 135 / 255, 130 / 255] as const;

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = vec2((a_position.x + 1.0) * 0.5, 1.0 - ((a_position.y + 1.0) * 0.5));
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform sampler2D u_video;
  uniform vec2 u_videoSize;
  uniform vec2 u_canvasSize;
  uniform vec3 u_keyColor;
  varying vec2 v_uv;

  void main() {
    float videoRatio = u_videoSize.x / u_videoSize.y;
    float canvasRatio = u_canvasSize.x / u_canvasSize.y;
    vec2 uv = v_uv;

    if (videoRatio > canvasRatio) {
      float scale = canvasRatio / videoRatio;
      uv.x = (uv.x - 0.5) * scale + 0.5;
    } else {
      float scale = videoRatio / canvasRatio;
      uv.y = (uv.y - 0.5) * scale + 0.5;
    }

    vec4 color = texture2D(u_video, uv);
    vec3 keyDelta = abs(color.rgb - u_keyColor);
    float keyDistance = length(keyDelta);
    float channelDistance = max(max(keyDelta.r, keyDelta.g), keyDelta.b);
    float alpha = smoothstep(0.13, 0.34, keyDistance);
    alpha *= smoothstep(0.055, 0.18, channelDistance);

    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function IntroVideo() {
  const videoRef = useRef<VideoElementWithFrameCallback>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const videoFrameRef = useRef<number | null>(null);
  const finishTimeoutRef = useRef<number | null>(null);
  const blurTimeoutRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);
  const isFinishedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      setIsVisible(false);
      return;
    }

    const program = createProgram(gl);

    if (!program) {
      setIsVisible(false);
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const videoSizeLocation = gl.getUniformLocation(program, "u_videoSize");
    const canvasSizeLocation = gl.getUniformLocation(program, "u_canvasSize");
    const videoLocation = gl.getUniformLocation(program, "u_video");
    const keyColorLocation = gl.getUniformLocation(program, "u_keyColor");
    const positionBuffer = gl.createBuffer();
    const texture = gl.createTexture();
    let canvasWidth = 0;
    let canvasHeight = 0;

    if (!positionBuffer || !texture) {
      setIsVisible(false);
      return;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(videoLocation, 0);
    gl.uniform3f(keyColorLocation, CHROMA_KEY_COLOR[0], CHROMA_KEY_COLOR[1], CHROMA_KEY_COLOR[2]);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    document.body.classList.add("introOpen", "introBlurred");

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_PIXEL_RATIO);
      const width = Math.round(window.innerWidth * pixelRatio);
      const height = Math.round(window.innerHeight * pixelRatio);

      if (canvasWidth === width && canvasHeight === height) {
        return;
      }

      canvasWidth = width;
      canvasHeight = height;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(canvasSizeLocation, width, height);
    };

    const finishIntro = () => {
      if (isFinishedRef.current) {
        return;
      }

      isFinishedRef.current = true;
      setIsBlurred(false);
      document.body.classList.remove("introBlurred");
      setIsLeaving(true);

      window.setTimeout(() => {
        document.body.classList.remove("introOpen");
        setIsVisible(false);
      }, 720);
    };

    const drawFrame = () => {
      if (!video.videoWidth || !video.videoHeight || isFinishedRef.current) {
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.uniform2f(videoSizeLocation, video.videoWidth, video.videoHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const scheduleFrame = () => {
      if (isFinishedRef.current) {
        return;
      }

      drawFrame();

      if (video.requestVideoFrameCallback) {
        videoFrameRef.current = video.requestVideoFrameCallback(scheduleFrame);
        return;
      }

      animationRef.current = window.requestAnimationFrame(scheduleFrame);
    };

    const startIntro = async () => {
      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      resizeCanvas();
      scheduleFrame();

      blurTimeoutRef.current = window.setTimeout(() => {
        setIsBlurred(false);
        document.body.classList.remove("introBlurred");
      }, INTRO_BLUR_DURATION_MS);

      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        window.setTimeout(() => {
          video.play().catch(() => undefined);
        }, 120);
      }
    };

    resizeCanvas();
    finishTimeoutRef.current = window.setTimeout(finishIntro, INTRO_FALLBACK_DURATION_MS);

    video.addEventListener("ended", finishIntro);
    video.addEventListener("loadeddata", startIntro, { once: true });
    video.addEventListener("canplay", startIntro, { once: true });
    window.addEventListener("resize", resizeCanvas);
    video.load();

    return () => {
      document.body.classList.remove("introOpen", "introBlurred");
      video.removeEventListener("ended", finishIntro);
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }

      if (videoFrameRef.current && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(videoFrameRef.current);
      }

      if (finishTimeoutRef.current) {
        window.clearTimeout(finishTimeoutRef.current);
      }

      if (blurTimeoutRef.current) {
        window.clearTimeout(blurTimeoutRef.current);
      }

      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`introLayer ${isBlurred ? "introLayerBlurred" : ""} ${isLeaving ? "introLayerLeaving" : ""}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="introVideoSource"
        src="/video inicial.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <canvas ref={canvasRef} className="introCanvas" />
    </div>
  );
}
