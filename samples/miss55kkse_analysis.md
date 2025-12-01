# miss55kkse.js 恶意脚本分析报告

## 📌 概述

这是一个**钓鱼/诈骗脚本**，伪装成"立冬送SVIP会员"活动，通过QQ分享机制传播，最终目的是诱导用户下载恶意APP并骗取个人信息/金钱。

---

## 🔴 核心欺骗机制

### 1. 虚假活动配置
```javascript
var config_title = '立冬送𝐒𝐕𝐈𝐏会员';           // 诱饵标题，使用特殊Unicode字符伪装
var config_description = '已有568525人领取';    // 虚假参与人数，制造紧迫感
var config_sourcename = '𝐐𝐐超级会员';           // 伪装成QQ官方
var config_times = '6';                         // 可能是分享次数要求
```

### 2. 反追踪随机化
```javascript
var sss = Math.ceil(Math.random()*9999);              // 随机数，用于URL混淆
var timstamp = new Date().getTime();                  // 时间戳
var qq = Math.random().toString(36).substr(2);        // 随机字符串，追踪每个受害者
```

### 3. getRanNum() - 随机子域名生成
```javascript
function getRanNum(){
    // 生成4位随机字母，如 "abcd", "xyzq" 等
    // 用于创建看起来像 vip.qq.com 的假域名
    // 例如: abcdvip.qq.comxyzq.malicious-domain.com
}
```

---

## 🔗 恶意链接分析

### 当前活跃的恶意域名

| 链接 | 分析 |
|------|------|
| `wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/...` | **伪装成腾讯云存储**，利用URL编码和双斜杠混淆 |

### 历史使用过的域名（已注释）

| 域名 | 类型 |
|------|------|
| `bestshengqian.com` | 子域名劫持跳转 |
| `quanmama.com` | 子域名劫持跳转 |
| `daduoku.com` | 子域名劫持跳转 |
| `pddcoupon.com` | 伪装拼多多优惠券 |
| `juanlaoda.cn` | 子域名劫持跳转 |
| `quanmamaimg.com` | 伪装图片服务 |
| `quanmamaonline.com` | 变体域名 |
| `quanmamaon.com` | 变体域名 |
| `magic-unique.com` | 跳转服务 |
| `q.url.cn` | **伪装QQ短链接** |
| `so.toutiao.com` | **伪装今日头条搜索** |
| `wmsj.shehong.gov.cn` | **⚠️ 利用政府网站漏洞** |
| `image-64.ymzx.qq.com` | **伪装QQ游戏图片服务** |
| `static.img.tai.qq.com` | **伪装QQ静态资源** |

### 慈善诈骗链接
```javascript
// 伪装成轻松筹众筹项目
var config_share11 = 'https://m.qsmutual.com/fund/together/main?projuuid=...'
var config_title11 = '重症地贫患儿百万花费，无助妈妈含泪求助好心人帮帮孩子！'
```
**目的**: 利用真实或伪造的众筹链接进行情感诈骗

---

## 🎯 诈骗流程

```
1. 用户收到"免费领SVIP"分享链接
         ↓
2. 点击后进入伪装页面
         ↓
3. 要求分享给好友/群（传播病毒式扩散）
         ↓
4. 完成分享后显示:
   "下载安装（挂机赚钱）APP，领取200元红包"
         ↓
5. 下载恶意APP → 盗取信息/扣费/更多诈骗
```

---

## ⚙️ 技术特征

### URL混淆技术
1. **双斜杠**: `//` 用于绕过URL检测
2. **URL编码**: `%2F` = `/`, `%20` = 空格
3. **伪装文件扩展名**: `.png?response-content-type=text/html` 看起来是图片，实际返回HTML
4. **随机参数**: 每次访问生成不同的追踪参数

### QQ分享配置
```javascript
var config_shareelement = 'news';      // 分享类型：新闻
var config_shareqqtype = '6';          // QQ分享类型
var config_iconUrl = 'midas.gtimg.cn/pay_admin/shvipgg_webpay.png';  // 使用真实QQ支付图标
var config_image = 'inews.gtimg.com/newsapp_bt/0/12220440868/641';   // 使用腾讯新闻图片
```

### 剪贴板污染
```javascript
var copy = "##Y7hNnrznu##PAGE";  // 可能用于剪贴板劫持或口令码
```

---

## 🛡️ 安全建议

1. **不要点击** 任何"免费领会员"的分享链接
2. **不要下载** 来路不明的APP
3. **举报** 此类链接给QQ安全中心
4. **教育** 身边的人识别此类诈骗
5. **检查URL** 真正的QQ官方域名只有 `qq.com`，而非 `xxx.qq.com.其他域名.com`

---

## 📋 IOC (入侵指标)

### 恶意域名
```
wxcos.wtwz.tencent.com (滥用)
bestshengqian.com
quanmama.com
daduoku.com
pddcoupon.com
juanlaoda.cn
quanmamaimg.com
quanmamaonline.com
quanmamaon.com
magic-unique.com
iqyewu.cn
```

### 可疑图片URL（用于伪装）
```
https://inews.gtimg.com/newsapp_bt/0/12220440868/641
https://midas.gtimg.cn/pay_admin/shvipgg_webpay.png
https://thumb.qsmutual.com/data/zyc/2025/11/26/db27022b-9241-4c3c-8068-87ddc5db928b.jpg
```

### 被滥用的合法服务
```
wmsj.shehong.gov.cn (政府网站)
image-64.ymzx.qq.com (QQ游戏)
static.img.tai.qq.com (QQ静态资源)
m.qsmutual.com (轻松筹)
```

---

## 🕐 时间线

- **文件中URL日期**: 2025-11-05, 2025-11-07, 2025-11-26
- **活动主题**: "立冬"（2025年立冬为11月7日）

---

## 🔍 黑产信息泄露分析

此脚本暴露了大量可追踪黑产身份的信息：

### 1. 腾讯云OpenID泄露
```
oBAhF5KniT_IiV9b-FoirICNRJkc
```
- 这是微信/QQ的用户唯一标识
- 腾讯可直接追踪到具体账号

### 2. 设备指纹泄露
```
deviceId: 19a582897d3445-087b0c9796e1438-3818745f-5cf80-19a582897d416d
```
- 轻松筹链接中包含黑产设备的唯一指纹
- 可用于关联其他恶意活动

### 3. 时间戳分析
```
20251105041530 → 2025-11-05 04:15:30 (凌晨上传)
20251107211226 → 2025-11-07 21:12:26
```
- 凌晨活动暗示自动化脚本或特定时区的操作者

### 4. 域名注册模式
```
quanmama*.com 系列域名
```
- 明显同一主体注册，可通过WHOIS关联追踪

### 5. 推广追踪码
```
##Y7hNnrznu##PAGE
```
- 可能是淘宝客/拼多多推广码，可追溯推广账户

---

*分析时间: 2025-12-01*
*警告: 此脚本为恶意软件，仅供安全研究使用*
