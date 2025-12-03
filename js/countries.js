document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".countries-container");

    let continent = document.body.dataset.continent;

    if (!continent) {
        console.error("A página não possui data-continent!");
        container.innerHTML = "<p>Erro: Página sem data-continent.</p>";
        return;
    }

    continent = normalizeContinent(continent);

    const url = "https://restcountries.com/v3.1/all?fields=name,flags,region,continents";

    async function loadCountries() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const countries = await response.json();

            if (!Array.isArray(countries)) {
                throw new Error("Resposta inesperada da API");
            }

            const filtered = countries.filter(country =>
                country.region === continent ||
                (country.continents && country.continents.includes(continent))
            );

            container.innerHTML = "";

            if (filtered.length === 0) {
                container.innerHTML = `<p>Nenhum país encontrado para <strong>${continent}</strong>.</p>`;
                return;
            }

            filtered.forEach(country => {
                const div = document.createElement("div");
                div.classList.add("country");

                div.innerHTML = `
                    <img src="${country.flags.png}" alt="${country.name.common}">
                    <h3>${country.name.common}</h3>
                `;

                container.appendChild(div);
            });

        } catch (error) {
            console.error("Erro ao carregar países:", error);
            container.innerHTML = `
                <p style="color:red;">Erro ao carregar países: ${error.message}</p>
            `;
        }
    }

    loadCountries();
});


function normalizeContinent(continent) {
    const map = {
        "africa": "Africa",
        "áfrica": "Africa",

        "americas": "Americas",
        "américa": "Americas",
        "america": "Americas",

        "antarctica": "Antarctic",
        "antártida": "Antarctic",
        "antartida": "Antarctic",

        "europe": "Europe",
        "europa": "Europe",

        "asia": "Asia",
        "ásia": "Asia",

        "oceania": "Oceania"
    };

    const key = continent.trim().toLowerCase();
    return map[key] || continent;
}
