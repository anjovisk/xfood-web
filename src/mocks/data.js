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
    }
];

export const foods = [
    {
        id: 1,
        name: "Feijoada",
        categories: [{
            value: 'brasileira',
            name: 'Brasileira'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 2,
        name: "Temaki",
        categories: [{
            value: 'japonesa',
            name: 'Japonesa'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 3,
        name: "Tropeiro",
        categories: [{
            value: 'brasileira',
            name: 'Brasileira'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 4,
        name: "Lasanha",
        categories: [{
            value: 'massas',
            name: 'Massas'
        }],
        description: "flaj da f d aldfjlajf jaljdfljad fa dfajlsjdflakjdslfa sfjalsd fasjlfajs dfa dlfja fd aldj fla dlfa lsdf"
    },
    {
        id: 5,
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