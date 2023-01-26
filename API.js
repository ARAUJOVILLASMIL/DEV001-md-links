const fs = require ("fs");
const path = require("path");

const existeruta =(ruta) => fs.existsSync(ruta);

const rutaabsoluta =(ruta) => path.isAbsolute(ruta);

const convertirruta =(ruta) => path.resolve(ruta);

const rutadirectorio =(ruta) => fs.statSync(ruta).isDirectory(); //recien me devuele un booleano

const leerdirectorio = (ruta) => fs.readdirSync(ruta);

const leerarchivo = (ruta) => { return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf-8", function (error, archivo) {
   if(error){
     reject('lo siento ocurrio un Error')
   }
   resolve(archivo)
 })
 })
 }

const filtrarmd = (ruta) => path.extname(ruta)
const getLinks = (route) => { return new Promise((resolve, reject) => {
    const links = [];
    leerarchivo(route)
      .then((data) => {
        const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
        let match = regex.exec(data);
        while (match !== null) {
          links.push({
            href: match[2],
            text: match[1],
            file: route,
          });
          match = regex.exec(data);
        }
        resolve(links);
      })
      .catch((error) => reject(error));
    
  });
}
//FUNCION PARA VALIDAR LNK CON PETICIONES HTTP
const validateLinks = (urls) => Promise.all(urls.map((arrayLinks) => fetch(arrayLinks.href) //Promise.all devuelve un array de promesa resuelta y se corta al primer reajet
  .then((resolve) => {
    const objResolve = {
      ...arrayLinks,
      status: resolve.status,
      ok: resolve.ok ? 'ok' : 'fail',
    };
    return objResolve;
  })
  .catch(() => ({
    ...arrayLinks,
    status: 'archivo roto',
    ok: 'fail',
  }))));

const estadistica = (links) => {
  const extraerHref = links.map ((elem)=> elem.href);//entro a la promesa y tengo los href  
  const hrefRepetidos = new Set (extraerHref) //elimina links repetidos
  
  return {
    total: extraerHref.length,
    unique: hrefRepetidos.size //new set 
  }
}
const broken = (links) =>{
  console.log(links.length)
 const brokenLinks = links.filter((e) => e.ok === "fail");
 console.log(brokenLinks)
   return{
    
    total:  estadistica(links).total, 
    unique: estadistica (links).unique,
    broken: brokenLinks.length
   }
  }

module.exports = {
    rutadirectorio, 
    convertirruta,
    rutaabsoluta,
    existeruta,
    leerdirectorio,
    filtrarmd,
    getLinks,
    validateLinks,
    leerarchivo,
    estadistica,
    broken,
}
