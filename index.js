const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const inquirer  = require('inquirer');
const clone = require('git-clone');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('iRoute', { horizontalLayout: 'full' })
  )
);

export function run() {
  inquirer.prompt({
    name:'template',
    type:'input',
    message:'Ingrese el nombre del template?',
    default:"difareapp",
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Por favor ingresa el nombre de la plantilla.';
      }
    }
  })
  .then(nombrePlantilla => {
    fs.mkdirSync(nombrePlantilla.template); 
    clone('https://github.com/israeldavid/ionicTemplateCA.git', nombrePlantilla.template);
  console.log("Plantilla Creada");
  console.log("Ingrese al directorio:" + nombrePlantilla.template)
  console.log("y ejecute el comando Ionic Serve");
  })
} 


