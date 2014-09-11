(function() {
  // Slider blocks;
  var activitiesSlider, courseSlider, indexSlider;

  indexSlider = $('.index_slider .nivoSlider');

  courseSlider = $('.course_slider .nivoSlider');

  activitiesSlider = $('.activities_slider .nivoSlider');

  $(window).load(function() {
    // using nivoSlider;
    indexSlider.add(courseSlider).add(activitiesSlider).nivoSlider({
      effect: 'sliceDown',
      animSpeed: 800,
      pauseTime: 5000,
      prevText: '上一張',
      nextText: "下一張"
    });
  });

}).call(this);
