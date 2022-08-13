const {checkList} = require('./utils')
const { spawn } = require("cross-spawn");

checkList.then((options) => {
  const { mode, development } = options;
  spawn('node',['./start/script.js', `${mode}:${development}`], {
    stdio: "inherit",
    cwd: process.cwd(),
  })
  console.log(options);
})