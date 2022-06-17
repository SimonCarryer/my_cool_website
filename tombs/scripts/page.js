

function addCard(card) {
    grid = document.getElementById("dungeonGrid");
    elem = document.createElement('div');
    elem.class = "cardStack"

  
  
    elem.innerHTML =   `<div class="signsCardInner" id="signsCard1" onclick="this.classList.remove('shown')"><div class="card signs">Smell of decay.</div></div>
    <div class="card" id="card1" onclick="clicked(1)" ondblclick="doubleClicked(1);"><div class="cardInner"><div class="cardBack"><img class="cardImage" src="images/cardBack.jpg"></div><div class="cardFront"><div class="cardNumber">1</div><img class="cardImage" src='images/cardFront${card.id}.jpg'></div></div></div>
            </div>`
    grid.appendChild(elem)
}

function addCards() {
    map.forEach(addCard)
}

addCards()