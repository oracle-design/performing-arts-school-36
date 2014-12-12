# *************************************
#
#   application.js
#
#
# *************************************

`// Slider blocks`
indexSlider = $('.index_slider .nivoSlider')
courseSlider = $('.course_slider .nivoSlider')
activitiesSlider = $('.activities_slider .nivoSlider')
`// facebook block`
facebookBlock = $('.facebook_block')
`// index_news`
indexNewsBlock = $('.index_news')
indexNewsLastHeight = indexNewsBlock.height()

$(window).load ->
  `// using nivoSlider`
  indexSlider.add(courseSlider).add(activitiesSlider).nivoSlider
    effect: 'sliceDown'
    animSpeed: 800
    pauseTime: 5000
    prevText: '上一張'
    nextText: "下一張"
    null

  newsHeight = indexNewsBlock.height()-34
  facebookBlockWidth = facebookBlock.width()
  facebookBlock.height(newsHeight)
  setTimeout(1000)
  facebookBlock.html('<div class="fb-like-box"' +
    'data-href="https://www.facebook.com/jw.utheatre"' +
    'data-width="' + facebookBlockWidth + '" data-height="' + newsHeight + '" data-show-faces="false"' +
    'data-stream="true" data-show-border="false" data-header="false"></div>'
    )

  $(".bxslider").bxSlider
    # video: true
    auto: true
    speed: 1500
    adaptiveHeight: true
    captions: true
  $('body').animate
    'opacity': "1", 1000
    ->
      $.timeline_right_position_top = 0
      $.timeline_old_right_position_top = 0
      $.timeline_left_position_top = 0
      $.timeline_old_left_position_top = 0
      w_width = $(".container").width()
      $.timeline_item_width = (w_width - 50) / 2
      $(".time_line_wap").each ->

        #if class name already exit remove
        $(this).children("a.left_timer").remove()
        $(this).children("a.right_timer").remove()
        $(this).removeClass "left_timeline"
        $(this).removeClass "right_timeline"
        if $(window).width() < 600
          $("#templatemo_timeline .container-fluid").css position: "absolute"
          positon_left = 20

          #put on right
          $(this).css
            left: 10
            top: $.timeline_right_position_top
            width: 320 - positon_left

          $(this).addClass "right_timeline"
          $.timeline_old_right_position_top = $.timeline_right_position_top
          $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40
          $(this).prepend "<a href=\"#\" class=\"right_timer\"><span class=\"fa fa-child\"></span></a>"
          $(this).children("a.right_timer").css
            left: -86
            width: 60

        else if $.timeline_left_position_top is 0
          $("#templatemo_timeline .container-fluid").css position: "relative"

          #put on left
          $(this).css
            left: 0
            top: 0
            width: $.timeline_item_width - 50

          $(this).addClass "left_timeline"
          $.timeline_old_left_position_top = $.timeline_left_position_top
          $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40
          $(this).prepend "<a href=\"#\" class=\"left_timer\"><span class=\"fa fa-child\"></span></a>"
          $(this).children("a.left_timer").css left: $.timeline_item_width - 50
        else if $.timeline_right_position_top < $.timeline_left_position_top
          $("#templatemo_timeline .container-fluid").css position: "relative"
          $.timeline_right_position_top = (if ($.timeline_old_left_position_top + 40) < $.timeline_right_position_top then $.timeline_right_position_top else $.timeline_right_position_top + 40)

          #put on right
          $(this).css
            left: $.timeline_item_width + 79
            top: $.timeline_right_position_top
            width: $.timeline_item_width - 50

          $(this).addClass "right_timeline"
          $.timeline_old_right_position_top = $.timeline_right_position_top
          $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40
          $(this).prepend "<a href=\"#\" class=\"right_timer\"><span class=\"fa fa-child\"></span></a>"
          $(this).children("a.right_timer").css left: -99
        else
          $("#templatemo_timeline .container-fluid").css position: "relative"
          $.timeline_left_position_top = (if ($.timeline_old_right_position_top + 40) < $.timeline_left_position_top then $.timeline_left_position_top else $.timeline_left_position_top + 40)

          #put on left
          $(this).css
            left: 0
            top: $.timeline_left_position_top
            width: $.timeline_item_width - 50

          $(this).addClass "left_timeline"
          $.timeline_old_left_position_top = $.timeline_left_position_top
          $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40
          $(this).prepend "<a href=\"#\" class=\"left_timer\"><span class=\"fa fa-child\"></span></a>"
          $(this).children("a.left_timer").css left: $.timeline_item_width - 50

        #calculate and define container height
        if $.timeline_left_position_top > $.timeline_right_position_top
          $("#templatemo_timeline .container-fluid").height $.timeline_left_position_top - 40
          $("#templatemo_timeline").height $.timeline_left_position_top + 80
        else
          $("#templatemo_timeline .container-fluid").height $.timeline_right_position_top - 40
          $("#templatemo_timeline").height $.timeline_right_position_top + 70
        $(this).fadeIn()
        $('#templatemo_timeline').animate
          "opacity": "1"
        return

  null
