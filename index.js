//const { link } = require("fs");
const path = require("path");
const {
  convertirruta,
  rutaabsoluta,
  existeruta, 
  rutadirectorio,
  leerdirectorio,
  filtrarmd,
  getLinks,
  validateLinks,
  estadistica,
  broken,
} = require('./API.js')


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

const mdLinks = (paths, option) =>  {return new Promise((resolve, reject) => {  //retorna una promesa que se consume en cli

  if(option.stats===true && option.validate===true){
    const ruta = buscarruta (paths)
    ruta.forEach (e => {
      getLinks(e)
      .then((link)=> {
     validateLinks(link)
     .then(res => resolve(broken(res)))
      })
  
    }) 
    return 
  }
  if(option.validate===false) { 
    const ruta = buscarruta (paths)
    ruta.forEach (e => {
      resolve(getLinks(e))
      
    })
  }
if(option.validate===true) { 
  const ruta = buscarruta (paths)
  ruta.forEach (e => {
    getLinks(e)
    .then((link)=> {
      resolve(validateLinks(link))  
    })

  })
  return
}
if(option.stats === true){
  const ruta = buscarruta (paths)
  ruta.forEach (e => {
    getLinks(e)
    .then((links)=> { //areglos de objetos con link y esto lo necesita estadistica
      resolve(estadistica(links))  //lo recibe 
    })
  })
  return 
}
})
}
module.exports = {
mdLinks 
};