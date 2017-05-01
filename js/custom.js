$(window).load(function(){
    $(".submenu > a").trigger("click");
});
$(document).ready(function(){

  $(window).resize(function() {
    Width = $(window).width();
    if( Width <=  970 ) {
      if($(".submenu > a").parent("li").hasClass("open")) {
        $(".submenu > a").trigger("click");
      }
    }else{
      if(!($(".submenu > a").parent("li").hasClass("open"))) {
        $(".submenu > a").trigger("click");
      }
    }
  });

  $(".submenu > a").click(function(e) {
    e.preventDefault();
    var $li = $(this).parent("li");
    var $ul = $(this).next("ul");
    if($li.hasClass("open")) {
      $ul.slideUp(350);
      $li.removeClass("open");
    } else {
      $(".nav > li > ul").slideUp(350);
      $(".nav > li").removeClass("open");
      $ul.slideDown(350);
      $li.addClass("open");
    }
  });

});
