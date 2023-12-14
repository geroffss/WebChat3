// renderer.js - Handling renderer process logic

const { ipcRenderer } = require('electron');

// Functions for interaction with the main process
function closeNotification() {
  const notification = document.getElementById('notification');
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('restart_app');
}

// IPC listeners for update events
ipcRenderer.on('update_available', () => {
  const message = document.getElementById('message');
  message.innerText = 'A new update is available. Downloading now...';

  const notification = document.getElementById('notification');
  const restartButton = document.getElementById('restart-button');

  restartButton.classList.add('hidden');
  notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
  const message = document.getElementById('message');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';

  const restartButton = document.getElementById('restart-button');
  const notification = document.getElementById('notification');

  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});
