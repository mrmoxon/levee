document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    const paletteContainer = document.querySelector('.palette-container');
    const colorOptions = document.querySelectorAll('.color');

    const colorSpectrum = ['#f98500', '#fbb153', '#eafdc1', '#cde29a', '#91c682', '#51984a', '#326030'];

    let previousHighlightedBoxes = [];
    let previousClickedBox = null;

    // Randomly populate the grid with colors from the color spectrum
    boxes.forEach(box => {
        const randomColor = colorSpectrum[Math.floor(Math.random() * colorSpectrum.length)];
        box.style.backgroundColor = randomColor;
    });

    boxes.forEach((box, index) => {
        const monthElement = box.closest('.month');
        const month = parseInt(monthElement.dataset.month);
        const year = parseInt(monthElement.dataset.year);
        const daysInMonth = new Date(year, month, 0).getDate();

        // logInfo(`Month: ${month}, Year: ${year}, Days in month: ${daysInMonth}`);

        const column = index % daysInMonth; // Calculate the column index based on days in the month
        const row = Math.floor(index / daysInMonth); // Calculate the row index

        box.addEventListener('click', (event) => {
            const highlightedBoxes = Array.from(monthElement.querySelectorAll(`.box:nth-child(n+${column + 2})`));
            const boxWidth = box.offsetWidth + 50; // Add a small gap between boxes

            if (box === previousClickedBox) {
                // If the same box is clicked again, reverse the animation and color changes
                highlightedBoxes.forEach(highlightedBox => {
                    highlightedBox.style.transform = 'translateX(0)';
                });
                previousHighlightedBoxes = [];
                previousClickedBox = null;

                paletteContainer.style.display = 'none';
            } else {
                // First, reset the previous highlighted boxes
                previousHighlightedBoxes.forEach(prevBox => {
                    prevBox.style.transform = 'translateX(0)';
                });
                
                // Highlight the boxes to the right of the clicked box
                highlightedBoxes.forEach(highlightedBox => {
                    highlightedBox.style.transition = `transform 250ms ease`;
                    highlightedBox.style.transform = `translateX(${boxWidth}px)`; // Shift to the right
                });
                
                // Calculate the center of the column
                const columnBoxes = monthElement.querySelectorAll(`.box:nth-child(${column + 1})`);
                const firstBox = columnBoxes[0];
                const lastBox = columnBoxes[columnBoxes.length - 1];
                // const columnCenterX = firstBox.offsetLeft + (lastBox.offsetLeft + lastBox.offsetWidth - firstBox.offsetLeft) / 2;
                // const columnCenterY = firstBox.offsetTop + (lastBox.offsetTop + lastBox.offsetHeight - firstBox.offsetTop) / 2;
                const columnCenterX = firstBox.getBoundingClientRect().left + (lastBox.getBoundingClientRect().right - firstBox.getBoundingClientRect().left) / 2;
                const columnCenterY = firstBox.getBoundingClientRect().top + (lastBox.getBoundingClientRect().bottom - firstBox.getBoundingClientRect().top) / 2;
                
                logInfo(`Box pressed: ${box.offsetLeft}, ${box.offsetTop}`);
                logInfo('First box: ' + firstBox.offsetLeft + ', ' + firstBox.offsetTop);
                logInfo('Last box: ' + lastBox.offsetLeft + ', ' + lastBox.offsetTop);
                logInfo(`Column center: ${columnCenterX}, ${columnCenterY}`);

                // Show the palette container to the right of the column center
                paletteContainer.style.display = 'block';
                paletteContainer.style.left = `${columnCenterX + 25}px`;
                paletteContainer.style.top = `${columnCenterY - 20}px`;

                logInfo(`Palette container location: ${columnCenterX}px, ${columnCenterY}px`)

                // paletteContainer.style.left = `${columnCenterX}px`;
                // paletteContainer.style.top = `${columnCenterY}px`;

                previousHighlightedBoxes = highlightedBoxes;
                previousClickedBox = box;
            }
        });

        // Reset the translation of the box
        box.style.transform = 'translateX(0)';
        box.dataset.index = index; // Store the index of the box as a data attribute
    });

    colorOptions.forEach(colorOption => {
        colorOption.addEventListener('click', () => {
            const selectedColor = colorOption.style.backgroundColor;
            if (previousClickedBox) {
                previousClickedBox.style.backgroundColor = selectedColor;

                // Reverse the animation and color changes
                previousHighlightedBoxes.forEach(highlightedBox => {
                    highlightedBox.style.transform = 'translateX(0)';
                });

                previousHighlightedBoxes = [];
                previousClickedBox = null;
                paletteContainer.style.display = 'none';
            }
        });
    });
});

function logInfo(message) {
    console.log(`[INFO] ${message}`);
}

function logError(message) {
    console.error(`[ERROR] ${message}`);
}
