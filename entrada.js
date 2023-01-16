/* //const figlet = require('figlet');
//onst chalk = require('chalk');
//const { mensaje } = require('./api.js');

const linksMensaje = () => chalk.keyword('magenta')(
  figlet.textSync('< md_links >\n', { horizontalLayout: 'full' }),
);

const Entrada = () => {
  console.log (linksMensaje());
  console.log (mensaje('\n.:. Herramienta para validar links de archivos Markdown .:. \n', 'blue'));
  console.log (chalk.blueBright('Comencemos a usar md-links, ver instrucciones de uso: \n'));
  console.log (mensaje('1. Ingresa el comando md-links seguido de la ruta del archivo que deseas analizar. \n', 'red'));
  console.log (mensaje('2. Si deseas validar los links, agrega la opción --validate. \n', 'green'));
  console.log (mensaje('3. Si deseas obtener estadísticas de los links, agrega la opción --stats. \n', 'red'));//
  console.log (mensaje('4. Si deseas obtener estadísticas de los links y validarlos, agrega las opciones --stats y --validate. \n', 'red'));//
  console.log (mensaje('5. Ingrese --help para ver instrucciones de uso. \n', 'green'));
  console.log (mensaje('6. Ingrese --exit para salir \n', 'green'));
  console.log (chalk.blueBright('¡Comencemos con md-links! \n'));
};

module.exports =
 { linksMensaje,
   Entrada }; */