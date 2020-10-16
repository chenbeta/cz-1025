const path = require('path');
const dayjs = require('dayjs');
const postcssPluginPx2rem = require('postcss-plugin-px2rem');
const { name, version } = require('./package.json');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const proxyObj = {};

let urlArr = [
  { name: 'api_xiong', url: 'http://192.168.8.254:8080' },
  { name: 'api_xie', url: 'http://192.168.8.254:8080' },
  { name: 'api_yi', url: 'http://192.168.8.254:8080' },
  { name: 'api_test', url: 'http://171.217.92.188:8088' }
];

urlArr.forEach(item => {
  proxyObj[item.name] = {};
  proxyObj[item.name].target = item.url;
  proxyObj[item.name].pathRewrite = {
    [`^/${item.name}`]: ''
  };
});

function addStyleResource(rule) {
  // 添加全局样式变量
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/stylus/global/index.styl')]
    });
}

process.env.VUE_APP_TIME = dayjs().format('YYYY-MM-DD HH:mm');
process.env.VUE_APP_PROJECT_NAME = name;
process.env.VUE_APP_VERSION = version;

module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 7070,
    hotOnly: true,
    proxy: proxyObj
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcssPluginPx2rem({
            remUnit: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: false, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');

    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none';
      return args;
    });

    config.when(process.env.NODE_ENV !== 'development', configs => {
      configs.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs', // 公共库打包
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons', // 拆分公共模块
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      configs.optimization.runtimeChunk('single');
    });

    // 路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('styl', resolve('src/stylus'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('img', resolve('src/assets/img'))
      .set('$http', resolve('src/global/http.js'))
      .set('libs', resolve('src/assets/libs'));

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type))); // 全局样式变量
  }
};
