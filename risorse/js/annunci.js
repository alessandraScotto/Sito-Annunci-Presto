//Preload pagina

let loading = document.querySelector('#loading');
let pageContent = document.querySelector('#pageContent');

setTimeout(() => {
    //Nascondiamo il caricamento pagina
    loading.classList.add('d-none');
    //Mostriamo il contenuto pagina
    pageContent.classList.remove('d-none');

}, 2000);


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


//Pulsante scroll to Top
let progress = document.querySelector('#progress');

progress.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
})

//Apertura e chiusura Siderbar Shopping Cart
let closeBtn = document.querySelector('#closeBtn');
let sidebar = document.querySelector('.sidebar');
let openCart = document.querySelector('#openCart');

openCart.addEventListener('click', () => {
    sidebar.style.right = '0%';
})

closeBtn.addEventListener('click', () => {
    sidebar.style.right = '-30%';
})


//Sviluppo cards articoli
fetch('../annunci.json')
    .then(response => response.json())
    .then(data => {
        //Data = array di annunci

        //Funzione per estrapolare le categorie e renderle visibili sull'Accordion
        let radioContainer = document.querySelector('#radioContainer');
        let wrapperCard = document.querySelector('.wrapperCard');

        function setCategory() {
            let uniqueCategories = [];


            data.forEach(element => {
                if (!uniqueCategories.includes(element.category)) {
                    uniqueCategories.push(element.category)
                }
            });

            uniqueCategories.sort().forEach(category => {
                let div = document.createElement('div');
                div.classList.add('form-check');
                div.innerHTML = `
               <input class="form-check-input" type="radio" name="categories"
                id="${category}" >
                <label class="form-check-label" for="${category}">
                ${category}
               </label> `

                radioContainer.appendChild(div);

            })
        }
        setCategory();


        //Funzione per creare le Cards
        //Catturare il wrapper


        function createCards(array) {

            wrapperCard.innerHTML = '';

            array.forEach(annuncio => {
                let div = document.createElement('div');
                div.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4');
                div.innerHTML = `
            <div  class="card w-100 borderStyle" style="width: 18rem;">
                                    <img src="../img/${annuncio.img}" class="card-img-top w-100" alt="...">
                                    <div class="card-body d-flex justify-content-between">
                                        <div>
                                            <p class="text-uppercase fs-5 fw-semibold">${annuncio.name}</p>
                                            <p class="card-text fs-5">${annuncio.category}</p>
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                            <p class="fs-5 ">${annuncio.price}&euro;</p>
                                            <button data-id="${annuncio.id}" class="addToCart btn-add fs-6 rounded-1 borderStyle p-1">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            
            `;

                wrapperCard.appendChild(div);
            })
        }

        createCards(data);

        //ADD TO CART 
        let totalPrice = document.querySelector('#totalPrice');
        let numberOfElement = document.querySelector('#numberOfElement');
        //Wrapper per appendere le card nel carrello
        let wrapperCart = document.getElementById("wrapperCart");
        //Catturiamo tutti i button delle card che avranno la stessa classe
        let addToCartButtons = document.querySelectorAll(".btn-add");


        let cart = [];
   
        //Creiamo una funzione che su tutti i button ascolti l'evento del click e per ognuno ne catturi
        //il data-id, così da pusharlo nell'array cart
        function addButtonListener(buttons) {
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    let itemId = button.dataset.id;
                    let item = data.find(item => item.id == itemId);
                    cart.push(item);
                    console.log(itemId);
                    //Aggiungiamo le card al carrello dall'array cart
                    addToCartFunction(cart);
                    //Numero di elementi presenti nel carrello che vengono mostratii sull'icona
                    numberOfElement.innerHTML = `${cart.length}`
                });
            });

        }

        addButtonListener(addToCartButtons);


        //Funzione che aggiunge le card al carrello da un array di partenza (nel mio caso cart)
        function addToCartFunction(array) {
            wrapperCart.innerHTML = '';
            array.forEach(product => {
                let div = document.createElement('div');
                div.classList.add('col-12');
                div.innerHTML = `
                <div class="card border-0">
                                    <div class="row align-items-center">
                                        <div class="col-3">
                                            <img src="../img/${product.img}" class="img-fluid" alt="">
                                        </div>
                                        <div class="col-9">
                                            <p class="lead fw-semibold">${product.name}</p>
                                            <p>${product.category}<span class="ms-1">Unique size</span></p>
                                            <div class="d-flex justify-content-between align-items-center">
                                            <p>${product.price} &euro;</p>
                                            <i class="bi bi-trash3"></i>
                                            </div>
                                        </div>
                                    </div>
                </div>
                <hr>
                `
                wrapperCart.appendChild(div);

                //Aggiungo il listener di eventi per rimuovere i prodotti dal carrello
                let removeButton = div.querySelector(".bi-trash3");
                removeButton.addEventListener("click", () => {
                    removeFromCartFunction(product.id);
                });

                //Funziona somma del totale del carrello
                totalPrice.textContent = cart.reduce((tot, prodotto) => {
                    tot += Number(prodotto.price)
                    return tot
                }, 0).toFixed(2) + '€';
            })
            // Reimposta il prezzo totale a zero se il carrello è vuoto
            if (array.length === 0) {
                totalPrice.textContent = '0€';
            }
        }

        //Funzione per rimuovere prodotti
        function removeFromCartFunction(productId) {
            let index = cart.findIndex(product => product.id == productId);
            if (index > -1) {
                cart.splice(index, 1);
                addToCartFunction(cart);
                numberOfElement.innerHTML = `${cart.length}`;
            }
        }


        /*
        Array.from(document.querySelectorAll('#btnADD')).forEach((btn, i) => {
            btn.addEventListener('click', () => {
                let item = data.find((el) => data.indexOf(el) == i)
                cart.push(item);
                addToCartFunction(cart);
                numberOfElement.innerHTML = `${cart.length}`

            })
        })
        // data.forEach(el => console.log(el.id));

        function addToCartFunction(array) {
            wrapperCart.innerHTML = '';
            array.forEach(product => {
                let div = document.createElement('div');
                div.classList.add('col-12');
                div.innerHTML = `
                <div class="card border-0">
                                    <div class="row align-items-center">
                                        <div class="col-3">
                                            <img src="../img/${product.img}" class="img-fluid" alt="">
                                        </div>
                                        <div class="col-9">
                                            <p class="lead fw-semibold">${product.name}</p>
                                            <p>${product.category}<span class="ms-1">Unique size</span></p>
                                            <div class="d-flex justify-content-between align-items-center">
                                            <p>${product.price} &euro;</p>
                                            <i class="bi bi-trash3"></i>
                                            </div>
                                        </div>
                                    </div>
                </div>
                <hr>
                `
                wrapperCart.appendChild(div);

                //Funziona somma del totale del carrello
                totalPrice.textContent = cart.reduce((tot, prodotto) => {
                  tot += Math.floor(Number(prodotto.price))
                  return tot
                }, 0) + '€';

                
            })
        }
    
        */





        //FILTRI

        let radioCategories = document.querySelectorAll('.form-check-input');

        //Filtro per categoria
        function filteredByCategory(array) {
            //Trasformare NodeList in array
            let arrayFromNodeList = Array.from(radioCategories);
            let checkedCategory = arrayFromNodeList.find(el => el.checked == true);

            let categorySelected = checkedCategory.id;
            //console.log(categorySelected);

            if (categorySelected == 'All') {
                return array; //Quando viene selezionato 'All categories'

            } else {
                let filtered = array.filter(el => el.category == categorySelected);
                return filtered; //Quando viene selezionata una categoria specifica
            }
        }
        //Mostra tutti gli annunci al caricamento iniziale della pagina

        filteredByCategory(data);


        //Filtro per prezzo

        let inputRange = document.querySelector('#inputRange');
        let numberPrice = document.querySelector('#numberPrice');
        let numberPriceMin = document.querySelector('#numberPriceMin');

        //Funzione per impostare il prezzo massimo e minimo

        function setPrice() {

            let prices = data.map(el => Number(el.price));

            let maxPrice = Math.max(...prices); //rompiamo l'array e selezioniamo il prezzo maggiore
            let minPrice = Math.min(...prices); //rompiamo l'array e selezioniamo il prezzo minore

            inputRange.min = minPrice;
            inputRange.value = minPrice;
            inputRange.max = maxPrice;
            inputRange.value = maxPrice;

            //Mostriamo nell'HTML il prezzo minore
            numberPriceMin.innerHTML = `
                ${minPrice}&euro;
                `

            //Mostriamo nell'HTML il prezzo maggiore
            numberPrice.innerHTML = `
              ${maxPrice}&euro;
                `


        }

        setPrice();


        function filteredByPrice(array) {
            let filtered = array.filter(el => Number(el.price) <= Number(inputRange.value));
            return filtered;


        }


        //Filtro per Parola
        let wordInput = document.querySelector('#wordInput');

        function filteredByWord(array) {
            let filtered = array.filter(el => el.name.toLowerCase().includes(wordInput.value.toLowerCase()));
            return filtered;
        }

        //Placeholder indicativo della quantità di articoli
        wordInput.setAttribute("placeholder", `Esplora i nostri ${data.length} articoli...`)

        //Global filter

        function globalFilter() {
            let resultFilteredByCategory = filteredByCategory(data);
            let resultFilteredByPrice = filteredByPrice(resultFilteredByCategory);
            let resultFilteredByWord = filteredByWord(resultFilteredByPrice);

            createCards(resultFilteredByWord);

        }

        radioCategories.forEach(radioButton => {
            radioButton.addEventListener('click', () => {
                globalFilter();
            })
        });

        inputRange.addEventListener('input', () => {
            numberPrice.innerHTML = `${inputRange.value}&euro;`
            globalFilter();
        })

        wordInput.addEventListener('input', () => {
            globalFilter();
        })
        // console.log(data.length);

        //Button clear filter
        let clearFilter = document.querySelector('#clearFilter');

        clearFilter.addEventListener('click', () => {
            //Reset di tutti i campi dei filtri
            radioCategories[0].checked = true;
            setPrice();
            wordInput.value = '';

            //Ricreare le card dopo il reset
            globalFilter();
        })






    })




