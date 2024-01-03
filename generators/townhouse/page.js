
function addRooms(elem, rooms) {
    for (const room of rooms) {
        var roomDiv = document.createElement("div");
        roomDiv.innerHTML = `<h2>${room.name}</h2>`;
        l = document.createElement("ul")
        for (const feature of room.features) {
            li = document.createElement("li")
            li.innerHTML = feature
            l.appendChild(li)
        }
        roomDiv.appendChild(l)
        roomDiv.class = "room"
        elem.appendChild(roomDiv)
    }
}

async function buildRooms(housePromise) {
    rooms = await housePromise.then(h => h.rooms)

    var elem = document.getElementById("roomContainer1")
    const idx = Math.floor(rooms.length/2)
    addRooms(elem, rooms.slice(0, idx))
    var elem = document.getElementById("roomContainer2")
    addRooms(elem, rooms.slice(idx, rooms.length))
}

async function buildHead(housePromise) {
    head = await housePromise.then(h => h.head)
    elem = document.getElementById("headContainer")
    elem.innerHTML = `<h1>${head}<h1>`
}

async function buildWanderers(housePromise) {
    wandering = await housePromise.then(h => h.wandering)
    let uniqueWandering = [...new Set(wandering)]
    elem = document.getElementById("wandererContainer")
    elem.innerHTML = "<h2>Random encounters</h2>"
    l = document.createElement("ol")
    for (const wanderer of uniqueWandering) {
        var li = document.createElement("li")
        li.innerHTML = wanderer
        l.appendChild(li)
    }
    elem.appendChild(l)
}

buildRooms(housePromise)
buildHead(housePromise) 
buildWanderers(housePromise)