const inquirer = require('inquirer');

async function addDepartmentPrompt(db) {
  const departmentData = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
    },
  ]);

  await db.execute(`INSERT INTO department (name) VALUES (?)`, [
    departmentData.name,
  ]);

  console.log('Department added!');
}

async function viewAllDepartments(db) {
  const [result] = await db.execute('SELECT * FROM department');
  console.table(result);
}

module.exports = {
  addDepartmentPrompt,
  viewAllDepartments,
};