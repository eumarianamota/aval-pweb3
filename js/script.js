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
                url = 'america.html'
                break
            case 'Explorar África': 
                url = 'africa.html'
                break
            case 'Explorar Antártida':
                url = 'antartida.html'
                break
            case 'Explorar Ásia':
                url = 'asia.html'
                break
            case 'Explorar Europa':
                url = 'europa.html'
                break
            case 'Explorar Oceania': 
                url = 'oceania.html'
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

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
        alert("Digite o nome de um país");
        return;
    }

    window.location.href = `/html/country.html?name=${encodeURIComponent(query)}`;
});

function loadFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function renderFavorites() {
    const favoritesContainer = document.querySelector(".favorites-container");
    const favorites = loadFavorites();

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>Nenhum favorito ainda.</p>";
        return;
    }

    favorites.forEach(fav => {
        const favDiv = document.createElement("div");
        favDiv.classList.add("favorite");
        favDiv.innerHTML = `
            <div class="img-container">
                <img src="${fav.flag}" alt="Bandeira de ${fav.name}" class="img-favorite-country">
                <div class="description">
                    <h3>${fav.name}</h3>
                    <p><strong>Capital:</strong> ${fav.capital}</p>
                    <p><strong>Região:</strong> ${fav.region}</p>
                    <p><strong>População:</strong> ${fav.population.toLocaleString()}</p>
                    <button class="btn-redirect-country-page">Explorar país</button>
                </div>
            </div>
        `;
        favoritesContainer.appendChild(favDiv);

        favDiv.querySelector(".btn-redirect-country-page").addEventListener("click", () => {
            window.location.href = `/html/country.html?name=${encodeURIComponent(fav.name)}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", renderFavorites);