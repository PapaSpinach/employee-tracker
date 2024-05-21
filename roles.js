const inquirer = require('inquirer');

async function addRolePrompt(db) {
  const [departments] = await db.query('select * from department');

  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'What is the salary?',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'What department does the role belong to?',
      choices: departments.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      }),
    },
  ]);

  await db.execute(
    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    [title, salary, department_id]
  );
}

async function viewAllRoles(db) {
  const [results] = await db.query(`
select role.id as id, title, salary, department.name as department_name
from role
join department
on role.department_id = department.id
`);

  console.table(results);
}

module.exports = {
  addRolePrompt,
  viewAllRoles,
};