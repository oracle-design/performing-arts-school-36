$(window).on("load resize", function(){
  $.timeline_right_position_top = 0 ;
  $.timeline_old_right_position_top = 0 ;
  $.timeline_left_position_top = 0 ;
  $.timeline_old_left_position_top = 0 ;
  w_width = $('.container').width()
  $.timeline_item_width = ( w_width - 50) / 2;
  $(".time_line_wap").each(function(){
      //if class name already exit remove
      $(this).children("a.left_timer").remove();
      $(this).children("a.right_timer").remove();
      $(this).removeClass("left_timeline");
      $(this).removeClass("right_timeline");
      if($(window).width()<600){
          $("#templatemo_timeline .container-fluid").css({"position":"absolute"});
          positon_left = 20;
          //put on right
          $(this).css({
                              'left': 10,
                              'top':$.timeline_right_position_top,
                              'width': 320 - positon_left
                           });
          $(this).addClass("right_timeline");
          $.timeline_old_right_position_top = $.timeline_right_position_top;
          $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40 ;
          $(this).prepend("<a href=\"#\" class=\"right_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.right_timer").css({left:-86, width: 60 ,});
      }else if($.timeline_left_position_top == 0){
          $("#templatemo_timeline .container-fluid").css({"position":"relative"});
          //put on left
          $(this).css({
                              'left':0,
                              'top':0,
                              'width': $.timeline_item_width - 50
                           });
          $(this).addClass("left_timeline");
          $.timeline_old_left_position_top = $.timeline_left_position_top;
          $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40 ;
          $(this).prepend("<a href=\"#\" class=\"left_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.left_timer").css({left:$.timeline_item_width-50,});
      }else if( $.timeline_right_position_top < $.timeline_left_position_top ){
          $("#templatemo_timeline .container-fluid").css({"position":"relative"});
          $.timeline_right_position_top = ($.timeline_old_left_position_top + 40) < $.timeline_right_position_top  ? $.timeline_right_position_top : $.timeline_right_position_top + 40;
          //put on right
          $(this).css({
                              'left': $.timeline_item_width + 79,
                              'top':$.timeline_right_position_top,
                              'width': $.timeline_item_width - 50
                           });
          $(this).addClass("right_timeline");
          $.timeline_old_right_position_top = $.timeline_right_position_top;
          $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40 ;
          $(this).prepend("<a href=\"#\" class=\"right_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.right_timer").css({left:-99,});
      }else{
          $("#templatemo_timeline .container-fluid").css({"position":"relative"});
          $.timeline_left_position_top = ($.timeline_old_right_position_top + 40) < $.timeline_left_position_top ? $.timeline_left_position_top : $.timeline_left_position_top + 40;
          //put on left
          $(this).css({
                              'left':0,
                              'top':$.timeline_left_position_top,
                              'width': $.timeline_item_width - 50
                           });
          $(this).addClass("left_timeline");
          $.timeline_old_left_position_top = $.timeline_left_position_top;
          $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40 ;
          $(this).prepend("<a href=\"#\" class=\"left_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.left_timer").css({left:$.timeline_item_width-50,});
      }
      //calculate and define container height
      if($.timeline_left_position_top > $.timeline_right_position_top ){
          $("#templatemo_timeline .container-fluid").height($.timeline_left_position_top-40);
          $("#templatemo_timeline").height($.timeline_left_position_top+80);
      }else{
          $("#templatemo_timeline .container-fluid").height($.timeline_right_position_top-40);
          $("#templatemo_timeline").height($.timeline_right_position_top+70);
      }
      $(this).fadeIn();
  });
});
