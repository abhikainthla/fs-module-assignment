const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'file.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTask(task) {
  fs.appendFileSync(filePath, task + '\n');
}

function viewTask() {
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log(`${data}`);
}

function markAsDone() {
  let lineNum = Number(rl.question("Enter the number of the task you want to complete:\n", (lineNum) => {
    lineNum = Number(lineNum);
    if (isNaN(lineNum)) return;
    lineNum--;
    const data = fs.readFileSync(filePath, 'utf-8');
    const arrData = data.split('\n');
    if (arrData[lineNum]) {
      arrData[lineNum] = 'X -' + arrData[lineNum].slice(2);
      const newData = arrData.join('\n');
      fs.writeFileSync(filePath, newData);
    } else {
      console.log('This task does not exist!');
    }
    rl.close();
  }));
}

rl.on('close', () => {
  console.log("\n\nClosing application...");
  process.exit();
});

rl.question('What would you like to do? \n1. Add a Task.\n2. View all tasks.\n3. Mark a task as done.\n4. Exit Application.\nPlease enter your choice: ', (choice) => {
  switch (choice) {
    case "1":
      rl.question('Please enter your task:\n', (task) => {
        addTask(task);
        viewTask();
        rl.close();
      });
      break;
    case "2":
      viewTask();
      rl.close();
      break;
    case "3":
      markAsDone();
      break;
    case "4":
      rl.close();
      break;
    default:
      console.log("Invalid choice.");
      rl.close();
  }
});

rl.on('SIGINT', () => {
  console.log('\n\nExiting Application...');
  rl.close();
});
