function jiggle(card) {
    deg = Math.random()-Math.random();
    xOffset = Math.random()*4-Math.random()*4;
    yOffset = Math.random()*4-Math.random()*4;
    card.style.transform += ` rotate(${deg}deg) translate(${xOffset}px, ${yOffset}px)`;
}

function jiggleCards() {
    cards = Array.from(document.getElementsByClassName("card"));
    cards.forEach(jiggle);
}

function clicked(cardNumber) {
    card = document.getElementById(`card${cardNumber}`);

    if (card.classList.contains("flipped")) {
        detailCard = document.getElementById(`detailCard${cardNumber}`);
        if (!detailCard.classList.contains("top")) {
            cards = Array.from(document.getElementsByClassName("card"));
            for (const card of cards) {
                if (card.classList.contains("top")) {
                lastTop = card
                }
            }
            lastTop.classList.add("second")
            lastTop.classList.remove("top")
            detailCard.classList.add("top")
            detailCard.addEventListener("animationend", function() {
                lastTop.classList.remove("second")
            });
        }
    }
    else {
        signsCard = document.getElementById(`signsCard${cardNumber}`);
        setTimeout(function(){
            if (!card.classList.contains("flipped")) {
                card.style.zIndex = "2";
                signsCard.addEventListener("animationend", function() {
                    card.style.zIndex = "0";
                });
                signsCard.classList.toggle("shown")
            }
        },200);
        
    }
}

function doubleClicked(cardNumber) {
    card = document.getElementById(`card${cardNumber}`);
    card.classList.toggle("flipped");
    signsCard = document.getElementById(`signsCard${cardNumber}`);
    signsCard.classList.remove("shown")
    if (card.classList.contains("flipped")) {
        clicked(cardNumber);
    }
}

jiggleCards()
setTimeout(function(){
    document.body.className="";
},1000);