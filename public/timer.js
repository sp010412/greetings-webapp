document.addEventListener('DOMContentLoaded', function () {
    let inputBox = document.querySelector('.error');
    let flash = document.querySelector('.passed');

    if (inputBox.innerHTML !== '' || flash) {
        setTimeout(() => {
            inputBox.innerHTML = '';
            flash.innerHTML = '';
        }, 3000);
    }
});