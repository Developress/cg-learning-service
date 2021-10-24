const form = document.getElementById("fractals-form");

const checkbox = document.getElementById('iterations-checkbox');
const alter_fractal = document.getElementById('alter_fractal');
const iterations = document.getElementById('iterations');

const handleForm = (event) => {
    event.preventDefault();
    const scale = document.getElementById('scale').value;
    const color_scheme = document.getElementById('color_scheme').value;
    const real = document.getElementById('real').value;
    const imaginary = document.getElementById('imaginary').value;
    const initial_iterations = document.getElementById('initial_iterations').value;
    const alter_fractal = document.getElementById('alter_fractal').value;
    const iterations = document.getElementById('iterations').value;


    fetch('/create-fractal', {
        method: 'POST',
        body: JSON.stringify({
            'scale': scale,
            'color_scheme': color_scheme,
            'real': real,
            'imaginary': imaginary,
            'initial_iterations': initial_iterations,
            'alter_fractal': alter_fractal && checkbox.checked ? alter_fractal: null,
            'iterations': iterations && checkbox.checked ? iterations: null
        })
    })
        .then((response) => {
            console.log(response.data)
            window.location.reload()
        })
        .catch((error) => {
            console.log(error)
        })
}

form.addEventListener('submit', handleForm);

checkbox.addEventListener('change', function () {
    if (this.checked) {
        alter_fractal.removeAttribute('disabled');
        iterations.removeAttribute('disabled');
    } else {
        alter_fractal.setAttribute('disabled', 'disabled');
        iterations.setAttribute('disabled', 'disabled');
    }
});
