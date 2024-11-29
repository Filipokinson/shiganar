// Get references to DOM elements
const modelViewer = document.querySelector('#model-viewer');
const viewModeButton = document.querySelector('#viewMode');
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
    event.target.removeEventListener('progress', onProgress);
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

// Toggle between AR and normal view
const toggleViewMode = () => {
  if (modelViewer.ar) {
    modelViewer.activateAR();
  }
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

// Check AR availability
const checkARSupport = () => {
  if (!modelViewer.canActivateAR) {
    viewModeButton.style.display = 'none';
    arButton.style.display = 'none';
  }
};

// Add event listeners
modelViewer.addEventListener('progress', onProgress);
modelViewer.addEventListener('error', onError);
viewModeButton.addEventListener('click', toggleViewMode);
resetButton.addEventListener('click', resetCamera);
exposureSlider.addEventListener('input', updateExposure);

// Add touch event listeners for mobile
modelViewer.addEventListener('touchstart', handleTouchStart, false);
modelViewer.addEventListener('touchmove', handleTouchMove, false);
modelViewer.addEventListener('touchend', handleTouchEnd, false);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkARSupport();
  resetCamera();
});