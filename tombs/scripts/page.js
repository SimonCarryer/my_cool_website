

function addCard(card, idx) {
    grid = document.getElementById("dungeonGrid");
    elem = document.createElement('div');
    if (card.entrance) {
        cardBack = 'images/newEntrance.jpg'
    }
    else {
        cardBack = 'images/newBack.jpg'
    }
    elem.class = "cardStack"
    elem.innerHTML =   `<div class="signsCardInner" id="signsCard${idx}" onclick="this.classList.remove('shown')"><div class="card signs">Eventually some warning signs will go here.</div></div>
    <div class="card" id="card${idx}" onclick="clicked(${idx})" ondblclick="doubleClicked(${idx});"><div class="cardInner"><div class="cardBack"><img class="cardImage" src="${cardBack}"></div><div class="cardFront"><div class="cardNumber">${idx}</div><img class="cardImage" src='images/cards/tombs_${card.id}.jpg'></div></div></div>
            </div>`
    grid.appendChild(elem)
}

function addDetailCard(card, idx) {
    deck = document.getElementById("detailCards");
    elem = document.createElement('div');
    elem.classList = "card detail"
    elem.id= `detailCard${idx}`
    elem.innerHTML = `<div class="cardNumber details">${idx}</div>
    <h3 class="title">${card.name}</h3>
    <p>${card.description}</p>`

    if (card.decoration) {
        elem.innerHTML += `<p>${card.decoration}</p>`
    };
    if (card.encounter) {
        elem.innerHTML += `<p>${card.encounter.text}</p>`
    };
    deck.appendChild(elem);
}

function addCards() {
    map.flat().forEach(function (card, idx) {
        addCard(card, idx+1);
        addDetailCard(card, idx+1);
    })
}

addCards()