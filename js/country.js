document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://restcountries.com/v3.1";
    const detailsContainer = document.getElementById("country-details");
    const spinner = document.createElement("div");

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
        `;
    } catch (error) {
        detailsContainer.innerHTML = `<p>Erro ao carregar os detalhes do país: ${error.message}</p>`;
    } finally {
        spinner.style.display = "none";
    }
});
