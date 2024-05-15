// script.js

document
  .getElementById("cameraInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const img = document.getElementById("capturedImage");
    const downloadButton = document.getElementById("downloadButton");

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
        img.style.display = "block";
        downloadButton.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    }

    downloadButton.addEventListener("click", function () {
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "captured-image.png";
      link.click();
    });
  });
