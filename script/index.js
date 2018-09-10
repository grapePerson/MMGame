//функция сортировки объектов в массиве
const sortScore = (a,b) =>{
  if (a.score > b.score) {
    return 1;
  }
  if (a.score < b.score) {
    return -1;
  }
  return 0;
}
//рандомная сортировка массива
Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    let num = Math.floor(Math.random() * (i + 1));
    let d = this[num];
    this[num] = this[i];
    this[i] = d;
  }
  return this;
}
//функция которая возвращает  радио-батн со свойством checked
const getDifficult = () => {
  const radios = document.getElementsByName('difficult')
  for (let i = 0; i < radios.length; i++) {
    if(radios[i].checked){
      return radios[i].value
    }
  }
}
//функция которая возвращает элемент  с классом checkedShirt для рубашки карты
const getShirt = () => {
  const shirtList = document.querySelector('.shrit-list').children;
  let checkedShirt;
  Array.from(shirtList).forEach((elem)=> {
    if(elem.className==="checkedShirt"){
      checkedShirt = elem;
    }
  })
  return checkedShirt;
}
//функция создания обьекта карты
const createCards = () => {
  const difficult = getDifficult().split("X");
  const cardsCount = difficult[0] * difficult[1];
  const checkedShirt = getShirt().getAttribute("name");
  const Cards = new Card(urlImages,difficult[1],difficult[0],cardsCount,gameContainer,checkedShirt)
  Cards.createImgArr();
  Cards.createImgList();
  timer.start();
}
//функция принимает элемент по которому произошел клик и кладет в замкнутый массив,и возвращает его
const checkCards = (elem) => {
  let cards = [];
  return (elem)=> {
    if(cards.length===2){
      cards = [];
      cards.push(elem);
    }
    if(cards.length === 0){
      cards.push(elem);
    }else if (cards.length === 1) {
      //условие которое не позволяет добавить одну и ту же карту в массив
      if(cards[0].children[2].id !== elem.children[2].id){
        cards.push(elem);
      }
    }
    return cards;
  }
}
//функция для переключения классов active unactive
const switchClass = (elem1,elem2) =>{
  elem1.classList.remove("active");
  elem1.classList.add("unactive");
  elem2.classList.remove("unactive");
  elem2.classList.add("active");
}
//создание score,в локальном хранилище 3 обьекта score ,в зависимости от сложности игры.
const setScore = (score,difficult) => {
  if(localStorage.getItem(`Top10 ${difficult}`)) {
    let objectScore = JSON.parse(localStorage.getItem(`Top10 ${difficult}`));
    let player = {};
    let updateScore = true;
    player.name = sessionStorage.getItem("player");
    player.score = score;
    if(objectScore.length<10) {
      objectScore.forEach((elem,index)=> {
        if(elem.name===player.name) {
          updateScore = false ;
          if(elem.score > player.score){
            elem.score = player.score;
          }
        }
      });
      if(updateScore){
        objectScore.push(player);
      }
      objectScore.sort(sortScore);
      localStorage.setItem(`Top10 ${difficult}`,JSON.stringify(objectScore));
    }else {
      objectScore.forEach((elem,index)=> {
        if(elem.name===player.name) {
          updateScore = false ;
          if(elem.score > player.score){
            elem.score = player.score;
          }
        }
      });
      if(updateScore){
        objectScore.push(player);
        objectScore.splice(10,1);
      }
     objectScore.sort(sortScore);
     localStorage.setItem(`Top10 ${difficult}`,JSON.stringify(objectScore));
    }
  }else {
    let objectScore=[];
    let player = {};
    player.name = sessionStorage.getItem("player");
    player.score = score;
    objectScore.push(player);
    localStorage.setItem(`Top10 ${difficult}`,JSON.stringify(objectScore));
  }
}
//функция создания score
const createTop10List = (difficult) => {
  let objectScore = JSON.parse(localStorage.getItem(`Top10 ${difficult}`));
  const allResultsScore = document.querySelectorAll(".top10-list li");
  Array.from(allResultsScore).forEach((elem)=> {
    elem.parentNode.removeChild(elem)
  })
  if(objectScore){
    objectScore.forEach((elem,index) => {
      const newLi = document.createElement("li")
      newLi.innerText = `${index+1}) ${elem.name} ${elem.score}`;
      top10List.appendChild(newLi);
    })
  }
}
//функция создания audio
const createAudio = (urls) => {
    urls.forEach((elem)=> {
      let newAudio = document.createElement("audio");
      let audioName = elem.split("/")[2].split(".")[0];
      let header = document.querySelector("header");
      let body = document.querySelector("body");
      newAudio.setAttribute("src",`audio/${audioName}.mp3`);
      newAudio.setAttribute("id",`${audioName}`);
      body.insertBefore(newAudio,header);
    });
}
//функция воспроизведения audio
const playAudio = (src) => {
  let id = src.split("images/")[1].split(".")[0];
  document.querySelector(`#${id}`).play();
}

