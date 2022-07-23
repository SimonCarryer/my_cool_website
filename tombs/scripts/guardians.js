// Adds in the original guardians of the dungeon.

guardianEncounters = [
    {'number': 1,
     'text': 'Minotaur (4HD, axe 2d6)'
    },
    {'number': 6,
     'text': 'Skeleton Warrior (1HD, sword 1d6)'
    }
]

function guardians() {
    var encounters = Shuffle(guardianEncounters)
    map.flat().forEach(card => {
        if (card.tags.includes('guardians')) {
            card.encounter = encounters.pop();
        }
        if (encounters.length == 0) {
            encounters = Shuffle(guardianEncounters)
        }
    });
};

guardians();