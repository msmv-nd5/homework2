const fs = require('fs');
const Pokemon = require('./pokemon');
const PokemonList = require('./pokemonList');


const randomInteger = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}


/*
В задании не указано, возвращаем список покемонов с именами соответсвующих папок или без. Возвращаем без них.
Функция асинхронна, поэтому принимает кроме основных параметров еще колбэк.
*/
const hide = (path, pokemonList, cb) => {
    // "Покемоны должны быть выбраны из списка случайным образом"
    pokemonList.sort(() => Math.random() - 0.5);

    // "Не более 3"
    pokemonList.splice(2, pokemonList.length - 3);

    //Массив [номер папки - покемон]. Каждому покемону присваиваем случайный номер с проверкой на повтор случайного значения.
    var pockemonsForHide = [];
    pokemonList.forEach((pockemon) => {
        let rand = randomInteger(1, 10);
        while (pockemonsForHide[rand] instanceof Pokemon) {
            rand = randomInteger(1, 10);
        }
        pockemonsForHide[rand] = pockemon;
    })

    // В counter будем считать кол-во спрятанных покемонов. Как только оно станет равно длине массива pockemonsForHide, работа завершена.
    var counter = 0;
    for (let i = 1; i <= 10; i++) {
        let realPath = (i == 10) ? path + i : path + '0' + i;
        fs.mkdir(realPath, err => {
            if (err) {
                throw (err);
            }
            //console.log(`Папка ${realPath} создана`);
            if (pockemonsForHide[i] instanceof Pokemon) {
                let data = pockemonsForHide[i].getName + '|' + pockemonsForHide[i].getLevel;
                fs.writeFile(realPath + '/pockemon.txt', data, err => {
                    //console.log(`Покемон ${data} спрятан в папке ${realPath}`);
                    counter++;
                    if (counter == pokemonList.length) {
                        cb(pokemonList);
                    }
                });
            }

        });
    }
}


const seek = (path, cb) => {
    const pokemonList = new PokemonList();
    var counter = 0;
    for (let i = 1; i <= 10; i++) {
        let realPath = (i == 10) ? path + i : path + '0' + i;
        fs.readFile(realPath + '/pockemon.txt', 'utf8', (err, data) => {
            if (!err) {
                let pokemonArray = data.split("|");
                pokemonList.add(pokemonArray[0], pokemonArray[1]);
            }
            counter++;
            if (counter == 10) {
                cb(pokemonList);
            }
        });



    }
}


module.exports = {
    hide,
    seek
}