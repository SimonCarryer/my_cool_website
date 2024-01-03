

async function getFile(url) {
    let blob = await fetch(url).then(r => r.blob());
    return blob.text()
}

async function parseBlob(blob) {
    let parsed = await blob.then(r => jsyaml.load(r))
    return parsed
}

function getData() {
    url = 'https://dl.dropboxusercontent.com/scl/fi/3gcnz87hkukkvlkdcgjz5/townhouse.yml?rlkey=03yuz98j3vo8powai6nuv0mf6&dl=1'
    blob = getFile(url)
    data = parseBlob(blob)
    return data
}

dataPromise = getData()
