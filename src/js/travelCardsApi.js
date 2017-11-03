import travelCardsArr from './data';

export default {
    // Получает данные. Возвращает промис
    getCards: function () {
        return Promise.resolve(travelCardsArr);
    },

    // Сортирует карточки
    // @param {Array} Массив карточек
    // @return {Array} Отсортированный массив карточек
    sortCards: function (cards) {
        let travelMap = new Map(); // временное хранилище start.id - finish.id
        let cardInd = new Map(); // временное хранилище индексов finish.id - index
        let firstIdx;
        let sortedCards = [];
        cards.forEach(function (card, index) {
            travelMap.set(card.start.id, card.finish.id);
            cardInd.set(card.finish.id, index);
        });
        // Найти первую карточку
        for (let card of travelMap.keys()){
            if(!cardInd.has(card)){
                firstIdx = card;
            }
        }
        console.log(firstIdx);
        while (sortedCards.length < cards.length){
            let index = travelMap.get(firstIdx);
            sortedCards.push(cards[cardInd.get(index)]);
            firstIdx = index;
        }
        travelMap.clear();
        cardInd.clear();
        return sortedCards;
    },

    // Возвращает словесное описание карточки
    // @param {Object} Карточка
    // @return {String} Словесное описание маршрута
    cardDescription: function (card) {
        let description = '';
        let start = card.start.name;
        let finish = card.finish.name;
        let transport = card.transport;
        let transportName = transport.name;
        let arr = Object.keys(card.transport);

        if (coin()){
            description = `From ${start} take ${transportName} to ${finish}. `;
        } else {
            description = `Take ${transportName} from ${start} to ${finish}. `;
        }
        for(let i=0; i<arr.length; i++){
            let key = arr[i]+ ':';
            key = key[0].toUpperCase() + key.substring(1);
            if (arr[i] === "name"){
                continue;
            }
            if (arr[i] === "description"){
                description += `${transport[arr[i]]}. `;
            } else {
                description += `${key} ${transport[arr[i]]}. `;
            }

        }
        return description;

        // Монетка
        // @return {Boolean}
        function coin() {
            return Math.random() > 0.5;
        }

        // @param {string}
        // @return {string}
        function capitalize(str) {
            return str[0].toUpperCase() + str.substring(1);
        }

    },

    // Возвращает словесное описание маршрута
    // @param {Array} Массив карточек
    // @return {Array} Словесное описание маршрута
    routeDescription: function (cards) {
        return cards.map(card => this.cardDescription(card));
    },

    // Добавляет точки на карту
    // @param {Object} Карта
    // @param {Array} Массив карточек
    addToYaMap: function (map, cards) {
        if (cards.length > 0){
            let start = cards[0].start;
            let coords = [start.lat, start.lng];
            let name = 1;
            let description = start.name;
            addPoint(map, coords, name, description);
            for (let i=0; i<cards.length; i++){
                let finish = cards[i].finish;
                let coords = [finish.lat, finish.lng];
                let name = i+2;
                let description = finish.name;
                addPoint(map, coords, name, description);
            }
        }
        //Добавляет точку на карту
        // @param {Object} Карта
        // @param {Array} Коортинаты
        // @param {String} Назание метки
        // @param {String} Всплывающая подсказка
        function addPoint(map,coordinates = [0,0], name = '', hint = '') {
            let myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                properties: {
                    iconContent: name,
                    hintContent: hint
                }
            }, {
                preset: 'islands#blackStretchyIcon',
                draggable: false
            });

            map.geoObjects
                .add(myGeoObject);
        }
    }
}
