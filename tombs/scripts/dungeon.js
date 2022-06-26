

empty = {
'name': 'Nothing',
'id':0,
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
    // vertical
    hOk = (position[0] == 1) | (position[0] == 0 && card.sides[0] == -1) | (position[0] == 2 && card.sides[2] == -1)
    // horizontal
    vOk = (position[1] == 1) | (position[1] == 0 && card.sides[3] == -1) | (position[1] == 2 && card.sides[1] == -1)
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
    var unlinked
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
    var startCard = cards.filter(card => card.entrance)[0]
    const startPositions = [...Shuffle(positions)];
    var startPosition = startPositions.pop();
    while (!validStartPosition(startCard, startPosition)) {
        startPosition = startPositions.pop();
    }
    map[startPosition[0]][startPosition[1]] = {...startCard};
    var unlinked = positions.filter(pos => !unlinkedEnds(pos).every(e => e <= 0));
    var placedPositions = []
    var daysSinceLastError = 0
    while (unlinked.length > 0) {
        nextPos = Shuffle(unlinked)[0];
        suitable = suitableCard(nextPos);
        if (suitable !== undefined) {
            daysSinceLastError += 1;
            map[nextPos[0]][nextPos[1]] = {...suitable}; // here's where a copy of the card gets added
            placedPositions.push(nextPos);
        }
        else {
            badPos = placedPositions.pop()
            map[badPos[0]][badPos[1]] = {...empty};
            if (daysSinceLastError == 1) {
                badPos = placedPositions.pop()
                map[badPos[0]][badPos[1]] = {...empty};
            }
            daysSinceLastError = 0;
        }
        unlinked = positions.filter(pos => !unlinkedEnds(pos).every(e => e <= 0));
    }
}

function addLinks() {
    positions.forEach(function(position) {
        card = map[position[0]][position[1]];
        card.pos = position.join();
        card.neighbours = [];
        // top
        if (card.sides[0] > 0) {
            neighbour = map[position[0]-1][position[1]];
            card.neighbours.push(neighbour);
        }
        // right
        if (card.sides[1] > 0) {
            neighbour = map[position[0]][position[1]+1];
            card.neighbours.push(neighbour);
        }
        // bottom
        if (card.sides[2] > 0) {
            neighbour = map[position[0]+1][position[1]];
            card.neighbours.push(neighbour);
        }
        // left
        if (card.sides[3] > 0) {
            neighbour = map[position[0]][position[1]-1];
            card.neighbours.push(neighbour);
        }
    }
        )
}

function entryPath(card, path) {
    var newPath = [...path];
    newPath.push(card.pos);
    if (card.entrance) {
        paths.push(newPath);
    }
    else {
        card.neighbours.forEach(function(neighbour) {
            if (!newPath.includes(neighbour.pos)) {
                entryPath(neighbour, newPath);
            }
        });
}
}

function distances() {
    positions.forEach(position => {
        card = map[position[0]][position[1]];
        paths = [];
        entryPath(card, []);
        distance = Math.min(...paths.map(p => p.length));
        card.distance = distance;
    });
}

buildDungeon()
addLinks()
distances()
