/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})( jQuery );
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

  var plugin = {};

  var defaults = {

    // GENERAL
    mode: 'horizontal',
    slideSelector: '',
    infiniteLoop: true,
    hideControlOnEnd: false,
    speed: 500,
    easing: null,
    slideMargin: 0,
    startSlide: 0,
    randomStart: false,
    captions: false,
    ticker: false,
    tickerHover: false,
    adaptiveHeight: false,
    adaptiveHeightSpeed: 500,
    video: false,
    useCSS: true,
    preloadImages: 'visible',
    responsive: true,
    slideZIndex: 50,
    wrapperClass: 'bx-wrapper',

    // TOUCH
    touchEnabled: true,
    swipeThreshold: 50,
    oneToOneTouch: true,
    preventDefaultSwipeX: true,
    preventDefaultSwipeY: false,

    // PAGER
    pager: true,
    pagerType: 'full',
    pagerShortSeparator: ' / ',
    pagerSelector: null,
    buildPager: null,
    pagerCustom: null,

    // CONTROLS
    controls: true,
    nextText: 'Next',
    prevText: 'Prev',
    nextSelector: null,
    prevSelector: null,
    autoControls: false,
    startText: 'Start',
    stopText: 'Stop',
    autoControlsCombine: false,
    autoControlsSelector: null,

    // AUTO
    auto: false,
    pause: 4000,
    autoStart: true,
    autoDirection: 'next',
    autoHover: false,
    autoDelay: 0,
    autoSlideForOnePage: false,

    // CAROUSEL
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 0,
    slideWidth: 0,

    // CALLBACKS
    onSliderLoad: function() {},
    onSlideBefore: function() {},
    onSlideAfter: function() {},
    onSlideNext: function() {},
    onSlidePrev: function() {},
    onSliderResize: function() {}
  }

  $.fn.bxSlider = function(options){

    if(this.length == 0) return this;

    // support mutltiple elements
    if(this.length > 1){
      this.each(function(){$(this).bxSlider(options)});
      return this;
    }

    // create a namespace to be used throughout the plugin
    var slider = {};
    // set a reference to our slider element
    var el = this;
    plugin.el = this;

    /**
     * Makes slideshow responsive
     */
    // first get the original window dimens (thanks alot IE)
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();



    /**
     * ===================================================================================
     * = PRIVATE FUNCTIONS
     * ===================================================================================
     */

    /**
     * Initializes namespace settings to be used throughout plugin
     */
    var init = function(){
      // merge user-supplied options with the defaults
      slider.settings = $.extend({}, defaults, options);
      // parse slideWidth setting
      slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
      // store the original children
      slider.children = el.children(slider.settings.slideSelector);
      // check if actual number of slides is less than minSlides / maxSlides
      if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
      if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
      // if random start, set the startSlide setting to random number
      if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
      // store active slide information
      slider.active = { index: slider.settings.startSlide }
      // store if the slider is in carousel mode (displaying / moving multiple slides)
      slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
      // if carousel, force preloadImages = 'all'
      if(slider.carousel) slider.settings.preloadImages = 'all';
      // calculate the min / max width thresholds based on min / max number of slides
      // used to setup and update carousel slides dimensions
      slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
      slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
      // store the current state of the slider (if currently animating, working is true)
      slider.working = false;
      // initialize the controls object
      slider.controls = {};
      // initialize an auto interval
      slider.interval = null;
      // determine which property to use for transitions
      slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
      // determine if hardware acceleration can be used
      slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
        // create our test div element
        var div = document.createElement('div');
        // css transition properties
        var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
        // test for each property
        for(var i in props){
          if(div.style[props[i]] !== undefined){
            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
            slider.animProp = '-' + slider.cssPrefix + '-transform';
            return true;
          }
        }
        return false;
      }());
      // if vertical mode always make maxSlides and minSlides equal
      if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
      // save original style data
      el.data("origStyle", el.attr("style"));
      el.children(slider.settings.slideSelector).each(function() {
        $(this).data("origStyle", $(this).attr("style"));
      });
      // perform all DOM / CSS modifications
      setup();
    }

    /**
     * Performs all DOM and CSS modifications
     */
    var setup = function(){
      // wrap el in a wrapper
      el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
      // store a namspace reference to .bx-viewport
      slider.viewport = el.parent();
      // add a loading div to display while images are loading
      slider.loader = $('<div class="bx-loading" />');
      slider.viewport.prepend(slider.loader);
      // set el to a massive width, to hold any needed slides
      // also strip any margin and padding from el
      el.css({
        width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
        position: 'relative'
      });
      // if using CSS, add the easing property
      if(slider.usingCSS && slider.settings.easing){
        el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
      // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
      }else if(!slider.settings.easing){
        slider.settings.easing = 'swing';
      }
      var slidesShowing = getNumberSlidesShowing();
      // make modifications to the viewport (.bx-viewport)
      slider.viewport.css({
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      });
      slider.viewport.parent().css({
        maxWidth: getViewportMaxWidth()
      });
      // make modification to the wrapper (.bx-wrapper)
      if(!slider.settings.pager) {
        slider.viewport.parent().css({
        margin: '0 auto 0px'
        });
      }
      // apply css to all slider children
      slider.children.css({
        'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
        listStyle: 'none',
        position: 'relative'
      });
      // apply the calculated width after the float is applied to prevent scrollbar interference
      slider.children.css('width', getSlideWidth());
      // if slideMargin is supplied, add the css
      if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
      if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
      // if "fade" mode, add positioning and z-index CSS
      if(slider.settings.mode == 'fade'){
        slider.children.css({
          position: 'absolute',
          zIndex: 0,
          display: 'none'
        });
        // prepare the z-index on the showing element
        slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
      }
      // create an element to contain all slider controls (pager, start / stop, etc)
      slider.controls.el = $('<div class="bx-controls" />');
      // if captions are requested, add them
      if(slider.settings.captions) appendCaptions();
      // check if startSlide is last slide
      slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
      // if video is true, set up the fitVids plugin
      if(slider.settings.video) el.fitVids();
      // set the default preload selector (visible)
      var preloadSelector = slider.children.eq(slider.settings.startSlide);
      if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
      // only check for control addition if not in "ticker" mode
      if(!slider.settings.ticker){
        // if pager is requested, add it
        if(slider.settings.pager) appendPager();
        // if controls are requested, add them
        if(slider.settings.controls) appendControls();
        // if auto is true, and auto controls are requested, add them
        if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
        // if any control option is requested, add the controls wrapper
        if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
      // if ticker mode, do not allow a pager
      }else{
        slider.settings.pager = false;
      }
      // preload all images, then perform final DOM / CSS modifications that depend on images being loaded
      loadElements(preloadSelector, start);
    }

    var loadElements = function(selector, callback){
      var total = selector.find('img, iframe').length;
      if (total == 0){
        callback();
        return;
      }
      var count = 0;
      selector.find('img, iframe').each(function(){
        $(this).one('load', function() {
          if(++count == total) callback();
        }).each(function() {
          if(this.complete) $(this).load();
        });
      });
    }

    /**
     * Start the slider
     */
    var start = function(){
      // if infinite loop, prepare additional slides
      if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
        var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
        var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
        var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
        el.append(sliceAppend).prepend(slicePrepend);
      }
      // remove the loading DOM element
      slider.loader.remove();
      // set the left / top position of "el"
      setSlidePosition();
      // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
      if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
      // set the viewport height
      slider.viewport.height(getViewportHeight());
      // make sure everything is positioned just right (same as a window resize)
      el.redrawSlider();
      // onSliderLoad callback
      slider.settings.onSliderLoad(slider.active.index);
      // slider has been fully initialized
      slider.initialized = true;
      // bind the resize call to the window
      if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
      // if auto is true and has more than 1 page, start the show
      if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
      // if ticker is true, start the ticker
      if (slider.settings.ticker) initTicker();
      // if pager is requested, make the appropriate pager link active
      if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
      // check for any updates to the controls (like hideControlOnEnd updates)
      if (slider.settings.controls) updateDirectionControls();
      // if touchEnabled is true, setup the touch events
      if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
    }

    /**
     * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
     */
    var getViewportHeight = function(){
      var height = 0;
      // first determine which children (slides) should be used in our height calculation
      var children = $();
      // if mode is not "vertical" and adaptiveHeight is false, include all children
      if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
        children = slider.children;
      }else{
        // if not carousel, return the single active child
        if(!slider.carousel){
          children = slider.children.eq(slider.active.index);
        // if carousel, return a slice of children
        }else{
          // get the individual slide index
          var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
          // add the current slide to the children
          children = slider.children.eq(currentIndex);
          // cycle through the remaining "showing" slides
          for (i = 1; i <= slider.settings.maxSlides - 1; i++){
            // if looped back to the start
            if(currentIndex + i >= slider.children.length){
              children = children.add(slider.children.eq(i - 1));
            }else{
              children = children.add(slider.children.eq(currentIndex + i));
            }
          }
        }
      }
      // if "vertical" mode, calculate the sum of the heights of the children
      if(slider.settings.mode == 'vertical'){
        children.each(function(index) {
          height += $(this).outerHeight();
        });
        // add user-supplied margins
        if(slider.settings.slideMargin > 0){
          height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
        }
      // if not "vertical" mode, calculate the max height of the children
      }else{
        height = Math.max.apply(Math, children.map(function(){
          return $(this).outerHeight(false);
        }).get());
      }

      if(slider.viewport.css('box-sizing') == 'border-box'){
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
              parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
      }else if(slider.viewport.css('box-sizing') == 'padding-box'){
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
      }

      return height;
    }

    /**
     * Returns the calculated width to be used for the outer wrapper / viewport
     */
    var getViewportMaxWidth = function(){
      var width = '100%';
      if(slider.settings.slideWidth > 0){
        if(slider.settings.mode == 'horizontal'){
          width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
        }else{
          width = slider.settings.slideWidth;
        }
      }
      return width;
    }

    /**
     * Returns the calculated width to be applied to each slide
     */
    var getSlideWidth = function(){
      // start with any user-supplied slide width
      var newElWidth = slider.settings.slideWidth;
      // get the current viewport width
      var wrapWidth = slider.viewport.width();
      // if slide width was not supplied, or is larger than the viewport use the viewport width
      if(slider.settings.slideWidth == 0 ||
        (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
        slider.settings.mode == 'vertical'){
        newElWidth = wrapWidth;
      // if carousel, use the thresholds to determine the width
      }else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
        if(wrapWidth > slider.maxThreshold){
          // newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
        }else if(wrapWidth < slider.minThreshold){
          newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
        }
      }
      return newElWidth;
    }

    /**
     * Returns the number of slides currently visible in the viewport (includes partially visible slides)
     */
    var getNumberSlidesShowing = function(){
      var slidesShowing = 1;
      if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
        // if viewport is smaller than minThreshold, return minSlides
        if(slider.viewport.width() < slider.minThreshold){
          slidesShowing = slider.settings.minSlides;
        // if viewport is larger than minThreshold, return maxSlides
        }else if(slider.viewport.width() > slider.maxThreshold){
          slidesShowing = slider.settings.maxSlides;
        // if viewport is between min / max thresholds, divide viewport width by first child width
        }else{
          var childWidth = slider.children.first().width() + slider.settings.slideMargin;
          slidesShowing = Math.floor((slider.viewport.width() +
            slider.settings.slideMargin) / childWidth);
        }
      // if "vertical" mode, slides showing will always be minSlides
      }else if(slider.settings.mode == 'vertical'){
        slidesShowing = slider.settings.minSlides;
      }
      return slidesShowing;
    }

    /**
     * Returns the number of pages (one full viewport of slides is one "page")
     */
    var getPagerQty = function(){
      var pagerQty = 0;
      // if moveSlides is specified by the user
      if(slider.settings.moveSlides > 0){
        if(slider.settings.infiniteLoop){
          pagerQty = Math.ceil(slider.children.length / getMoveBy());
        }else{
          // use a while loop to determine pages
          var breakPoint = 0;
          var counter = 0
          // when breakpoint goes above children length, counter is the number of pages
          while (breakPoint < slider.children.length){
            ++pagerQty;
            breakPoint = counter + getNumberSlidesShowing();
            counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
          }
        }
      // if moveSlides is 0 (auto) divide children length by sides showing, then round up
      }else{
        pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
      }
      return pagerQty;
    }

    /**
     * Returns the number of indivual slides by which to shift the slider
     */
    var getMoveBy = function(){
      // if moveSlides was set by the user and moveSlides is less than number of slides showing
      if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
        return slider.settings.moveSlides;
      }
      // if moveSlides is 0 (auto)
      return getNumberSlidesShowing();
    }

    /**
     * Sets the slider's (el) left or top position
     */
    var setSlidePosition = function(){
      // if last slide, not infinite loop, and number of children is larger than specified maxSlides
      if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
        if (slider.settings.mode == 'horizontal'){
          // get the last child's position
          var lastChild = slider.children.last();
          var position = lastChild.position();
          // set the left position
          setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
        }else if(slider.settings.mode == 'vertical'){
          // get the last showing index's position
          var lastShowingIndex = slider.children.length - slider.settings.minSlides;
          var position = slider.children.eq(lastShowingIndex).position();
          // set the top position
          setPositionProperty(-position.top, 'reset', 0);
        }
      // if not last slide
      }else{
        // get the position of the first showing slide
        var position = slider.children.eq(slider.active.index * getMoveBy()).position();
        // check for last slide
        if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
        // set the repective position
        if (position != undefined){
          if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
          else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
        }
      }
    }

    /**
     * Sets the el's animating property position (which in turn will sometimes animate el).
     * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
     *
     * @param value (int)
     *  - the animating property's value
     *
     * @param type (string) 'slider', 'reset', 'ticker'
     *  - the type of instance for which the function is being
     *
     * @param duration (int)
     *  - the amount of time (in ms) the transition should occupy
     *
     * @param params (array) optional
     *  - an optional parameter containing any variables that need to be passed in
     */
    var setPositionProperty = function(value, type, duration, params){
      // use CSS transform
      if(slider.usingCSS){
        // determine the translate3d value
        var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
        // add the CSS transition-duration
        el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
        if(type == 'slide'){
          // set the property value
          el.css(slider.animProp, propValue);
          // bind a callback method - executes when CSS transition completes
          el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            // unbind the callback
            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
            updateAfterSlideTransition();
          });
        }else if(type == 'reset'){
          el.css(slider.animProp, propValue);
        }else if(type == 'ticker'){
          // make the transition use 'linear'
          el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
          el.css(slider.animProp, propValue);
          // bind a callback method - executes when CSS transition completes
          el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            // unbind the callback
            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
            // reset the position
            setPositionProperty(params['resetValue'], 'reset', 0);
            // start the loop again
            tickerLoop();
          });
        }
      // use JS animate
      }else{
        var animateObj = {};
        animateObj[slider.animProp] = value;
        if(type == 'slide'){
          el.animate(animateObj, duration, slider.settings.easing, function(){
            updateAfterSlideTransition();
          });
        }else if(type == 'reset'){
          el.css(slider.animProp, value)
        }else if(type == 'ticker'){
          el.animate(animateObj, speed, 'linear', function(){
            setPositionProperty(params['resetValue'], 'reset', 0);
            // run the recursive loop after animation
            tickerLoop();
          });
        }
      }
    }

    /**
     * Populates the pager with proper amount of pages
     */
    var populatePager = function(){
      var pagerHtml = '';
      var pagerQty = getPagerQty();
      // loop through each pager item
      for(var i=0; i < pagerQty; i++){
        var linkContent = '';
        // if a buildPager function is supplied, use it to get pager link value, else use index + 1
        if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
          linkContent = slider.settings.buildPager(i);
          slider.pagerEl.addClass('bx-custom-pager');
        }else{
          linkContent = i + 1;
          slider.pagerEl.addClass('bx-default-pager');
        }
        // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
        // add the markup to the string
        pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
      };
      // populate the pager element with pager links
      slider.pagerEl.html(pagerHtml);
    }

    /**
     * Appends the pager to the controls element
     */
    var appendPager = function(){
      if(!slider.settings.pagerCustom){
        // create the pager DOM element
        slider.pagerEl = $('<div class="bx-pager" />');
        // if a pager selector was supplied, populate it with the pager
        if(slider.settings.pagerSelector){
          $(slider.settings.pagerSelector).html(slider.pagerEl);
        // if no pager selector was supplied, add it after the wrapper
        }else{
          slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
        }
        // populate the pager
        populatePager();
      }else{
        slider.pagerEl = $(slider.settings.pagerCustom);
      }
      // assign the pager click binding
      slider.pagerEl.on('click', 'a', clickPagerBind);
    }

    /**
     * Appends prev / next controls to the controls element
     */
    var appendControls = function(){
      slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
      slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
      // bind click actions to the controls
      slider.controls.next.bind('click', clickNextBind);
      slider.controls.prev.bind('click', clickPrevBind);
      // if nextSlector was supplied, populate it
      if(slider.settings.nextSelector){
        $(slider.settings.nextSelector).append(slider.controls.next);
      }
      // if prevSlector was supplied, populate it
      if(slider.settings.prevSelector){
        $(slider.settings.prevSelector).append(slider.controls.prev);
      }
      // if no custom selectors were supplied
      if(!slider.settings.nextSelector && !slider.settings.prevSelector){
        // add the controls to the DOM
        slider.controls.directionEl = $('<div class="bx-controls-direction" />');
        // add the control elements to the directionEl
        slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
        // slider.viewport.append(slider.controls.directionEl);
        slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
      }
    }

    /**
     * Appends start / stop auto controls to the controls element
     */
    var appendControlsAuto = function(){
      slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
      slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
      // add the controls to the DOM
      slider.controls.autoEl = $('<div class="bx-controls-auto" />');
      // bind click actions to the controls
      slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
      slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
      // if autoControlsCombine, insert only the "start" control
      if(slider.settings.autoControlsCombine){
        slider.controls.autoEl.append(slider.controls.start);
      // if autoControlsCombine is false, insert both controls
      }else{
        slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
      }
      // if auto controls selector was supplied, populate it with the controls
      if(slider.settings.autoControlsSelector){
        $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
      // if auto controls selector was not supplied, add it after the wrapper
      }else{
        slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
      }
      // update the auto controls
      updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
    }

    /**
     * Appends image captions to the DOM
     */
    var appendCaptions = function(){
      // cycle through each child
      slider.children.each(function(index){
        // get the image title attribute
        var title = $(this).find('img:first').attr('title');
        // append the caption
        if (title != undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
      });
    }

    /**
     * Click next binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickNextBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      el.goToNextSlide();
      e.preventDefault();
    }

    /**
     * Click prev binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPrevBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      el.goToPrevSlide();
      e.preventDefault();
    }

    /**
     * Click start binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStartBind = function(e){
      el.startAuto();
      e.preventDefault();
    }

    /**
     * Click stop binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStopBind = function(e){
      el.stopAuto();
      e.preventDefault();
    }

    /**
     * Click pager binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPagerBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      var pagerLink = $(e.currentTarget);
      if(pagerLink.attr('data-slide-index') !== undefined){
        var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
        // if clicked pager link is not active, continue with the goToSlide call
        if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
        e.preventDefault();
      }
    }

    /**
     * Updates the pager links with an active class
     *
     * @param slideIndex (int)
     *  - index of slide to make active
     */
    var updatePagerActive = function(slideIndex){
      // if "short" pager type
      var len = slider.children.length; // nb of children
      if(slider.settings.pagerType == 'short'){
        if(slider.settings.maxSlides > 1) {
          len = Math.ceil(slider.children.length/slider.settings.maxSlides);
        }
        slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
        return;
      }
      // remove all pager active classes
      slider.pagerEl.find('a').removeClass('active');
      // apply the active class for all pagers
      slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
    }

    /**
     * Performs needed actions after a slide transition
     */
    var updateAfterSlideTransition = function(){
      // if infinte loop is true
      if(slider.settings.infiniteLoop){
        var position = '';
        // first slide
        if(slider.active.index == 0){
          // set the new position
          position = slider.children.eq(0).position();
        // carousel, last slide
        }else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
          position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
        // last slide
        }else if(slider.active.index == slider.children.length - 1){
          position = slider.children.eq(slider.children.length - 1).position();
        }
        if(position){
          if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
      // declare that the transition is complete
      slider.working = false;
      // onSlideAfter callback
      slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
    }

    /**
     * Updates the auto controls state (either active, or combined switch)
     *
     * @param state (string) "start", "stop"
     *  - the new state of the auto show
     */
    var updateAutoControls = function(state){
      // if autoControlsCombine is true, replace the current control with the new state
      if(slider.settings.autoControlsCombine){
        slider.controls.autoEl.html(slider.controls[state]);
      // if autoControlsCombine is false, apply the "active" class to the appropriate control
      }else{
        slider.controls.autoEl.find('a').removeClass('active');
        slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
      }
    }

    /**
     * Updates the direction controls (checks if either should be hidden)
     */
    var updateDirectionControls = function(){
      if(getPagerQty() == 1){
        slider.controls.prev.addClass('disabled');
        slider.controls.next.addClass('disabled');
      }else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
        // if first slide
        if (slider.active.index == 0){
          slider.controls.prev.addClass('disabled');
          slider.controls.next.removeClass('disabled');
        // if last slide
        }else if(slider.active.index == getPagerQty() - 1){
          slider.controls.next.addClass('disabled');
          slider.controls.prev.removeClass('disabled');
        // if any slide in the middle
        }else{
          slider.controls.prev.removeClass('disabled');
          slider.controls.next.removeClass('disabled');
        }
      }
    }

    /**
     * Initialzes the auto process
     */
    var initAuto = function(){
      // if autoDelay was supplied, launch the auto show using a setTimeout() call
      if(slider.settings.autoDelay > 0){
        var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
      // if autoDelay was not supplied, start the auto show normally
      }else{
        el.startAuto();
      }
      // if autoHover is requested
      if(slider.settings.autoHover){
        // on el hover
        el.hover(function(){
          // if the auto show is currently playing (has an active interval)
          if(slider.interval){
            // stop the auto show and pass true agument which will prevent control update
            el.stopAuto(true);
            // create a new autoPaused value which will be used by the relative "mouseout" event
            slider.autoPaused = true;
          }
        }, function(){
          // if the autoPaused value was created be the prior "mouseover" event
          if(slider.autoPaused){
            // start the auto show and pass true agument which will prevent control update
            el.startAuto(true);
            // reset the autoPaused value
            slider.autoPaused = null;
          }
        });
      }
    }

    /**
     * Initialzes the ticker process
     */
    var initTicker = function(){
      var startPosition = 0;
      // if autoDirection is "next", append a clone of the entire slider
      if(slider.settings.autoDirection == 'next'){
        el.append(slider.children.clone().addClass('bx-clone'));
      // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
      }else{
        el.prepend(slider.children.clone().addClass('bx-clone'));
        var position = slider.children.first().position();
        startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
      }
      setPositionProperty(startPosition, 'reset', 0);
      // do not allow controls in ticker mode
      slider.settings.pager = false;
      slider.settings.controls = false;
      slider.settings.autoControls = false;
      // if autoHover is requested
      if(slider.settings.tickerHover && !slider.usingCSS){
        // on el hover
        slider.viewport.hover(function(){
          el.stop();
        }, function(){
          // calculate the total width of children (used to calculate the speed ratio)
          var totalDimens = 0;
          slider.children.each(function(index){
            totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
          });
          // calculate the speed ratio (used to determine the new speed to finish the paused animation)
          var ratio = slider.settings.speed / totalDimens;
          // determine which property to use
          var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
          // calculate the new speed
          var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
          tickerLoop(newSpeed);
        });
      }
      // start the ticker loop
      tickerLoop();
    }

    /**
     * Runs a continuous loop, news ticker-style
     */
    var tickerLoop = function(resumeSpeed){
      speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
      var position = {left: 0, top: 0};
      var reset = {left: 0, top: 0};
      // if "next" animate left position to last child, then reset left to 0
      if(slider.settings.autoDirection == 'next'){
        position = el.find('.bx-clone').first().position();
      // if "prev" animate left position to 0, then reset left to first non-clone child
      }else{
        reset = slider.children.first().position();
      }
      var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
      var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
      var params = {resetValue: resetValue};
      setPositionProperty(animateProperty, 'ticker', speed, params);
    }

    /**
     * Initializes touch events
     */
    var initTouch = function(){
      // initialize object to contain all touch values
      slider.touch = {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
      }
      slider.viewport.bind('touchstart', onTouchStart);
    }

    /**
     * Event handler for "touchstart"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchStart = function(e){
      if(slider.working){
        e.preventDefault();
      }else{
        // record the original position when touch starts
        slider.touch.originalPos = el.position();
        var orig = e.originalEvent;
        // record the starting touch x, y coordinates
        slider.touch.start.x = orig.changedTouches[0].pageX;
        slider.touch.start.y = orig.changedTouches[0].pageY;
        // bind a "touchmove" event to the viewport
        slider.viewport.bind('touchmove', onTouchMove);
        // bind a "touchend" event to the viewport
        slider.viewport.bind('touchend', onTouchEnd);
      }
    }

    /**
     * Event handler for "touchmove"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchMove = function(e){
      var orig = e.originalEvent;
      // if scrolling on y axis, do not prevent default
      var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
      var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
      // x axis swipe
      if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
        e.preventDefault();
      // y axis swipe
      }else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
        e.preventDefault();
      }
      if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
        var value = 0;
        // if horizontal, drag along x axis
        if(slider.settings.mode == 'horizontal'){
          var change = orig.changedTouches[0].pageX - slider.touch.start.x;
          value = slider.touch.originalPos.left + change;
        // if vertical, drag along y axis
        }else{
          var change = orig.changedTouches[0].pageY - slider.touch.start.y;
          value = slider.touch.originalPos.top + change;
        }
        setPositionProperty(value, 'reset', 0);
      }
    }

    /**
     * Event handler for "touchend"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchEnd = function(e){
      slider.viewport.unbind('touchmove', onTouchMove);
      var orig = e.originalEvent;
      var value = 0;
      // record end x, y positions
      slider.touch.end.x = orig.changedTouches[0].pageX;
      slider.touch.end.y = orig.changedTouches[0].pageY;
      // if fade mode, check if absolute x distance clears the threshold
      if(slider.settings.mode == 'fade'){
        var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
        if(distance >= slider.settings.swipeThreshold){
          slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
          el.stopAuto();
        }
      // not fade mode
      }else{
        var distance = 0;
        // calculate distance and el's animate property
        if(slider.settings.mode == 'horizontal'){
          distance = slider.touch.end.x - slider.touch.start.x;
          value = slider.touch.originalPos.left;
        }else{
          distance = slider.touch.end.y - slider.touch.start.y;
          value = slider.touch.originalPos.top;
        }
        // if not infinite loop and first / last slide, do not attempt a slide transition
        if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
          setPositionProperty(value, 'reset', 200);
        }else{
          // check if distance clears threshold
          if(Math.abs(distance) >= slider.settings.swipeThreshold){
            distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
            el.stopAuto();
          }else{
            // el.animate(property, 200);
            setPositionProperty(value, 'reset', 200);
          }
        }
      }
      slider.viewport.unbind('touchend', onTouchEnd);
    }

    /**
     * Window resize event callback
     */
    var resizeWindow = function(e){
      // don't do anything if slider isn't initialized.
      if(!slider.initialized) return;
      // get the new window dimens (again, thank you IE)
      var windowWidthNew = $(window).width();
      var windowHeightNew = $(window).height();
      // make sure that it is a true window resize
      // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
      // are resized. Can you just die already?*
      if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
        // set the new window dimens
        windowWidth = windowWidthNew;
        windowHeight = windowHeightNew;
        // update all dynamic elements
        el.redrawSlider();
        // Call user resize handler
        slider.settings.onSliderResize.call(el, slider.active.index);
      }
    }

    /**
     * ===================================================================================
     * = PUBLIC FUNCTIONS
     * ===================================================================================
     */

    /**
     * Performs slide transition to the specified slide
     *
     * @param slideIndex (int)
     *  - the destination slide's index (zero-based)
     *
     * @param direction (string)
     *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
     */
    el.goToSlide = function(slideIndex, direction){
      // if plugin is currently in motion, ignore request
      if(slider.working || slider.active.index == slideIndex) return;
      // declare that plugin is in motion
      slider.working = true;
      // store the old index
      slider.oldIndex = slider.active.index;
      // if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
      if(slideIndex < 0){
        slider.active.index = getPagerQty() - 1;
      // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
      }else if(slideIndex >= getPagerQty()){
        slider.active.index = 0;
      // set active index to requested slide
      }else{
        slider.active.index = slideIndex;
      }
      // onSlideBefore, onSlideNext, onSlidePrev callbacks
      slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      if(direction == 'next'){
        slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      }else if(direction == 'prev'){
        slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      }
      // check if last slide
      slider.active.last = slider.active.index >= getPagerQty() - 1;
      // update the pager with active class
      if(slider.settings.pager) updatePagerActive(slider.active.index);
      // // check for direction control update
      if(slider.settings.controls) updateDirectionControls();
      // if slider is set to mode: "fade"
      if(slider.settings.mode == 'fade'){
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // fade out the visible child and reset its z-index value
        slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
        // fade in the newly requested slide
        slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
          $(this).css('zIndex', slider.settings.slideZIndex);
          updateAfterSlideTransition();
        });
      // slider mode is not "fade"
      }else{
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        var moveBy = 0;
        var position = {left: 0, top: 0};
        // if carousel and not infinite loop
        if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
          if(slider.settings.mode == 'horizontal'){
            // get the last child position
            var lastChild = slider.children.eq(slider.children.length - 1);
            position = lastChild.position();
            // calculate the position of the last slide
            moveBy = slider.viewport.width() - lastChild.outerWidth();
          }else{
            // get last showing index position
            var lastShowingIndex = slider.children.length - slider.settings.minSlides;
            position = slider.children.eq(lastShowingIndex).position();
          }
          // horizontal carousel, going previous while on first slide (infiniteLoop mode)
        }else if(slider.carousel && slider.active.last && direction == 'prev'){
          // get the last child position
          var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
          var lastChild = el.children('.bx-clone').eq(eq);
          position = lastChild.position();
        // if infinite loop and "Next" is clicked on the last slide
        }else if(direction == 'next' && slider.active.index == 0){
          // get the last clone position
          position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
          slider.active.last = false;
        // normal non-zero requests
        }else if(slideIndex >= 0){
          var requestEl = slideIndex * getMoveBy();
          position = slider.children.eq(requestEl).position();
        }

        /* If the position doesn't exist
         * (e.g. if you destroy the slider on a next click),
         * it doesn't throw an error.
         */
        if ("undefined" !== typeof(position)) {
          var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
          // plugin values to be animated
          setPositionProperty(value, 'slide', slider.settings.speed);
        }
      }
    }

    /**
     * Transitions to the next slide in the show
     */
    el.goToNextSlide = function(){
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.last) return;
      var pagerIndex = parseInt(slider.active.index) + 1;
      el.goToSlide(pagerIndex, 'next');
    }

    /**
     * Transitions to the prev slide in the show
     */
    el.goToPrevSlide = function(){
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
      var pagerIndex = parseInt(slider.active.index) - 1;
      el.goToSlide(pagerIndex, 'prev');
    }

    /**
     * Starts the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.startAuto = function(preventControlUpdate){
      // if an interval already exists, disregard call
      if(slider.interval) return;
      // create an interval
      slider.interval = setInterval(function(){
        slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
      }, slider.settings.pause);
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
    }

    /**
     * Stops the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.stopAuto = function(preventControlUpdate){
      // if no interval exists, disregard call
      if(!slider.interval) return;
      // clear the interval
      clearInterval(slider.interval);
      slider.interval = null;
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
    }

    /**
     * Returns current slide index (zero-based)
     */
    el.getCurrentSlide = function(){
      return slider.active.index;
    }

    /**
     * Returns current slide element
     */
    el.getCurrentSlideElement = function(){
      return slider.children.eq(slider.active.index);
    }

    /**
     * Returns number of slides in show
     */
    el.getSlideCount = function(){
      return slider.children.length;
    }

    /**
     * Update all dynamic slider elements
     */
    el.redrawSlider = function(){
      // resize all children in ratio to new screen size
      slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
      // adjust the height
      slider.viewport.css('height', getViewportHeight());
      // update the slide position
      if(!slider.settings.ticker) setSlidePosition();
      // if active.last was true before the screen resize, we want
      // to keep it last no matter what screen size we end on
      if (slider.active.last) slider.active.index = getPagerQty() - 1;
      // if the active index (page) no longer exists due to the resize, simply set the index as last
      if (slider.active.index >= getPagerQty()) slider.active.last = true;
      // if a pager is being displayed and a custom pager is not being used, update it
      if(slider.settings.pager && !slider.settings.pagerCustom){
        populatePager();
        updatePagerActive(slider.active.index);
      }
    }

    /**
     * Destroy the current instance of the slider (revert everything back to original state)
     */
    el.destroySlider = function(){
      // don't do anything if slider has already been destroyed
      if(!slider.initialized) return;
      slider.initialized = false;
      $('.bx-clone', this).remove();
      slider.children.each(function() {
        $(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
      });
      $(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
      $(this).unwrap().unwrap();
      if(slider.controls.el) slider.controls.el.remove();
      if(slider.controls.next) slider.controls.next.remove();
      if(slider.controls.prev) slider.controls.prev.remove();
      if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
      $('.bx-caption', this).remove();
      if(slider.controls.autoEl) slider.controls.autoEl.remove();
      clearInterval(slider.interval);
      if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
    }

    /**
     * Reload the slider (revert all DOM changes, and re-initialize)
     */
    el.reloadSlider = function(settings){
      if (settings != undefined) options = settings;
      el.destroySlider();
      init();
    }

    init();

    // returns the current jQuery object
    return this;
  }

})(jQuery);

