const mobileMenu = document.getElementById("mobile-menu")
const navList = document.getElementById("nav-list")
const activeClass = "active"


const handleClick = () => {
    navList.classList.toggle(activeClass)
    mobileMenu.classList.toggle(activeClass)
}

mobileMenu.addEventListener("click", handleClick) 

const continentButtons = document.querySelectorAll('.btn-redirect-page');
continentButtons.forEach(button => {
    button.addEventListener('click', () => {
        const textButton = button.textContent.trim()
        let url = ""

        switch (textButton) {
            case 'Explorar América':
                url = '/html/america.html'
                break
            case 'Explorar África': 
                url = '/html/africa.html'
                break
            case 'Explorar Antártida':
                url = '/html/antartida.html'
                break
            case 'Explorar Ásia':
                url = '/html/asia.html'
                break
            case 'Explorar Europa':
                url = '/html/europa.html'
                break
            case 'Explorar Oceania': 
                url = '/html/oceania.html'
                break
        }

        if(url) window.location.href = url
        
    });
});

const API_URL = "https://restcountries.com/v3.1";
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    let countriesContainer = document.getElementById("countries-container");
    if (!countriesContainer) {
        countriesContainer = document.createElement("section");
        countriesContainer.id = "countries-container";
        countriesContainer.classList.add("countries-container");
        searchForm.parentNode.insertBefore(countriesContainer, searchForm.nextSibling);
    }

    const spinner = document.createElement("div");
    spinner.id = "spinner";
    spinner.textContent = "Carregando...";
    spinner.style.display = "none";
    countriesContainer.appendChild(spinner);

async function fetchCountries(url) {
        try {
            spinner.style.display = "block";
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro na API");
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar países:", error);
            return [];
        } finally {
            spinner.style.display = "none";
        }
    }