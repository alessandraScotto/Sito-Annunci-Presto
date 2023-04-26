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
            <div class="card w-100 borderStyle" style="width: 18rem;">
                                    <img src="../img/${annuncio.img}" class="card-img-top w-100" alt="...">
                                    <div class="card-body d-flex justify-content-between">
                                        <div>
                                            <p class="text-uppercase fs-5 fw-semibold">${annuncio.name}</p>
                                            <p class="card-text fs-5">${annuncio.category}</p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <p class="fs-5">${annuncio.price}&euro;</p>
                                        </div>
                                    </div>
                                </div>
                            
            `;

                wrapperCard.appendChild(div);
            })
        }

        createCards(data);

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

    })

