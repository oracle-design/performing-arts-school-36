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
  return

$(document).ready ->
  $(".bxslider").bxSlider
    video: true
    adaptiveHeight: true
    captions: true
  null

$(window).load ->
  if window.innerWidth >= 600
    newsHeight= indexNewsBlock.height()-23
    facebookBlock.height(newsHeight)
    null

