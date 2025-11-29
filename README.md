# 2026osshy 黑产钓鱼网站逆向分析报告

## 背景

在20251129，在游戏群中遇到，发现点击后会高频调用分享接口+高度可疑的传销话术，怀疑是钓鱼网站。
发现通过主动检查浏览器直接打开时跳转腾讯官网、抓包时通过一部分腾讯域名进行包装过白，但是少部分被漏了对象存储域名，从而逐步挖掘到原始信息。

目标包括 2026osshy和2026hy等项目

直接使用Claude 4.5 Opus 进行逆向分析，结合手动分析，整理出以下报告。

## 目标相关链接

**主入口**（看似为PNG实际上是HTML）:

https://wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/%20oBAhF5KniT_IiV9b-FoirICNRJkc/20251105041530_1122.png?response-content-type=text%2Fhtml&url=q5jwor5qkg

目前暂时不清楚这个接口从哪里来的，也许是通过某种漏洞上传的。
**调用的资源**:

- https://2026hy.oss-cn-hangzhou.aliyuncs.com/tencent.js 
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/qqapi.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/1style.css
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/js/miss55kkse.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/alert.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/styleaaa.css
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/index.css
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/jquery.min.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/base64.min.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/clipboard.min.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/weibo.js
- https://2026osshy.oss-cn-hangzhou.aliyuncs.com/tqq.js

使用阿里OSS进行托管，一眼黑产搞的什么东西，和那些诈骗APP用的同款。

## 概述

这是一个伪装成"QQ超级会员领取活动"的钓鱼/传销网站，利用腾讯云对象存储(COS)域名进行托管，通过QQ内置浏览器传播。

## 攻击流程

```
用户点击分享链接
       ↓
wxcos.wtwz.tencent.com (伪装PNG实际是HTML)
       ↓
加载 tencent.js (混淆后的核心代码)
       ↓
检测设备类型 (iOS/Android)
       ↓
要求分享给好友 (强制裂变传播)
       ↓
跳转到推广APP下载页面
```

## 文件结构分析

### 1. 入口文件 (main_entry.html)
- **伪装方式**: 利用 `response-content-type=text/html` 参数让PNG链接返回HTML
- **托管域名**: `wxcos.wtwz.tencent.com` (腾讯云COS)
- **钓鱼内容**: 伪装成"送你一年SVIP会员"

### 2. tencent.js (核心恶意代码)
- **混淆方式**: jsjiami.com.v4 + sojson.v4 双重混淆
- **体积**: 77KB (大量混淆代码)
- **功能**:
  - document.write 动态生成整个钓鱼页面
  - 设备检测 (iOS/Android)
  - 强制分享功能
  - Cookie操作
  - 跳转控制

**关键代码解混淆片段**:
```javascript
// 设备检测
util.isIphone()
util.isIpad()  
util.isAndroid()
util.isMB()  // 是否移动端

// 非移动端直接跳转QQ官网
if (!util.isMB()) {
    window.location.href = 'http://www.qq.com/';
}
```

### 3. miss55kkse.js (配置文件)
- **核心配置变量**:

```javascript
var config_title='立冬送𝐒𝐕𝐈𝐏会员';
var config_description='已有568525人领取';  // 虚假领取人数
var config_times='6';  // 要求分享次数

// 分享完成后的提示 - 推广挂机赚钱APP
var config_finish='您已完成好运分享！\n最后一步，下载安装（挂机赚钱）APP，进入按提示即可领取200元的现金红包...';

// 跳转域名池
var domain = getDomain(); // 随机选择跳转域名

// 分享链接 - 使用腾讯COS域名
var config_share='http://wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/...';

// 复制到剪贴板的内容 (推广码)
var copy = "##Y7hNnrznu##PAGE";
```

### 4. qqapi.js (QQ WebView API)
- **体积**: 72KB
- **来源**: 腾讯手机QQ官方JSBridge API (被黑产滥用)
- **功能**: 
  - `mqq.ui.shareMessage` - 分享消息
  - `mqq.data.setShareInfo` - 设置分享信息
  - `mqq.ui.setWebViewBehavior` - 控制WebView行为

