(function() {
  // Slider blocks;
  var activitiesSlider, courseSlider, facebookBlock, indexNewsBlock, indexNewsLastHeight, indexSlider;

  indexSlider = $('.index_slider .nivoSlider');

  courseSlider = $('.course_slider .nivoSlider');

  activitiesSlider = $('.activities_slider .nivoSlider');

  // facebook block;

  facebookBlock = $('.facebook_block');

  // index_news;

  indexNewsBlock = $('.index_news');

  indexNewsLastHeight = indexNewsBlock.height();

  $(window).load(function() {
    // using nivoSlider;
    var newsHeight;
    indexSlider.add(courseSlider).add(activitiesSlider).nivoSlider({
      effect: 'sliceDown',
      animSpeed: 800,
      pauseTime: 5000,
      prevText: '上一張',
      nextText: "下一張"
    });
    if (window.innerWidth >= 600) {
      newsHeight = indexNewsBlock.height() - 54;
      facebookBlock.height(newsHeight);
      null;
    }
    $(".bxslider").bxSlider({
      video: true,
      adaptiveHeight: true,
      captions: true
    });
    $('body').animate({
      'opacity': "1"
    }, 1000, function() {
      var w_width;
      $.timeline_right_position_top = 0;
      $.timeline_old_right_position_top = 0;
      $.timeline_left_position_top = 0;
      $.timeline_old_left_position_top = 0;
      w_width = $(".container").width();
      $.timeline_item_width = (w_width - 50) / 2;
      return $(".time_line_wap").each(function() {
        var positon_left;
        $(this).children("a.left_timer").remove();
        $(this).children("a.right_timer").remove();
        $(this).removeClass("left_timeline");
        $(this).removeClass("right_timeline");
        if ($(window).width() < 600) {
          $("#templatemo_timeline .container-fluid").css({
            position: "absolute"
          });
          positon_left = 20;
          $(this).css({
            left: 10,
            top: $.timeline_right_position_top,
            width: 320 - positon_left
          });
          $(this).addClass("right_timeline");
          $.timeline_old_right_position_top = $.timeline_right_position_top;
          $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40;
          $(this).prepend("<a href=\"#\" class=\"right_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.right_timer").css({
            left: -86,
            width: 60
          });
        } else if ($.timeline_left_position_top === 0) {
          $("#templatemo_timeline .container-fluid").css({
            position: "relative"
          });
          $(this).css({
            left: 0,
            top: 0,
            width: $.timeline_item_width - 50
          });
          $(this).addClass("left_timeline");
          $.timeline_old_left_position_top = $.timeline_left_position_top;
          $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40;
          $(this).prepend("<a href=\"#\" class=\"left_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.left_timer").css({
            left: $.timeline_item_width - 50
          });
        } else if ($.timeline_right_position_top < $.timeline_left_position_top) {
          $("#templatemo_timeline .container-fluid").css({
            position: "relative"
          });
          $.timeline_right_position_top = (($.timeline_old_left_position_top + 40) < $.timeline_right_position_top ? $.timeline_right_position_top : $.timeline_right_position_top + 40);
          $(this).css({
            left: $.timeline_item_width + 79,
            top: $.timeline_right_position_top,
            width: $.timeline_item_width - 50
          });
          $(this).addClass("right_timeline");
          $.timeline_old_right_position_top = $.timeline_right_position_top;
          $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40;
          $(this).prepend("<a href=\"#\" class=\"right_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.right_timer").css({
            left: -99
          });
        } else {
          $("#templatemo_timeline .container-fluid").css({
            position: "relative"
          });
          $.timeline_left_position_top = (($.timeline_old_right_position_top + 40) < $.timeline_left_position_top ? $.timeline_left_position_top : $.timeline_left_position_top + 40);
          $(this).css({
            left: 0,
            top: $.timeline_left_position_top,
            width: $.timeline_item_width - 50
          });
          $(this).addClass("left_timeline");
          $.timeline_old_left_position_top = $.timeline_left_position_top;
          $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40;
          $(this).prepend("<a href=\"#\" class=\"left_timer\"><span class=\"fa fa-child\"></span></a>");
          $(this).children("a.left_timer").css({
            left: $.timeline_item_width - 50
          });
        }
        if ($.timeline_left_position_top > $.timeline_right_position_top) {
          $("#templatemo_timeline .container-fluid").height($.timeline_left_position_top - 40);
          $("#templatemo_timeline").height($.timeline_left_position_top + 80);
        } else {
          $("#templatemo_timeline .container-fluid").height($.timeline_right_position_top - 40);
          $("#templatemo_timeline").height($.timeline_right_position_top + 70);
        }
        $(this).fadeIn();
        $('#templatemo_timeline').animate({
          "opacity": "1"
        });
      });
    });
    return null;
  });

}).call(this);
