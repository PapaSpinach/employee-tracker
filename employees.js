const inquirer = require('inquirer');

async function addEmployeePrompt(db) {
  const [roles] = await db.query('select id, title from role');
  const [employees] = await db.query(
    'select id, first_name, last_name from employee'
  );

  const managerOptions = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  managerOptions.push({
    name: 'No one',
    value: null,
  });

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name?",
    },
    {
      type: 'list',
      name: 'role_id',
      message: "What is the employee's role?",
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Who is the employee's manager?",
      choices: managerOptions,
    },
  ]);

  await db.execute(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [first_name, last_name, role_id, manager_id]
  );
}

async function viewAllEmployees(db) {
  const [results] = await db.query(`
select employee.id as id, employee.first_name as first_name,
employee.last_name as last_name, role.title as job_title,
department.name as department_name, role.salary as salary,
manager.first_name as manager_first_name,
manager.last_name as manager_last_name
from employee
join role
on employee.role_id = role.id
join department
on role.department_id = department.id
left join employee as manager
on employee.manager_id = manager.id
`);

  console.table(results);
}

async function updateEmployeeRolePrompt(db) {
  const [employees] = await db.query(
    'select id, first_name, last_name from employee'
  );

  const [roles] = await db.query('select id, title from role');

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Which employee would you like to update?',
      choices: employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      }),
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Which role would you like assign them to?',
      choices: roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      }),
    },
  ]);

  await db.execute(`UPDATE employee SET role_id = ? WHERE id = ?`, [
    role_id,
    employee_id,
  ]);
}

module.exports = {
  addEmployeePrompt,
  viewAllEmployees,
  updateEmployeeRolePrompt,
};