### 5. alert.js (劫持原生alert)
```javascript
window.alert = function(name){
  var iframe = document.createElement("IFRAME");
  iframe.style.display="none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);  // 通过iframe调用
  iframe.parentNode.removeChild(iframe);
};

// 禁用返回和操作按钮
mqq.ui.setWebViewBehavior({
    swipeBack: 0,      // 禁止左滑返回
    actionButton: 0    // 禁止操作按钮
});
```

### 6. jquery.min.js
- **真实版本**: jQuery v2.1.4 (真正的jQuery库)
- **体积**: 85KB
- **但包含注入代码**: 末尾注入了百度统计代码

```javascript
// 注入的百度统计
hm.src = 'https://hm.baidu.com/hm.js?8ad0a064532a1e137498e41747124a41';
```

### 7. weibo.js + tqq.js (轮播/动画效果)
- myFocus JavaScript Library v1.1.0
- 用于页面上的消息滚动效果(假装有人在领取)

## 恶意行为分析

### 1. 社会工程学
- 伪装成QQ官方活动
- 使用Unicode特殊字符 `𝐒𝐕𝐈𝐏` 规避关键词检测
- 虚假的"已有568525人领取"
- 虚假的"倒计时"制造紧迫感

### 2. 强制裂变传播
- 要求分享6次才能"领取"
- 利用QQ内置分享API
- 分享链接继续指向钓鱼页面

### 3. 推广APP下载
- 最终目的是推广"挂机赚钱"APP
- 可能是灰色网赚/传销APP

### 4. 用户追踪
- 百度统计 (账号: 8ad0a064532a1e137498e41747124a41)
- 51.la统计 (账号: 500716513)
- Cookie追踪用户行为

### 5. 安全绕过
- 禁用WebView返回手势
- 劫持alert函数
- 利用腾讯域名绕过安全检测

## 域名/资源汇总

| 资源 | 域名 | 用途 |
|------|------|------|
| 主入口 | wxcos.wtwz.tencent.com | 腾讯COS托管钓鱼页 |
| 静态资源 | 2026osshy.oss-cn-hangzhou.aliyuncs.com | 阿里云OSS |
| 静态资源 | 2026hy.oss-cn-hangzhou.aliyuncs.com | 阿里云OSS |
| 统计 | hm.baidu.com | 百度统计 |
| 统计 | sdk.51.la | 51.la统计 |

## 跳转链接分析

配置文件中包含多个被注释的跳转域名:
- bestshengqian.com
- quanmama.com  
- daduoku.com
- pddcoupon.com
- juanlaoda.cn
- quanmamaimg.com
- quanmamaonline.com
- magic-unique.com

这些域名可能是淘客/返利平台，说明黑产可能通过CPS分成获利。

## 另一条传播链 (慈善众筹)

miss55kkse.js 中还包含另一套配置:
```javascript
var config_title11='重症地贫患儿百万花费，无助妈妈含泪求助好心人帮帮孩子！';
var config_share11='https://m.qsmutual.com/fund/together/...';
```
**qsmutual.com 是轻松筹**，说明该黑产同时利用慈善众筹进行传播。

## IOC (威胁指标)

### 恶意域名
- 2026osshy.oss-cn-hangzhou.aliyuncs.com
- 2026hy.oss-cn-hangzhou.aliyuncs.com

### 恶意文件
- tencent.js
- miss55kkse.js

### 追踪ID
- 百度统计: 8ad0a064532a1e137498e41747124a41
- 51.la: 500716513

### 文件SHA256哈希
| 文件 | SHA256 |
|------|--------|
| tencent.js | b54ade2b7972e04621415663d54cc9a1fff74be85c7b8bd601bce197d924de87 |
| miss55kkse.js | 5b0ac48d0324532a6ea9b01208243796801fffa3846e02e3b2ca5e188263bb26 |
| qqapi.js | f7183622f1476dd2af8a849b267b65515ab6a4830691d7f1d4911ff256b49e93 |
| alert.js | b98c45e3080d0e56d4979476bf59dd670605548cbe3eabc9d83f57d7c228bdf3 |
| jquery.min.js | 550fad7b44ff0a31e4d692b1d5dc1ea8147b5e28afae53e61540e5ce1e148de6 |

## 总结

这是一个典型的QQ内传播的裂变式钓鱼网站:
1. 利用腾讯云COS域名规避检测
2. 伪装成QQ官方活动骗取信任
3. 强制分享进行裂变传播
4. 最终推广灰色APP获利
