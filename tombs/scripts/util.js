function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

rand = Math.random //mulberry32(0)

function Shuffle(array) {
    const shuffled = array.sort(() => 0.5 - rand());
    return shuffled;
}

function d6() {
    return Math.floor(rand() * 6) + 1;
}

function rollOver(target) {
    return d6() > target;
};

function entryPath(card, path) {
    var newPath = [...path];
    newPath.push(card);
    if (card.entrance) {
        paths.push(newPath);
    }
    else {
        card.neighbours.forEach(function(neighbour) {
            if (!newPath.includes(neighbour)) {
                entryPath(neighbour, newPath);
            }
        });
}
}
