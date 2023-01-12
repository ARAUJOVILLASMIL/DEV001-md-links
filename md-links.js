const fs = require ("fs");
const path = require ("path");

//VERIFICAR SI EXISTE RUTA//
const existeruta = fs.existsSync ("./saludos.txt");
console.log("./saludos.txt",existeruta);

//PRUEBA DE QUE EXISTE RUTA 2 
const existeruta2 = fs.existsSync ("./adriana.md");
console.log("./adriana.md",existeruta2)

//VERIFICAR SI LA RUTA ES ABSOLUTA 
const rutaabsoluta = path.isAbsolute("./saludos.txt");
console.log(rutaabsoluta);

//CONVERTIR EN ABSOLUTA
const convertirruta = path.resolve("./saludos.txt");
console.log(convertirruta); 

//VERIFICAR SI LA RUTA ES UN DIRECTORIO
const rutadirectorio = fs.statSync("../adriana-md").isDirectory();
console.log(rutadirectorio);

//RECORRER DIRECTORIO RECURSIVAMENTE
const recorredirectorioarchivo =(ruta) => {
  let arregloresult = [];
  const rutadirectorio = fs.statSync(ruta).isDirectory();
  console.log(rutadirectorio)
  if(rutadirectorio) {  //en caso de ser directorio se busca un archivo dentro
  const arreglodirectorio = fs.readdirSync(ruta); //lee el contenido de un directorio
  arreglodirectorio.forEach((File) => {
    //console.log(File)
  
  // OBTENER EXTENSION DE RUTA DE ARCHIVO 
  if(path.extname(File)===".md"){
    arregloresult.push(File);
    //console.log(arregloresult)
  } 

  })
  }
 else{
  return ruta
 }
 return arregloresult;
 }
  recorredirectorioarchivo("README.md");
 
// LEER ARCHIVO  MD
const leerarchivo = (ruta) => { return new Promise((resolve, reject) => {
   fs.readFile(ruta, "utf-8", function (error, archivo) {
  if(error){
    reject(error)
  }
  resolve(archivo)
})
})
}
leerarchivo ("../adriana-md/texto.md")
.then((res) => { //se cumple promesa y se lee el archivo
  //console.log(res)
})

 //... FUNCION PARA LEER LOS LINKS MD.... EXPRE.REGULARES
 const getLinks = (route) => new Promise((resolve, reject) => {
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

//FUNCION PARA VALIDAR LNK CON PETICIONES HTTP
const validateLinks = (links) => {
  return Promise.all(links.map((arrayLinks) => { //Promise.all espera que se cumpla todas las promesas//
    console.log(arrayLinks)
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
const estadistica = (urls) => { 
  const unique = new Set (urls.map(element => element.href)).size;
   const totalLinks = `\nTotal: ${urls.length},\nUnique: ${unique}` 
  return totalLinks;
  };

  const brokenLinks =(urls) => {
    const rotos = urls.filter((elem) => elem.ok !== 'ok').length
    const brokenLinks = `${estadistica(urls)}\nBroken: ${rotos}\n`;
    return brokenLinks
  } 
const array = [
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'home/Documents/DEV001-md-links/test/test.md',
  },
];

getLinks("README.md")
.then((data) =>{
  validateLinks(data).then((res)=>{
    console.log(brokenLinks(res))
  })
  })

  const status = (links)=> { 
    const total = links.length;
    const url = links.map((e)=>e.url)
    const unique = new Set(url).size
    const  status = links.filter((e)=>e.ok != 'ok')    
    const broken = new Set(status).size
    return  [ total , unique, broken]
}

// se importa a cli
//Muestra los links unicos que existen
const unique = (objeto) => {
  const unique = new Set(objeto.map(element => element.href)); // array
  const uniqueLinks = `\nUnique: ${unique.size}\n`;
  return uniqueLinks;
};

// links rotos
const broken = (objeto) => { 
  const broken = objeto.filter((element) => element.status >= 400) // array de objetos, nuevo array
  const brokenLinks =`\nBroken: ${broken.length}\n`;
  return brokenLinks;
};

module.exports = {
  validateLinks,
  estadistica,
  unique,
  broken,
  status,
  brokenLinks,
}