/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(e){var t=function(t,n){var r=e.extend({},e.fn.nivoSlider.defaults,n);var i={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false,controlNavEl:false};var s=e(t);s.data("nivo:vars",i).addClass("nivoSlider");var o=s.children();o.each(function(){var t=e(this);var n="";if(!t.is("img")){if(t.is("a")){t.addClass("nivo-imageLink");n=t}t=t.find("img:first")}var r=r===0?t.attr("width"):t.width(),s=s===0?t.attr("height"):t.height();if(n!==""){n.css("display","none")}t.css("display","none");i.totalSlides++});if(r.randomStart){r.startSlide=Math.floor(Math.random()*i.totalSlides)}if(r.startSlide>0){if(r.startSlide>=i.totalSlides){r.startSlide=i.totalSlides-1}i.currentSlide=r.startSlide}if(e(o[i.currentSlide]).is("img")){i.currentImage=e(o[i.currentSlide])}else{i.currentImage=e(o[i.currentSlide]).find("img:first")}if(e(o[i.currentSlide]).is("a")){e(o[i.currentSlide]).css("display","block")}var u=e("<img/>").addClass("nivo-main-image");u.attr("src",i.currentImage.attr("src")).show();s.append(u);e(window).resize(function(){s.children("img").width(s.width());u.attr("src",i.currentImage.attr("src"));u.stop().height("auto");e(".nivo-slice").remove();e(".nivo-box").remove()});s.append(e('<div class="nivo-caption"></div>'));var a=function(t){var n=e(".nivo-caption",s);if(i.currentImage.attr("title")!=""&&i.currentImage.attr("title")!=undefined){var r=i.currentImage.attr("title");if(r.substr(0,1)=="#")r=e(r).html();if(n.css("display")=="block"){setTimeout(function(){n.html(r)},t.animSpeed)}else{n.html(r);n.stop().fadeIn(t.animSpeed)}}else{n.stop().fadeOut(t.animSpeed)}};a(r);var f=0;if(!r.manualAdvance&&o.length>1){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}if(r.directionNav){s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+r.prevText+'</a><a class="nivo-nextNav">'+r.nextText+"</a></div>");e(s).on("click","a.nivo-prevNav",function(){if(i.running){return false}clearInterval(f);f="";i.currentSlide-=2;d(s,o,r,"prev")});e(s).on("click","a.nivo-nextNav",function(){if(i.running){return false}clearInterval(f);f="";d(s,o,r,"next")})}if(r.controlNav){i.controlNavEl=e('<div class="nivo-controlNav"></div>');s.after(i.controlNavEl);for(var l=0;l<o.length;l++){if(r.controlNavThumbs){i.controlNavEl.addClass("nivo-thumbs-enabled");var c=o.eq(l);if(!c.is("img")){c=c.find("img:first")}if(c.attr("data-thumb"))i.controlNavEl.append('<a class="nivo-control" rel="'+l+'"><img src="'+c.attr("data-thumb")+'" alt="" /></a>')}else{i.controlNavEl.append('<a class="nivo-control" rel="'+l+'">'+(l+1)+"</a>")}}e("a:eq("+i.currentSlide+")",i.controlNavEl).addClass("active");e("a",i.controlNavEl).bind("click",function(){if(i.running)return false;if(e(this).hasClass("active"))return false;clearInterval(f);f="";u.attr("src",i.currentImage.attr("src"));i.currentSlide=e(this).attr("rel")-1;d(s,o,r,"control")})}if(r.pauseOnHover){s.hover(function(){i.paused=true;clearInterval(f);f=""},function(){i.paused=false;if(f===""&&!r.manualAdvance){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}})}s.bind("nivo:animFinished",function(){u.attr("src",i.currentImage.attr("src"));i.running=false;e(o).each(function(){if(e(this).is("a")){e(this).css("display","none")}});if(e(o[i.currentSlide]).is("a")){e(o[i.currentSlide]).css("display","block")}if(f===""&&!i.paused&&!r.manualAdvance){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}r.afterChange.call(this)});var h=function(t,n,r){if(e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display","block");e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility","hidden").show();var i=e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").parent().is("a")?e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").parent().height():e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").height();for(var s=0;s<n.slices;s++){var o=Math.round(t.width()/n.slices);if(s===n.slices-1){t.append(e('<div class="nivo-slice" name="'+s+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block !important; top:0; left:-"+(o+s*o-o)+'px;" /></div>').css({left:o*s+"px",width:t.width()-o*s+"px",height:i+"px",opacity:"0",overflow:"hidden"}))}else{t.append(e('<div class="nivo-slice" name="'+s+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block !important; top:0; left:-"+(o+s*o-o)+'px;" /></div>').css({left:o*s+"px",width:o+"px",height:i+"px",opacity:"0",overflow:"hidden"}))}}e(".nivo-slice",t).height(i);u.stop().animate({height:e(r.currentImage).height()},n.animSpeed)};var p=function(t,n,r){if(e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display","block");e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility","hidden").show();var i=Math.round(t.width()/n.boxCols),s=Math.round(e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").height()/n.boxRows);for(var o=0;o<n.boxRows;o++){for(var a=0;a<n.boxCols;a++){if(a===n.boxCols-1){t.append(e('<div class="nivo-box" name="'+a+'" rel="'+o+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block; top:-"+s*o+"px; left:-"+i*a+'px;" /></div>').css({opacity:0,left:i*a+"px",top:s*o+"px",width:t.width()-i*a+"px"}));e('.nivo-box[name="'+a+'"]',t).height(e('.nivo-box[name="'+a+'"] img',t).height()+"px")}else{t.append(e('<div class="nivo-box" name="'+a+'" rel="'+o+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block; top:-"+s*o+"px; left:-"+i*a+'px;" /></div>').css({opacity:0,left:i*a+"px",top:s*o+"px",width:i+"px"}));e('.nivo-box[name="'+a+'"]',t).height(e('.nivo-box[name="'+a+'"] img',t).height()+"px")}}}u.stop().animate({height:e(r.currentImage).height()},n.animSpeed)};var d=function(t,n,r,i){var s=t.data("nivo:vars");if(s&&s.currentSlide===s.totalSlides-1){r.lastSlide.call(this)}if((!s||s.stop)&&!i){return false}r.beforeChange.call(this);if(!i){u.attr("src",s.currentImage.attr("src"))}else{if(i==="prev"){u.attr("src",s.currentImage.attr("src"))}if(i==="next"){u.attr("src",s.currentImage.attr("src"))}}s.currentSlide++;if(s.currentSlide===s.totalSlides){s.currentSlide=0;r.slideshowEnd.call(this)}if(s.currentSlide<0){s.currentSlide=s.totalSlides-1}if(e(n[s.currentSlide]).is("img")){s.currentImage=e(n[s.currentSlide])}else{s.currentImage=e(n[s.currentSlide]).find("img:first")}if(r.controlNav){e("a",s.controlNavEl).removeClass("active");e("a:eq("+s.currentSlide+")",s.controlNavEl).addClass("active")}a(r);e(".nivo-slice",t).remove();e(".nivo-box",t).remove();var o=r.effect,f="";if(r.effect==="random"){f=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");o=f[Math.floor(Math.random()*(f.length+1))];if(o===undefined){o="fade"}}if(r.effect.indexOf(",")!==-1){f=r.effect.split(",");o=f[Math.floor(Math.random()*f.length)];if(o===undefined){o="fade"}}if(s.currentImage.attr("data-transition")){o=s.currentImage.attr("data-transition")}s.running=true;var l=0,c=0,d="",m="",g="",y="";if(o==="sliceDown"||o==="sliceDownRight"||o==="sliceDownLeft"){h(t,r,s);l=0;c=0;d=e(".nivo-slice",t);if(o==="sliceDownLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);n.css({top:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="sliceUp"||o==="sliceUpRight"||o==="sliceUpLeft"){h(t,r,s);l=0;c=0;d=e(".nivo-slice",t);if(o==="sliceUpLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);n.css({bottom:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="sliceUpDown"||o==="sliceUpDownRight"||o==="sliceUpDownLeft"){h(t,r,s);l=0;c=0;var b=0;d=e(".nivo-slice",t);if(o==="sliceUpDownLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);if(c===0){n.css("top","0px");c++}else{n.css("bottom","0px");c=0}if(b===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;b++})}else if(o==="fold"){h(t,r,s);l=0;c=0;e(".nivo-slice",t).each(function(){var n=e(this);var i=n.width();n.css({top:"0px",width:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({width:i,opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({width:i,opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="fade"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:t.width()+"px"});m.animate({opacity:"1.0"},r.animSpeed*2,"",function(){t.trigger("nivo:animFinished")})}else if(o==="slideInRight"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:"0px",opacity:"1"});m.animate({width:t.width()+"px"},r.animSpeed*2,"",function(){t.trigger("nivo:animFinished")})}else if(o==="slideInLeft"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:"0px",opacity:"1",left:"",right:"0px"});m.animate({width:t.width()+"px"},r.animSpeed*2,"",function(){m.css({left:"0px",right:""});t.trigger("nivo:animFinished")})}else if(o==="boxRandom"){p(t,r,s);g=r.boxCols*r.boxRows;c=0;l=0;y=v(e(".nivo-box",t));y.each(function(){var n=e(this);if(c===g-1){setTimeout(function(){n.animate({opacity:"1"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1"},r.animSpeed)},100+l)}l+=20;c++})}else if(o==="boxRain"||o==="boxRainReverse"||o==="boxRainGrow"||o==="boxRainGrowReverse"){p(t,r,s);g=r.boxCols*r.boxRows;c=0;l=0;var w=0;var E=0;var S=[];S[w]=[];y=e(".nivo-box",t);if(o==="boxRainReverse"||o==="boxRainGrowReverse"){y=e(".nivo-box",t)._reverse()}y.each(function(){S[w][E]=e(this);E++;if(E===r.boxCols){w++;E=0;S[w]=[]}});for(var x=0;x<r.boxCols*2;x++){var T=x;for(var N=0;N<r.boxRows;N++){if(T>=0&&T<r.boxCols){(function(n,i,s,u,a){var f=e(S[n][i]);var l=f.width();var c=f.height();if(o==="boxRainGrow"||o==="boxRainGrowReverse"){f.width(0).height(0)}if(u===a-1){setTimeout(function(){f.animate({opacity:"1",width:l,height:c},r.animSpeed/1.3,"",function(){t.trigger("nivo:animFinished")})},100+s)}else{setTimeout(function(){f.animate({opacity:"1",width:l,height:c},r.animSpeed/1.3)},100+s)}})(N,T,l,c,g);c++}T--}l+=100}}};var v=function(e){for(var t,n,r=e.length;r;t=parseInt(Math.random()*r,10),n=e[--r],e[r]=e[t],e[t]=n);return e};var m=function(e){if(this.console&&typeof console.log!=="undefined"){console.log(e)}};this.stop=function(){if(!e(t).data("nivo:vars").stop){e(t).data("nivo:vars").stop=true;m("Stop Slider")}};this.start=function(){if(e(t).data("nivo:vars").stop){e(t).data("nivo:vars").stop=false;m("Start Slider")}};r.afterLoad.call(this);return this};e.fn.nivoSlider=function(n){return this.each(function(r,i){var s=e(this);if(s.data("nivoslider")){return s.data("nivoslider")}var o=new t(this,n);s.data("nivoslider",o)})};e.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,controlNav:true,controlNavThumbs:false,pauseOnHover:true,manualAdvance:false,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};e.fn._reverse=[].reverse})(jQuery)
