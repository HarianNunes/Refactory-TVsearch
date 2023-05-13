const favorites = JSON.parse(localStorage.getItem('Favorites'));
const $ = document.getElementById.bind(document);


const printCard = (show) => {
    const posterId = `poster-${show.id}`
    const titleId = `title-${show.id}`
  
    const showCard = `
          <div class="show-card">
            <a href="/details.html?id=${show.id}">
              <img id="${posterId}" src="${show.image}" alt="${show.name}">
            </a>
  
            <a href="/details.html?id=${show.id}">
              <h3 id="${titleId}">${show.name}</h3>
            </a>
          </div>
      `
  
    const showsArea = $('shows')
    showsArea.insertAdjacentHTML('beforeend', showCard)
}

const nullFav = () => {
    const nullArea = `
        <div id="containerNull">
            <img src="/img/nothingFound.jpg" alt="Nothing Found"/>
            <div id="containerNullText">
                <h1>Nada encontrado</h1>
                <span>Você deve primeiramente adicionar alguns de seus conteúdos favoritos para que possa vê-los aqui!</span>   
            </div>
        </div>
    `
    const areaNull = $('shows')
    areaNull.insertAdjacentHTML('beforeend', nullArea);
}

if(favorites != null && favorites.length > 0){
    favorites.forEach((c) => printCard(c));
}
else {
    nullFav();
}


const backButton = $('back-button');
backButton.addEventListener('click', () =>{
    window.location.href = 'index.html';
})