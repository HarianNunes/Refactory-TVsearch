const $ = document.getElementById.bind(document)
const API_URL = 'https://api.tvmaze.com/shows'
const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get('id')
const favArray = localStorage.Favorites ? localStorage.getItem('Favorites') : [];
const valorCheckbox = JSON.parse(localStorage.getItem('checkboxes'));

let box = document.getElementById('flexCheckDefault');




fetch(`${API_URL}/${id}`).then((response) => {
  response.json().then((result) => {
    const { name, type, language, genres, status, image, network, webChannel } = result
    const resultados = JSON.stringify(result);
     
    const running = status === 'Ended' ? false : true
    const imageUrl = image ? image.medium : '/img/noimage.png'
    const channel = network ? network.name : webChannel.name

    $('poster').src = imageUrl
    $('name').innerText = name
    $('type').innerText = type
    $('language').innerText = language
    $('genres').innerText = genres.join(', ')
    $('running').innerText = running ? 'Sim' : 'Não'
    $('channel').innerText = channel
    favArray.push(resultados)
    localStorage.removeItem('tempFavorites')
    localStorage.setItem('tempFavorites', favArray);
  })
})
const click = document.getElementById('back-link').addEventListener('click', function(){
  window.location.href = 'index.html';
})

document.getElementById('flexCheckDefault').addEventListener('change', function(){
  const fav = document.getElementById('flexCheckDefault').checked;
  if(fav){
    const items = JSON.parse(localStorage.getItem('shows'));
    //console.log(items);
    const resposta = items.filter(item => item.id == id)
    //console.log(resposta);
    const checkboxesData = JSON.stringify(resposta.filter(item => item.id == id));
    console.log(fav, checkboxesData);
    let boxess = localStorage.checkboxes ? localStorage.getItem('checkboxes') : [];
    console.log(boxess);
    localStorage.setItem('checkboxes', JSON.stringify({fav, checkboxesData}));
    }
  else {
    localStorage.setItem('checkboxes', fav)
  }
  
});
const resp = async () =>{
  try {
    if(localStorage.Favorites){
      favo = localStorage.getItem('Favorites');
    }
    else{
      favo = [];
    }
    const resposta = await fetch(`${API_URL}/${id}`)
    favo.push(data)
    console.log(favo);
  }
  catch {
    console.log('erro')
  }
}

const shows = [];
const select = JSON.parse(localStorage.getItem('Favorites'));


let entrada = JSON.parse(localStorage.getItem('checkboxes'));
let cheque = JSON.parse(entrada.checkboxesData)

Object.keys(cheque).forEach(function (key) {
  if(cheque[key].id == id && entrada.fav == true){   
      box.checked = true;
  }
})
let idBox = JSON.parse(valorCheckbox.checkboxesData);