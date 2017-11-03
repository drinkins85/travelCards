# Travel Cards

## [DEMO](http://this.drinkins.com/travelCards/)

### Формат карточки
```
    start: {
        id: 1, // *ID пункта
        name: "Paveletsky station", // *Название
        lat: 55.729812, // В качестве примера расширяемости добавлены координаты
        lng: 37.640193
    },
    finish: {
        id:4, // *ID пункта
        name: "Domodedovo Airport", // *Название
        lat: 55.439264,
        lng: 37.771460
    },
    transport: {
        name: "Aeroexpress train",  // *Название
        description: "No seat assignment" 
        // Может содержать любое количество полей ключ: значение
    }
```

### Методы API

### `getCards()`

Получает массив карточек, возвращает промис.
```
travelCardsApi.getCards()
    .then(travelCardsArr => console.log(travelCardsArr))
```


### `sortCards(cardsArray)`

Принимает несортированный массив карточек, возвращает отсортированный массив карточек.

```
let sortedCards = travelCardsApi.sortCards(unsortedCards);
```

### `routeDescription(cardsArray)`

Принимает массив карточек, возвращает словесное описание маршрута в виде массива строк

```
let routeDescription = travelCardsApi.routeDescription(sortedCards);
```

### `addToYaMap(map,cardsArray)`

Добавляет точки на карту. Принимает карту и массив карточек.

```
ymaps.ready(function () {
            let travelMap = new ymaps.Map("map", {
                center: [53.953806, 14.100662],
                zoom: 4
            });
            travelCardsApi.addToYaMap(travelMap, sortedCardssortedCards);
        });
``` 


