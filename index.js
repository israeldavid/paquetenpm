const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const inquirer = require('inquirer');
const clone = require('git-clone');
const cp = require('child_process');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('iRoute', { horizontalLayout: 'full' })
  )
);

export function run() {
  inquirer.prompt({
    name: 'template',
    type: 'input',
    message: 'Ingrese el nombre del template?',
    default: "difareapp",
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Por favor ingresa el nombre de la plantilla.';
      }
    }
  })
    .then(nombrePlantilla => {
      if (fs.existsSync(nombrePlantilla.template)) {
        console.log("Error ya tiene un dicrectorio con ese nombre");
        return true;
      } else {
        fs.mkdirSync(nombrePlantilla.template);
        clone('https://github.com/israeldavid/ionicTemplateCA.git', nombrePlantilla.template);
        console.log("Plantilla Creada");
        let nombredir = nombrePlantilla.template;
        console.log("Espere por favor... Se instalan dependencias");
        process.chdir(`/${nombredir}`);
        cp.execSync(`npm install`);
        console.log("Ingrese al directorio: " + nombrePlantilla.template);
        console.log("ejecute el comando ionic serve");

      }
    })
}


