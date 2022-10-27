/* 
Descrizione**
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Utilizzando la base dati fornita e prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
Formattare le date in formato italiano (gg/mm/aaaa)
****BONUS**
1
Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
2
Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
3
Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/


const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const container = document.getElementById('container');


init();

function init(){
  
  // RESET
  container.innerHTML = '';
  
  // ciclo l'array di posts e stampo i post
  // ad ogni clico aggiungo il blocco HTML dei post al contenitori
  posts.forEach( (post, index) => {
      container.innerHTML += getTemplatePost(post, index);
  })
}

/*
  genero il template HTML per i post e lo restituisco compilato dei dati dinamici
  l'index che passo serve per la funzione di onclick (come se fosse un addEventListener) del pulsante like
*/ 
function getTemplatePost(element, index){
  // destrutturazione dell' oggetto element (mi prendo quello che devo stampare dinamicamente)
  const {content, media, author, likes, created} = element;

  // creo variabile che sarà il template litteral dell'immagine del profilo
  let authorImage = '';

  // se esiste l'immagine la stampo
  if(author.image) authorImage = `<img class="profile-pic" src="${author.image}" alt="${author.name}">`;
  // altrimenti con le classi fornite stampo il template di default (ho una funzione che mi genera le iniziali)
  else authorImage = `
    <div class="profile-pic-default">
      <span>${getProfilePicDefault(author)}</span>
    </div>
  `;
  
  // ritorna il template litteral completo
  return `
    <div class="post">
      <div class="post__header">
        <div class="post-meta">                    
          <div class="post-meta__icon">
            ${authorImage}                 
          </div>
          <div class="post-meta__data">
            <div class="post-meta__author">${author.name}</div>          
            <div class="post-meta__time">${getDatePost(created)}</div>
          </div>                    
        </div>
      </div>
      <div class="post__text">${content}</div>
     <div class="post__image">
        <img src="${media}" alt="">
      </div>
      <div class="post__footer">
        <div class="likes js-likes">
          <div class="likes__cta">
            <a class="like-button  js-like-button" onclick="handleLikeButton(${index})" href="#" data-postid="1">
              <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
              <span class="like-button__label">Mi Piace</span>
            </a>
          </div>
          <div class="likes__counter">
            Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
          </div>
        </div> 
      </div>            
    </div>
  `;
}

/* 
  funzione che inverte la data:
  1 - splitlo la stringa al separatore del otterenere un array di stringhe
  2 - reverse (inverto) l'array
  3 join (contario di split) creo una stringa da un array mettendo il separatore      
*/
function getDatePost(dateString) {
  return dateString.split('-').reverse().join('-');
}

/*
  funzione che prende il nome dell'autore e prende solo le prime lettere del nome e del cognome
*/
function getProfilePicDefault(author) {
  const nameString = author.name.split(' ')[0][0] + author.name.split(' ')[1][0];
  return nameString;
}

// pulsante like 
function handleLikeButton(index) {
   // creo html collection che è un array e prendo l'elemento che corrisponde all'indice
  const likeButton = document.getElementsByClassName('js-like-button')[index];
  

  if(likeButton.isClick) {
    likeButton.classList.remove('like-button--liked');
  }
  else {
    likeButton.classList.add('like-button--liked');
  }
 
  
  
}
