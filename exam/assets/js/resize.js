// Динамическа высота и ширина блока относителньо img 

function adjustInfoHeight() {
    const image = document.querySelector('.col-6 img.img-fluid');
    const infoBlock = document.querySelector('.info');

    if (image && infoBlock) {
        infoBlock.style.height = `${image.offsetHeight}px`;
        infoBlock.style.width = `${image.offsetWidth}px`;
    }
}

window.addEventListener('load', adjustInfoHeight);

window.addEventListener('resize', adjustInfoHeight);