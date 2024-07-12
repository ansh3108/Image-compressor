const uploadContainer = document.querySelector(".upload-box"),
      previewImage = uploadContainer.querySelector("img"),
      fileChooser = uploadContainer.querySelector("input"),
      inputWidth = document.querySelector(".width input"),
      inputHeight = document.querySelector(".height input"),
      lockRatio = document.querySelector(".ratio input"),
      reduceQuality = document.querySelector(".quality input"),
      downloadButton = document.querySelector(".download-btn");

let originalImageRatio;

const handleFileLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load", () => {
        inputWidth.value = previewImage.naturalWidth;
        inputHeight.value = previewImage.naturalHeight;
        originalImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        document.querySelector(".container").classList.add("active");
    });
}

inputWidth.addEventListener("keyup", () => {
    const height = lockRatio.checked ? inputWidth.value / originalImageRatio : inputHeight.value;
    inputHeight.value = Math.floor(height);
});

inputHeight.addEventListener("keyup", () => {
    const width = lockRatio.checked ? inputHeight.value * originalImageRatio : inputWidth.value;
    inputWidth.value = Math.floor(width);
});

const processImageAndDownload = () => {
    const canvas = document.createElement("canvas");
    const link = document.createElement("a");
    const context = canvas.getContext("2d");

    const imageQuality = reduceQuality.checked ? 0.5 : 1.0;

    canvas.width = inputWidth.value;
    canvas.height = inputHeight.value;

    context.drawImage(previewImage, 0, 0, canvas.width, canvas.height);

    link.href = canvas.toDataURL("image/jpeg", imageQuality);
    link.download = new Date().getTime();
    link.click();
}

downloadButton.addEventListener("click", processImageAndDownload);
fileChooser.addEventListener("change", handleFileLoad);
uploadContainer.addEventListener("click", () => fileChooser.click());
