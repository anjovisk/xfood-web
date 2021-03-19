var img_feijoada = require('../images/food/feijoada.jpg');
var img_food = require('../images/food/food.jpg');

export const categories = [
    {
      value: 'brasileira',
      name: 'Brasileira'
    },
    {
      value: 'japonesa',
      name: 'Japonesa'
    },
    {
      value: 'massas',
      name: 'Massas'
    },
    {
        value: 'chinesa',
        name: 'Chinesa'
    },
    {
        value: 'chinesa1',
        name: 'Chinesa1'
    },
    {
        value: 'chinesa2',
        name: 'Chinesa2'
    },
    {
        value: 'chinesa3',
        name: 'Chinesa3'
    },
    {
        value: 'chinesa4',
        name: 'Chinesa4'
    },
    {
        value: 'chinesa5',
        name: 'Chinesa5'
    },
    {
        value: 'chinesa6',
        name: 'Chinesa6'
    },
    {
        value: 'chinesa7',
        name: 'Chinesa7'
    }
];

export const foods = [
    {
        id: 1,
        name: "Feijoada",
        image: img_feijoada,
        categories: [{
            value: 'brasileira',
            name: 'Brasileira'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 2,
        image: img_food,
        name: "Temaki",
        categories: [{
            value: 'japonesa',
            name: 'Japonesa'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 3,
        image: img_food,
        name: "Tropeiro",
        categories: [{
            value: 'brasileira',
            name: 'Brasileira'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 4,
        image: img_food,
        name: "Lasanha",
        categories: [{
            value: 'massas',
            name: 'Massas'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 5,
        image: img_food,
        name: "Frango Xadrez",
        categories: [{
            value: 'chinesa',
            name: 'Chinesa'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    }
];

const data = {
    categories,
    pratos: foods
}

export default data;