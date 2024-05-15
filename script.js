// script.js

// Get references to the DOM elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const downloadLink = document.getElementById("download");
const toggleCameraButton = document.getElementById("toggleCamera");
const context = canvas.getContext("2d");

let currentFacingMode = "environment"; // Default to back camera

// Function to switch between front and back camera
function toggleCamera() {
    if (currentFacingMode === "user") {
        currentFacingMode = "environment";
    } else {
        currentFacingMode = "user";
    }
    startCamera(); // Restart the camera with the new facing mode
}

// Function to start the camera with the current facing mode
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing the camera: ", err);
        });
}

// Request access to the user's webcam
startCamera();

// Capture the current frame from the video stream
captureButton.addEventListener("click", () => {
    // Set the canvas size to match the video element
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL
    const imageDataUrl = canvas.toDataURL("image/png");

    // Create a link to download the image
    downloadLink.href = imageDataUrl;
    downloadLink.download = "captured-image.png";
    downloadLink.style.display = "block";

    // Optionally, display the captured image
    canvas.style.display = "block";
});

// Add event listener to toggle camera button
toggleCameraButton.addEventListener("click", toggleCamera);
