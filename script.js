const catContainer = document.getElementById("cat_container");
const favoriteCatsContainer = document.getElementById(
  "favorite_cats_container"
);
const favoriteCatsBtn = document.querySelector(".like_cat-btn");
const allCatsBtn = document.querySelector(".all_cat-btn");

const API_KEY =
  "live_4WcBlncOaCyN9rrTlXFHhNOTTi23otwDdF56QjP7TAWgewELjY8Dw7B90P8omjLF";

let favoriteCats = JSON.parse(localStorage.getItem("favoriteCats")) || [];

async function getCats() {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=15",
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  const data = await response.json();
  return data;
}

async function displayCats() {
  const cats = await getCats();
  if (cats && cats.length > 0) {
    catContainer.innerHTML = "";

    cats.forEach((cat, index) => {
      const catDiv = document.createElement("div");
      catDiv.classList.add("cat-image-container");

      const img = document.createElement("img");
      img.src = cat.url;
      img.alt = "Cute Cat";
      img.style.width = "225px";
      img.style.height = "225px";
      img.classList.add("cat-image");

      const heartIcon = document.createElement("div");
      heartIcon.style.height = "48px";
      heartIcon.style.width = "48px";
      heartIcon.classList.add(`heart-icon-${index + 1}`);
      heartIcon.classList.add(`heart-icon_all`);
      heartIcon.id = "heart";
      // heartIcon.style.backgroundImage = `url('/img/heart.svg')`;

      heartIcon.addEventListener("click", () => addToFavorites(cat, index));

      catDiv.appendChild(img);
      catDiv.appendChild(heartIcon);
      catContainer.appendChild(catDiv);
    });
  } else {
    console.error("Не удалось загрузить изображения.");
  }
}

function displayFavoriteCats() {
  favoriteCatsContainer.innerHTML = "";
  favoriteCats.forEach((cat, index) => {
    const catDiv = document.createElement("div");
    catDiv.classList.add("cat-image-container");

    const img = document.createElement("img");
    img.src = cat.url;
    img.alt = "Favorite Cat";
    img.classList.add("cat-image");

    const heartIcon = document.createElement("div");
    heartIcon.style.height = "48px";
    heartIcon.style.width = "48px";
    heartIcon.classList.add(`heart-icon-${index + 1}`);
    heartIcon.classList.add(`heart-icon_favorite`);
    heartIcon.id = "heart";
    heartIcon.addEventListener("click", () => removeFromFavorites(cat));

    catDiv.appendChild(img);
    catDiv.appendChild(heartIcon);
    favoriteCatsContainer.appendChild(catDiv);
  });
}

function addToFavorites(cat, index) {
  if (!favoriteCats.some((favoriteCat) => favoriteCat.id === cat.id)) {
    favoriteCats.push(cat);
    localStorage.setItem("favoriteCats", JSON.stringify(favoriteCats));
  }
}

function removeFromFavorites(cat) {
  favoriteCats = favoriteCats.filter(
    (favoriteCat) => favoriteCat.id !== cat.id
  );
  localStorage.setItem("favoriteCats", JSON.stringify(favoriteCats));
  displayFavoriteCats();
}

async function loadCats() {
  const cats = await getCats();
  if (cats && cats.length > 0) {
    displayCats(cats);
  } else {
    console.error("Не удалось загрузить изображения.");
  }
}

favoriteCatsBtn.addEventListener("click", () => {
  catContainer.style.display = "none";
  favoriteCatsContainer.style.display = "grid";
  displayFavoriteCats();
});

allCatsBtn.addEventListener("click", () => {
  favoriteCatsContainer.style.display = "none";
  catContainer.style.display = "grid";
  loadCats();
});

document.addEventListener("DOMContentLoaded", () => {
  loadCats();
});
