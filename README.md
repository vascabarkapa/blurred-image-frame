# Blurred Image Frame

This repository houses a user-friendly JavaScript function named `fillImageWithBlur`. The purpose of this function is to
assist users who want to avoid cropping an image to fit a specific canvas size. Instead, it dynamically adds a subtle
blur to the edges of the image, ensuring it seamlessly fits the desired dimensions without sacrificing content.

## Live Demo
Check out how application looks live! You can test all the functionalities [**HERE**](https://resize-image-blur.netlify.app/).

## Function Overview

```javascript
function fillImageWithBlur(e, canvasId) {
    // Get the canvas and its 2D rendering context
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Create a link element for downloading the blurred image
    const downloadLink = document.createElement('a');

    // Create a new image object
    const image = new Image();
    // Set the source of the image to the selected file
    image.src = URL.createObjectURL(e.target.files[0]);

    // Event handler for when the image is loaded
    image.onload = function () {
        // Calculate aspect ratios for the canvas and the loaded image
        const aspectRatio = canvas.width / canvas.height;
        const imageAspectRatio = image.width / image.height;

        // Calculate new width and height for the image to fit within the canvas while maintaining aspect ratio
        let newWidth, newHeight;
        if (imageAspectRatio > aspectRatio) {
            newWidth = canvas.width;
            newHeight = canvas.width / imageAspectRatio;
        } else {
            newWidth = canvas.height * imageAspectRatio;
            newHeight = canvas.height;
        }

        // Calculate offsets to center the image within the canvas
        const xOffset = (canvas.width - newWidth) / 2;
        const yOffset = (canvas.height - newHeight) / 2;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply a blur filter to the context and draw the image with a margin
        ctx.filter = 'blur(50px)';
        ctx.drawImage(image, -100, -100, canvas.width + 200, canvas.height + 200);

        // Reset the filter and draw the image at the calculated position and size
        ctx.filter = 'none';
        ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

        // Extract original file extension and filename without extension
        const originalExtension = e.target.files[0].name.split('.').pop();
        const fileNameWithoutExtension = e.target.files[0].name.replace(/\.[^/.]+$/, '');

        // Set the download link attributes to download the blurred image
        downloadLink.href = canvas.toDataURL(`image/${originalExtension}`);
        downloadLink.download = `${fileNameWithoutExtension}_blurred.${originalExtension}`;

        // Append the download link to the body, trigger a click, and remove it
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

To utilize this function, it is essential to first import
the [fill-image-blur](https://github.com/vascabarkapa/blurred-image-frame/blob/main/index.js) into your project. After importing, integrate the provided JavaScript code into your project. Call
the `fillImageWithBlur` function by passing an event object `e` and the ID of the canvas element, `canvasId`. The
function will take care of image processing, apply the blur effect, and facilitate the download of the seamlessly fitted
image.

```javascript
<input type="file" onchange="fillImageWithBlur(event, 'yourCanvasId')">
<canvas hidden id="yourCanvasId" width="1024" height="576"></canvas>
```

The following example shows the `fillImageWithBlur` function using two images to demonstrate the transformation before and after applying the function.

### Before

<img src="https://raw.githubusercontent.com/vascabarkapa/blurred-image-frame/main/example/images/football_women.jpg" alt="Original Image" width="250px">

*Original image before applying any modifications.*

### After

<img src="https://raw.githubusercontent.com/vascabarkapa/blurred-image-frame/main/example/images/football_women_blurred.jpg" alt="Originala Image" width="500px">

*Image after applying the `fillImageWithBlur` function to fit a specific canvas size without cropping.*

Feel free to tailor the HTML elements and canvas dimensions in accordance with the specific requirements of your
project. Furthermore, you are encouraged to formally customize the styling, integrate supplementary features, or make
any necessary adjustments to align with the distinctive needs and objectives of your project.

## License

This project is licensed under the [MIT License](LICENSE). You can find more details in the [LICENSE](LICENSE) file.
