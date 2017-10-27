import travelCardsArr from './data';
// Получает данные. Возвращает промис
export default function () {
    return Promise.resolve(travelCardsArr);
}