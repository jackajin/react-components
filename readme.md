
### 最新版本Inquirer改用了esm模块，而不是common.js

`
  import inquirer from 'inquirer';
`

node js 在运行esm模块导入的需要在package.json 文件中加: "type": "module",
https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html