
cards = [
    {'id':1,
    'sides':[-1,1,1,-1],
    'entrance': false},
    {'id':2,
    'sides':[-1,1,1,1],
    'entrance': false},
    {'id':3,
    'sides':[-1,-1,1,1],
    'entrance': false},
    {'id':4,
    'sides':[1,1,-1,-1],
    'entrance': false},
    {'id':5,
    'sides':[1,-1,1,1],
    'entrance': false},
    {'id':6,
    'sides':[1,-1,-1,-1],
    'entrance': false},
    {'id':7,
    'sides':[-1,1,-1,-1],
    'entrance': false},
    {'id':8,
    'sides':[1,-1,-1,1],
    'entrance': true}]

empty = {'id':9,
'sides':[0,0,0,0],
'entrance': false}

positions = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]

map = [[empty, empty, empty],[empty, empty, empty],[empty, empty, empty]]

cards = Shuffle(cards)


function getRandomArbitrary(min, max) {
    let difference = max - min;

    // generate random number 
    n = rand()

    // multiply with difference 
    n = Math.floor( n * difference);

    // add with min value 
    n = n + min;

    return n;
}

function randomTile() {
    return [getRandomArbitrary(0, 3), getRandomArbitrary(0, 3)]
}

function validStartPosition(card, position) {
    // horizontal
    hOk = (position[0] == 1) | (position[0] == 0 && card.sides[3] == -1) | (position[0] == 2 && card.sides[1] == -1)
    //vertical
    vOk = (position[1] == 1) | (position[1] == 0 && card.sides[0] == -1) | (position[1] == 2 && card.sides[2] == -1)
    return vOk && hOk
}

function checkCard(card, ends) {
    // 0
    return [0, 1, 2, 3].map(idx => (ends[idx] == card.sides[idx]) | (ends[idx] == 0)).every(e => e > 0 )
}

function suitableCard(position) {
    ends = unlinkedEnds(position);
    possibles = cards.filter(card => checkCard(card, ends))
    return Shuffle(possibles)[0]
}

function unlinkedEnds(position) {
    card = map[position[0]][position[1]]
    if (!card.sides.every(e => e == 0)) {
        unlinked = [0, 0, 0, 0]
    }
    else {
        // top
        if (position[0] > 0) {
            top_ = map[position[0]-1][position[1]].sides[2]
        }
        else {
            top_ = -1
        }
        // right
        if (position[1] < 2) {
            right = map[position[0]][position[1]+1].sides[3]
        }
        else {
            right = -1
        }
        // bottom
        if (position[0] < 2) {
            bottom = map[position[0]+1][position[1]].sides[0]
        }
        else {
            bottom = -1
        }
        // left
        if (position[1] > 0) {
            left = map[position[0]][position[1]-1].sides[1]
        }
        else {
            left = -1
        }
        unlinked = [top_, right, bottom, left]
    }
    return unlinked
}

function buildDungeon() {
    startCard = cards.filter(card => card.entrance)[0]

    startPosition = randomTile()
    while (!validStartPosition(startCard, startPosition)) {
        startPosition = randomTile();
    }
    map[startPosition[0]][startPosition[1]] = startCard;

    unlinked = positions.filter(pos => !unlinkedEnds(pos).every(e => e <= 0));
    placedPositions = []
    daysSinceLastError = 0

    while (unlinked.length > 0) {
        nextPos = Shuffle(unlinked)[0];
        suitable = suitableCard(nextPos);
        if (suitable !== undefined) {
            daysSinceLastError += 1;
            map[nextPos[0]][nextPos[1]] = suitable;
            placedPositions.push(nextPos);
        }
        else {
            badPos = placedPositions.pop()
            map[badPos[0]][badPos[1]] = empty;
            if (daysSinceLastError == 1) {
                badPos = placedPositions.pop()
                map[badPos[0]][badPos[1]] = empty;
            }
            daysSinceLastError = 0;
        }
        unlinked = positions.filter(pos => !unlinkedEnds(pos).every(e => e <= 0));
    }
    map = map.flat();
}



buildDungeon()