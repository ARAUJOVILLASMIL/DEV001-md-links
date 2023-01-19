#!/usr/bin/env node

const { mdLinks }  = require("./index.js");

const { mensaje } = require("./API.js");
  const path = process.argv[2];
  console.log(path)
const options = process.argv.slice(3); //option es un arreglo nos trae el texto --validate
const optionsprueba = {
  stats : false,
  validate : false,
}

console.log(options)
const option = options.join(' ');
console.log(option)
 if (options.length === 0) {
    mdLinks(path, { validate: false }) 
    .then(res => console.log(res))
}   else if (options.length >= 1) {
  switch (option) {
    case '--stats --validate':
      mdLinks(path, { stats: true, validate: true })
      .then(res => {
        console.log (`total: ${res.total} \nunique: ${res.unique} \nbroken: ${res.broken} `)
      }) 
      break;
    case '--validate':
      mdLinks(path, { validate: true }) // md links es una promesa y la consumimos
      .then(res => console.log(res))

      break;
    case '--stats': //cuando el usuario de stats espera las stadistica
     mdLinks(path, { stats: true })
     .then(res => console.log (`total: ${res.total} \nunique:${res.unique} `)) 
         
      break;
    default:
      console.log(mensaje('no es válida'));
  } 
} 
