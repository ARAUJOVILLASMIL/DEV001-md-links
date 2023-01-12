const {mdLinks}  = require("./index.js")
const ruta = process.argv[2]
//console.log(ruta)
const option = { 
    validate: false,
    stats: false
}
if(process.argv[3] === '--validate'){
    option.validate =true
}
mdLinks(ruta, option)
.then((data) => {
    console.log(ruta)
 })
 const estadistica = (links) => {
    links.then(res =>{
    const extraerHref = res.map ((elem)=> elem.href);//entro a la promesa y tengo los href  
    const hrefRepetidos = new set (extraerHref) //elimna links repetidos
    console.log(extraerHref.length(hrefRepetidos.size))
 })
 }

 const broken = (links) =>{
    links.then(res => {
        console.log(res)
        const brokenLinks = res.filter((e) => e.status >= 400);
        console.log(brokenLinks.length)
    })
 } 

module.exports = {
    estadistica,
    broken
};