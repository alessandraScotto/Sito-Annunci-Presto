//Preload pagina

let loading = document.querySelector('#loading');
let pageContent = document.querySelector('#pageContent');

setTimeout(() => {
    //Nascondiamo il caricamento pagina
    loading.classList.add('d-none');
    //Mostriamo il contenuto pagina
    pageContent.classList.remove('d-none');

    //Animazione Cards - Second Section
    let swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        autoplay: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 5,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });

}, 2000);




//Pulsante scroll to Top
let progress = document.querySelector('#progress');

progress.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
})



//Navbar e Offcanvas

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

// Animazione immagini Header allo scroll
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
    })
});

observer.observe(logoObserve);



/*
//element
let elementToWatch = document.querySelectorAll('.watch')
//callback
let callback = function (items) {
    items.forEach((item) => {
        if (item.isIntersecting) {
            item.target.classList.add('inPage');
        } else {
            item.target.classList.remove('inPage');
        }
    });
}
//observer
let observer2 = new IntersectionObserver(callback, { threshold: 0.7 });
//apply
elementToWatch.forEach((element) => {
    observer2.observe(element);
});
*/
// Sezione Numbers - setInterval - observerIntersection
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');
let endNumber = document.querySelector('#endNumber');

function createInterval(element, final, frequency) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < final) {
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    }, frequency);
}


let isChecked = false;
let observer3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && isChecked == false) {
            createInterval(firstNumber, 100, 50);
            createInterval(secondNumber, 275, 20);
            createInterval(thirdNumber, 300, 20);
            createInterval(endNumber, 1850, 1);
            isChecked = true;
        }
    })
});

observer3.observe(firstNumber);

