const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');


// @babel/parser 解析源码得到AST。

// @babel/traverse 遍历 AST。

// @babel/types 用于构建AST节点和校验AST节点类型；

// @babel/generate 打印 AST，生成目标代码和sorucemap。

const transToLet = code => {
  const ast = parser.parse(code);
  // 访问者对象
  const visitor = {
    // 遍历声明表达式
    VariableDeclaration(path) {
      if (path.node.type === 'VariableDeclaration') {
        // 替换
        if (path.node.kind === 'var') {
          path.node.kind = 'let';
        }
      }
    },
  };
  traverse.default(ast, visitor);
  // 生成代码
  const newCode = generator.default(ast, {}, code).code;
  return newCode;
};

module.exports = transToLet