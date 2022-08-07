# AST是什么

> 抽象语法树（abstract syntax tree 或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。

[AST 在线转换](https://astexplorer.net/)
[AST SVG](http://nhiro.org/learn_language/AST-Visualization-on-browser.html)
[AST Types](https://babeljs.io/docs/en/babel-types)
[esprima解释器](https://esprima.org/demo/parse.html#)
```javascript
let leo = 'oppoer';
if (leo.indexOf('oppo') > 0) {
  console.log('本分！')
}
```

```json
{
  "type": "Program",
  "start": 0,
  "end": 73,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 19,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 18,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 7,
            "name": "leo"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 18,
            "value": "oppoer",
            "raw": "'oppoer'"
          }
        }
      ],
      "kind": "let"
    },
    {
      "type": "IfStatement",
      "start": 20,
      "end": 73,
      "test": {
        "type": "BinaryExpression",
        "start": 24,
        "end": 47,
        "left": {
          "type": "CallExpression",
          "start": 24,
          "end": 43,
          "callee": {
            "type": "MemberExpression",
            "start": 24,
            "end": 35,
            "object": {
              "type": "Identifier",
              "start": 24,
              "end": 27,
              "name": "leo"
            },
            "property": {
              "type": "Identifier",
              "start": 28,
              "end": 35,
              "name": "indexOf"
            },
            "computed": false,
            "optional": false
          },
          "arguments": [
            {
              "type": "Literal",
              "start": 36,
              "end": 42,
              "value": "oppo",
              "raw": "'oppo'"
            }
          ],
          "optional": false
        },
        "operator": ">",
        "right": {
          "type": "Literal",
          "start": 46,
          "end": 47,
          "value": 0,
          "raw": "0"
        }
      },
      "consequent": {
        "type": "BlockStatement",
        "start": 49,
        "end": 73,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 53,
            "end": 71,
            "expression": {
              "type": "CallExpression",
              "start": 53,
              "end": 71,
              "callee": {
                "type": "MemberExpression",
                "start": 53,
                "end": 64,
                "object": {
                  "type": "Identifier",
                  "start": 53,
                  "end": 60,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 61,
                  "end": 64,
                  "name": "log"
                },
                "computed": false,
                "optional": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 65,
                  "end": 70,
                  "value": "本分！",
                  "raw": "'本分！'"
                }
              ],
              "optional": false
            }
          }
        ]
      },
      "alternate": null
    }
  ],
  "sourceType": "module"
}
```

## AST如何生成

```javascript
const a = 10;
```

词法分析 ----> Tokens流
```javascript
[
    {
        "type": "Keyword",
        "value": "const"
    },
    {
        "type": "Identifier",
        "value": "a"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "Numeric",
        "value": "10"
    },
    {
        "type": "Punctuator",
        "value": ";"
    }
]
```
语法分析 ----> AST

```javascript
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": 10,
            "raw": "10"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}
```
> AST 的每一层都拥有近乎相同的结构，都有一个type属性以及一系列描述属性，type属性用来表示节点的类型（CallExpression,Identifier,MemberExpression等等）。这样的每一层结构称为一个 节点（Node）。 一个 AST 可以由单一的节点或是成百上千个节点构成。 抽象语法树有一套约定的规范：GitHub - estree/estree: The ESTree Spec，社区称为 estree。借助这个约定的 AST 规范，整个前端社区，生产类工具统一产出该格式的数据结构而无需关心下游，消费类工具统一使用该格式进行处理而无需关心上游。
AST的所有节点类型可分为以下几个大类：字面量、标识符、表达式、语句、模块语法，每个大类下又分类多个子类，下面介绍一些基本且开发常用的节点类型 ，更全面的信息可以查文档或者在ASTExplorer中具体查看

### AST常用节点类型
#### Literal 字面量
```javascript
StringLiteral 字符串字面量（"foo"）
NumericLiteral 数值字面量（123）
BooleanLiteral 布尔字面量 （true）
TemplateLiteral 模板字面量 （${obj}）
...
```
#### Identifier 标识符
> 标识符即各种声明与引用的名字，js中的变量名，函数名，属性名等都是标识符。如下面代码中的bar,foo,num都是标识符。

```javascript
const bar = foo(num)

```
#### Literal 字面量
```javascript
StringLiteral 字符串字面量（"foo"）
NumericLiteral 数值字面量（123）
BooleanLiteral 布尔字面量 （true）
TemplateLiteral 模板字面量 （${obj}）
...
```
#### Statement 语句
> 一段可以独立执行的代码。下面代码的每一行都是一条语句
```javascript
const a = 1;
console.log(a);
export default a;
...
```

Statement 分为众多子类型，下面举几个例子。

```javascript
return a; // ReturnStatement
try {
  // TryStatement
} catch (error) {}
for (let index = 0; index < array.length; index++) {
  // ForStatement
  const element = array[index];
}
while (condition) {} // WhileStatement
```
#### Declaration 声明语句
> 一种特殊的语句，用于在作用域内声明变量、函数、class、import、export 等，同样有众多子类型
```javascript
const a = 1; // VariableDeclaration
function b(){} // FunctionDeclaration
class C {} // ClassDeclaration
```

#### Expression 表达式
> 表达式与语句的区别是表达式执行后会有返回结果，举例：
```javascript
a = 1; // AssignmentExpression
a+b; // BinaryExpression
this；// ThisExpression
```

#### Modules ES module模块语法
```javascript
import name from 'name'; // ImportDeclaration
export const newName = 'newName'; // ExportNamedDeclaration
export default name; // ExportDefaultDeclaration
export * from 'name'; // ExportAllDeclaration
```
#### Program & Directive
> program 是代表整个程序的节点，它包裹了所有具体执行语句的节点，而Directive则是代码中的指令部分。
```json
'use strict'
const a = 1;
```
```json
{
  "type": "Program",
  "start": 0,
  "end": 25,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 12,
      "expression": {
        "type": "Literal",
        "start": 0,
        "end": 12,
        "value": "use strict",
        "raw": "'use strict'"
      },
      "directive": "use strict"
    },
    {
      "type": "VariableDeclaration",
      "start": 13,
      "end": 25,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 19,
          "end": 24,
          "id": {
            "type": "Identifier",
            "start": 19,
            "end": 20,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 23,
            "end": 24,
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```


### babel的处理步骤
![babel、ESlint工作流程](http://zhangbinliu.me/content/images/codemod_ast/process.png)

主要有三个阶段：解析（parse）， 转换 （transform），生成（generate）。

#### parse

将源码转成 AST，用到@babel/parser模块。

#### transform

对AST 进行遍历，在此过程中对节点进行添加、更新及移除等操作。因此这是bebel处理代码的核心步骤，是我们的讨论重点，主要使用@babel/traverse和@babel/types模块。

#### generate

打印 AST 成目标代码并生成 sourcemap，用到@babel/generate模块。
接下来我们来重点了解转换这一步，上面我们提到，转换的第一步是遍历AST

说到这里就不得不提到一个设计模式——访问者模式。

#### 访问者模式

> 在访问者模式（Visitor Pattern）中，我们使用了一个访问者类，它改变了目标元素的执行算法。通过这种方式，元素的执行算法可以随着访问者改变而改变。而在当前场景下，访问者即是一个用于 AST 遍历的模式， 简单的说它就是一个对象，定义了用于在一个树状结构中获取具体节点的方法。当访问者把它用于遍历中时，每当在树中遇见一个对应类型，都会调用该类型对应的方法。

#### 为什么要用访问者模式？

首先要明确我们的需求场景是对一个对象结构中的不同对象进行不同且互不相关的操作。如果使用普通的遍历方法，则会不可避免的在这个方法中进行判断，处理。必然会导致众多if..else逻辑嵌套，可读性差且难以维护。而访问者模式对不同对元素类型调用相应的遍历方法，不和具体遍历方式耦合易于复用，结构更加清晰、灵活性更高。

[访问者模式 ---> 更多](https://juejin.cn/post/7012599751527006239)

我们只需根据需求，==针对我们需要修改的节点类型去定义相应的遍历方法并指定相应的回调函数即可。回调函数的参数是path，它代表节点与节点之间的关系，每个 path关联父节点和当前节点，path 对象构成一条从当前节点到根结点的路径，我们可以通过 path的一系列增删改查 AST 的 api 来完成具体操作。==

![parentPath](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73fddc43bfba4c5896375fa9172e54db~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

#### For Example 1
```javascript
     const a = 1
     var b = 2
     let c = 3;
```
若我们想将所有var替换为let，则只需遍历所有的VariableDeclaration类型的节点，找到名为var的节点，将其替换为let即可

```javascript
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


const code = `const a = 1
var b = 2
let c = 3`;

transToLet(code);
```

#### For Example 2
将箭头函数转换为普通函数

```javascript
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

const sourceCode = `const sum = (a,b) => a+b`;

transToLet(sourceCode)

```

#### For Example 3:babel插件开发
[babel插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-transform)

```javascript
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
```

### TO DO MORE?
代码语法的检查、代码风格的检查、代码格式化、代码高亮、代码错误提示、代码自动补全等

如JSLint、JSHint对代码错误或风格的检查，发现一些潜在错误IDE的错误提示、格式化、高亮、自动补全等
代码混淆压缩

UglifyJS2等
优化变更代码，改变代码结构使其达到想要的结构

代码打包工具webpack、rollup等CommonJS、AMD、CMD、UMD等代码规范之间的转化CoffeeScript、TypeScript、JSX等转化为原生Javascript

### 就这？

[AST与 AST 与前端框架⼯工程化](https://www.infoq.cn/article/qkaibf_1edauwzpydpt0)
[AST -- 代码重构](http://zhangbinliu.me/2017-02-15-fun-with-codemod-and-ast/)
[AST -- 代码重构](https://zhuanlan.zhihu.com/p/353940140)
....


参考文档：
1. https://cloud.tencent.com/developer/article/1593484
2. https://juejin.cn/post/7006919355686453279#heading-17
3. https://juejin.cn/post/6854573222071894029#heading-7
4. https://juejin.cn/post/6844904126099226631#heading-6

