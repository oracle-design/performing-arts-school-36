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
    indexSlider.add(courseSlider).add(activitiesSlider).nivoSlider({
      effect: 'sliceDown',
      animSpeed: 800,
      pauseTime: 5000,
      prevText: '上一張',
      nextText: "下一張"
    });
  });

  $(window).load(function() {
    var newsHeight;
    if (window.innerWidth >= 600) {
      newsHeight = indexNewsBlock.height() - 23;
      facebookBlock.height(newsHeight);
      return null;
    }
  });

}).call(this);
