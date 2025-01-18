const catContainer = document.getElementById("cat_container");

async function getCats() {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10"
  );
  const data = await response.json();
  return data;
}

async function loadCats() {
  const cats = await getCats();
  if (cats && cats.length > 0) {
    catContainer.innerHTML = "";

    cats.forEach((cat) => {
      const img = document.createElement("img");
      img.src = cat.url;
      img.alt = "Cute Cat";
      img.style.width = "200px";
      img.style.margin = "10px";
      catContainer.appendChild(img);
    });
  } else {
    console.error("Не удалось загрузить изображения.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCats();
});
