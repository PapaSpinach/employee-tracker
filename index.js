const inquirer = require('inquirer');

async function start() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
          {
            name: 'View all departments',
            value: 'view_departments',
          },
          {
            name: 'View all roles',
            value: 'view_roles',
          },
          {
            name: 'View all employees',
            value: 'view_employees',
          },
          {
            name: 'Create a department',
            value: 'create_department',
          },
          {
            name: 'Create a role',
            value: 'create_role',
          },
          {
            name: 'Create an employee',
            value: 'create_employee',
          },
          {
            name: 'Update employee role',
            value: 'update_employee_role',
          },
          {
            name: 'Quit',
            value: 'quit',
          },
        ],
      },
    ]);

    if (action === 'view_departments') {
    } else if (action === 'view_roles') {
    } else if (action === 'view_employees') {
    } else if (action === 'create_department') {
    } else if (action === 'create_role') {
    } else if (action === 'create_employee') {
    } else if (action === 'update_employee_role') {
    } else if (action === 'quit') {
      break;
    }
  }

  console.log('Exiting database');
}

start();
