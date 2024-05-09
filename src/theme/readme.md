## 主题切换方案

1.  官网编译出 2 套 css 通过切换 css prefix，加载不同的 css，从而实现 2 套主题

    功能是 ok 的 全量变量名：https://github.com/vueComponent/ant-design-vue/blob/3.x/components/style/themes/default.less

    ```js

    lessc --js --modify-var="ant-prefix=default" lessVar/theme_default.less theme_default.css

    lessc --js --modify-var="ant-prefix=green" lessVar/theme_green.less theme_green.css

    ```

    功能上没啥缺陷，实现也试过 ok 的，业务需要提前编译，运行时加载多套 css，官方文档 3.x 建议方案

    但是由于项目充斥着大量的 css 覆写 antdesign 代码。或者选择器.ant-xxx 去操作 dom， 覆写样式。采用此方案 主主题没问题，其他主题会有问题（甚至功能性）

2.  通过三方插件实现,编译成为一个 less 文件带变量的 然后引入 less.js. 兼容性担忧

    generateColorLess.js 编译时，输出 color.less

    setColor.js 运行时设置切换 css 变量

    **局限**： 只能改 color ，尺寸相关 还是通过修改 variables 处理

    场景:

    1. 样式与主题没关系： 通过 less 变量编译时处理，或者通过 css 变量运行时取值都 ok

    2. 样式根据主题有区别到时候： 通过 css 变量运行时取值， --x 赋值 demo 见
       - src\theme\setColor.js 目录配置变量，识别到--开头的就会设置变量 ，demo 里面--xc-test 变量

    使用：

    ​ 1.编译时。ant less 变量修改，src\theme\setColor.js 写在 common 里面 特有的卸载 colorList 配置里面

    ​ 2.运行时。 自定义变量扩展 通过 css 变量修改 ，'--xc-test': '400', 需要--开头即可

        3. 自定义less 变量或者css变量同之前

    4. variables.less 里面配置了@xc-N{x}-xx @xc-cm{x}-color 编译时处理

    ​
