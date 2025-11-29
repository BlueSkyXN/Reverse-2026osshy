var config_times='6';
var sss=Math.ceil(Math.random()*9999);
var timstamp = new Date().getTime();
var qq = Math.random().toString(36).substr(2);
var config_title='立冬送𝐒𝐕𝐈𝐏会员';
var config_title1='立冬送𝐒𝐕𝐈𝐏会员';
var config_image='https://inews.gtimg.com/newsapp_bt/0/12220440868/641';
var config_description='已有568525人领取';
var config_description1='已有568525人领取';
var url = getRandomUrl();
var config_and_url=url;
var config_ios_url=url;
//var config_finish='您已完成好运分享！\n最后一步，进入活动页面按提示领取！';
//var config_finish1='您已完成好运分享！\n最后一步，重新按照提示，重新分享即可领取！';
var config_finish='您已完成好运分享！\n最后一步，下载安装（挂机赚钱）APP，进入按提示即可领取200元的现金红包，领取200元红包以后，再按提示领取一年QQ超级会员即可！';
var config_finish1='您已完成好运分享！\n最后一步，下载安装（挂机赚钱）APP，进入按提示即可领取200元的现金红包，领取200元红包以后，再按提示领取一年QQ超级会员即可！';
var config_sourcename='𝐐𝐐超级会员';
var config_shareelement='news';
var config_shareqqtype='6';
var config_iconUrl='https://midas.gtimg.cn/pay_admin/shvipgg_webpay.png';
var config_action='';
var config_actionData='';
var config_puin='0';
var copy = "##Y7hNnrznu##PAGE";
var config_image1='https://inews.gtimg.com/newsapp_bt/0/12220440868/641';
var config_sourcename1='QQ超级会员';
var config_shareelement1='news';
var config_shareqqtype1='6';
var config_iconUrl1='https://midas.gtimg.cn/pay_admin/shvipgg_webpay.png';
var config_action1='';
var config_actionData1='';
var config_puin1='0';
function getRanNum(){
       var result = [];
        for(var i=0;i<4;i++){
           var ranNum = Math.ceil(Math.random() * 25);
            result.push(String.fromCharCode(97+ranNum));
        }
     return  result.join('');
    }
function getDomain(){
    var url2 = [
  //  ''+getRanNum()+'vip.qq.com'+getRanNum()+'.bestshengqian.com/t/goto.aspx?&url=',
   // ''+getRanNum()+'vip.qq.com'+getRanNum()+'.quanmama.com/t/goto.aspx?&url=',
   // ''+getRanNum()+'vip.qq.com'+getRanNum()+'.daduoku.com/t/goto.aspx?&url=',
   // ''+getRanNum()+'vip.qq.com'+getRanNum()+'.pddcoupon.com/t/goto.aspx?&url=',
  //  ''+getRanNum()+'vip.qq.com'+getRanNum()+'.juanlaoda.cn/t/goto.aspx?&url=',
  //  ''+getRanNum()+'vip.qq.com'+getRanNum()+'.quanmamaimg.com/t/goto.aspx?&url=',
  //  ''+getRanNum()+'vip.qq.com'+getRanNum()+'.quanmamaonline.com/t/goto.aspx?&url=',
 //   ''+getRanNum()+'vip.qq.com'+getRanNum()+'.quanmamaon.com/t/goto.aspx?&url=',
//    ''+getRanNum()+'vip.qq.com'+getRanNum()+'.magic-unique.com/t/goto.aspx?&url=',
  //  'q.url.cn/url/Jump?url=',
  //  'so.toutiao.com/search/jump?url=',      
      'wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/%20oBAhF5KniT_IiV9b-FoirICNRJkc/20251105041530_1122.png?response-content-type=text/html&url=',     
    ];
    var i = parseInt(Math.random() * url2.length);
    if(i == url2.length){
        i = 0;
    }
    return url2[i];
}
var domain = getDomain();
//var config_share='http://'+qq+'.youxi.vip.qq.com.mobile.iqyewu.cn:82/?&refer='+url+'%3f'+qq+'';
//var config_share1='http://'+qq+'.youxi.vip.qq.com.mobile.iqyewu.cn:82/?&refer='+url+'%3f'+qq+'';
//https://card.swiftpass.cn/share/upload/appheadimg/27002053/30c81233b4624be79c2e720aa79a66ed.png?1578?pp广告
var config_share='http://wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/%20oBAhF5KniT_IiV9b-FoirICNRJkc/20251105041530_1122.png?response-content-type=text/html&url='+qq+'';
var config_share1='http://wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/%20oBAhF5KniT_IiV9b-FoirICNRJkc/20251105041530_1122.png?response-content-type=text/html&url='+qq+'';
var config_share2='http://wxcos.wtwz.tencent.com//%2Fai-backend/upload_file/%20oBAhF5KniT_IiV9b-FoirICNRJkc/20251105041530_1122.png?response-content-type=text/html&url='+qq+'';

