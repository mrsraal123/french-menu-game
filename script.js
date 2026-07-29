/* ==========================================
   French Classical Menu Challenge
   Version 1.1
========================================== */

const menuItems = [
    {
        french: "Hors d'oeuvre",
        english: "Appetiser"
    },
    {
        french: "Potage",
        english: "Soup"
    },
    {
        french: "Oeufs",
        english: "Egg dishes"
    },
    {
        french: "Farineaux",
        english: "Pasta and rice"
    },
    {
        french: "Poisson",
        english: "Fish"
    },
    {
        french: "Entrée",
        english: "First meat dish"
    },
    {
        french: "Sorbet",
        english: "Flavoured ice-water"
    },
    {
        french: "Relevé",
        english: "Main meat dish / joints"
    },
    {
        french: "Rôti",
        english: "Roast / game and poultry"
    },
    {
        french: "Légumes",
        english: "Vegetables"
    },
    {
        french: "Salade",
        english: "Salad"
    },
    {
        french: "Buffet froid",
        english: "Cold buffet"
    },
    {
        french: "Fromage",
        english: "Cheese"
    },
    {
        french: "Entremets",
        english: "Sweet"
    },
    {
        french: "Savoureux",
        english: "Savoury"
    },
    {
        french: "Desservir",
        english: "Dessert (fruit and nuts)"
    },
    {
        french: "Boissons",
        english: "Beverages"
    }
];

// Working copy
let gameItems = [...menuItems];

// HTML Elements
const menuList = document.getElementById("menuList");
const score = document.getElementById("score");
const successMessage = document.getElementById("successMessage");

console.log("Version 1.1 Loaded");
console.log(gameItems);
/* ==========================================
   Shuffle Function
========================================== */

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}

/* ==========================================
   Render Cards
========================================== */

function renderCards() {

    // Clear existing cards

    menuList.innerHTML = "";

    // Shuffle the working array

    shuffle(gameItems);

    // Create each card

    gameItems.forEach(item => {

        const li = document.createElement("li");

        li.className = "menu-card";

        li.dataset.french = item.french;

        li.innerHTML = `

            <div class="drag-handle">☰</div>

            <div class="card-text">

                <div class="course-name">${item.french}</div>

                <div class="course-desc">${item.english}</div>

            </div>

        `;

        menuList.appendChild(li);

    });

}

/* ==========================================
   Start Game
========================================== */

renderCards();
/* ==========================================
   SortableJS
========================================== */

const sortable = new Sortable(menuList, {

    animation: 200,

    ghostClass: "dragging",

    chosenClass: "chosen",

    dragClass: "drag",

    forceFallback: true,

    fallbackOnBody: true,

    delayOnTouchOnly: true,

    delay: 120,

    touchStartThreshold: 5

});