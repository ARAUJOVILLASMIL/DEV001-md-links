const { link } = require("fs");
const path = require("path");
const {
  convertirruta,
  rutaabsoluta,
  existeruta, 
  rutadirectorio,
  leerdirectorio,
  filtrarmd,
  getLinks,
} = require('./API.js')

const {validateLinks} = require ("./md-links.js")

//funcion que nos devulve una ruta 
const buscarruta = (ruta) => {
  if(rutadirectorio(ruta)) {  //en caso de ser directorio se busca un archivo dentro
    const arreglodirectorio = leerdirectorio (paths); //lee el contenido de un directorio
    arregloresult = arreglodirectorio.filter(e => filtrarmd(e) === '.md')
    arregloresult.forEach(File => {
      const resolverabsoluta = path.resolve(paths) 
      const rutafile = path.join(`${resolverabsoluta}/${File}`
      )
})
return  arregloresult
}
return [ruta]

}

const paths  = process.argv[2];
console.log(process.argv[3]) //me devuelve un true argv[3])

const mdLinks = (paths, option) =>  {return new Promise((resolve, reject) => {

if(option.validate===true) { 
  const ruta = buscarruta (paths)
  ruta.forEach (e => {
    getLinks(e)
    .then((link)=> {
      resolve(validateLinks(link))  
    })

  })
}
const ruta = buscarruta (paths)
ruta.forEach (e => {
  getLinks(e)
  .then((link)=> {
    resolve(validateLinks(link))  
  })
})
})
}
module.exports = {
mdLinks 
};