"use strict";

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const searchInput = document.querySelector(".search");
const suggestionsList = document.querySelector(".suggestions");

let data = [];

// Fetch data from the endpoint
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}

fetchData(endpoint)
  .then((response) => {
    data = [...response];
    return response;
  })
  .catch((error) => {
    console.error("Failed to fetch data:", error);
  });

// Separate number with commas
const separateNumberWithCommas = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Find matched items in the data
function findMatches(searchedPlace) {
  const filteredData = data.filter((place) => {
    return (
      place.city.toLowerCase().includes(searchedPlace) ||
      place.state.toLowerCase().includes(searchedPlace)
    );
  });

  return filteredData;
}

// Display matched data in the suggestions list
function displayMatches() {
  const matches = findMatches(this.value);

  // Clear previous results before adding the updated ones to the DOM
  suggestionsList.innerHTML = "";

  matches.forEach((place) => {
    const regex = new RegExp(this.value, "gi");
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${cityName}, ${stateName}</span>
                          <span>${separateNumberWithCommas(place.population)}</span>`;
    suggestionsList.append(listItem);
  });
}

searchInput.addEventListener("keyup", displayMatches);
