import getTravelCardsArr from './getData';

getTravelCardsArr()
    .then(function(travelCardsArr) {
        let cardsOrder = sortCards(travelCardsArr);
        //console.log(cardsOrder);

        console.log(routeDescription(travelCardsArr[0]));

    });


function sortCards(cards) {
    let travelMap = new Map();
    let cardInd = new Map();
    let firstIdx;
    let sortedIndexses = [];
    cards.forEach(function (card, index) {
       // console.log(card.start.name, " -> ", card.finish.name);
        travelMap.set(card.start.id, card.finish.id);
        cardInd.set(card.finish.id, index);
    });
    // Найти первую карточку
    for (let card of travelMap.keys()){
        if(!cardInd.has(card)){
            firstIdx = card;
        }
    }
    while (sortedIndexses.length < cards.length){
        let index = travelMap.get(firstIdx);
        sortedIndexses.push(cardInd.get(index));
        firstIdx = index;
    }
    return sortedIndexses;
}


function routeDescription(card) {
    let description = '';
    let arr = Object.keys(card.transport);

    let fin = '';
    fin = card.finish.name;

    if (coin()){
        description += 'From ' + card.start.name + ' ';
        description += 'take ' + card.transport.name + ' ';
        description += 'to ' + fin + '. ';
    } else {
        description += 'Take ' + card.transport.name + ' ';
        description += 'from ' + card.start.name + ' ';
        description += 'to ' + fin + '. ';
    }


    function coin() {
        return Math.random() > 0.5;
    }


    for(let i=0; i<arr.length; i++){
        // default
        let key = arr[i]+ ': ';
        key = key[0].toUpperCase() + key.substring(1);
        if (arr[i] === "name"){
            continue;
        }
        if (arr[i] === "description"){
            key = '';
        }
        description += key +  ' ' + card.transport[arr[i]] + '. ';
    }
    return description;
}




