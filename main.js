$(document).ready(function(){

    var wheel_Count = 0;
    var ctrl_cont = false;
    var exitedImgCount = $(".imgCont").length;
    var indexImg = 1;
    var animasyonKont = false;

    $(".imgCont").each(function () {
        $( this ).css({"top": $( this ).height()+"px", "opacity" : "0"});
    });
    $(".imgCont.active").css({"top" : "0px", "opacity": "1"});

    //eğer kullanıcı sayfaya yaklaşmak isterse CTRL+WHEEL yapıcak
    //aynı zamanda sayfa kaymasını istemiyorum şimdilik böyle kalsın
    //CTRL basıp basmadığını ayırt etmiyor
    $( window ).keyup(function() {
        ctrl_cont = false;
      });

    $( window ).keydown(function() {
        ctrl_cont = true;
      });
    //-------------------------------

    //işte wheel eventı burada dönüyor
    $('.container').on('mousewheel', function(event) {
        if(!ctrl_cont && !animasyonKont){
        (event.originalEvent.deltaY < 0) ? wheel_Count-- : wheel_Count++;
        wheel_Count = (wheel_Count < -3) ? 0 : wheel_Count;
        wheel_Count = (wheel_Count > 3) ? 0 : wheel_Count;
        if(wheel_Count == 3)
        {
            if(sayfaAnimasyon(1)<0) return;
        }else if(wheel_Count == -3)
        {
            if(sayfaAnimasyon(-1)<0) return;
        }
        
    }
    //------------
    });

    //Jquery mobile kütüphanesini buglı ve özensiz bulduğum için 0 dan yazdım
    //düz javascript ile
    var el = document.getElementsByClassName("active")[0];
    var myTouches = new Array();
    el.addEventListener("touchmove", handleMove, false);
    function handleMove(evt) {
        if(animasyonKont) return;
        evt.preventDefault();
        var touches = evt.changedTouches;
        myTouches.push(touches[0].clientY);

        //--------------------
        if(myTouches[myTouches.length-1]-myTouches[0] > 50){
            if(sayfaAnimasyon(-1)<0) return;
            while(myTouches.length > 0) {
                myTouches.pop();
            }
            delete el;
            el = document.getElementsByClassName("active")[0];
            el.addEventListener("touchmove", handleMove, false);
        }
        //---------------------

        //---------------------
        else if(myTouches[myTouches.length-1] - myTouches[0] < -50 )
        {
            if(sayfaAnimasyon(1)<0) return;
            while(myTouches.length > 0) {
                myTouches.pop();
            }
            delete el;
            el = document.getElementsByClassName("active")[0];
            el.addEventListener("touchmove", handleMove, false);
        }
        //---------------------
        else if(myTouches.length > 10)
        {
            while(myTouches.length > 0)
            {
                myTouches.pop();
            }
        }
    }

    function sayfaAnimasyon(ileriGeri){
        if(indexImg == ((ileriGeri >=1) ? exitedImgCount : 1)) return -1;
        var oncekiActive = $(".imgCont.active");
        if(ileriGeri>=1)
            $(".imgCont.active").removeClass("active").next().addClass("active");
        else
            $(".imgCont.active").removeClass("active").prev().addClass("active");  
        var sonrakiActive = $(".imgCont.active");
        animasyonKont = true;
        oncekiActive.animate({
            top: ((ileriGeri >=1) ? -1 : 1) * oncekiActive.height() +"px",
            opacity: '0',
            textIndent: 0.5
        },{
            duration : 2000,
            step: function(now)
            {
                oncekiActive.css('-webkit-transform','scale('+now+')'); 
            },
            complete : function(){
                oncekiActive.css({"-webkit-transform":"scale(1)","text-indent":"1px"});// , "height" : "100vh"});
                animasyonKont = false;
            }
        })
        sonrakiActive.animate({
            top: "0px",
            opacity: '1'
        },2000)
        indexImg += (ileriGeri >=1) ? 1: -1;
    }

});