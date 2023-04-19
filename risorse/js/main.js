let btnOpenNav = document.querySelector('#btnOpenNav');
let openNav = document.querySelector('.openNav');


btnOpenNav.addEventListener('click', () => {
    if (btnOpenNav.ariaExpanded == 'true') {
        openNav.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        openNav.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});