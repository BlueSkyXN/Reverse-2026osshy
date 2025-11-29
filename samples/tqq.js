/*
懒人建站为您提供-JS代码，js特效代码大全，js特效广告代码，下拉菜单，下拉菜单代码，导航菜单代码和基于jquery的各种特效与jquery插件。
http://www.51xuediannao.com/
*/
myFocus.extend({//*********************tqq******************
	mF_sd_tqq:function(par,F){
		var box=F.$(par.id),msgs=F.$c('msgs',box),n=F.$$_('li',msgs).length;
		//PLAY
		eval(F.switchMF(function(){
			var last=F.$$_('li',msgs)[n-1],lastH=last.offsetHeight;
			F.slide(msgs,{marginTop:lastH},800,'easeOut',function(){
				msgs.insertBefore(last,msgs.firstChild);
				F.setOpa(last,0);
				msgs.style.marginTop=0+'px';
				F.fadeIn(last);
			});
		}));
	}
});