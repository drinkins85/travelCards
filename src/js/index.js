import travelCardsApi  from './travelCardsApi';

travelCardsApi.getCards()
    .then(travelCardsArr => {
        let cardsOrder = travelCardsApi.sortCards(travelCardsArr);
        let description = travelCardsApi.routeDescription(cardsOrder);
        let descList = document.createElement('ol');
        description.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerHTML = item;
            descList.appendChild(listItem);
        });
        document.body.appendChild(descList);

        // Добавляет точки на карту
        ymaps.ready(function () {
            let travelMap = new ymaps.Map("map", {
                center: [53.953806, 14.100662],
                zoom: 4
            });
            travelCardsApi.addToYaMap(travelMap, cardsOrder);
        });

    });


