// Handles loading the events for <model-viewer>'s slotted progress bar
const modelViewer = document.querySelector('model-viewer');
const arButton = document.getElementById('ar-button');
const arPrompt = document.getElementById('ar-prompt');

const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
    console.log('3D Model loaded successfully');
  } else {
    progressBar.classList.remove('hide');
  }
};

// Add event listeners
modelViewer.addEventListener('progress', onProgress);

// Enhanced AR interaction
arButton.addEventListener('click', () => {
  modelViewer.activateAr().then(() => {
    console.log('AR session started');
    arPrompt.style.display = 'none';
  }).catch((error) => {
    console.error('Error starting AR:', error);
    alert('AR не поддерживается на этом устройстве');
  });
});

// Detect AR support
if (!modelViewer.canActivateAr) {
  arButton.style.display = 'none';
  arPrompt.innerHTML = 'AR не поддерживается на этом устройстве';
}

// Model interaction events
modelViewer.addEventListener('camera-change', (event) => {
  console.log('Camera position changed');
});

modelViewer.addEventListener('model-visibility', (event) => {
  console.log('Model visibility changed:', event.detail.visible);
});

// Optional: Add device detection for better UX
function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/android/i.test(userAgent)) {
    console.log('Android device detected');
    return 'android';
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    console.log('iOS device detected');
    return 'ios';
  }
  return 'other';
}

// Initialize device detection
const currentDevice = detectDevice();// Handles loading the events for <model-viewer>'s slotted progress bar
const modelViewer = document.querySelector('model-viewer');
const arButton = document.getElementById('ar-button');
const arPrompt = document.getElementById('ar-prompt');

const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

// Add event listeners
modelViewer.addEventListener('progress', onProgress);

// Enhanced AR interaction
arButton.addEventListener('click', () => {
  modelViewer.activateAr().then(() => {
    console.log('AR session started');
    arPrompt.style.display = 'none';
  }).catch((error) => {
    console.error('Error starting AR:', error);
    alert('AR not supported on this device');
  });
});

// Detect AR support
if (!modelViewer.canActivateAr) {
  arButton.style.display = 'none';
  arPrompt.innerHTML = 'AR not supported on this device';
}

// Optional: Add device detection for better UX
function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/android/i.test(userAgent)) {
    console.log('Android device detected');
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    console.log('iOS device detected');
  }
}
