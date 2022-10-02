roomFeatures = {
    'decorative': [
        {
        'undisturbed': {'text': 'Skulls sit in carved niches in the walls, dried skin still stretched over the bone.'},
        'looted': {'text': 'Small niches line the walls, but they are now empty.'}
    },
    {
        'undisturbed': {'text': 'Swirling shapes half man, half deer are carved on the walls.'},
        'looted': {'text': 'The walls are covered with jagged chisel-marks.'}
    }
    ],
    'treasures': [
        {'undisturbed': {'text': 'A wheeled cauldron made of bronze.',
                            'interactive': {
                                'summary': 'Inside the cauldron',
                                'content': ['The cauldron contains 1d20 x 100 silver coins.',
                                            'Within the cauldron is ceremonial gold armour worth 1d4 x 1,000gp',
                                            '1d6 iron swords are piled inside the cauldron.',
                                            'The cauldron is filled with thousands of bronze coins, fused by age and corrosion into a single mass.',
                                            'A venomous viper is coiled up at the bottom of the cauldron (1HD, bite 1d4 save or die). Beneath the viper is 1d6 x 100 gold pieces.']
                            }},
        'looted': {'text': 'Scraps of corroded metal are scattered across the floor.'}}
        ,
        {'undisturbed': {'text': 'Dust-covered silverware, pitchers and mugs',
                            'interactive': {
                                'summary': 'Examine the wares',
                                'content': ['The goods are of pewter and silver, worth only 1d6 x 10gp',
                                            'Many of the goods are finely-wrought gold, and the hoard is worth 1d4 x 1,000gp']
                            }},
        'looted': {'text': 'A few worthless artefacts of ancient construction are hidden behind fallen masonry.'}
    }
    ],
    'rubble': [
        {'text': "Rubble fills the area to the ceiling.",
         'interactive': {'summary': 'Dig through the rubble',
                         'content': ['After an hour of digging, a way through can be found.', 
                                    'The rubble can be cleared after only 1d4 turns.',
                                    'The rubble continues to pour from the ceiling, erasing any progress as soon as it is made.',
                                     'Digging will trigger a collapse, which will bury anyone nearby in deep rubble.']}},
        {'text': "Huge blocks of stone have fallen from the ceiling, leaving a narrow gap through.",
        'interactive': {'summary': 'Wriggle through the gap.',
                        'content': ['After a short distance the passage opens to the far side of the rubble.',
                                    'Anyone not small or unusually nimble risks becoming stuck in a tight squeeze.', 
                                    'The rocks are unstable and will collapse if disturbed.']}},

    ],
    'burial': [
        {'undisturbed': {'text': 'Ancient corpses lie in niches around the walls',
                        'interactive': {
                            'summary': 'Search the bodies',
                            'content': [
                                'The bodies are covered in toxic spores (save or be poisoned for 1d6 turns).',
                                'The bodies wear gold jewlry - torcs and arm-bands worth 1d6 x 100gp.',
                                'The bodies crumble to dust if disturbed.'
                            ]
                        }},
         'looted': {'text': 'Empty niches are carved into the walls.'}}
    ]

}

function addInteractive(card, feature) {
    if (feature.interactive) {
    card.interactive = {'summary': feature.interactive.summary, 'content': Shuffle(feature.interactive.content)[0]};
    };
}

function addFeature(card, feature) {
    if (card.looted) {
        card.description.push(feature.looted.text);
        addInteractive(card, feature.looted);
    }
    else {
        card.description.push(feature.undisturbed.text);
        addInteractive(card, feature.undisturbed);
    }
}

function addBurial() {
    var features = [...Shuffle(roomFeatures.burial)]
    map.flat().forEach(card => {
        if (card.tags.includes('burial')) {
            var feature = features.pop()
            addFeature(card, feature);
            addInteractive(card, feature);
        }
        if (features.length == 0) {
            features = [...Shuffle(roomFeatures.burial)]
        }
    });  
}

function addRubble() {
    var rubble = [...Shuffle(roomFeatures.rubble)]
    map.flat().forEach(card => {
        if (card.tags.includes('rubble')) {
            var feature = rubble.pop()
            card.description.push(feature.text);
            addInteractive(card, feature);
        }
        if (rubble.length == 0) {
            rubble = [...Shuffle(roomFeatures.rubble)]
        }
    });  
}

function addDecorations() {
    var decorations = [...Shuffle(roomFeatures.decorative)]
    map.flat().forEach(card => {
        if (card.tags.includes('decoration')) {
            var feature = decorations.pop()
            addFeature(card, feature);
        }
        if (decorations.length == 0) {
            decorations = [...Shuffle(roomFeatures.decorative)]
        }
    });
}

function addTreasures() {
    var treasures = [...Shuffle(roomFeatures.treasures)]
    map.flat().forEach(card => {
        if (card.tags.includes('treasure')) {
            var feature = treasures.pop()
            addFeature(card, feature);
        }
        if (treasures.length == 0) {
            treasures = [...Shuffle(roomFeatures.treasures)]
        }
    });
}

function addFeatures() {
    addDecorations();
    addTreasures();
    addRubble();
    addBurial();
}


addFeatures()