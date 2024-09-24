//your code here
document.addEventListener('DOMContentLoaded', () => {
    const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let imageContainer = document.getElementById('image-container');
    let resetBtn = document.getElementById('reset');
    let verifyBtn = document.getElementById('verify');
    let para = document.getElementById('para');
    let selectedImages = [];
    let clickedCount = 0;

    // Function to render images
    function renderImages() {
        imageContainer.innerHTML = ''; // Clear previous images
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImageClass = images[randomIndex]; // Randomly select one image to repeat

        // Create six image elements
        for (let i = 0; i < 5; i++) {
            const img = document.createElement('img');
            img.className = images[i];
            img.addEventListener('click', handleImageClick);
            imageContainer.appendChild(img);
        }

        // Add the duplicate image
        const duplicateImg = document.createElement('img');
        duplicateImg.className = selectedImageClass;
        duplicateImg.addEventListener('click', handleImageClick);
        imageContainer.appendChild(duplicateImg);

        // Shuffle images
        shuffleImages();
    }

    // Function to shuffle images
    function shuffleImages() {
        const imagesArray = Array.from(imageContainer.children);
        for (let i = imagesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            imageContainer.appendChild(imagesArray[j]); // Append in random order
        }
    }

    // Handle image click
    function handleImageClick(event) {
        const img = event.target;

        // Prevent double-clicking the same image
        if (selectedImages.includes(img.className)) return;

        img.classList.add('selected'); // Highlight selected image
        selectedImages.push(img.className); // Store selected image class
        clickedCount++;

        // Show reset button
        resetBtn.style.display = 'block';

        // Check if two images have been clicked
        if (clickedCount === 2) {
            verifyBtn.style.display = 'block';
        }
    }

    // Reset function
    resetBtn.addEventListener('click', () => {
        selectedImages = [];
        clickedCount = 0;
        verifyBtn.style.display = 'none';
        resetBtn.style.display = 'none';
        para.innerHTML = ''; // Clear message
        document.querySelectorAll('.selected').forEach(img => img.classList.remove('selected')); // Reset image highlights
        renderImages(); // Re-render images
    });

    // Verify function
    verifyBtn.addEventListener('click', () => {
        if (selectedImages[0] === selectedImages[1]) {
            para.innerHTML = 'You are a human. Congratulations!';
        } else {
            para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
        }
        verifyBtn.style.display = 'none'; // Hide verify button
    });

    renderImages(); // Initial rendering of images
});
