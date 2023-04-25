let btnOpenNav = document.querySelector('#btnOpenNav');
let openNav = document.querySelector('.openNav');
let offcanvas = document.querySelector('#offcanvas');

//Apertura chiusura Offcanvas e cambio icona Navbar
btnOpenNav.addEventListener('click', () => {
    if (!offcanvas.classList.contains('transformCanvas')) {
        offcanvas.classList.add('transformCanvas');
        openNav.innerHTML = '<i class="fs-2 fa-solid fa-xmark"></i>';
    } else {
        offcanvas.classList.remove('transformCanvas');
        openNav.innerHTML = '<i class="fs-2 fa-solid fa-bars-staggered"></i>';
    }
});


//Chiusura Offcanvas al click della stessa
offcanvas.addEventListener('click', () => {
    offcanvas.classList.remove('transformCanvas');
    openNav.innerHTML = '<i class="fs-2 fa-solid fa-bars-staggered"></i>';
})







//Sviluppo cards articoli
fetch('../annunci.json')
    .then(response => response.json())
    .then(data => {
        //Data = array di annunci

        //Funzione per estrapolare le categorie
        function setCategory() {
            let uniqueCategories = [];
            data.forEach(element => {
             if (!uniqueCategories.includes(element.category)) {
                uniqueCategories.push(element.category)
             }
            });
        }
        setCategory();









    })

