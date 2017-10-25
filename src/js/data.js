
const travelCardsArr = [];

let card1 = {
    start: {
        id: 1,
        name: "Paveletsky station",
        lat: 55.729812,
        lng: 37.640193
    },
    finish: {
        id:4,
        name: "Domodedovo Airport",
        lat: 55.439264,
        lng: 37.771460
    },
    transport: {
        name: "Aeroexpress train",
        seat: false
    }
};

let card2 = {
    start: {
        id: 4,
        name: "Domodedovo Airport",
        lat: 55.439264,
        lng: 37.771460
    },
    finish: {
        id: 2,
        name: "Dublin Airport",
        lat: 53.425552,
        lng: -6.238480
    },
    transport: {
        name: "flight 18777D",
        gate: "1A",
        seat: "28C"
    }
};

let card3 = {
    start: {
        id: 2,
        name: "Dublin Airport",
        lat: 53.425552,
        lng: -6.238480
    },
    finish: {
        id: 11,
        name: "Dublin Heuston Railway station",
        lat: 53.346057,
        lng:  -6.297054
    },
    transport: {
        name: "Bus 747",
    }
};

let card4 = {
    start: {
        id: 11,
        name: "Dublin Heuston Railway station",
        lat: 53.346057,
        lng:  -6.297054
    },
    finish: {
        id: 6,
        name: "Galway Train Station",
        lat: 53.273363,
        lng: -9.046710
    },
    transport: {
        name: "Train",
        seat: "22B",
        platform: "C"
    }
};

let card5 = {
    start: {
        id: 6,
        name: "Galway Train Station",
        lat: 53.273363,
        lng: -9.046710
    },
    finish: {
        id: 10,
        name: "Rossaveel Ferry",
        lat: 53.269024,
        lng: -9.553076
    },
    transport: {
        name: "Bus 424",
        seat: false
    }
};

let card6 = {
    start: {
        id: 10,
        name: "Rossaveel Ferry",
        lat: 53.269024,
        lng: -9.553076
    },
    finish: {
        id: 15,
        name: "Inishmaan",
        lat: 53.098512,
        lng: -9.579704
    },
    transport: {
        name: "Ferry",
        seat: false
    }
};

// карточки перемешаны
travelCardsArr.push(card4);
travelCardsArr.push(card1);
travelCardsArr.push(card2);
travelCardsArr.push(card6);
travelCardsArr.push(card3);
travelCardsArr.push(card5);


export default travelCardsArr;