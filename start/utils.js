
module.exports.checkList = (async () =>{
  const inquirer = await import('inquirer'); 
  function checkList() {
    const promptList = [
      {
        type: 'list',
        message: '请选择运行模式：',
        name: 'mode',
        choices: [
          {
            name: '调试',
            value: 'dev',
          },
          {
            name: '打包',
            value: 'build',
          },
        ],
      },
      {
        type: 'list',
        message: '请选择运行环境：',
        name: 'development',
        choices: [
          {
            name: '测试站',
            value: 'DEV',
          },
          {
            name: '预发布',
            value: 'PRE',
          },
          {
            name: '预发布正式站',
            value: 'REL',
          },
          {
            name: '正式站',
            value: 'PRO',
          },
        ],
      },
    ]
    return  inquirer.default.prompt(promptList)
  }
  return checkList()
})()