function handleImage(e) {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = URL.createObjectURL(e.target.files[0]);

    image.onload = function () {
        const aspectRatio = 16 / 9;
        const imageAspectRatio = image.width / image.height;

        let newWidth, newHeight;

        if (imageAspectRatio > aspectRatio) {
            newWidth = canvas.width;
            newHeight = canvas.width / imageAspectRatio;
        } else {
            newWidth = canvas.height * imageAspectRatio;
            newHeight = canvas.height;
        }

        const xOffset = (canvas.width - newWidth) / 2;
        const yOffset = (canvas.height - newHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.filter = 'blur(50px)';
        ctx.drawImage(image, -100, -100, canvas.width + 200, canvas.height + 200);
        ctx.filter = 'none';

        ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);
    };
}

function downloadImage() {
    const canvas = document.getElementById('outputCanvas');
    const downloadLink = document.createElement('a');

    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'resized_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
}