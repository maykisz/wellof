WellOf - Media Optimization & Build Helpers
===========================================

O repositorio contem uma rotina para otimizar videos e gerar posters automaticamente.

Objetivos do workflow:
- Otimizar videos em `public/` para MP4 H.264 leve.
- Gerar posters (`.poster.jpg`) para os videos usados no site.
- Manter os arquivos originais intactos, com backups locais em `public/media-backups/`.
- Rodar typecheck e build no GitHub Actions sem depender do deploy da Vercel.

Arquivos relevantes:
- `.github/workflows/media-optimize.yml` - workflow de otimizacao e checagens.
- `scripts/run-optimize-media.js` - script Node que executa `ffmpeg` e gera `.opt.mp4`, `.poster.jpg` e `.thumb.jpg`.

Como rodar localmente, com `ffmpeg` e Node >= 18:

```bash
npm ci
ffmpeg -version
node scripts/run-optimize-media.js
```

No CI, use:

```bash
node scripts/run-optimize-media.js --ci
```

O script cria:
- `public/**/<name>.opt.mp4` - versao otimizada H.264.
- `public/**/<name>.poster.jpg` - poster extraido do video.
- `public/**/<name>.thumb.jpg` - thumbnail pequena para conferencia.
- `public/media-backups/<timestamp>/...` - copia dos originais.

Backups, thumbnails e artefatos temporarios de otimizacao sao ignorados pelo Git para manter o projeto leve.

Checagens locais:

```bash
npm run typecheck
npm run build
```
