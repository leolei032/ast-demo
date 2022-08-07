const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

// @babel/parser 解析源码得到AST。

// @babel/traverse 遍历 AST。

// @babel/types 用于构建AST节点和校验AST节点类型；

// @babel/generate 打印 AST，生成目标代码和sorucemap。

let types = require('@babel/types');     //用来生成新节点，或者判断某个节点是否是某个类型
const transToLet = code => {
  const ast = parser.parse(code);
  // 访问者对象
  const visitor = {
    //访问者模式；可以访问源代码生成的语法树所有节点，捕获特定节点
    //捕获箭头函数表达式，转成普通函数
    ArrowFunctionExpression: (path,state) => {
        let id = path.parent.id;        //path.node代表当前节点，path.parent代表父节点
        let arrowNode = path.node;
        let params = arrowNode.params;
        let body = arrowNode.body;      //BinaryExpression
        let generator = arrowNode.generator;
        let async = arrowNode.async;
        //types.blockStatement 生成一个函数体
        let functionExpression = types.functionExpression(id,params,types.blockStatement([types.returnStatement(body)]),generator,async)
        path.replaceWith(functionExpression);       //将转化的新节点替换老节点
    }
}
  traverse.default(ast, visitor);
  // 生成代码
  const newCode = generator.default(ast, {}, code).code;
  return newCode;
};

module.exports = transToLet