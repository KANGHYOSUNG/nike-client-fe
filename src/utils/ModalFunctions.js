//modal
const body = document.querySelector('body');

function modalOpen() {
    body.style.overflow = 'hidden';
}

function modalClosed() {
    body.style.overflow = 'auto';
}

export { modalOpen, modalClosed };
