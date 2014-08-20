# *************************************
#
#   application.js
#
#
# *************************************

indexSlider = $('.index_slider .nivoSlider')
courseSlider = $('.course_slider .nivoSlider')

$(window).load ->
  indexSlider.nivoSlider
    effect: 'sliceDown'
    animSpeed: 800
    pauseTime: 5000
    prevText: '上一張'
    nextText: "下一張"
  courseSlider.nivoSlider()
  return
