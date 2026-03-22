const { spawn } = require('child_process');

function openInKrita(filePaths) {
  const kritaPath = '/home/brian/Downloads/krita-5.2.15-x86_64.AppImage'; // adjust this

  const child = spawn(kritaPath, filePaths, {
    detached: true,
    stdio: 'ignore'
  });

  child.unref();
}

openInKrita(['./PRAIA.JPG', './schalke-aufstellung.png']);