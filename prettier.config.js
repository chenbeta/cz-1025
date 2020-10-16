module.exports = {
  printWidth: 200,
  // tab缩进大小,默认为2
  tabWidth: 2,
  // 使用tab缩进，默认false
  useTabs: false,
  // 使用分号, 默认true
  semi: true, // 句末加分号
  // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  singleQuote: true, // 用单引号
  bracketSpacing: true, // 对象，数组加空格
  jsxBracketSameLine: true, // jsx > 是否另起一行
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid', // (x) => {} 是否要有小括号
  proseWrap: 'never' // 是否要换行
};
