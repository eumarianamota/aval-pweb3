document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://restcountries.com/v3.1";
    const detailsContainer = document.getElementById("country-details");
    const spinner = document.createElement("div");

    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("name");