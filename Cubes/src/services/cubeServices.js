const { render } = require('express/lib/response')
const fs = require('fs/promises')
const path = require('path')
const cubes = require('../db.json')

exports.save = (cube) => {
    cube.cubeId = makeId(24)
    cubes.push(cube)
    const textData = JSON.stringify(cubes, '', 4)
    return fs.writeFile(path.resolve('src', 'db.json'), textData, { encoding: "utf-8" })
}

exports.getOne = (id) => {
    const cube = cubes.filter(x => x.cubeId == id)

    return cube[0]
}

exports.getAll = (search, from, to) => {
    search = search || "";
    from = Number(from) || 0;
    to = Number(to) || 6;
    const result = cubes.filter(x => x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && Number(x.difficultyLevel) >= from && Number(x.difficultyLevel) <= to)
    
    return result
}



const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}