<!DOCTYPE html><html>

  <head>
    <title>App Download</title>
    <meta charset="utf-8">
    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="address=no" />
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" id="viewport">
    
    <style type="text/css">
      body{background: #fff; margin: 0;}

      #main_container{position: relative;}

      #main{
        -webkit-transform-origin: 0 0; width: 750px; min-height: 1220px; margin: 0 auto;
        
      }

      .tab{
        display: none;
        position: relative;
        width: 750px;
        height: 100%;
      }

      .tab.show{display: block;}

      .tab .refer{
        position: relative;
          width: 100%;
          height: 100%;
      }

      .tab.android .refer{
        background: url(/static/images/en/android_next.jpg) no-repeat;
        background-color: #fff;
      }

      .tab.ios .refer{
        background: url(/static/images/en/ios_next.jpg) no-repeat;
        background-color: #fff;
      }

      .tab.harmony .refer{
        background: url(/static/images/en/harmony_next.jpg) no-repeat;
        background-color: #fff;
      }

      #refer_no.ios{
        background: url(/static/images/en/ios_no.png) no-repeat;
        background-color: #ededed;
      }

      #refer_no.android{
        background: url(/static/images/en/android_no.png) no-repeat;
        background-color: #ededed;
      }

      #refer_no .back_to_index_button{
        position: absolute;
          text-indent: -9999px;
          width: 400px;
          height: 116px;
          top: 582px;
          left: 0;
          right: 0;
          margin: 0 auto;
      }
  </style>
  </head>

  <body>
    <div id="main_container">
      <div id="main">
        <div id="weixin_show" class="tab">
          <div class="refer">
          </div>
        </div>
        <div id="yixin_show" class="tab">
          <div class="refer">
          </div>
        </div>
        <div id="weibo_show" class="tab">
          <div class="refer">
          </div>
        </div>
        <div id="refer_no" class="tab">
          <a class="back_to_index_button" href="https://mc.163.com/">Homepage</a>
        </div>
      </div>
    </div>
    <script charset="gb2312" src="/static/js/jquery-1.6.4.min.js"></script>
    <script type="text/javascript">
      // document.getElementsByTagName("html")[0].style.fontSize=document.body.clientWidth/375*312.5+"%";
      // function orientation(event){
      //   var st=setTimeout(function(){
      //     document.getElementsByTagName("html")[0].style.fontSize=document.body.clientWidth/375*312.5+"%";
      //   },300)

      // }
      // if (typeof window.addEventListener != "undefined") {
      //   window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(e){
      //     orientation(e);
      //   }, false);
      // }

      // $("#main").height($(window).height());

      var PAGESIZE = {
        "width": 750,
        "height": 1220
      };

      $(window).resize(reSize);
      reSize();

      function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          return true
        } else {
          return false
        }
      }

      function reSize() {
        var pw = PAGESIZE.width;
        var ph = PAGESIZE.height;
        if (browserRedirect()) {
          var tww = document.body.offsetWidth;
          var twh = document.body.offsetHeight;
        } else {
          var twh = $(window).height();
          var tww = twh / ph * pw;
          $('#main').css({
            'transform-origin': 'top center',
            '-webkit-transform-origin': 'top center'
          });
        }

        var wh = twh * pw / tww;
        var sc = tww / pw;
        var tw = Math.min(0, (pw - tww) * 0.5);
        if (sc <= 1) {
          tw = 0;
        }
        $('#main').css({
          'transform': 'translate(' + tw + 'px, 0px) scale(' + sc + ')',
          '-webkit-transform': 'translate3d(' + tw + 'px, 0px, 0px) scale(' + sc + ')',
          'min-height': ph,
          'height': $(window).height()/sc,
        });
        $('#main_container').css({"min-height":twh*sc,"height":$(window).height(),"overflow":"hidden"});
      }

      var android_type = true;
      var ios_type = true;
      var android_link = android_type ? "https://g79.gdl.netease.com/mcpe-3.1.5.261038-Publish-arm64_r20-encrypted_netease_92.apk?key1=d53f777d7d4b3a8acc95f7a3a6bbb758&key2=677c0e0b" : "https://mc.163.com/";
      var ios_link = ios_type ? "https://itunes.apple.com/cn/app/%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C/id1243986797?mt=8&at=10lxv5&ct=G79" : "https://mc.163.com/";
      var android_qq_url = "";
      var iOS_qq_url = "";
      var pc_link = "";
      var harmony_link = "";

      var is_report = false;

      // if(android_link.indexOf("javascript:") != -1){
      //   android_type = false;
      // }
      // if(ios_link.indexOf("javascript:") != -1){
      //   ios_type = false;
      // }

      (function() {
        var is_weixin = function() {
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
          } else {
            return false;
          }
        };

        var is_yixin = function() {
          if (ua.indexOf("yixin") > 0) {
            return true;
          } else {
            return false;
          }
        };

        var is_weibo = function() {
          if (ua.indexOf("weibo") > 0) {
            return true;
          } else {
            return false;
          }
        };

        var params = function(u, p) {
          var m = new RegExp("(?:&|/?)" + p + "=([^&$]+)").exec(u);
          return m ? m[1] : '';
        };

        var download = function(url) {
          if (ua.match(isIos) || ua == null) {
            if(!is_report)window.location.href = url;
            else{
              setTimeout(function(){
                window.location.href = url;
              },500);
            }
          }else{
            window.location.href = url;
          }
        };

        var addCheckCode = function(code) {
          is_report = true;
          document.write("<iframe  src=\"" + code + "\" width=\"0\" height=\"0\" style=\"border:0px\">><\/iframe>");
        };

        var dtype = params(location.search, 'type');
        var ua = navigator.userAgent.toLowerCase();
        var isIos = /ipad|iphone|ipod|ios|Mac/i;
        var isAndroid = /android/i;
        var isHarmony = /OpenHarmony/i;

        var ios_no_class ="ios";
        var android_no_class ="android";

        function showNoPackage(classname){
          $("#refer_no").addClass(classname).addClass("show");
          // $("#refer_no").fadeIn();
          if(classname==ios_no_class){
            if(ios_link.indexOf("javascript:") != -1){
              download(ios_link);
            }
          }else if(classname==android_no_class){
            if(android_link.indexOf("javascript:") != -1){
              download(android_link);
            }
          }
        }
        function downloadIosOnPc(){
          if(ios_link.toLowerCase().indexOf(".plist")>-1){ 
            var plistUrl=ios_link.match(/https\:\/\/.*\.plist/)[0];
            $.ajax({
              type:"get",
              url:"/ipa",
              data: {uri: plistUrl},
              success:function(data){
              if(data.status=='ok'){
                  download(data.ipa);
                }else{
                  download(ios_link);
                }
              },
              error:function(error){
                download(ios_link);
              }
            });
          }else{
            download(ios_link);
          }
        }
        function tryDownloadHarmony() {
          if (harmony_link){
            download(harmony_link);
          }else{
            showNoPackage(android_no_class);
          }
        }
        function checkDownload() {
          if (is_weixin()) {
            if(isIos.test(navigator.userAgent.toLowerCase()) && ios_type) {
              $('#weixin_show').addClass("show ios");
              download(ios_link);
              return;
            } else if(isAndroid.test(navigator.userAgent.toLowerCase()) && android_type) {
              $('#weixin_show').addClass("show android");
              
              return;
            } else if (isHarmony.test(navigator.userAgent.toLowerCase()) && harmony_link) {
              $('#weixin_show').addClass("show harmony");
              return;
            }
          } else if (is_weibo()){
            if(isIos.test(navigator.userAgent.toLowerCase()) && ios_type) {
              if(ios_link.indexOf("javascript:") != -1){
                download(ios_link);
              } else {
                $('#weibo_show').addClass("show ios");
              }
              return;
            } else if(isAndroid.test(navigator.userAgent.toLowerCase()) && android_type) {
              if(android_link.indexOf("javascript:") != -1){
                download(android_link);
              } else {
                $('#weibo_show').addClass("show android");
              }
              return;
            } else if (isHarmony.test(navigator.userAgent.toLowerCase()) && harmony_link) {
              $('#weibo_show').addClass("show harmony");
              return;
            }
          }
          // if (is_yixin()) {
          //   if(isIos.test(navigator.userAgent.toLowerCase())){
          //     $('#yixin_show').addClass("yixin ios").show();
          //   }else{
          //     $('#yixin_show').addClass("yixin android").show();
          //   }
          //   return;
          // }
          switch (dtype) {
            case "ios":
              if(!ios_type){
                showNoPackage(ios_no_class);
              }else{
                if (ua.match(isIos) || ua == null) {
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13065&s=6NoOvXl0fe6mhuNnzX4OCxAlSpw%3D");
                  
                  download(ios_link);
                } else {
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13063&s=NkRdEIYOkCDFG4kpGgnOMtfF28Q%3D");
                  
                  downloadIosOnPc();
                }

              }
              break;
            case "android":
              if(!android_type){
                showNoPackage(android_no_class);
              }else{
                if (ua.match(isAndroid)) {
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13064&s=A6FTIs76MIF4MUEOD%2BSqH3hqwB0%3D");
                  
                } else {
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13062&s=adnWrrhCUrlsweCL0L5C9gguVWU%3D");
                  
                }
                download(android_link);
              }
              break;
            case "pc":
              if(pc_link){
                download(pc_link);
              }else if(ios_type){
                
                addCheckCode("https://gad.netease.com/mmad/point?point_id=13063&s=NkRdEIYOkCDFG4kpGgnOMtfF28Q%3D");
                
                downloadIosOnPc();
              }else if(android_type){
                
                addCheckCode("https://gad.netease.com/mmad/point?point_id=13062&s=adnWrrhCUrlsweCL0L5C9gguVWU%3D");
                
                download(android_link);
              }else if (harmony_link) {
                download(harmony_link);
              }else{
                showNoPackage(ios_no_class);
              }
              break;
            case "harmony":
              tryDownloadHarmony();
              break;
            case "qr":
              if (ua.match(isIos) || ua == null) {
                if(!ios_type){
                  showNoPackage(ios_no_class);
                }else{
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13065&s=6NoOvXl0fe6mhuNnzX4OCxAlSpw%3D");
                  
                  download(ios_link);
                }
              } else if (ua.match(isHarmony)) {
                tryDownloadHarmony();
              } else {
                if(!android_type){
                  showNoPackage(android_no_class);
                }else{
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13064&s=A6FTIs76MIF4MUEOD%2BSqH3hqwB0%3D");
                  
                  download(android_link);
                }
              }
              break;
            default:
              if (ua.match(isIos) || ua == null) {
                if(!ios_type){
                  showNoPackage(ios_no_class);
                }else{
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13065&s=6NoOvXl0fe6mhuNnzX4OCxAlSpw%3D");
                  
                  download(ios_link);
                }
              } else if (ua.match(isHarmony)) {
                tryDownloadHarmony();
              } else if (ua.match(isAndroid)) {
                if(!android_type){
                  showNoPackage(android_no_class);
                }else{
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13064&s=A6FTIs76MIF4MUEOD%2BSqH3hqwB0%3D");
                  
                  download(android_link);
                }
              } else {
                if(pc_link){
                  // TODO add pc download here
                  download(pc_link);
                }else if(android_type){
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13062&s=adnWrrhCUrlsweCL0L5C9gguVWU%3D");
                  
                  download(android_link);
                }else if(ios_type){
                  
                  addCheckCode("https://gad.netease.com/mmad/point?point_id=13063&s=NkRdEIYOkCDFG4kpGgnOMtfF28Q%3D");
                  
                  downloadIosOnPc();
                }else if(harmony_link) {
                  download(harmony_link);
                }else{
                  showNoPackage(android_no_class);
                }
              }
              break;
          }
        }
        checkDownload();
      })();
    </script>
  </body>

</html>