const divMovie = document.querySelector(".movie");
const btnEncontrarFilme = document.querySelector(".encontrar-filme");

const random = (min = 0, max = 76341) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

function init() {
  buscarFilme(random());
  divMovie.innerHTML = "";

  const loading = document.createElement("img");
  loading.src =
    "https://pa1.narvii.com/6618/792033cfa9e0199d425108ae0b9a111f624107c1_hq.gif";
  divMovie.appendChild(loading);
}

const buscarFilme = async (random) => {
  const APIResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${random}?api_key=3db06883836a23e29a70ca9c3c2087ea&language=pt-BR`
  );

  if (APIResponse.status === 404) {
    init();
  }

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    if (data.overview === "") {
      return init();
    }
    renderizaFilme(data);
  }
};

function renderizaFilme(data) {
  const imgFilme = document.createElement("img");
  imgFilme.classList.add("movie-image");
  imgFilme.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

  const div = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.innerText = data.title;
  div.appendChild(h2);

  const p = document.createElement("p");
  p.innerText = data.overview;
  div.appendChild(p);

  divMovie.innerHTML = "";
  divMovie.appendChild(imgFilme);
  divMovie.appendChild(div);
}

btnEncontrarFilme.addEventListener("click", () => {
  init();
});
