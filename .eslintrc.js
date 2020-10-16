module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'eqeqeq': 0,
    'max-len': [0, 200],
    "prefer-destructuring": 0,
    'no-async-promise-executor': 0,
    "no-shadow": 0,
    'no-param-reassign': 0,
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-else-return': 2, //如果if语句里面有return,后面不能跟else语句
    'no-extra-semi': 2, //禁止多余的冒号
    'no-extra-parens': 0, //禁止非必要的括号
    'no-extra-boolean-cast': 2, //禁止不必要的bool转换
    'no-multi-spaces': 1, //不能用多余的空格
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxBOF': 1
    }], //不能用多余的空行
    'quotes': ['error', 'single'],
    'spaced-comment': 0, //注释风格要不要有空格什么的
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'ObjectExpression': 1
    }], //缩进风格
    'no-unused-vars': [2, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }],
    'arrow-spacing': 2, //规则在箭头函数的箭头（=>）之前/之后标准化间距样式。
    'arrow-parens': [2, 'as-needed'], //箭头函数参数只有一个时省略（）
    'no-irregular-whitespace': 2, //不能有不规则的空格
    'newline-after-var': 0, //变量声明后是否需要空一行
    'semi': [2, 'always'], //语句强制分号结尾
    'valid-jsdoc': 0, //jsdoc规则
    'padded-blocks': 0, //块语句内行首行尾是否要空行
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'max-params': [0, 3], //函数最多只能有3个参数
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    'no-nested-ternary': 0, //禁止使用嵌套的三目运算
    'comma-style': [2, 'last'], //逗号风格，换行时在行首还是行尾
    'comma-dangle': [2, 'never'], //对象字面量项尾不能有逗号
    'strict': 2, //使用严格模式
    'eol-last': 0, // 文件末尾不强制换行
    'space-infix-ops': 2, //中缀操作符周围要不要有空格
    'block-spacing': 2,
    'key-spacing': 2, //对象字面量中冒号的前后空格
    'space-before-blocks': 2, //不以新行开始的块{前面要不要有空格
    'comma-spacing': 2, //逗号前后的空格
    'prefer-const': 0, //优先使用const
    'no-underscore-dangle': 0, //变量下划线
    'no-plusplus': 0, //不允许一元运算符++和--
    'radix': 0, //parseInt radix 参数
    'consistent-return': 0, //return语句总是或永远不指定值。
    'newline-per-chained-call': 0, //在每次调用方法链或深入成员访问后都需要换行符。
    'func-names': 0, //该规则可以强制或禁止使用命名函数表达式。
    'prefer-promise-reject-errors': 0, // 要求在合适的地方使用 Reflect 方法
    'vue/html-closing-bracket-newline': ['error', { //标签结束符不能单独一行
      'singleline': 'never',
      'multiline': 'always'
    }],
    'vue/singleline-html-element-content-newline': ['error', { //内容换行
      'ignoreWhenNoAttributes': true,
      'ignoreWhenEmpty': true,
      'ignores': ['pre', 'textarea']
    }],
    'vue/html-closing-bracket-spacing': ['error', { //标签空格
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always'
    }],
    'vue/html-indent': ['error', 2, { //html缩进
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false,
      'ignores': []
    }],
    'vue/html-quotes': ['error', 'double', { 'avoidEscape': false }], //双引号
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/no-template-key': ['error'],
    'vue/valid-template-root': ['error'],
    'vue/mustache-interpolation-spacing': ['error', 'always'], //模板空格
    'vue/no-multi-spaces': ['error', {
      'ignoreProperties': false
    }],
    'vue/component-tags-order': ['error', {
      'order': ['template', 'script', 'style']
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': true,
      'ignores': []
    }],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/v-bind-style': ['error', 'shorthand'], //不要写v-bind
    'vue/v-on-style': ['error', 'shorthand'], //不要写v-on
    'vue/prop-name-casing': ['error', 'camelCase'], //props驼峰命名
    'vue/name-property-casing': ['error', 'kebab-case'] //组件name短横线命名
  },
  globals: {
    '$': true,
    'common': true
  }
};
