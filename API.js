const fs = require ("fs");
const path = require("path");
//const {mdLinks}  = require("./index.js")
//const ruta = process.argv[2]

//const mensaje = (text, color) => chalk.keyword(color)(text);

const existeruta =(ruta) => fs.existsSync(ruta);

const rutaabsoluta =(ruta) => path.isAbsolute(ruta);

const convertirruta =(ruta) => path.resolve(ruta);

const rutadirectorio =(ruta) => fs.statSync(ruta).isDirectory(); //recien me devuele un booleano

const leerdirectorio = (ruta) => fs.readdirSync(ruta);

const leerarchivo = (ruta) => { return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf-8", function (error, archivo) {
   if(error){
     reject(error)
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
const validateLinks = (links) => {
  return Promise.all(links.map((arrayLinks) => { //Promise.all espera que se cumpla todas las promesas//
    //console.log(arrayLinks)
    return fetch(arrayLinks.href) //fetch  hace una peticion al enlace y nos devuelve el status
      .then((resolve) => {
        const objResolve = {
          ...arrayLinks,
          status: resolve.status,
          ok: (resolve.status >= 200) && (resolve.status <= 399) ? "ok" : "fail"
        }
        return objResolve; //retorna promesa resuelta
      })
      .catch(() => {
        return {
          ...arrayLinks,
          status: "archivo roto",
          ok: "fail"
        }
      })
  })
  )
}  

/* const option = { 
  validate: false,
  stats: false
}
if(process.argv[3] === '--validate'){
  option.validate =true
}
mdLinks(ruta, option)
.then((data) => {
  console.log(ruta)
}) */
const estadistica = (links) => {
  const extraerHref = links.map ((elem)=> elem.href);//entro a la promesa y tengo los href  
  const hrefRepetidos = new Set (extraerHref) //elimina links repetidos
  
  return {
    total: extraerHref.length,
    unique: hrefRepetidos.size //new set 
  }
}
const broken = (links) =>{
 const brokenLinks = links.filter((e) => e.ok === "fail");
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
