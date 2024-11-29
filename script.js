// Get references to DOM elements
const modelViewer = document.querySelector('#model-viewer');
const resetButton = document.querySelector('#resetCamera');
const exposureSlider = document.querySelector('#exposure');
const arButton = document.querySelector('#ar-button');

// Initial camera position
const defaultOrbit = '45deg 55deg 2.5m';

// Handle loading progress
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
  } else {
    progressBar.classList.remove('hide');
  }
};

// Handle loading errors
const onError = (event) => {
  const error = event.target.querySelector('.error-container');
  error.style.display = 'block';
  console.error('Error loading model:', event.detail);
};

// Reset camera to default position
const resetCamera = () => {
  modelViewer.cameraOrbit = defaultOrbit;
  modelViewer.cameraTarget = '0 0 0';
  modelViewer.fieldOfView = '30deg';
};

// Update model exposure
const updateExposure = (event) => {
  modelViewer.exposure = event.target.value;
};

// Handle touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  if (!event.touches[0]) return;
  
  const xDiff = event.touches[0].clientX - touchStartX;
  const yDiff = event.touches[0].clientY - touchStartY;
  
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    modelViewer.turntable = xDiff > 0 ? 1 : -1;
  }
};

const handleTouchEnd = () => {
  modelViewer.turntable = 0;
};

// Add event listeners
modelViewer.addEventListener('progress', onProgress);
modelViewer.addEventListener('error', onError);
resetButton.addEventListener('click', resetCamera);
exposureSlider.addEventListener('input', updateExposure);

// Add touch event listeners for mobile
modelViewer.addEventListener('touchstart', handleTouchStart, false);
modelViewer.addEventListener('touchmove', handleTouchMove, false);
modelViewer.addEventListener('touchend', handleTouchEnd, false);

// AR Status handling
modelViewer.addEventListener('ar-status', (event) => {
  if (event.detail.status === 'failed') {
    console.error('AR error:', event.detail.error);
  }
});

// Quick-look support for iOS
const checkIOSSupport = () => {
  const a = document.createElement('a');
  return a.relList.supports('ar') ? true : false;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  resetCamera();
  
  // Show AR button only if AR is supported
  if (modelViewer.canActivateAR || checkIOSSupport()) {
    arButton.style.display = 'block';
  } else {
    arButton.style.display = 'none';
  }
});