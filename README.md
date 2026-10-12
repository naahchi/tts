# TTS Studio — GitHub Pages starter

A browser GUI starter for Supertonic 3. GitHub Pages hosts static files only; it does not run Python or a backend.

## Features
- Hindi/English script input
- Supertonic browser TTS integration
- Voice and speed selectors
- Audio playback and WAV download
- GitHub Actions deployment workflow
- Kokoro and Pocket TTS are placeholders only; they are not implemented yet

## Local run
Requires Node.js 20+:
```bash
npm install
npm run dev
```

## Publish to GitHub Pages
1. Create a new GitHub repository and upload these files to the `main` branch.
2. Do not upload `node_modules` or `dist`.
3. Go to Settings → Pages and choose **GitHub Actions** as the source.
4. Open Actions and wait for deployment to finish.
5. Open the Pages URL shown in the workflow summary.

## Important notes
- This starter has not been verified on your computer. Upstream package APIs can change; if you see a build/runtime error, share its screenshot.
- Supertonic weights are not included in this ZIP. The browser package loads model files separately from its configured host; first use needs internet and several hundred MB.
- This is browser-side inference, not the Python model installation you tested on Windows.
- Browser speed depends on your device and browser WebGPU/WASM support.
- Kokoro-82M and Pocket TTS are disabled placeholders; they require separate browser-compatible implementations.
- Review the Supertonic OpenRAIL-M license and its attribution/use restrictions before public distribution.

References:
- https://github.com/supertone-oss-archive/supertonic
- https://github.com/cskwork/supertonic-tts
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
