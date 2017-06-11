# 知了WEEX端

> fork自 [weex-vue-starter-kit](https://github.com/ElemeFE/weex-vue-starter-kit)

## 使用说明

### 开发
1. `npm install`
2. `npm run dev`
3. 浏览器打开 `localhost:8005`

### 调试
1. `weex debug` , 浏览器自动打开调试页面, **假设此时url为: 192.168.8.8:8088**
2. 使用weex playground 扫描二维码, 扫描成功后浏览器出现手机屏幕
3. 浏览器打开`192.168.8.8:8005`, 将此路径转为二维码, 用playground继续扫描即可进行调试

### 编译成apk
1. `weex platform add android`
2. `weex build android`  编译成功后apk文件会放在 `/platform/android/app/build/outputs/apk`目录下
3. 也可以把手机插到电脑, 打开调试模式后执行`weex run android`将APP直接安装到手机上

**注意: APP与playground包名相同所以安装的时候会有冲突, 所以在安装之前要先删掉, 目前还没有解决这个问题, 对安卓不是很懂**\

### 编译IOS
没弄过

## 目录结构

clone 之后只需要修改 src 目录下的文件即可，enjoy it!

```
├── yarn.lock
├── README.md
├── android.config.json
├── config.xml
├── hooks
│   └── README.md
├── ios.config.json
├── package.json
├── platforms     // 平台模版目录
├── plugins       // 插件下载目录
│   └── README.md
├── src           // 业务代码（vue文件）目录
│   └── index.vue
├── index.tpl
├── qrcode.tpl
└── webpack.config.js
```
