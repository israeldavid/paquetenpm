const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const fs = require('fs');
const shell = require('shelljs')

clear();

console.log(
  chalk.yellow(
    figlet.textSync('iRoute', { horizontalLayout: 'full' })
  )
);

const inquirer  = require('./lib/inquire');

const run = async () => {
  const nombrePlantilla = await inquirer.askNombreTemplate();
  fs.mkdirSync(nombrePlantilla.template); 
  /* Funciona muy bien con shell solo que la carpeta esta con el nombre del git 
  shell.cd(nombrePlantilla.template);
  shell.exec('git clone https://github.com/israeldavid/ionicTemplateCA.git')
  copiar todos los archivos del template */
  const clone = require('git-clone');
  clone('https://github.com/israeldavid/ionicTemplateCA.git', nombrePlantilla.template);
  console.log("Plantilla Creada");
  console.log("Ingrese al directorio:" + nombrePlantilla.template)
  console.log("y ejecute el comando Ionic Serve");
};

run();