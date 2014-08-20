(function() {
  var courseSlider, indexSlider;

  indexSlider = $('.index_slider .nivoSlider');

  courseSlider = $('.course_slider .nivoSlider');

  $(window).load(function() {
    indexSlider.nivoSlider({
      effect: 'sliceDown',
      animSpeed: 800,
      pauseTime: 5000,
      prevText: '上一張',
      nextText: "下一張"
    });
    courseSlider.nivoSlider();
  });

}).call(this);
