//creating Vector object
var Vector = function (x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.normalize = function () {
    var length = Math.sqrt(this.x * this.x + this.y * this.y); //calculating length
    this.x = this.x / length; //assigning new value to x (dividing x by length of the vector)
    this.y = this.y / length; //assigning new value to y
}

function eye(centerX, centerY, mouseX, mouseY, radius) {
    let canvas = document.getElementById("myFace");
    var context = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    var direction = new Vector(mouseX - (centerX + rect.left), mouseY - (centerY + rect.top));
    direction.normalize();
    context.save();
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.clip();
    context.fillStyle = 'white';
    context.fill()
    context.beginPath();
    context.arc(centerX + (direction.x * 6), centerY + (direction.y * 6), radius - 3, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill()
    context.restore();
}

function clear() {
    let canvas = document.getElementById("myFace");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('mousemove', (event) => {
    clear()
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    eye(138, 151, mouseX, mouseY, 13);
    eye(85, 155, mouseX, mouseY, 13);
});


const listOfThings = [
    ["batc_cover.jpg", "https://barryandthecrumpets.bandcamp.com/album/a-good-keen-band"],
    ["bot_ross.png", "https://towardsdatascience.com/bot-ross-teaching-a-computer-to-paint-f5a9c9ef908"],
    ["garfield.jpeg", "https://medium.com/@simoncarryer/damn-near-killed-him-30042c796e29"],
    ["romance.png", "https://towardsdatascience.com/ten-thousand-first-dates-reinforcement-learning-romance-c75992beab10"],
    ["birdle.jpg", "http://birdnerd.co.nz/birdle/"],
    ["evolved.png", "https://github.com/SimonCarryer/mutant_flowers"],
    ["moviemaths.png", "http://moviemaths.com/"],
    ["dungeon.png", "http://onemilliondungeons.com/"],
    ["soft_science.png", "https://www.youtube.com/watch?v=p4vDnjSYB-Q"],
    ["buns.png", "https://medium.com/@simoncarryer/burger-wellington-data-analysis-29342b5ba65b"],
    ["dog_breeds.jpg", "https://github.com/SimonCarryer/archetypal_dog_names"],
    ["polearms.png", "https://towardsdatascience.com/how-computers-see-image-recognition-and-medieval-pole-arms-1c1375a34d38"]
]
var counter = 0

function yourFunction() {
    document.querySelector("#flipper").classList.toggle("flip")
    var elem = document.getElementById("front")
    if (counter % 2 == 0) {
        var elem = document.getElementById("back")
    }
    elem.innerHTML = `<a href="${listOfThings[counter][1]}" target="_blank"><img class="flipimage" src="images/${listOfThings[counter][0]}"></a>`;
    counter++;
    if (counter >= listOfThings.length) {
        counter = 0
    }
    setTimeout(yourFunction, 3000);
}

function preloadImage(elem) {
    var img = new Image();
    img.src = `images/${elem[0]}`;
}

function preloadRegular() {
    listOfThings.forEach(preloadImage)
}

const listOfRPGThings = [
    ["dungeon.png", "http://onemilliondungeons.com/"],
    ["zargon.jpg", "pyramid_of_the_undying.html"],
    ["omt.png", "https://www.drivethrurpg.com/product/171413/On-Mighty-Thews?manufacturers_id=5335"],
    ["nod.png", "https://www.drivethrurpg.com/product/130234/Nod?manufacturers_id=5335"],
    ["idea.png", "https://www.drivethrurpg.com/product/141036/The-Idea-from-Space"],
    ["trader.png", "https://www.drivethrurpg.com/product/113019/The-Cosmic-Trader?manufacturers_id=5335"],
    ["conan.png", "downloads/World_of_Conan.pdf"],
    ["under_the_city_cover.jpg", "under_the_city.html"],
    ["devils.png", "devils_and_their_lies.html"],
    ["chromas.jpg", "that_bastard_chromas.html"]]

function preloadRPG() {
    listOfRPGThings.forEach(preloadImage)
}

function yourRPGFunction() {
    document.querySelector("#flipper").classList.toggle("flip")
    var elem = document.getElementById("front")
    if (counter % 2 == 0) {
        var elem = document.getElementById("back")
    }
    elem.innerHTML = `<a href="${listOfRPGThings[counter][1]}" target="_blank"><img class="flipimage" src="images/${listOfRPGThings[counter][0]}"></a>`;
    counter++;
    if (counter >= listOfRPGThings.length) {
        counter = 0
    }
    setTimeout(yourRPGFunction, 5000);
}


// yourFunction();

eye(138, 151, 138, 151, 13);
eye(85, 155, 85, 155, 13);

