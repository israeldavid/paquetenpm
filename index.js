import { rejects } from 'assert';

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const inquirer  = require('inquirer');
const clone = require('git-clone');
const cp = require('child_process');
var loadingSpinner = require('loading-spinner');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('iRoute', { horizontalLayout: 'full' })
  )
);


async function cargando(name) { 
  if (fs.existsSync(name.template)){

    return reject("Error");
  } else {
    fs.mkdirSync(name.template); 
    process.stdout.write('Directorio Creado \n');
  }
    
}

async function clonarPlantilla(nombreP) {
  return new Promise(resultado =>{
    
      console.log("Clonando...",loadingSpinner.start(100, {
        clearChar: true
      }));
      //clone('https://iRouteSolutions@dev.azure.com/iRouteSolutions/DifareArquitecturaCore/_git/DifareArquitecturaCore', nombreP.template);
      clone('https://github.com/israeldavid/ionicTemplateCA.git', nombreP.template,"",function(err) {
        loadingSpinner.stop();
      if (!err)  {
          console.log("Instalando Dependencias");
          loadingSpinner.start(100, {
            clearChar: true
          });
          instalarDependencias(nombreP).then(res=>{
            loadingSpinner.stop();
          });
        } else {
          console.log("Ha ocurrido un error: ",err);
        }
        });
  });
};

async function instalarDependencias(nombre) {
  return new Promise(resultado =>{
    let nombredir = nombre.template;
    process.chdir(`${nombredir}`);
    cp.execSync(`npm install`);
    process.stdout.write('Todo Listo!!! \n');
  });
}

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
    cargando(nombrePlantilla).then(res => {
      
        clonarPlantilla(nombrePlantilla).then(resu => {
          console.log("Proceso Terminado");
        });
      }
    ).catch((e) =>{
      console.log("directorio ya existe ");
   });
  })
} 