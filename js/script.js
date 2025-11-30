const mobileMenu = document.getElementById("mobile-menu")
const navList = document.getElementById("nav-list")
const activeClass = "active"


const handleClick = () => {
    navList.classList.toggle(activeClass)
    mobileMenu.classList.toggle(activeClass)
}

mobileMenu.addEventListener("click", handleClick) 

const buttons = document.querySelectorAll(".btn-redirect-page")

buttons.forEach(button => {
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

const seacrchInput = document.getElementById("search-input");
const continentFilter = document.getElementById("continent-filter");
const countriesContainer = document.getElementById("countries-container");
const spinner = document.getElementById("spinner");

const loadFavorites = () => JSON.parse(localStorage.getItem("favorites")) || [];
const saveFavorites = (favorites) => localStorage.setItem("favorites", JSON.stringify(favorites));

async function fetchCountries(url) {
    try{
        spinner.style.display = "block";
        const response = await fetch(url);

        if (!response.ok) throw new Error("Erro na API");

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erro ao buscar países:", error);
        return [];
    } finally {
        spinner.style.display = "none"; 

    }
}

