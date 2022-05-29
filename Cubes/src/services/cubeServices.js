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

exports.getOne = (id) =>{
    const cube = cubes.filter(x => x.cubeId == id)
    
    return cube[0]
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