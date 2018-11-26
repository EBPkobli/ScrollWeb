$(document).ready(function(){

    var wheel_Count = 0;
    var ctrl_cont = false;
    var exitedImgCount = $(".imgCont").length;
    var indexImg = 1;

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
        if(!ctrl_cont){
        (event.originalEvent.deltaY < 0) ? wheel_Count-- : wheel_Count++;
        wheel_Count = (wheel_Count < -3) ? 0 : wheel_Count;
        wheel_Count = (wheel_Count > 3) ? 0 : wheel_Count;
        if(wheel_Count == 3)
        {
            if(indexImg == exitedImgCount) return;
            var oncekiActive = $(".imgCont.active");
            $(".imgCont.active").removeClass("active").next().addClass("active");
            var sonrakiActive = $(".imgCont.active");
            oncekiActive.animate({
                top: -oncekiActive.height() +"px",
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
                }
            })
            sonrakiActive.animate({
                top: "0px",
                opacity: '1'
            },2000)
            indexImg++;
        }else if(wheel_Count == -3)
        {
            if(indexImg == 1) return;
            var oncekiActive = $(".imgCont.active");
            $(".imgCont.active").removeClass("active").prev().addClass("active");
            var sonrakiActive = $(".imgCont.active");
            oncekiActive.animate({
                top: oncekiActive.height() +"px",
                width : "25vw" ,
             // height :"25vh" ,
                opacity: '0'
            },2000,function()
            {
                oncekiActive.css({"width":"100vw" , "height" : "100vh"});
            });
            sonrakiActive.animate({
                top: "0px",
                opacity: '1'
            },2000);
            indexImg--;
        }
        
    }
    //------------
    });
});