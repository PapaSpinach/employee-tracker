const inquirer = require('inquirer');
const { addDepartmentPrompt, viewAllDepartments } = require('./departments');
const connectToDb = require('./connection');
const { addRolePrompt, viewAllRoles } = require('./roles');
const {
  viewAllEmployees,
  addEmployeePrompt,
  updateEmployeeRolePrompt,
} = require('./employees');

async function start() {
  const db = await connectToDb();

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
      await viewAllDepartments(db);
    } else if (action === 'view_roles') {
      await viewAllRoles(db);
    } else if (action === 'view_employees') {
      await viewAllEmployees(db);
    } else if (action === 'create_department') {
      await addDepartmentPrompt(db);
    } else if (action === 'create_role') {
      await addRolePrompt(db);
    } else if (action === 'create_employee') {
      await addEmployeePrompt(db);
    } else if (action === 'update_employee_role') {
      await updateEmployeeRolePrompt(db);
    } else if (action === 'quit') {
      break;
    }
  }

  console.log('Exiting database');
  await db.end();
}

start();
