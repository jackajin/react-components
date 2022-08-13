#!/usr/bin/env node

const { program } = require('commander');
const path = require('path')
const { fork, spawn } = require('child_process');

program.version(require('../package.json').version, '-v, --version')

const build = process.argv[process.argv.length - 1]

const [buildType] = build.split(':')

// const webpackPath = buildType==='dev'?'./config/webpack.dev.js':'./config/webpack.build.js'
const webpackPath = './config/webpack.dev.js'


program.command(build)
       .action(() => {
          fork(path.join(__dirname, webpackPath), {
            stdio: 'inherit',
          });
       })

program.parse(process.argv)

// console.log(build);