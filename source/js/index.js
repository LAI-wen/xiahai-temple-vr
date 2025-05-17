$(document).ready(function() {
   $(window).scroll(function() {
    if ($(this).scrollTop() > 1){  
        $('header') .addClass("down");

      }
    else{
        $('header') .removeClass("down"); 
      }
  });
  

  //選單
   $('.showmenu').on('click',  function(e){
      e.preventDefault();
      $('body').toggleClass('menu-show');
  });
   //btn特效
  if (Waves) {
    Waves.init({ duration: 1000 })
    Waves.attach('.btn', ['waves-float']);
    Waves.attach('.box-img', ['waves-block']);
  }

  //垂直視差
  const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]','[is-inview]'),
      smooth: true,
      repeat: true,
      smartphone: {
        smooth: false
      },
      reloadOnContextChange: true
  });
  scroll.on('call', func => {
      // Using modularJS
      this.call(...func);
      // Using jQuery events
      $(document).trigger(func);
      // Or do it your own way 
  });
  //漢堡
    const forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

    const hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {

      forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
          this.classList.toggle("is-active");
        }, false);
        
      });
    }
});
var percent = 0

  var timer = setInterval(function(){
    $(".bar").css("width",percent+"%")
    percent+=1
    if (percent>100){
      $(".pageLoading").addClass("complete")
      clearInterval(timer)
    }

  },2)




