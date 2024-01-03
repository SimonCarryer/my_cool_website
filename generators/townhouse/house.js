

function getRoomList(nRooms, data, houseClass) {
    var roomList = []
    for (const room of data.common_rooms.concat(houseClass.rooms) ) {
        var n = Math.min(room.max_n || 1, nRooms/3);
        for(let i = 0; i < n; i++){
                roomList.push(room)     
            }
        }
    var uncommon = shuffleArray(data.uncommon_rooms).slice(0, 2)
    return shuffleArray(roomList.concat(uncommon)).slice(0, nRooms)
    }

function getWanderingList(data, houseClass) {
    if (houseClass.type == "npc") {
        var guardList = data.wandering.concat(houseClass.wandering)
    }
    else {
        var guardList = houseClass.wandering
    }
    return guardList
}

function getTreasureList(data, houseClass) {
    var treasureList = data.treasure.concat(houseClass.treasure)
    return treasureList
}

function getStaticList(data, houseClass) {
    if (houseClass.type == "npc") {
    var staticList = data.static.concat(houseClass.static)
    }
    else {
        var staticList = houseClass.static
    }  
    return staticList
}

function getDoorList(data, houseClass) {
    var doorList = data.doors.concat(houseClass.doors || [])
    return doorList
}

function buildRoom(roomType, staticList, treasureList, wanderingList, doorList) {
    var room = {"name": roomType.name,
                "features": []
        }
    if (roomType.tags.includes("locked")) {
            room.features.push(getFromList(doorList))
        }
    if (roomType.tags.includes("static")) {
        room.features.push(getFromList(staticList))
    }
    else if (!roomType.tags.includes("locked")) {
        let wanderer = getFromList(wanderingList);
        room.features.push(wanderer);
        usedWanderingList.push(wanderer)
    }
    if (roomType.tags.includes("treasure")) {
        room.features.push(getFromList(treasureList))
    }
    return room
}

function getHead(houseClass) {
    if (houseClass.type == "npc") {
        var text = `Home of a level ${houseClass.level} ${houseClass.name}`
    }
    else {
        var text = `A house inhabited by a ${houseClass.name}`
    }
    return text
}

function getLevel(houseClass) {
    if (houseClass.type == "npc") {
        var level = getRandomInt(3, 6)
    }
    else {
        var level = houseClass.hit_dice
    }
    return level
}

function getWanderers(houseClass) {
    if (houseClass.type == "npc") {
        usedWanderingList.push(`The owner of the house (Level ${houseClass.level} ${houseClass.name})`)
    }
    else {
        usedWanderingList.push(`The ${houseClass.name} which inhabits the house (${houseClass.level}HD)`)
    }
    return usedWanderingList
}

async function getHouse(dataPromise) {
    let data = await dataPromise.then();
    let houseClass = getFromList(data.classes)
    let level = getLevel(houseClass)
    houseClass.level = level
    var roomList = getRoomList(level, data, houseClass)
    var staticList = getStaticList(data, houseClass)
    var treasureList = getTreasureList(data, houseClass)
    var wanderingList = getWanderingList(data, houseClass)
    var doorList = getDoorList(data, houseClass)
    var rooms = []
    for (const roomType of roomList) {
        rooms.push(buildRoom(roomType, staticList, treasureList, wanderingList, doorList))
    }
    return {"rooms": rooms,
            "head": getHead(houseClass),
            "wandering": getWanderers(houseClass)
            }
    }

window.usedWanderingList = []
housePromise = getHouse(dataPromise)
