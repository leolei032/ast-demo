let babel = require('@babel/core');     //用来生成语法树，并且遍历转化语法树
let types = require('@babel/types');     //用来生成新节点，或者判断某个节点是否是某个类型
// const { generate } = require('escodegen');

const sourceCode = `const sum = (a,b) => a+b`;

//插件的结构
let transformArrayFunction = {
    visitor: {  //访问者模式；可以访问源代码生成的语法树所有节点，捕获特定节点
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
}
let result = babel.transform(sourceCode,{
    plugins: [transformArrayFunction],

});

// console.log(result);
console.log(result.code);
