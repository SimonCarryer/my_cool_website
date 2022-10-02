
animals = [
    {"name": "bear",
    "signs": [
        "Large, clawed footprints",
        "A rank smell",
        "Sound of something breathing loudly"],
    "contents": [
        "A partially devoured and rotting carcass",
        "Piles of scat",
        "Claw marks on walls and floors",
        "A human corpse, long dead. A rotted pouch contains 1d20gp in coins."
    ],
    "encounters": [
        "A huge <b>brown bear<b> (4HD, armour as leather, claws 1d8/1d8) which defends its lair ferociously.",
        "A <b>black bear</b> (2HD, armour as leather, claws 1d6/1d6) which fights if it must.",
        "A <b>mother bear</b> (4HD, armour as leather, claws 1d8/1d8) and 1d4 cubs.",
    ],
    "treasure": [
        "The decayed remains of a warrior, his axe lies in a corner, the haft broken.",
        "Jewellry worth 1d20x10gp is strewn among the bear's sleeping material.",
        "A leather boot contains a skeletal foot, and gem worth 1d6x10gp."
    ]

},
{"name": "wolves",
"signs": [
    "A rank smell",
    "Clawed footprints",
    "Sounds of barking",
    "A trail of blood"
],
"contents": [
    "1d4 <b>wolves</b> (1HD, armour as leather, bite 1d6) snarling and barking alarm.",
    "Piles of scat.",
    "Gnawed bones.",
    "A gruesome feast of slaughtered animals.",
    "A <b>wolf cub</b>, wandered away from its den."
],
"encounters": [
    "A pack of 2d6 <b>wolves</b> (1HD, armour as leather, bite 1d6) snarling and ready to defend their den.",
    "A single <b>wolf</b> (1HD, armour as leather, bite 1d6+1) with a litter of 1d8 puppies.",
    "A powerful <b>dire wolf</b> (3HD, armour as leather, bite 1d8) fiercly defending its den.",
    "A wounded <b>dire wolf</b> (3HD (6hp), armour as leather, bite 1d8) whining and cowering.",
    "A pack of 1d8 <b>wolves</b> (1HD, armour as leather, bite 1d6) led by a <b>dire wolf</b> (3HD, armour as leather, bite 1d8).",
],
"treasure": [
    "The decayed remains of a warrior, his spear lies in a corner, the haft broken.",
    "Jewellry worth 1d20x10gp is strewn among the wolves' sleeping material.",
    "A leather boot contains a skeletal foot, and gem worth 1d6x10gp.",
    "A <b>dire wolf pup</b> is curled up at the back of the cave."
]
}
]

emptySigns = [
    "It's all quiet",
    "The dust seems undisturbed",
    "The air is still and stale",
    "Nothing but dust",
    "Not a sound"
]

function addAnimals() {
    animalType = Shuffle(animals)[0]
    startCard = Shuffle(map.flat().filter(card => card.looted & !card.entrance))[0]
    paths = [];
    entryPath(startCard, []);
    path = paths[0]

    signs = animalType["signs"];
    path.forEach(card => {
        card.signs.push(Shuffle(signs)[0])
    });

    treasure = animalType["treasure"];
    encounter = Shuffle(animalType["encounters"])[0];
    lastRoom = path.shift();
    if (d6() >= 5) {
        lastRoom.description.push(Shuffle(treasure)[0])
    };
    lastRoom.description.push(encounter);

    contents = animalType["contents"];
    path.forEach(card => {
        card.description.push(Shuffle(contents)[0])
    });
}

function fixEmptySigns() {
    map.flat().forEach(card => 
        {
            if (card.signs.length == 0) {
                card.signs.push(Shuffle(emptySigns)[0])
            }
        }
        )
}

function addEncounters() {
    if (d6() >= 4) {
        addAnimals()
    }
}

addEncounters()
fixEmptySigns()