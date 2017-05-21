
$(window).load(function(){
  Width = $(window).width();
  if(Width>970){
    $(".submenu > a").trigger("click");
  }
    $(".subsubmenu > a").trigger("click");
    $(".subsubmenu > a").trigger("click");
});

$(document).ready(function(){
  Width = $(window).width();
  if(Width<=970){
    $("#logo-ith").attr("width", "130%")
    if($(".submenu > a").parent("li").hasClass("open")) {
        $(".submenu > a").trigger("click");
      }
  }else{
    $("#logo-ith").attr("width", "100%")
    if(!($(".submenu > a").parent("li").hasClass("open"))) {
        $(".submenu > a").trigger("click");
      }
  }
  $(window).resize(function() {
    Width = $(window).width();
    if( Width <=  970 ) { 
      $("#logo-ith").attr("width", "130%")     
      if($(".submenu > a").parent("li").hasClass("open")) {
        $(".submenu > a").trigger("click");
      }
    }else{
      $("#logo-ith").attr("width", "100%")
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

  $(".subsubmenu > a").click(function(e) {
    e.preventDefault();
    var $li = $(this).parent("li");
    var $ul = $(this).next("ul");
    if($li.hasClass("open")) {
      $ul.slideUp(350);
      $li.removeClass("open");
    } else {
      $(".subnav > li > ul").slideUp(350);
      $(".subnav > li").removeClass("open");
      $ul.slideDown(350);
      $li.addClass("open");
    }
  });
});