const top10List = document.querySelector(".top10-list");
const buttonBackToRules = document.querySelector("#backToRules");
const buttonStartAgen = document.querySelector("#startAgen");
const buttonBackToRegistration = document.querySelector("#backToRegistration");
const buttonNext = document.querySelector("#buttonNext");
const field = document.querySelector(".field");
const rulesContainer = document.querySelector(".rules-container");
const signinContainer = document.querySelector(".signin-container");
const loginContainer = document.querySelector(".login-container");
const gameContainer = document.querySelector(".game-container");
const errorMesage = document.querySelector(".error-message");
const errorMesageButton = document.querySelector("#errorButtonOk");
const loginButton = document.querySelector("#login");
const cardsStyle = document.querySelector('.cards-style');
const errorText = document.querySelector(".error-text");
const gameSettings = document.querySelector(".game-settings");
const winnerWindow = document.querySelector('.you-win');
const timePassedTxt = document.querySelector('#timePassed');
const soundButtonsContainer = document.querySelector(".sound-buttons");
const soundMainTheme = document.querySelector("#mainTheme");
const showTopButton = document.querySelector("#showTop")
const timer = new Timer();
const clickCards = checkCards();
let canClick = true;
const urlImages = [
  "./images/alarak.jpg",
  "./images/alex.jpg",
  "./images/ana.jpg",
  "./images/chromie.jpg",
  "./images/handzo.jpg",
  "./images/li-ming.jpg",
  "./images/murchal.jpg",
  "./images/nova.jpg",
  "./images/thrall.jpg",
  "./images/tracer.jpg",
  "./images/valera.jpg",
  "./images/valla.jpg"
]
createAudio(urlImages);
createTop10List(getDifficult());
showTopButton.addEventListener("click",(ev)=> {
  if(ev.target.value ==="Top 10"){
    ev.target.value = "Hide score"
    document.querySelector(".top-score").style.left = "0px";
  }else {
    ev.target.value = "Top 10"
    document.querySelector(".top-score").style.left = "-300px";
  }
});
//отмена перетаскивания элементов документа,т.к если начать перетаскивать карту ,будет видно изображение под рубашкой.
document.addEventListener("dragstart", (event)=>{
		event.preventDefault();
});
soundButtonsContainer.addEventListener("click",(ev)=> {
  if(ev.target.classList.contains("stop")){
    soundMainTheme.pause();
    ev.target.classList.remove("stop");
    ev.target.classList.add("play");
  } else if(ev.target.classList.contains("play")) {
    soundMainTheme.play();
    ev.target.classList.remove("play");
    ev.target.classList.add("stop");
  }
  if(soundMainTheme.volume>=0 && soundMainTheme.volume<=1){
    if(ev.target.classList.contains("volume-down")){
      if(soundMainTheme.volume !== 0){
        let volume = ((soundMainTheme.volume*100)-10)/100
        soundMainTheme.volume=volume;
      }
    }
    if(ev.target.classList.contains("volume-up")){
      if(soundMainTheme.volume !== 1){
        let volume = ((soundMainTheme.volume*100)+10)/100
        soundMainTheme.volume=volume;
      }
    }
  }
});
gameSettings.addEventListener("click",()=> {
  if(gameContainer.classList.contains("active")){
    const allCards = document.querySelectorAll(".images-list");
    Array.from(allCards).forEach((elem)=> {
	    elem.parentNode.removeChild(elem)
    })
    timer.stop();
    timer.reset();
    createCards();
    createTop10List(getDifficult());
  }else{
    createTop10List(getDifficult());
  }
})
cardsStyle.addEventListener("click",(ev)=>{
  if(ev.target.src){
    getShirt().classList.remove("checkedShirt");
    ev.target.parentNode.classList.add("checkedShirt");
    if(gameContainer.classList.contains("active")){
      const allShirts = document.querySelectorAll(".card-shirt");
      let checkedShirt = getShirt().getAttribute("name");
      Array.from(allShirts).forEach((elem)=>{
         elem.src=checkedShirt;
      })
    }
  }
});
buttonStartAgen.addEventListener("click",()=> {
  const allCards = document.querySelectorAll(".images-list");
  Array.from(allCards).forEach((elem)=> {
    elem.parentNode.removeChild(elem)
  })
  winnerWindow.classList.remove("active");
  winnerWindow.classList.add("unactive");
  createCards();
});
buttonBackToRules.addEventListener("click",()=> {
  switchClass(signinContainer,rulesContainer)
});
buttonBackToRegistration.addEventListener("click",()=> {
  switchClass(loginContainer,signinContainer)
});
buttonNext.addEventListener("click",()=> {
  switchClass(rulesContainer,signinContainer)
});
loginButton.addEventListener("click",()=> {
  switchClass(signinContainer,loginContainer)
});
errorMesageButton.addEventListener("click",()=> {
  errorMesage.style="left:-500px"
});
field.addEventListener("click",(ev)=> {
  if(ev.target.name==="signinButtonPlay") {
    ev.preventDefault();
    const firstNameValue = document.querySelector("#firstName").value;
    const lastNameValue = document.querySelector("#lastName").value;
    const emailValue = document.querySelector("#email").value;
    if(firstNameValue!==" " && firstNameValue.length>=6  && lastNameValue!==" " && lastNameValue.length>=6 && emailValue!==" " && emailValue.length>=12) {
      if(!localStorage.getItem(`${firstNameValue} ${lastNameValue}`)) {
        localStorage.setItem(`${firstNameValue} ${lastNameValue}`,emailValue);
        sessionStorage.setItem('player',`${firstNameValue} ${lastNameValue}`);
        switchClass(signinContainer,gameContainer);
        field.style.background = "none";
        createCards();
      }else{
        errorText.innerText="Такой игрок уже существует";
        errorMesage.style="left:0px";
      }
    }else {
      errorText.innerText="Не все поля заполнены или введены некорректные данные";
      errorMesage.style="left:0px";
    }
  }
  if(ev.target.name==="loginButtonPlay"){
    ev.preventDefault();
    const firstNameValue = document.querySelector("#firstNameLogin").value;
    const lastNameValue = document.querySelector("#lastNameLogin").value;
    const user = localStorage.getItem(`${firstNameValue} ${lastNameValue}`);
    if(firstNameValue !== " " && lastNameValue !== " " && user){
      switchClass(loginContainer,gameContainer);
      sessionStorage.setItem('player',`${firstNameValue} ${lastNameValue}`);
      field.style.background = "none";
      createCards();
    }else {
      errorText.innerText="Не все поля заполнены или введены некорректные данные";
      errorMesage.style="left:0px";
    }
  }
  if(ev.target.className==="card-front-side" || ev.target.className==="card-shirt"){
    if(canClick){
      ev.target.parentNode.classList.add("do-flipp");
      let cards = clickCards(ev.target.parentNode);
      if(cards.length===2 && cards[1].children[2].getAttribute("id") !== cards[0].children[2].getAttribute("id")){
        canClick = false;
        setTimeout(()=> {
            if(cards[0].children[2].src===cards[1].children[2].src){
              cards[0].children[2].classList.add("hide-card");
              cards[1].children[2].classList.add("hide-card");
              playAudio(cards[0].children[2].src)
              const difficult = getDifficult().split("X");
              const cardsCount = difficult[0] * difficult[1];
              canClick = true;
              if(document.querySelectorAll(".hide-card").length === cardsCount){
                timer.stop();
                timePassedTxt.innerText=`Твое время ${timer.showTime}`;
                setScore(timer.showTime,getDifficult());
                timer.reset();
                createTop10List(getDifficult());
                winnerWindow.classList.remove("unactive");
                winnerWindow.classList.add("active");
              }
            }else{
              cards[0].classList.remove("do-flipp");
              cards[1].classList.remove("do-flipp");
              canClick = true;
            }
        },1000)
      }
    }
  }
});
