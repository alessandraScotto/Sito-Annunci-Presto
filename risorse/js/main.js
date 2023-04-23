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


let logoObserve = document.querySelector('.logoObserve');
let imgTransition = document.querySelectorAll('.imgTransition');
let imgTransitionCoffe = document.querySelector('imgTransitionCoffe');



//let counter = 0;
/*function transformScroll() {
   window.addEventListener('scroll', () => {
       if (window) {
           console.log('scrolli su');
        // counter++
        // provaScroll.style.transform=`translate3d(0px, ${counter}px, 0px)`        
       } else {
          console.log('stai salendo su');
       }
   })
  
}

transformScroll()*/

// Lieve animazione immagini Header allo scroll
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            imgTransition.forEach(el => {
                el.style.transform = `translate3d(0px, 35px, 0px)`
            });

        } else {
            imgTransition.forEach(el => {
                el.style.transform = `translate3d(0px, 0px, 0px)`
            })

        }
        console.log(entry);
    })
});

observer.observe(logoObserve);