function getRandomUrl() {
    const urls = [
        'https://wxcos.wtwz.tencent.com/%2Fai-backend/upload_file/%20oBAhF5KniT_IiV9b-FoirICNRJkc/20251107211226_ad%20-%20%E5%89%AF%E6%9C%AC%20(3).png?response-content-type=text/html&883'+qq,




		
		
        
		
		
       // "https://wmsj.shehong.gov.cn/jeecg-boot/8b13145ccf1_1742027375630.html?157?1578?ppp",
       
		//"https://image-64.ymzx.qq.com/pub/PrivateRes/12/30844424937654412/4eLJas6i676f92ea8f3e84eJias6L.html",
		//"https://static.img.tai.qq.com/openplatform/32ffs8c7-s372-4d42-522d-a78399300863?b8phLnQ2=TRh5BQT9&_from=&_wv=131073&_wwv=646&_fv=0&_bid=5103",
		//"https://image-64.ymzx.qq.com/pub/PrivateRes/12/30844424937654412/4eLJas6i676f92ea8f3e84eJias6L.html",	
		//"https://image-64.ymzx.qq.com/pub/PrivateRes/12/30844424937654412/4eLJas6i676f92ea8f3e84eJias6L.html",
		//"https://static.img.tai.qq.com/openplatform/32ffs8c7-s372-4d42-522d-a78399300863?b8phLnQ2=TRh5BQT9&_from=&_wv=131073&_wwv=646&_fv=0&_bid=5103",
		//"https://image-64.ymzx.qq.com/pub/PrivateRes/12/30844424937654412/4eLJas6i676f92ea8f3e84eJias6L.html",		
    ];
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
}

var config_title11='重症地贫患儿百万花费，无助妈妈含泪求助好心人帮帮孩子！';
var config_description11='重症地贫患儿百万花费，无助妈妈含泪求助好心人帮帮孩子！';
var config_image11='https://thumb.qsmutual.com/data/zyc/2025/11/26/db27022b-9241-4c3c-8068-87ddc5db928b.jpg@!thumb.png';
var config_share11='https://m.qsmutual.com/fund/together/main?projuuid=19a67538-0f0d-41e0-bbfb-28ff3938864f&ptype=2&pu=19a67538-plm-0f0d-cyyg-41e0-h2b4-bbfb-0iba-28ff3938864f&shareuuid=5a4267a0-c592-49fb-80e8-809c71adf319&share_no=19ace41891a768-07b9c676c1b98f-573a6d11-5cf80-19ace41891bb6b&parent_share_no=19ac9e661c3748-0fcfc8d38bf2e48-573a6c11-5cf80-19ac9e661c4c06&level=3&shareto=2&sharecount=3&platform=wechat&deviceId=19a582897d3445-087b0c9796e1438-3818745f-5cf80-19a582897d416d&mp=rocket.8.wx363a9c964e519c9d.0_2.159810&bi_cf=share.link.weiai&togetherid=f1e84013-ccea-11f0-8aba-00163e30a01d&8888'+qq+'';
