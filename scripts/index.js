const movieInfo = {
    "The Northman": {
      description: "A 2022 drama/action film with a runtime of 2h 17min.",
    },
    "The Batman": {
      description: "A 2022 drama/action film with a runtime of 3 hours.",
    },
    "The Last Airbender": {
      description: "A 2010 sci-fi film with a runtime of 2 hours.",
    },
    "Oppenheimer": {
      description: "A 2023 thriller film with a runtime of 3 hours.",
    },
  };

document.addEventListener("DOMContentLoaded", function () {
const movieCards = document.querySelectorAll(".custom-col");
  
movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent;
    const description = movieInfo[title].description;
    const originalDescription = card.querySelector("p").textContent;
  
    let descriptionElement;
  
    card.addEventListener("mouseenter", function () {
    card.querySelector("p").style.display = "none";
  
    if (!descriptionElement) {
        descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;
        descriptionElement.style.color = "black";
        card.appendChild(descriptionElement);
    }
    });
  
card.addEventListener("mouseleave", function () {
card.querySelector("p").style.display = "block";
  
    if (descriptionElement) {
        card.removeChild(descriptionElement);
        descriptionElement = null;
    }
    });
});
});

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const movieCards = document.querySelectorAll(".custom-col");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const searchTerm = searchInput.value.trim().toLowerCase();

        movieCards.forEach((card) => {
            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});