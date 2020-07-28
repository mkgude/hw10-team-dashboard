const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./Develop/lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
let teamArray = [];

function promptUser() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What is your team role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (reply) {
      // for manager
      if (reply.role === "Manager") {
        inquirer
          .prompt([
            { type: "input", message: "What is your name?", name: "name" },
            { type: "input", message: "What is your email?", name: "email" },
            {
              type: "input",
              message: "What is your company id?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your office number?",
              name: "officeNumber",
            },
          ])
          .then(function (managerReply) {
            let newManager = new Manager(
              managerReply.name,
              managerReply.id,
              managerReply.email,
              managerReply.officeNumber
            );
            teamArray.push(newManager);
            newTeamMember();
          });
      } // for engineer
      else if (reply.role === "Engineer") {
        inquirer
          .prompt([
            { type: "input", message: "What is your name?", name: "name" },
            { type: "input", message: "What is your email?", name: "email" },
            {
              type: "input",
              message: "What is your company id?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your github name?",
              name: "github",
            },
          ])
          .then(function (engineerReply) {
            let newEngineer = new Engineer(
              engineerReply.name,
              engineerReply.id,
              engineerReply.email,
              engineerReply.github
            );
            teamArray.push(newEngineer);
            newTeamMember();
          });
      } // for intern
      else if (reply.role === "Intern") {
        inquirer
          .prompt([
            { type: "input", message: "What is your name?", name: "name" },
            { type: "input", message: "What is your email?", name: "email" },
            {
              type: "input",
              message: "What is your company id?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your school name?",
              name: "school",
            },
          ])
          .then(function (internReply) {
            let newIntern = new Intern(
              internReply.name,
              internReply.id,
              internReply.email,
              internReply.school
            );
            teamArray.push(newIntern);
            newTeamMember();
          });
      }
    });
}
promptUser();

function newTeamMember() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Do you want to add more team members?",
        name: "continue",
      },
    ])
    .then(function (userConfirm) {
      if (userConfirm.continue === true) {
        promptUser();
      } else {
        console.log(teamArray);
        init();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

async function init() {
  try {
    let html = render(teamArray);
    console.log(html);
    await writeFileAsync(outputPath, html);
  } catch (err) {
    console.log(err);
  }
}
