const { parse, traverse, types: t } = require('@babel/core');
const generate = require('@babel/generator').default;
const { join } = require('path');
const processCwd = process.cwd();

// 环境变量替换
const envTransform = (path, env) => {
  const { name } = path.node;
  if (!Object.hasOwnProperty.call(env, name)) {
    return;
  }

  // 如果是对象表达式 const a = { [ENV_DEVELOPMENT]: ENV_DEVELOPMENT }
  if (path.parentPath.type === 'ObjectProperty') {
    // 替换 key
    const keyName = path.parentPath.node.key.name;
    if (path.parentPath.node.computed === true) {
      if (typeof env[keyName] === 'boolean') {
        path.parentPath.node.key = t.booleanLiteral(env[keyName]);
      }
      if (typeof env[keyName] === 'string') {
        path.parentPath.node.key = t.stringLiteral(env[keyName]);
      }
    }

    // 替换value
    const valueName = path.parentPath.node.value.name;
    if (valueName === name) {
      if (typeof env[valueName] === 'boolean') {
        path.parentPath.node.value = t.booleanLiteral(env[valueName]);
      }
      if (typeof env[valueName] === 'string') {
        path.parentPath.node.value = t.stringLiteral(env[valueName]);
      }
    }
    return;
  }
  // 如果是成员表达式
  if (path.parentPath.type === 'MemberExpression') {
    // 如果不是计算属性就不替换
    if (path.parentPath.node.computed === false) {
      return;
    }
  }
  if (typeof env[name] === 'boolean') {
    path.replaceWith(t.booleanLiteral(env[name]));
    return;
  }
  if (typeof env[name] === 'string') {
    path.replaceWith(t.stringLiteral(env[name]));
    return;
  }
};

module.exports = function miniJsLoader(source) {
  if (!source) {
    return source;
  }
  const callback = this.async();
  const { env } = this.getOptions();
  const ast = parse(source, {
    filename: join(processCwd, 'babel.config.js'),
  });
  traverse(ast, {
    Identifier(path) {
      envTransform(path, env);
    },
  });

  const output = generate(ast);
  callback(null, output.code);
};
