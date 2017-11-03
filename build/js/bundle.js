/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _travelCardsApi = __webpack_require__(1);

var _travelCardsApi2 = _interopRequireDefault(_travelCardsApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_travelCardsApi2.default.getCards().then(function (travelCardsArr) {
    var cardsOrder = _travelCardsApi2.default.sortCards(travelCardsArr);
    var description = _travelCardsApi2.default.routeDescription(cardsOrder);
    var descList = document.createElement('ol');
    description.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.innerHTML = item;
        descList.appendChild(listItem);
    });
    document.body.appendChild(descList);

    // Добавляет точки на карту
    ymaps.ready(function () {
        var travelMap = new ymaps.Map("map", {
            center: [53.953806, 14.100662],
            zoom: 4
        });
        _travelCardsApi2.default.addToYaMap(travelMap, cardsOrder);
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _data = __webpack_require__(2);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // Получает данные
    // @return {Promise}
    getCards: function getCards() {
        return Promise.resolve(_data2.default);
    },

    // Сортирует карточки
    // @param {Array} Массив карточек
    // @return {Array} Отсортированный массив карточек
    sortCards: function sortCards(cards) {
        var travelMap = new Map(); // временное хранилище start.id - finish.id
        var cardInd = new Map(); // временное хранилище индексов finish.id - index
        var firstIdx = void 0;
        var sortedCards = [];
        cards.forEach(function (card, index) {
            travelMap.set(card.start.id, card.finish.id);
            cardInd.set(card.finish.id, index);
        });
        // Найти первую карточку
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = travelMap.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var card = _step.value;

                if (!cardInd.has(card)) {
                    firstIdx = card;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        while (sortedCards.length < cards.length) {
            var index = travelMap.get(firstIdx);
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
    cardDescription: function cardDescription(card) {
        var description = '';
        var start = card.start.name;
        var finish = card.finish.name;
        var transport = card.transport;
        var transportName = transport.name;
        var arr = Object.keys(card.transport);

        if (coin()) {
            description = 'From ' + start + ' take ' + transportName + ' to ' + finish + '. ';
        } else {
            description = 'Take ' + transportName + ' from ' + start + ' to ' + finish + '. ';
        }
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i] + ':';
            key = key[0].toUpperCase() + key.substring(1);
            if (arr[i] === "name") {
                continue;
            }
            if (arr[i] === "description") {
                description += transport[arr[i]] + '. ';
            } else {
                description += key + ' ' + transport[arr[i]] + '. ';
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
    routeDescription: function routeDescription(cards) {
        var _this = this;

        return cards.map(function (card) {
            return _this.cardDescription(card);
        });
    },

    // Добавляет точки на карту
    // @param {Object} Карта
    // @param {Array} Массив карточек
    addToYaMap: function addToYaMap(map, cards) {
        if (cards.length > 0) {
            var start = cards[0].start;
            var coords = [start.lat, start.lng];
            var name = 1;
            var description = start.name;
            addPoint(map, coords, name, description);
            for (var i = 0; i < cards.length; i++) {
                var finish = cards[i].finish;
                var _coords = [finish.lat, finish.lng];
                var _name = i + 2;
                var _description = finish.name;
                addPoint(map, _coords, _name, _description);
            }
        }
        //Добавляет точку на карту
        // @param {Object} Карта
        // @param {Array} Коортинаты
        // @param {String} Назание метки
        // @param {String} Всплывающая подсказка
        function addPoint(map) {
            var coordinates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
            var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var hint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            var myGeoObject = new ymaps.GeoObject({
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

            map.geoObjects.add(myGeoObject);
        }
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var travelCardsArr = [];

var card1 = {
    start: {
        id: 1,
        name: "Paveletsky station",
        lat: 55.729812,
        lng: 37.640193
    },
    finish: {
        id: 4,
        name: "Domodedovo Airport",
        lat: 55.439264,
        lng: 37.771460
    },
    transport: {
        name: "Aeroexpress train",
        description: "No seat assignment"
    }
};

var card2 = {
    start: {
        id: 4,
        name: "Domodedovo Airport",
        lat: 55.439264,
        lng: 37.771460
    },
    finish: {
        id: 7,
        name: "Praha Airport",
        lat: 50.103306,
        lng: 14.269824
    },
    transport: {
        name: "flight 12237",
        gate: "2C",
        seat: "14A"
    }
};

var card3 = {
    start: {
        id: 7,
        name: "Praha Airport",
        lat: 50.103306,
        lng: 14.269824
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
        seat: "28C",
        description: "Baggage will be automatically transferred from your last leg"
    }
};

var card4 = {
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
        lng: -6.297054
    },
    transport: {
        name: "Bus 747"
    }
};

var card5 = {
    start: {
        id: 11,
        name: "Dublin Heuston Railway station",
        lat: 53.346057,
        lng: -6.297054
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

var card6 = {
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
        description: "No seat assignment"
    }
};

var card7 = {
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
        description: "Timetables are subject to alteration without notice due to inclement weather conditions and/or other circumstances"
    }
};

// карточки перемешаны
travelCardsArr.push(card4);
travelCardsArr.push(card1);
travelCardsArr.push(card2);
travelCardsArr.push(card6);
travelCardsArr.push(card3);
travelCardsArr.push(card7);
travelCardsArr.push(card5);

exports.default = travelCardsArr;

/***/ })
/******/ ]);