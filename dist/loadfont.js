window.loadFont=function(a,b,c,d){function e(){document.write('<link rel="stylesheet" href="'+a+'">'),document.documentElement.className+=" "+d}function f(){localStorage["font-loaded-"+b]=Date.now()}function g(b){var c=document.createElement("link");c.media="only x",c.rel="stylesheet",c.href=a,c.onload=function(){this.media="all",this.onload=null,b()};var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}function h(){o&&(j(o),o=null),o=i(function(){for(var a=!0,b=0;b<l.length;b+=k.length)a=a&&l[b].clientWidth===l[b+1].clientWidth&&l[b+1].clientWidth===l[b+2].clientWidth&&l[b].clientHeight===l[b+1].clientHeight&&l[b+1].clientHeight===l[b+2].clientHeight;a&&(document.documentElement.className+=" "+d,f(),l.forEach(function(a){a.parentNode.removeChild(a)}),h=function(){})})}var i=window.requestAnimationFrame||function(a){return setTimeout(a,50)},j=window.cancelAnimationFrame||clearTimeout,k=["sans-serif","serif","monospace"],l=[];try{var m=Date.now()-localStorage["font-loaded-"+b]<864e5;if(m)return f(),void e();g(function(){c.forEach(function(a){k.forEach(function(c){var d=document.createElement("div");d.innerHTML='<object style="display:block;position:absolute;top:0;right:0;bottom:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;" type="text/html"></object>MXWmxwi0123',d.style.cssText="z-index:-1;overflow:hidden;pointer-events:none;position:absolute;visibility:hidden;display:inline-block;line-height:1;font-size:16px;font-family:"+c+";font-weight:"+a,document.body.appendChild(d),l.push(d);var e=d.querySelector("object");e.data="about:blank",e.onload=function(){this.contentDocument.defaultView.addEventListener("resize",h),h()},d.style.fontFamily=b+","+c})})})}catch(n){e(),console.error(n)}var o};