const API_URL = 'https://api.tvmaze.com/search/shows?'
const $ = document.getElementById.bind(document)

const showsJson = localStorage.getItem('shows');
const shows = showsJson ? JSON.parse(showsJson) : [];

const searchShows = (event) => {
  event.preventDefault()
  saveShows = [];

  const query = $('query').value

  if (query.trim()) {
    $('not-found-message').style.display = 'none'

    const loadingAnimation = `
        <img src="/img/loading.gif" alt="Procurando...">
    `
    $('shows-area').innerHTML = loadingAnimation

    fetch(API_URL + new URLSearchParams({ q: query })).then((response) =>
      // Converte a resposta do serviço para JSON
      response.json().then((results) => {
        $('shows-area').innerHTML = ''

        if (results.length === 0) {
          console.log('Nenhum resultado')
          $('not-found-message').style.display = 'block'
          return
        }

        // Laço de repetição para tratar cada um dos shows
        results.forEach((r) => {
          //const show = r.show
          const { show } = r
          const { id, name, image } = show

          const imageUrl = image ? image.medium : '/img/noimage.png'

          const newShow = {
            id,
            name,
            imageUrl,
          }
          
          saveShows.push(newShow)
          //const newShowStr = JSON.stringify(newShow)
          //localStorage.setItem('shows', newShowStr)

          printCard(newShow)
        })
        localStorage.removeItem('shows');
        
        const newShowSTR = JSON.stringify(saveShows);
        localStorage.setItem('shows', newShowSTR);
      })

      
    )
    
  } 
}
let saveShows = [];


const printCard = (show) => {
  const posterId = `poster-${show.id}`
  const titleId = `title-${show.id}`

  const showCard = `
        <div class="show-card">
          <a href="/details.html?id=${show.id}">
            <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
          </a>

          <a href="/details.html?id=${show.id}">
            <h3 id="${titleId}">${show.name}</h3>
          </a>
        </div>
    `

  const showsArea = $('shows-area')
  showsArea.insertAdjacentHTML('beforeend', showCard)
}
shows.forEach((c) => printCard(c))

const favButton = $('fav-button').addEventListener('click', function() {
  window.location.href = './favorites.html'
})