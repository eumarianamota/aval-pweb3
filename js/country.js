document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://restcountries.com/v3.1";
    const detailsContainer = document.getElementById("country-details");
    const spinner = document.createElement("div");

    function loadFavorites() {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("name");

    if (!countryName) {
        detailsContainer.innerHTML = "<p>País não informado.</p>";
        return;
    }
    try{
        spinner.style.display = "block";
        const response = await fetch(`${API_URL}/name/${countryName}`);
        if (!response.ok) throw new Error("País não encontrado");
        const country = (await response.json())[0];

        const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        const currecies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";
        const borders = country.borders ? country.borders.join(", ") : "N/A";

        detailsContainer.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" width="200"/>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Região:</strong> ${country.region}</p>
            <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Línguas:</strong> ${languages}</p>
            <p><strong>Moedas:</strong> ${currecies}</p>
            <p><strong>Fronteiras:</strong> ${borders}</p>
            <button id="add-favorite">Adicionar aos Favoritos</button>
        `;

        const addFavorite = document.getElementById("add-favorite");
        addFavorite.addEventListener("click", () => {
            const favorites = loadFavorites();
            if (!favorites.find(fav => fav.name === country.name.common)) {
                favorites.push({
                    name: country.name.common,
                    flag: country.flags.svg,
                    capital: country.capital ? country.capital[0] : "N/A",
                    region: country.region,
                    population: country.population
                });
                saveFavorites(favorites);
                alert(`${country.name.common} adicionado aos favoritos!`);
                window.opener?.renderFavorites?.();
            } else {
                alert(`${country.name.common} já está nos favoritos.`);
            }
        });
    }catch (error) {
        console.error(error);
        detailsContainer.innerHTML = "<p>Erro ao carregar os detalhes do país.</p>";
    }
});
