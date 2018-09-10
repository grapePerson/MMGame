class Card {
  constructor(urls,countUl,countLi,cardsCount,gameField,checkedShirt) {
    this.urls = urls;
    this.countUl = countUl;
    this.countLi = countLi;
    this.cardsCount = cardsCount/2;
    this.images = [];
    this.gameField = gameField;
    this.shirt = checkedShirt;
  }
  createImgArr() {
    this.urls.shuffle();
    this.urls.forEach((elem,index)=> {
      if(index < this.cardsCount){
        let newImage = document.createElement("img");
        newImage.setAttribute("src",elem);
        let clon = newImage.cloneNode(true);
        this.images.push(newImage);
        this.images.push(clon);
      }
    });
    this.images.shuffle();
  }
  createImgList() {
    for(let i = 0; i < this.countUl; i++){
      const newUl = document.createElement("ul");
      newUl.className="images-list";
      for (let x = 0; x < this.countLi; x++) {
        const newLi = document.createElement("li");
        const shirtbackground = document.createElement("div");
        const shirt = document.createElement("img");
        const image = this.images.pop();
        newLi.classList.add("card-flipper");
        shirtbackground.classList.add("card-front-side");
        shirt.classList.add("card-shirt");
        shirt.setAttribute("src",this.shirt);
        image.classList.add("card-back-side");
        image.setAttribute("id",`${i}${x}`);
        newLi.appendChild(shirtbackground);
        newLi.appendChild(shirt);
        newLi.appendChild(image);
        newUl.appendChild(newLi);
      }
      this.gameField.appendChild(newUl);
    }
  }
}
