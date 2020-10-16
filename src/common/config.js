/*
 * @Description  : 网站上线信息
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:12:17
 * @LastEditors  : chenLiang
 * @LastEditTime : 2020-09-16 16:12:39
 */

const env = process.env;

window._webInfo = {
  name: env.VUE_APP_PROJECT_NAME,
  version: env.VUE_APP_VERSION,
  env: env.VUE_APP_ENV,
  update_time: env.VUE_APP_TIME
};