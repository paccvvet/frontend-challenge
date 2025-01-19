const catContainer = document.getElementById("cat_container");
const favoriteContainer = document.getElementById("favorite-cats-container");

const API_KEY =
  "live_4WcBlncOaCyN9rrTlXFHhNOTTi23otwDdF56QjP7TAWgewELjY8Dw7B90P8omjLF";

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

async function loadCats() {
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

      catDiv.appendChild(img);

      const heartIcon = document.createElement("div");
      heartIcon.style.height = "48px";
      heartIcon.style.width = "48px";
      heartIcon.classList.add(`heart-icon-${index + 1}`);
      heartIcon.id = "heart";
      heartIcon.style.backgroundImage = `url('/img/heart1.svg')`;

      catDiv.appendChild(heartIcon);

      catContainer.appendChild(catDiv);
    });
  } else {
    console.error("Не удалось загрузить изображения.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCats();
});
