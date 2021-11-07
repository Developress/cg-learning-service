const form = document.getElementById("colors-form");
const fileInput = document.getElementById('image');
const fileInputLabel = document.getElementById('custom-file-label');
const targetImage = document.getElementById('target-image');
const brightnessRange = document.getElementById('brightness-range');

const handleForm = (event) => {
    event.preventDefault();
    const image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch('/change-color-scheme', {
        method: 'POST',
        body: formData,
    })
        .then(data => data.blob()).then(blob => {
            targetImage.src = URL.createObjectURL(blob);
        })
        .catch((error) => {
            console.log(error);
        })
}

form.addEventListener('submit', handleForm);
fileInput.onchange = () => {
    const [file] = fileInput.files;
    if(file){
        targetImage.src = URL.createObjectURL(file);
        fileInputLabel.innerText = file.name;
    }
}

brightnessRange.onchange = () => {
    const image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append("image", image);


    fetch(`/change-brightness?brightness=${brightnessRange.value}`, {
        method: 'POST',
        body: formData,
    })
        .then(data => data.blob()).then(blob => {
            targetImage.src = URL.createObjectURL(blob);
        })
        .catch((error) => {
            console.log(error);
        })
}