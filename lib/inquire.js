const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askNombreTemplate: () => {
    const questions = [
      {
        name: 'template',
        type: 'input',
        message: 'Ingresa el nombre de la Plantilla:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Por favor ingresa el nombre de la plantilla.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};