/* eslint-disable no-undef */
import { watch } from 'fs';

const isWatchMode = process.argv.includes('--watch');

async function build() {
  // Build content script
  await Bun.build({
    entrypoints: ['./src/content/index.js'],
    outdir: './dist',
    naming: 'content.js',
  });

  // Build popup script
  await Bun.build({
    entrypoints: ['./src/popup/index.js'],
    outdir: './dist',
    naming: 'popup.js',
  });

  // Build background script
  await Bun.build({
    entrypoints: ['./src/background/index.js'],
    outdir: './dist',
    naming: 'background.js',
  });

  // Copy static files
  await Bun.write(
    './dist/manifest.json',
    await Bun.file('./public/manifest.json').text()
  );
  await Bun.write(
    './dist/popup.html',
    await Bun.file('./src/popup/index.html').text()
  );
  // write the icons
  await Bun.write(
    './dist/icon48.png',
    await Bun.file('./public/icon48.png').arrayBuffer()
  );
  await Bun.write(
    './dist/icon128.png',
    await Bun.file('./public/icon128.png').arrayBuffer()
  );

  console.log('Build completed!');
}

// Initial build
build();

if (isWatchMode) {
  console.log('Watching for changes...');
  watch('./src', { recursive: true }, (eventType, filename) => {
    console.log(`Changes detected in ${filename}`);
    build();
  });
  watch('./public', { recursive: true }, (eventType, filename) => {
    console.log(`Changes detected in ${filename}`);
    build();
  });
}
