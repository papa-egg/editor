# EDA

国产EDA，基于WEB的电子电路板设计软件，在线绘制原理图、pcb制作; <br>

Vue  + svg + pixijs + clipperjs 本项目主要提供一套基础、稳定的[Vue](https://cn.vuejs.org/)项目架构和统一的代码风格；<br>

### 编译命令
在项目中，可以运行:
### `npm install`
下载安装所需模块
### `npm serve`
在开发模式下运行
打开`http://localhost:80`在浏览器中查看它（域名端口和其它设置可在`vue.config.js`）中进行自定义配置<br>
如果您进行编辑，页面将重新加载<br>
### `npm build`
将用于生产的应用程序构建到“dist”文件夹下<br>

在线地址：[https://eda.jiepei.com/#/editor](https://eda.jiepei.com/#/editor)

在线文档：[https://eda.jiepei.com/readme/others/canvas.html](https://eda.jiepei.com/readme/others/canvas.html)<br><br>


## EDA架构设计图

### 主体架构设计
<img src="https://i.postimg.cc/yxXBXLy1/EDA.png" width="100%">

### EDA渲染流程
<img src="https://i.postimg.cc/8cVN62WX/EDA.png" width="100%">

### 视图、交互区、事件核心同步流程
<img src="https://i.postimg.cc/Pfmtjqsg/image.png" width="100%">

