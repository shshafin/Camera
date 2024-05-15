// script.js

// Get references to the DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const downloadLink = document.getElementById('download');
const context = canvas.getContext('2d');

// Request access to the user's webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing the webcam: ', err);
    });

// Capture the current frame from the video stream
captureButton.addEventListener('click', () => {
    // Set the canvas size to match the video element
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Create a link to download the image
    downloadLink.href = imageDataUrl;
    downloadLink.download = 'captured-image.png';
    downloadLink.style.display = 'block';
    downloadLink.click();

    // Optionally, display the captured image
    canvas.style.display = 'block';
});
