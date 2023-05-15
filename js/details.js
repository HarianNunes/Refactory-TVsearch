const $ = document.getElementById.bind(document)
const API_URL = 'https://api.tvmaze.com/shows'
const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get('id')
const lastpage = document.referrer;
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
    window.location.href = lastpage;
})



let favs = JSON.parse(localStorage.getItem('Favorites')) ?? [];
for(let i = 0; i < favs.length; i++){
    if(favs[i].id == id){
      box.checked = true;
    }
}

const change = box.addEventListener('change', function(){
  if(box.checked){
    query();
  }
  else {
    let data = JSON.parse(localStorage.getItem('Favorites'));
    for(let i = 0; i < data.length; i++){
      if(data[i].id == id){
        let ident = Number(id);
        let index = data.findIndex(item => item.id == ident);
        data.splice(index, 1);
        localStorage.setItem('Favorites', JSON.stringify(data));
      }
    }

  }
})

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
  }
  catch {
    console.log('erro')
  }
}


const query = async () => {
  try {
    const resposta = await fetch(`${API_URL}/${id}`);
    let check = box.checked;
    data = await resposta.json();
    const imageUrl = await data.image? data.image.medium : '/img/noimage.png';
    const newShow1 = {
      'id': data.id,
      'name': data.name,
      'image': imageUrl,
      'check': check
    }
    let boxe = await JSON.parse(localStorage.getItem('Favorites')) ?? [];
    await console.log(boxe);
    await boxe.push(newShow1)
    await localStorage.setItem('Favorites', JSON.stringify(boxe));
  }
  catch {
      console.log('erro')
    }
}