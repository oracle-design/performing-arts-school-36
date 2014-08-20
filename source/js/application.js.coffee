# *************************************
#
#   application.js
#
#
# *************************************
$(window).load ->
  $(".nivoSlider").nivoSlider
    effect: 'sliceDown'
    animSpeed: 800
    pauseTime: 5000
    prevText: '上一張'
    nextText: "下一張"
  return
