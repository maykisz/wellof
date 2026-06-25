#!/usr/bin/env node
/*
 * scripts/run-optimize-media.js
 *
 * Scans public/ for videos, creates backups, and generates optimized video (.opt.mp4),
 * poster (.poster.jpg) and thumbnail (.thumb.jpg). Safe: does not overwrite originals.
 * Use --ci to run non-interactively (for CI).
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const argv = process.argv.slice(2);
const CI = argv.includes('--ci');

const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(__dirname, '..', 'public', 'media-backups', new Date().toISOString().replace(/[:.]/g, '-'));

function findVideos(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      if (it.name === 'media-backups') {
        continue;
      }
      results.push(...findVideos(p));
      continue;
    }

    const isVideo = /\.(mp4|mov|webm|mkv)$/i.test(it.name);
    const isGenerated =
      /\.opt\.mp4$/i.test(it.name) ||
      /\.reenc\./i.test(it.name) ||
      /\.rejected\./i.test(it.name) ||
      /_chf\d+_/i.test(it.name);

    if (isVideo && !isGenerated) {
      results.push(p);
    }
  }

  return results;
}

function exec(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  if (r.error) {
    throw r.error;
  }
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} exited with ${r.status}`);
  }
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function checkFfmpeg() {
  try {
    const r = spawnSync('ffmpeg', ['-version']);
    return r.status === 0;
  } catch {
    return false;
  }
}

if (!checkFfmpeg()) {
  console.log('ffmpeg not found on PATH. Exiting.');
  process.exit(0);
}

const videos = findVideos(publicDir);
if (!videos.length) {
  console.log('No videos found in public/.');
  process.exit(0);
}

ensureDir(backupDir);

for (const v of videos) {
  const rel = path.relative(publicDir, v).replace(/\\/g, '/');
  const dir = path.dirname(v);
  const base = path.basename(v, path.extname(v));

  console.log('\nProcessing:', rel);

  try {
    // backup original
    const backupPath = path.join(backupDir, rel);
    ensureDir(path.dirname(backupPath));
    fs.copyFileSync(v, backupPath);
    console.log('Backed up to', path.relative(process.cwd(), backupPath));

    // optimized output path (do not overwrite original)
    const optimized = path.join(dir, base + '.opt.mp4');
    const poster = path.join(dir, base + '.poster.jpg');
    const thumb = path.join(dir, base + '.thumb.jpg');

    // generate H.264 MP4 optimized (skip if already exists)
    const ffmpegArgs = ['-i', v, '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', optimized];
    if (!fs.existsSync(optimized)) {
      console.log('Generating optimized mp4:', path.relative(process.cwd(), optimized));
      exec('ffmpeg', ffmpegArgs);
    } else {
      console.log('Optimized file exists, skipping:', path.relative(process.cwd(), optimized));
    }

    // extract poster at 1s (skip if exists)
    if (!fs.existsSync(poster)) {
      console.log('Generating poster:', path.relative(process.cwd(), poster));
      exec('ffmpeg', ['-ss', '00:00:01', '-i', v, '-vframes', '1', '-q:v', '2', poster]);
    } else {
      console.log('Poster exists, skipping:', path.relative(process.cwd(), poster));
    }

    // generate thumb 400px wide (skip if exists)
    if (!fs.existsSync(thumb)) {
      console.log('Generating thumbnail:', path.relative(process.cwd(), thumb));
      exec('ffmpeg', ['-ss', '00:00:01', '-i', v, '-vframes', '1', '-q:v', '4', '-vf', 'scale=400:-1', thumb]);
    } else {
      console.log('Thumbnail exists, skipping:', path.relative(process.cwd(), thumb));
    }
  } catch (err) {
    console.error('Error processing', rel, '-', err && err.message ? err.message : err);
    console.error('Skipping and continuing with next file.');
    continue;
  }
}

console.log('\nAll done. Optimized files created alongside originals with .opt.mp4/.poster.jpg/.thumb.jpg. Backups stored in public/media-backups/.');
