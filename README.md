# Blurred Image Frame

This repository houses a user-friendly JavaScript function named `fillImageWithBlur`. The purpose of this function is to
assist users who want to avoid cropping an image to fit a specific canvas size. Instead, it dynamically adds a subtle
blur to the edges of the image, ensuring it seamlessly fits the desired dimensions without sacrificing content.

## Function Overview

```javascript
function fillImageWithBlur(e, canvasId) {
    // Retrieve the canvas and its 2D rendering context
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Create a link element for downloading the blurred image
    const downloadLink = document.createElement('a');

    // Create an image element and set its source to the selected file
    const image = new Image();
    image.src = URL.createObjectURL(e.target.files[0]);

    // Execute when the image is fully loaded
    image.onload = function () {
        // Calculate dimensions and offsets for proper rendering
        const aspectRatio = canvas.width / canvas.height;
        const imageAspectRatio = image.width / image.height;
        let newWidth, newHeight;

        // Adjust dimensions based on aspect ratios
        if (imageAspectRatio > aspectRatio) {
            newWidth = canvas.width;
            newHeight = canvas.width / imageAspectRatio;
        } else {
            newWidth = canvas.height * imageAspectRatio;
            newHeight = canvas.height;
        }

        const xOffset = (canvas.width - newWidth) / 2;
        const yOffset = (canvas.height - newHeight) / 2;

        // Clear the canvas and apply blur effect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = 'blur(50px)';
        ctx.drawImage(image, -100, -100, canvas.width + 200, canvas.height + 200);

        // Reset filter and draw the image in its final position
        ctx.filter = 'none';
        ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

        // Prepare the blurred image for download
        const originalExtension = e.target.files[0].name.split('.').pop();
        const fileNameWithoutExtension = e.target.files[0].name.replace(/\.[^/.]+$/, '');

        downloadLink.href = canvas.toDataURL(`image/${originalExtension}`);
        downloadLink.download = `${fileNameWithoutExtension}_blurred.${originalExtension}`;

        // Trigger download link and remove it from the DOM
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
}
```

## How It Helps

This function simplifies the process for users who wish to maintain the entirety of their images without resorting to
cropping. By intelligently incorporating a subtle blur effect around the edges, the resulting image seamlessly fits the
desired canvas dimensions, providing an aesthetically pleasing solution. The user can easily integrate this
functionality into their projects to achieve a harmonious balance between image size and content preservation.

## Usage

To utilize this function, integrate the provided JavaScript code into your project. Call the `fillImageWithBlur`
function by passing an event object `e` and the ID of the canvas element `canvasId`. The function will handle the image
processing, apply the blur effect, and enable the download of the seamlessly fitted image.

```javascript
<input type="file" onchange="fillImageWithBlur(event, 'yourCanvasId')">
<canvas id="yourCanvasId" width="500" height="500"></canvas>
```

Feel free to adjust the HTML elements and canvas dimensions according to your specific project requirements.

## License

This project is licensed under the [MIT License](LICENSE). You can find more details in the [LICENSE](LICENSE) file.
