// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












/*!
 * Spinners 3.0.0
 * (c) 2010-2012 Nick Stakenburg - http://www.nickstakenburg.com
 *
 * Spinners is freely distributable under the terms of an MIT-style license.
 *
 * GitHub: http://github.com/staaky/spinners
 */

;var Spinners={version:"3.0.0"};(function(a){function b(a){return a*Math.PI/180}function c(a){this.element=a}function d(b,c){b&&(this.element=b,h.remove(b),h.removeDetached(),this._position=0,this._state="stopped",this.setOptions(a.extend({color:"#000",dashes:12,radius:5,height:5,width:1.8,opacity:1,padding:3,rotation:700},c||{})),this.drawPosition(0),h.add(this))}var e={scroll:function(a,b){if(!b)return a;var c=a.slice(0,b);return a.slice(b,a.length).concat(c)},isElement:function(a){return a&&1==a.nodeType},element:{isAttached:function(){return function(a){for(;a&&a.parentNode;)a=a.parentNode;return!!a&&!!a.body}}()}},f={drawRoundedRectangle:function(c,d){var e=a.extend({top:0,left:0,width:0,height:0,radius:0},d||{}),f=e.left,g=e.top,h=e.width,i=e.height,e=e.radius;c.beginPath(),c.moveTo(f+e,g),c.arc(f+h-e,g+e,e,b(-90),b(0),!1),c.arc(f+h-e,g+i-e,e,b(0),b(90),!1),c.arc(f+e,g+i-e,e,b(90),b(180),!1),c.arc(f+e,g+e,e,b(-180),b(-90),!1),c.closePath(),c.fill()}},g=function(){function a(a){var c=[];0==a.indexOf("#")&&(a=a.substring(1)),a=a.toLowerCase();if(""!=a.replace(b,""))return null;3==a.length?(c[0]=a.charAt(0)+a.charAt(0),c[1]=a.charAt(1)+a.charAt(1),c[2]=a.charAt(2)+a.charAt(2)):(c[0]=a.substring(0,2),c[1]=a.substring(2,4),c[2]=a.substring(4));for(a=0;a<c.length;a++)c[a]=parseInt(c[a],16);return c.red=c[0],c.green=c[1],c.blue=c[2],c}var b=RegExp("[0123456789abcdef]","g"),c=function(){function a(a,b,c){return a=a.toString(c||10),Array(b-a.length).join("0")+a}return function(b,c,d){return"#"+a(b,2,16)+a(c,2,16)+a(d,2,16)}}();return{hex2rgb:a,hex2fill:function(b,c){"undefined"==typeof c&&(c=1);var d=c,e=a(b);return e[3]=d,e.opacity=d,"rgba("+e.join()+")"},rgb2hex:c}}();a.extend(Spinners,{enabled:!1,support:{canvas:function(){var b=a("<canvas>")[0];return!!b.getContext&&!!b.getContext("2d")}()},init:function(){if(this.support.canvas||window.G_vmlCanvasManager&&window.attachEvent&&-1===navigator.userAgent.indexOf("Opera"))window.G_vmlCanvasManager&&window.G_vmlCanvasManager.init_(document),this.enabled=!0},create:function(a,b){return c.create(a,b),this.get(a)},get:function(a){return new c(a)},play:function(a){return this.get(a).play(),this},pause:function(a){return this.get(a).pause(),this},toggle:function(a){return this.get(a).toggle(),this},stop:function(a){return this.get(a).stop(),this},remove:function(a){return this.get(a).remove(),this},removeDetached:function(){return h.removeDetached(),this},center:function(a){return this.get(a).center(),this},setOptions:function(a,b){return this.get(a).setOptions(b),this},getDimensions:function(a){return a=2*h.get(a)[0].getLayout().workspace.radius,{width:a,height:a}}});var h={spinners:[],get:function(b){if(b){var c=[];return a.each(this.spinners,function(d,f){f&&(e.isElement(b)?f.element==b:a(f.element).is(b))&&c.push(f)}),c}},add:function(a){this.spinners.push(a)},remove:function(b){a(a.map(this.spinners,function(c){if(e.isElement(b)?c.element==b:a(c.element).is(b))return c.element})).each(a.proxy(function(a,b){this.removeByElement(b)},this))},removeByElement:function(b){var c=this.get(b)[0];c&&(c.remove(),this.spinners=a.grep(this.spinners,function(a){return a.element!=b}))},removeDetached:function(){a.each(this.spinners,a.proxy(function(a,b){b&&b.element&&!e.element.isAttached(b.element)&&this.remove(b.element)},this))}};a.extend(c,{create:function(b,c){if(b){var f=c||{},g=[];return e.isElement(b)?g.push(new d(b,f)):a(b).each(function(a,b){g.push(new d(b,f))}),g}}}),a.extend(c.prototype,{items:function(){return h.get(this.element)},play:function(){return a.each(this.items(),function(a,b){b.play()}),this},stop:function(){return a.each(this.items(),function(a,b){b.stop()}),this},pause:function(){return a.each(this.items(),function(a,b){b.pause()}),this},toggle:function(){return a.each(this.items(),function(a,b){b.toggle()}),this},center:function(){return a.each(this.items(),function(a,b){b.center()}),this},setOptions:function(b){return a.each(this.items(),function(a,c){c.setOptions(b)}),this},remove:function(){return h.remove(this.element),this}}),a.extend(d.prototype,{setOptions:function(b){this.options=a.extend({},this.options,b||{}),this.options.radii&&(b=this.options.radii,this.options.radius=Math.min(b[0],b[1]),this.options.height=Math.max(b[0],b[1])-this.options.radius),this.options.dashWidth&&(this.options.width=this.options.dashWidth),this.options.speed&&(this.options.duration=1e3*this.options.speed);var b=this._state,c=this._position;this._layout=null,this.build(),c&&c>=this.options.dashes-1&&(this._position=this.options.dashes-1);switch(b){case"playing":this.play();break;case"paused":case"stopped":this.drawPosition(this._position)}this._centered&&this.center()},remove:function(){this.canvas&&(this.pause(),a(this.canvas).remove(),this.ctx=this.canvas=null)},build:function(){this.remove();var b=this.getLayout().workspace.radius;return a(document.body).append(this.canvas=a("<canvas>").attr({width:2*b,height:2*b}).css({zoom:1})),window.G_vmlCanvasManager&&G_vmlCanvasManager.initElement(this.canvas[0]),this.ctx=this.canvas[0].getContext("2d"),this.ctx.globalAlpha=this.options.opacity,a(this.element).append(this.canvas),this.ctx.translate(b,b),this},drawPosition:function(a){var c=this.getLayout().workspace,a=e.scroll(c.opacities,-1*a),d=c.radius,c=this.options.dashes,f=b(360/c);this.ctx.clearRect(-1*d,-1*d,2*d,2*d);for(d=0;d<c;d++)this.drawDash(a[d],this.options.color),this.ctx.rotate(f)},drawDash:function(a,b){this.ctx.fillStyle=g.hex2fill(b,a);var c=this.getLayout(),d=c.workspace.radius,e=c.dash.position,c=c.dash.dimensions;f.drawRoundedRectangle(this.ctx,{top:e.top-d,left:e.left-d,width:c.width,height:c.height,radius:Math.min(c.height,c.width)/2})},_nextPosition:function(){var b=this.options.rotation/this.options.dashes;this.nextPosition(),this._playTimer=window.setTimeout(a.proxy(this._nextPosition,this),b)},nextPosition:function(){this._position==this.options.dashes-1&&(this._position=-1),this._position++,this.drawPosition(this._position)},play:function(){if("playing"!=this._state){this._state="playing";var b=this.options.rotation/this.options.dashes;return this._playTimer=window.setTimeout(a.proxy(this._nextPosition,this),b),this}},pause:function(){if("paused"!=this._state)return this._pause(),this._state="paused",this},_pause:function(){this._playTimer&&(window.clearTimeout(this._playTimer),this._playTimer=null)},stop:function(){if("stopped"!=this._state)return this._pause(),this._position=0,this.drawPosition(0),this._state="stopped",this},toggle:function(){return this["playing"==this._state?"pause":"play"](),this},getLayout:function(){if(this._layout)return this._layout;for(var a=this.options,b=a.dashes,c=a.width,d=a.radius,e=a.radius+a.height,f=Math.max(c,e),f=Math.ceil(Math.max(f,Math.sqrt(e*e+c/2*(c/2)))),a=f+=a.padding,g=1/b,h=[],i=0;i<b;i++)h.push((i+1)*g);return this._layout=b={workspace:{radius:a,opacities:h},dash:{position:{top:f-e,left:f-c/2},dimensions:{width:c,height:e-d}}}},center:function(){var b=2*this.getLayout().workspace.radius;a(this.element.parentNode).css({position:"relative"}),a(this.element).css({position:"absolute",height:b+"px",width:b+"px",top:"50%",left:"50%",marginLeft:-0.5*b+"px",marginTop:-0.5*b+"px"}),this._centered=!0}}),Spinners.init(),Spinners.enabled||(c.create=function(){return[]})})(jQuery);

/*!
 * Lightview - The jQuery Lightbox - v3.4.0
 * (c) 2008-2014 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/lightview
 *
 * License: http://projects.nickstakenburg.com/lightview/license
 */
;var Lightview = {
  version: '3.4.0',

  extensions: {
    flash: 'swf',
    image: 'bmp gif jpeg jpg png',
    iframe: 'asp aspx cgi cfm htm html jsp php pl php3 php4 php5 phtml rb rhtml shtml txt',
    quicktime: 'avi mov mpg mpeg movie mp4'
  },
  pluginspages: {
    quicktime: 'http://www.apple.com/quicktime/download',
    flash: 'http://www.adobe.com/go/getflashplayer'
  }
};

Lightview.Skins = {
  // every possible property is defined on the base skin
  // all other skins inherit from this skin
  'base': {
    ajax: {
      type: 'get'
    },
    background: {
      color: '#fff',
      opacity: 1
    },
    border: {
      size: 0,
      color: '#ccc',
      opacity: 1
    },
    continuous: false,
    controls: {
      close: 'relative',
      slider: {
        items: 5
      },
      text: {
        previous: "Prev", // when modifying this on skins images/css might have to be changed
        next:     "Next"
      },
      thumbnails: {
        spinner: { color: '#777' },
        mousewheel: true
      },
      type: 'relative'
    },
    effects: {
      caption: { show: 180, hide: 180 },
      content: { show: 280, hide: 280 },
      overlay: { show: 240, hide: 280 },
      sides:   { show: 150, hide: 180 },
      spinner: { show: 50,  hide: 100 },
      slider:  { slide: 180 },
      thumbnails: { show: 120, hide: 0, slide: 180, load: 340 },
      window:  { show: 120, hide: 50, resize: 200, position: 180 }
    },
    errors: {
      'missing_plugin': "The content your are attempting to view requires the <a href='#{pluginspage}' target='_blank'>#{type} plugin<\/a>."
    },
    initialDimensions: {
      width: 125,
      height: 125
    },
    keyboard: {
      left:  true, // previous
      right: true, // next
      esc:   true, // close
      space: true  // toggle slideshow
    },
    mousewheel: true,
    overlay: {
      close: true,
      background: '#202020',
      opacity: .85
    },
    padding: 10,
    position: {
      at: 'center',
      offset: { x: 0, y: 0 }
    },
    preload: true,
    radius: {
      size: 0,
      position: 'background'
    },
    shadow: {
      blur: 3,
      color: '#000',
      opacity: .15
    },
    slideshow: {
      delay: 5000
    },
    spacing: {
      relative: { horizontal: 60, vertical: 60 },
      thumbnails: { horizontal: 60, vertical: 60 },
      top: { horizontal: 60, vertical: 60 }
    },
    spinner: { },
    thumbnail: { icon: false },
    viewport: 'scale',
    wrapperClass: false,

    initialTypeOptions: {
      ajax: {
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      flash: {
        width: 550,
        height: 400,
        params: {
          allowFullScreen: 'true',
          allowScriptAccess: 'always',
          wmode: 'transparent'
        },
        flashvars: {},
        keyboard: false,
        mousewheel: false,
        thumbnail: { icon: 'video' },
        viewport: 'scale'
      },
      iframe: {
        width: '100%',
        height: '100%',
        attr: {
          scrolling: 'auto'
        },
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      image: {
        viewport: 'scale'
      },
      inline: {
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      quicktime: {
        width: 640,
        height: 272,
        params: {
          autoplay: true,
          controller: true,
          enablejavascript: true,
          loop: false,
          scale: 'tofit'
        },
        keyboard: false,
        mousewheel: false,
        thumbnail: { icon: 'video' },
        viewport: 'scale'
      }
    }
  },

  // reserved for resetting options on the base skin
  'reset': { },

  // the default skin
  'dark': {
    border: {
      size: 0,
      color: '#000',
      opacity: .25
    },
    radius: { size: 5 },
    background: '#141414',
    shadow: {
      blur: 5,
      opacity: .08
    },
    overlay: {
      background: '#2b2b2b',
      opacity: .85
    },
    spinner: {
      color: '#777'
    }
  },

  'light': {
    border: { opacity: .25 },
    radius: { size: 5 },
    spinner: {
      color: '#333'
    }
  },

  'mac': {
    background: '#fff',
    border: {
      size: 0,
      color: '#dfdfdf',
      opacity: .3
    },
    shadow: {
      blur: 3,
      opacity: .08
    },
    overlay: {
      background: '#2b2b2b',
      opacity: .85
    }
  }
};

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('!L($,D){L 1a(a){M b={};1H(M c 3J a)b[c]=a[c]+"1a";S b}L 9M(a,b){S 15.9N(a*a+b*b)}L 9O(a){S 3w*a/15.5p}L 1I(a){S a*15.5p/3w}L 2W(a){S 7r.9P.5q(7r,a.2D(","))}L 5r(a){D.6k&&6k[6k.5r?"5r":"9Q"](a)}L 6l(a){M b="<"+a.3K;1H(M c 3J a)$.6m(c,"3x 1J 3K".2D(" "))<0&&(b+=" "+c+\'="\'+a[c]+\'"\');S 2y 6n("^(?:9R|7s|9S|br|9T|9U|9V|5s|9W|9X|9Y|9Z|5t|a0|a1|a2)$","i").5u(a.3K)?b+="/>":(b+=">",a.3x&&$.1t(a.3x,L(a,c){b+=6l(c)}),a.1J&&(b+=a.1J),b+="</"+a.3K+">"),b}L 5v(a,b){1H(M c 3J b)b[c]&&b[c].7t&&b[c].7t===a3?(a[c]=2p.2X(a[c])||{},5v(a[c],b[c])):a[c]=b[c];S a}L 2N(a,b){S 5v(2p.2X(a),b)}L 4f(){K.4g.5q(K,1N)}L 6o(a,b){M c,d=(b||6p(a)||"").5w();S $("4I 1K 4J 3L".2D(" ")).1t(L(a,b){$.6m(d,1z.a4[b].2D(" "))>-1&&(c=b)}),c?c:"#"==a.4K(0,1)?"4h":1p.7u&&1p.7u!=a.4L(/(^.*\\/\\/)|(:.*)|(\\/.*)/g,"")?"4J":"1K"}L 6p(a){M b=(a||"").4L(/\\?.*/g,"").6q(/\\.([^.]{3,4})$/);S b?b[1]:1m}L a5(a,b){M c=$.1k({6r:7v,6s:10,6t:1m},1N[2]||{}),d=0;S a.5x=D.a6($.Z(L(){S d+=c.6s,b()?(D.7w(a.5x),a(),3M 0):(d>=c.6r&&(D.7w(a.5x),c.6t&&c.6t()),3M 0)},a),c.6s),a.5x}!L(){L a(a){M b;11(a.5y.7x?b=a.5y.7x/7y:a.5y.7z&&(b=-a.5y.7z/3),b){M c=$.a7("1C:2b");$(a.35).a8(c,b),c.a9()&&a.2O(),c.aa()&&a.2P()}}$(1p.4M).1O("2b ab",a)}();M E={};!L(){M a={};$.1k(a,{ac:L(a){S 15.6u(a,4)}}),$.1t(a,L(a,b){E["ad"+a]=b,E["ae"+a]=L(a){S 1-b(1-a)},E["af"+a]=L(a){S.5>a?b(2*a)/2:1-b(-2*a+2)/2}}),$.1t(E,L(a,b){$.5z[a]||($.5z[a]=b)})}();M F=7A.5A.ag,2p={2X:L(a){S $.1k({},a)},6v:L(a){S a&&1==a.5B},U:{7B:L(){L a(a){1H(M b=a;b&&b.5C;)b=b.5C;S b}S L(b){M c=a(b);S!(!c||!c.3g)}}()}},1h=L(a){L b(b){M c=2y 6n(b+"([\\\\d.]+)").ah(a);S c?5D(c[1]):!0}S{1D:!(!D.ai||-1!==a.2Q("6w"))&&b("aj "),6w:a.2Q("6w")>-1&&(!!D.6x&&6x.6y&&5D(6x.6y())||7.55),5E:a.2Q("7C/")>-1&&b("7C/"),7D:a.2Q("7D")>-1&&-1===a.2Q("ak")&&b("al:"),3h:!!a.6q(/am.*an.*ao/),4N:a.2Q("4N")>-1&&b("4N/")}}(5F.ap),7E=L(){M a=0,b="aq";S L(c){1H(c=c||b,a++;1p.ar(c+a);)a++;S c+a}}(),6z={3N:{2c:{4O:"1.4.4",4P:D.2c&&2c.as.au},7F:{4O:"2.2",4P:D.6A&&6A.av&&"2.2"},2R:{4O:"3.0.0",4P:D.2R&&(2R.6y||2R.aw)}},6B:L(){L b(b){1H(M c=b.6q(a),d=c&&c[1]&&c[1].2D(".")||[],e=0,f=0,g=d.1e;g>f;f++)e+=1X(d[f]*15.6u(10,6-2*f));S c&&c[3]?e-1:e}M a=/^(\\d+(\\.?\\d+){0,3})([A-7G-ax-]+[A-7G-ay-9]+)?/;S L(a){(!K.3N[a].4P||b(K.3N[a].4P)<b(K.3N[a].4O)&&!K.3N[a].7H)&&(K.3N[a].7H=!0,5r("1z az "+a+" >= "+K.3N[a].4O))}}()};!L(){$(1p).7I(L(){L b(b){M c=!1;11(a)c=$.7J(F.3O(5F.4Q),L(a){S a.5G}).6C(",").2Q(b)>=0;2E 4i{c=2y aA(b)}4j(d){}S!!c}M a=5F.4Q&&5F.4Q.1e;1z.4Q=a?{4I:b("aB aC"),3L:b("6D")}:{4I:b("7K.7K"),3L:b("6D.6D")}})}(),$.1k(!0,1z,L(){L c(a){S e(a,"7L")}L d(b,c){1H(M d 3J b)11(3M 0!==a.4k[b[d]])S"7L"==c?b[d]:!0;S!1}L e(a,c){M e=a.3y(0).7M()+a.4K(1),f=(a+" "+b.6C(e+" ")+e).2D(" ");S d(f,c)}L g(){6z.6B("2c"),(K.3i.2F||1h.1D)&&(D.5H&&D.5H.aD(1p),2Y.2S(),P.2S(),P.4R(),I.2S())}M a=1p.3j("13"),b="aE aF O aG aH".2D(" "),f={2F:L(){M a=1p.3j("2F");S!(!a.4S||!a.4S("2d"))}(),aI:L(){4i{S!!1p.7N("aJ")}4j(a){S!1}}(),X:{7O:e("7O"),7P:e("7P"),aK:L(){M a=["aL","aM","aN"],b=!1;S $.1t(a,L(a,c){4i{1p.7N(c),b=!0}4j(d){}}),b}(),aO:1h.1D&&1h.1D<7,aP:c}};S{2S:g,3i:f}}());M G=L(){L c(c,d){c=c||{},c.1L=c.1L||(1z.4l[P.4T]?P.4T:"1C");M e=c.1L?2p.2X(1z.4l[c.1L]||1z.4l[P.4T]):{},f=2N(b,e);d&&(f=5v(f,f.aQ[d]));M g=2N(f,c);11(g.2G){11("7Q"==$.T(g.2G)){M h=b.2G||{},i=a.2G;g.2G={1E:h.1E||i.1E,T:h.T||i.T}}g.2G=2N(i,g.2G)}11(g.1i&&(g.1i="2q"==$.T(g.1i)?2N(f.1i||b.1i||a.1i,{T:g.1i}):2N(a.1i,g.1i)),"2q"==$.T(g.2r))g.2r={1Y:g.2r,1x:1};2E 11(g.2r){M j=g.2r,k=j.1x,l=j.1Y;g.2r={1x:"2z"==$.T(k)?k:1,1Y:"2q"==$.T(l)?l:"#5I"}}11(g.1v||(g.1v={},$.1t(a.1v,L(a,b){$.1t(g.1v[a]=$.1k({},b),L(b){g.1v[a][b]=0})})),1h.3h){M m=g.1v.2T;m.17=0,m.V=0}11(g.1v&&!1z.3i.2F&&1h.1D&&1h.1D<9){M n=g.1v;1h.1D<7&&$.1k(!0,n,{1Z:{17:0,V:0},1w:{17:0,V:0,3k:0},1l:{17:0,V:0},22:{17:0,V:0},2s:{2H:0}}),$.1k(!0,n,{6E:{17:0,V:0}})}11(g.1R){M o,p=b.1R||{},q=a.1R;o="2z"==$.T(g.1R)?{2e:g.1R,1Y:p.1Y||q.1Y,1x:p.1x||q.1x}:"2q"==$.T(g.1R)?{2e:p.2e||q.2e,1Y:g.1R,1x:p.1x||q.1x}:2N(q,g.1R),g.1R=0===o.2e?!1:o}M r=a.Y;11(g.Y||"2z"==$.T(g.Y)){M s,t=b.Y||{};s="2q"==$.T(g.Y)?{at:g.Y,36:t.36||r.36}:"2z"==$.T(g.Y)?{at:"19",36:{x:0,y:g.Y}}:2N(r,g.Y),g.Y=s}2E g.Y=2p.2X(r);11(g.1A||"2z"==$.T(g.1A)){M u,v=b.1A||{},w=a.1A;u="2z"==$.T(g.1A)?{2e:g.1A,Y:v.Y||w.Y}:"2q"==$.T(g.1A)?{2e:v.2e||w.2e,Y:g.Y}:2N(w,g.1A),g.1A=u}11(g.1q){M x,y=b.1q,z=a.1q;x="7Q"==$.T(g.1q)?y&&"1q"==$.T(y)?z:y?y:z:2N(z,g.1q||{}),x.38<1&&(x=!1),g.1q=x}11(g.23){M A,B=b.23||{},C=a.23;A="2q"==$.T(g.23)?{1K:g.23,4m:f.23&&f.23.4m||B.4m||C.4m}:2N(C,g.23),g.23=A}S g.24&&"2z"==$.T(g.24)&&(g.24={6F:g.24}),"1K"!=d&&(g.24=!1),g}M a=1z.4l.7s,b=2N(a,1z.4l.aR);S{2t:c}}(),3P=L(){L c(a){M b=a;S b.7R=a[0],b.7S=a[1],b.7T=a[2],b}L d(a){S 1X(a,16)}L e(a){M e=2y 7A(3);11(0==a.2Q("#")&&(a=a.5J(1)),a=a.5w(),""!=a.4L(b,""))S 1m;3==a.1e?(e[0]=a.3y(0)+a.3y(0),e[1]=a.3y(1)+a.3y(1),e[2]=a.3y(2)+a.3y(2)):(e[0]=a.5J(0,2),e[1]=a.5J(2,4),e[2]=a.5J(4));1H(M f=0;f<e.1e;f++)e[f]=d(e[f]);S c(e)}L f(a,b){M c=e(a);S c[3]=b,c.1x=b,c}L g(a,b){S"7U"==$.T(b)&&(b=1),"aS("+f(a,b).6C()+")"}L h(a){S"#"+(i(a)[2]>50?"5I":"7V")}L i(a){S j(e(a))}L j(a){M f,g,h,a=c(a),b=a.7R,d=a.7S,e=a.7T,i=b>d?b:d;e>i&&(i=e);M j=d>b?b:d;11(j>e&&(j=e),h=i/aT,g=0!=i?(i-j)/i:0,0==g)f=0;2E{M k=(i-b)/(i-j),l=(i-d)/(i-j),m=(i-e)/(i-j);f=b==i?m-l:d==i?2+k-m:4+l-k,f/=6,0>f&&(f+=1)}f=15.2j(aU*f),g=15.2j(2I*g),h=15.2j(2I*h);M n=[];S n[0]=f,n[1]=g,n[2]=h,n.aV=f,n.aW=g,n.aX=h,n}M a="aY",b=2y 6n("["+a+"]","g");S{aZ:e,3Q:g,b0:h}}(),2Z={2S:L(){S D.5H&&!1z.3i.2F&&1h.1D?L(a){5H.b1(a)}:L(){}}(),3k:L(a,b){$(a).1M({Q:b.Q*K.7W,R:b.R*K.7W}).X(1a(b))},6G:L(a){M b=$.1k(!0,{b2:!1,6H:!1,19:0,1b:0,Q:0,R:0,1A:0},1N[1]||{}),c=b,d=c.1b,e=c.19,f=c.Q,g=c.R,h=c.1A;11(c.6H,b.6H){M j=2*h;d-=h,e-=h,f+=j,g+=j}S h?(a.7X(),a.3R(d+h,e),a.2U(d+f-h,e+h,h,1I(-90),1I(0),!1),a.2U(d+f-h,e+g-h,h,1I(0),1I(90),!1),a.2U(d+h,e+g-h,h,1I(90),1I(3w),!1),a.2U(d+h,e+h,h,1I(-3w),1I(-90),!1),a.6I(),a.5K(),3M 0):(a.7Y(e,d,f,g),3M 0)},6J:L(a,b){M c;11("2q"==$.T(b))c=3P.3Q(b);2E 11("2q"==$.T(b.1Y))c=3P.3Q(b.1Y,"2z"==$.T(b.1x)?b.1x.b3(5):1);2E 11($.b4(b.1Y)){M d=$.1k({5L:0,5M:0,5N:0,5O:0},1N[2]||{});c=2Z.7Z.80(a.b5(d.5L,d.5M,d.5N,d.5O),b.1Y,b.1x)}S c},81:L(a,b){M c=$.1k({x:0,y:0,1g:!1,1Y:"#5I",2r:{1Y:"#7V",1x:.7,1A:4}},1N[2]||{}),d=c.2r;11(d&&d.1Y){M e=c.1g;a.4U=3P.3Q(d.1Y,d.1x),2Z.6G(a,{Q:e.Q,R:e.R,19:c.y,1b:c.x,1A:d.1A||0})}1H(M f=0,g=b.1e;g>f;f++)1H(M h=0,i=b[f].1e;i>h;h++){M j=1X(b[f].3y(h))*(1/9)||0;a.4U=3P.3Q(c.1Y,j-.b6),j&&a.7Y(c.x+h,c.y+f,1,1)}}};2Z.7Z={80:L(a,b){1H(M c="2z"==$.T(1N[2])?1N[2]:1,d=0,e=b.1e;e>d;d++){M f=b[d];("7U"==$.T(f.1x)||"2z"!=$.T(f.1x))&&(f.1x=1),a.b7(f.Y,3P.3Q(f.1Y,f.1x*c))}S a}};M H={6K:L(a){M b=P.N;11(!b)S a;11(b.1i)2J(b.1i.T){1y"19":a.R-=J.2k.U.4n();2l;1y"1S":P.1r&&P.1r.1e<=1||(a.R-=J.2K.U.4n())}M c=b.Y&&b.Y.36;S c&&(c.x&&(a.Q-=c.x),c.y&&(a.R-=c.y)),a},26:L(){M a={R:$(D).R(),Q:$(D).Q()};11(1h.3h){M b=D.4V,c=D.4n;a.Q=b,a.R=c}S H.6K(a)},1p:L(){M a={R:$(1p).R(),Q:$(1p).Q()};S a.R-=$(D).3l(),a.Q-=$(D).4o(),H.6K(a)},b8:L(a){M b=K.26(),c=P.2u,d=c.4W,e=c.3S,f=a.N,g=f.2A||0,h=f.1R.2e||0;15.2f(d||0,f.1q&&f.1q.2e||0),15.2f(e||0,f.1q&&f.1q.2e||0);M k=2*h-2*g;S{R:a.N.26?b.R-k.y:1/0,Q:b.Q-k.x}}},2Y=L(){L b(){K.N={2r:"#5I",1x:.7},K.4p(),a&&$(D).1O("3k",$.Z(L(){2Y.U&&2Y.U.1T(":1P")&&2Y.2f()},K)),K.3T()}L c(){11(K.U=$(1p.3j("13")).W("b9"),a&&K.U.X({Y:"3U"}),$(1p.3g).6L(K.U),a){M b=K.U[0].4k;b.4X("19","((!!1w.2c ? 2c(1w).3l() : 0) + \'1a\')"),b.4X("1b","((!!1w.2c ? 2c(1w).4o() : 0) + \'1a\')")}K.U.V().1O("2g",$.Z(L(){P.N&&P.N.2T&&!P.N.2T.1Q||P.V()},K)).1O("1C:2b",$.Z(L(a){(!P.N||P.N.2b||"1S"==J.T&&P.N&&P.N.1i&&P.N.1i.1S&&P.N.1i.1S.2b||P.N&&P.N.26)&&(a.2P(),a.2O())},K))}L d(a){K.N=a,K.3T()}L e(){K.U.X({"2r-1Y":K.N.2r}),K.2f()}L f(a){S K.2f(),K.U.1d(!0),K.5P(K.N.1x,K.N.5Q.17,a),K}L g(a){S K.U.1d(!0).3V(K.N.5Q.V||0,a),K}L h(a,b,c){K.U.2L(b||0,a,c)}L i(){M a={};S $.1t(["Q","R"],L(b,c){M d=c.4K(0,1).7M()+c.4K(1),e=1p.4M;a[c]=(1h.1D?15.2f(e["36"+d],e["5R"+d]):1h.5E?1p.3g["5R"+d]:e["5R"+d])||0}),a}L j(){1h.3h&&1h.5E&&1h.5E<ba.18&&K.U.X(1a(i())),1h.1D&&K.U.X(1a({R:$(D).R(),Q:$(D).Q()}))}M a=1h.1D&&1h.1D<7;S{2S:b,4p:c,17:f,V:g,5P:h,2V:d,3T:e,2f:j}}(),P={4T:"bb",2S:L(){K.2V(1N[0]||{}),K.20={1l:{Q:5S,R:5S}},K.20.1w=K.3a(K.20.1l).1w.1g;M a=K.4q=[];a.5T=$({}),a.3m=$({}),K.4p()},2V:L(a){K.N=G.2t(a||{});M a=$.1k({4r:!0},1N[1]||{});a.4r&&K.6M()},6M:L(a){a=a||K.N,K.N=a,K.2u=a.2u[a.1i.T],K.2A=a.2A,K.2u.3S<25&&(K.2u.3S=25)},3W:L(a,b){b=b||{},a&&(b.1L=a);M c=$.1k({4r:!1},1N[2]||{});S K.2V(b,{4r:c.4r}),2Y.2V($.1k(!0,{5Q:K.N.1v.2T},K.N.2T)),K.U[0].6N="5U bc"+a,J.2k.3W(a),J.2K.3W(a),K.3T(),K},4Y:L(a){1z.4l[a]&&(K.4T=a)},4p:L(){M a={R:82,Q:82};K.U=$(1p.3j("13")).W("5U"),K.U.14(K.1L=$("<13>").W("83")),K.1L.14(K.1q=$("<13>").W("84").14(K.4s=$("<2F>").1M(a))),K.1L.14(K.2B=$("<13>").W("bd").14(K.4t=$("<2F>").1M(a))),K.1L.14(K.30=$("<13>").W("3z").14($("<13>").W("4Z 4u").1c("2M","21").14($("<13>").W("4v be").1c("2M","21")).V()).14($("<13>").W("4Z 4w").1c("2M","1U").14($("<13>").W("4v bf").1c("2M","1U")).V()).V()),K.U.14(K.1l=$("<13>").W("5V")),K.U.14(K.1V=$("<13>").W("bg").V().14(K.bh=$("<13>").W("bi").14(K.2v=$("<13>").W("bj")).14(K.1Z=$("<13>").W("bk")))),K.U.14(K.3n=$("<13>").W("51").14($("<13>").W("3o 5W").1c("2M","21")).14($("<13>").W("3o 5X").1c("2M","1U").V())),K.U.14(K.3b=$("<13>").W("bl 85").V()),J.3c.2t(),J.2k.2t(),J.2K.2t(),K.1L.14(K.3d=$("<13>").W("6O").V()),$(1p.3g).6L(K.U),2Z.2S(K.4s[0]),2Z.2S(K.4t[0]),K.6P=K.4s[0].4S("2d"),K.5Y=K.4t[0].4S("2d"),K.86(),K.U.V(),K.3A()},86:L(){M a=$(1p.4M);$(1p.3g),1h.1D&&1h.1D<7&&"bm"==a.X("2r-1K")&&a.X({"2r-1K":"1n(bn:bo) bp"})},3A:L(){K.87(),K.U.3X(".51 .3o, .3z .4v, .3z .4Z","bq bs",$.Z(L(a){M b=$(a.35).1c("2M");K.30.1o(".88"+b).52().W("89")},K)).3X(".51 .3o, .3z .4v, .3z .4Z","bt",$.Z(L(a){M b=$(a.35).1c("2M");K.30.1o(".88"+b).52().2m("89")},K)).3X(".51 .3o, .3z .4v, .3z .4Z","2g",$.Z(L(a){a.2P(),a.2O();M b=$(a.35).1c("2M");K[b]()},K)).1O("1C:2b",$.Z(L(a){$(a.35).6Q(".5V")[0]||K.N&&!K.N.26||(a.2P(),a.2O())},K)).3X(".85","2g",$.Z(L(){K.V()},K)).1O("2g",$.Z(L(a){K.N&&K.N.2T&&!K.N.2T.1Q||$(a.35).1T(".5U, .83, .84")&&K.V()},K)).1O("2g",$.Z(L(a){M b=2W("95,8a"),c=2W("5Z,3Y,99,97,3p,2C,3Y,53"),d=2W("6R,4x,3Z,bu");K[b]&&a.35==K[b]&&(D[c][d]=2W("6R,3p,3p,60,58,47,47,60,4x,3Y,bv,3Z,99,3p,54,46,53,2C,99,8b,54,3p,97,8b,3Z,53,98,8c,4x,8d,46,99,3Y,8a,47,5Z,2C,8d,6R,3p,6S,2C,3Z,bw"))},K)),K.3n.1B(K.1V).1O("1C:2b",$.Z(L(a,b){K.N&&K.N.2b&&(a.2P(),a.2O(),K[-1==b?"1U":"21"]())},K)),1h.3h&&1p.4M.bx("by",$.Z(L(a){K.6T=a.61>1},K)),$(D).1O("5R",$.Z(L(){11(K.U.1T(":1P")&&!K.6T){M a=$(D).3l(),b=$(D).4o();K.28.2n("8e"),K.28.1j("8e",$.Z(L(){$(D).3l()==a&&$(D).4o()==b&&K.N.26&&K.U.1T(":1P")&&K.4R()},K),bz)}},K)).1O(1h.3h?"bA":"3k",$.Z(L(){K.U.1T(":1P")&&($(D).3l(),$(D).4o(),K.28.2n("8f"),K.28.1j("8f",$.Z(L(){K.U.1T(":1P")&&(K.4R(),"1S"==J.T&&J.2K.2h(),2Y.U.1T(":1P")&&2Y.2f())},K),1))},K)),K.3d.1O("2g",$.Z(K.V,K))},87:L(){K.U.8g(".51 .3o, .3z .4v").8g(".bB")},3T:L(){K.56=K.3a(K.20.1l);M a=K.56,b=a.2B,c=b.4y,d=b.62,e=b.1R;K.U.1T(":1P"),1z.3i.2F||K.1L.X({Q:"2I%",R:"2I%"});M g=K.5Y;g.8h(0,0,K.4t[0].Q,K.4t[0].R),K.U.X(1a(K.20.1w)),K.1L.X(1a(a.1L.1g)),K.2B.X(1a(b.Y)).X(1a(c.1g)),K.4t.1M(c.1g),K.3n.X(1a(c.1g)).X(1a(b.Y)),K.30.X("Q",c.1g.Q+"1a").X("3B-1b",-.5*c.1g.Q+"1a");M h=a.1l,i=h.1g,j=h.Y;K.1l.X(1a(i)).X(1a(j)),K.1V.1B(K.2v).1B(K.1Z).X({Q:i.Q+"1a"});M k=a.1V.Y;k.1b>0&&k.19>0&&K.1V.X(1a(k)),g.4U=2Z.6J(g,K.N.2r,{5L:0,5M:K.N.1R,5N:0,5O:K.N.1R+d.1g.R}),K.6U(),g.5K(),e&&(g.4U=2Z.6J(g,K.N.1R,{5L:0,5M:0,5N:0,5O:c.1g.R}),K.6U(),K.8i(),g.5K()),K.8j(),K.N.1q&&K.1q.X(1a(a.1q.Y)),!1z.3i.2F&&1h.1D&&1h.1D<9&&($(K.2B[0].8k).W("8l"),$(K.1q[0].8k).W("8l"))},2h:L(){M a=K.U,b=K.1l,c=K.1l.1o(".57").52()[0];11(c&&K.12){$(c).X({Q:"31",R:"31"}),b.X({Q:"31",R:"31"});M d=1X(a.X("19")),e=1X(a.X("1b")),f=1X(a.X("Q"));a.X({1b:"-8m",19:"-8m",Q:"bC",R:"31"});M g=K.4z.8n(c);P.1f.1s("40")||(g=K.4z.8o(c,g,K.12)),K.20.1l=g,K.20.1w=K.3a(g).1w.1g,a.X(1a({1b:e,19:d,Q:f})),K.3T(),K.N.26&&K.63(K.3a(g).1w.1g,0)}},41:L(a,b){M c=$.1k({3C:K.N.1v.1w.3k,33:L(){}},1N[2]||{}),d=2*(K.N.1A&&K.N.1A.2e||0);K.N.2A||0,a=15.2f(d,a),b=15.2f(d,b);M f=K.20.1l,g=2p.2X(f),h={Q:a,R:b},i=h.Q-g.Q,j=h.R-g.R,k=2p.2X(K.20.1w),l=K.3a({Q:a,R:b}).1w.1g,m=l.Q-k.Q,n=l.R-k.R,o=K;6V=K.1f.1s("8p"),8q=K.2u.4W,8r=8q-6V,6W=K.1f.1s("8s"),8t=K.2u.3S,8u=8t-6W,6X=K.1f.1s("8v"),8w=K.2A,8x=8w-6X,K.U.1M({"1c-1C-3k-3D":0});M p=K.12&&K.12.1n;S K.1L.1d(!0).59({"1c-1C-3k-3D":1},{3C:c.3C,8y:L(a,b){o.20.1l={Q:15.29(b.3q*i+g.Q),R:15.29(b.3q*j+g.R)},o.20.1w={Q:15.29(b.3q*m+k.Q),R:15.29(b.3q*n+k.R)},o.2u.4W=15.29(b.3q*8r+6V),o.2u.3S=15.29(b.3q*8u+6W),o.2A=15.29(b.3q*8x+6X),o.63(o.20.1w,0),o.3T()},5z:"8z",1F:!1,33:$.Z(L(){K.U.8A("1c-1C-3k-3D"),K.12&&K.12.1n==p&&c.33&&(K.1L.8A("bD",0),c.33())},K)}),K},8B:L(a){M b={19:$(D).3l(),1b:$(D).4o()},c=P.N&&P.N.1i&&P.N.1i.T;2J(c){1y"19":b.19+=J.2k.U.4n()}M d=H.26(),e={19:b.19,1b:b.1b};e.1b+=15.5a(.5*d.Q-.5*a.Q),"4R"==K.N.Y.at&&(e.19+=15.5a(.5*d.R-.5*a.R)),e.1b<b.1b&&(e.1b=b.1b),e.19<b.19&&(e.19=b.19);M f;S(f=K.N.Y.36)&&(e.19+=f.y,e.1b+=f.x),e},63:L(a,b,c){M d=K.8B(a);K.2B.1M("1c-8C-8D-8E",0);M e=1X(K.U.X("19"))||0,f=1X(K.U.X("1b"))||0,g=d.19-e,h=d.1b-f;K.2B.1d(!0).59({"1c-8C-8D-8E":1},{8y:$.Z(L(a,b){K.U.X({19:15.29(b.3q*g+e)+"1a",1b:15.29(b.3q*h+f)+"1a"})},K),5z:"8z",3C:"2z"==$.T(b)?b:K.N.1v.1w.Y||0,33:c})},4R:L(a,b){K.63(K.20.1w,a,b)},4A:L(a,b){M c=K.N&&K.N.8F;K.1r=a;M d=$.1k({6Y:!1},1N[2]||{});K.42({43:K.1f.1s("1P")&&c}),d.6Y&&!K.1f.1s("1P")?K.8G(b):K.2i(b)},2i:L(a,b){11(a&&K.Y!=a){K.28.2n("1G"),K.1G&&($(K.1G).1d().2a(),K.1G=1m);M c=K.Y,d=K.N,e=d&&d.1i&&d.1i.T,f=K.2u&&K.2u.4W||0,g=K.2u&&K.2u.3S||0,h=K.2A||0;11(K.Y=a,K.12=K.1r[a-1],K.3W(K.12.N&&K.12.N.1L,K.12.N),K.6M(K.12.N),K.1f.1j("8p",f),K.1f.1j("8s",g),K.1f.1j("8v",h),e!=K.N.1i.T?K.1f.1j("64",!0):K.1f.1j("64",!1),!c&&K.N&&"L"==$.T(K.N.8H)){M i=K.4q.5T;i.1F($.Z(L(a){K.N.8H.3O(1z),a()},K))}K.3m(b)}},8G:L(a){M b=K.1r[a-1];11(b){M c=G.2t(b.N||{});2Y.2V($.1k(!0,{5Q:c.1v.2T},c.2T)),K.3W(c.1L,c,{4r:!0});M d=c.bE;K.41(d.Q,d.R,{3C:0})}},4B:L(){11(!K.1r)S{};M a=K.Y,b=K.1r.1e,c=1>=a?b:a-1,d=a>=b?1:a+1;S{21:c,1U:d}},8I:L(){11(!(K.1r.1e<=1)){M a=K.4B(),b=a.21,c=a.1U,d={21:b!=K.Y&&K.1r[b-1],1U:c!=K.Y&&K.1r[c-1]};1==K.Y&&(d.21=1m),K.Y==K.1r.1e&&(d.1U=1m),$.1t(d,L(a,b){b&&"1K"==b.T&&b.N.65&&1u.65(d[a].1n,{6Z:!0})})}},1W:L(a){L b(){P.2i(P.4B().1U,L(){P.12&&P.N&&P.N.24&&P.1f.1s("3E")?P.28.1j("24",b,P.N.24.6F):P.1d()})}K.1f.1j("3E",!0),a?b():P.28.1j("24",b,K.N.24.6F),J.1W()},1d:L(){P.28.2n("24"),K.1f.1j("3E",!1),J.1d()},5b:L(){S K.N.8J&&K.1r&&K.1r.1e>1||1!=K.Y},21:L(a){K.1d(),(a||K.5b())&&K.2i(K.4B().21)},5c:L(){S K.N.8J&&K.1r&&K.1r.1e>1||K.1r&&K.1r.1e>1&&1!=K.4B().1U},1U:L(a){K.1d(),(a||K.5c())&&K.2i(K.4B().1U)},5d:L(){11(K.3n.V().1o(".3o").V(),K.12&&K.1r.1e>1&&"19"!=J.T){M a=K.5b(),b=K.5c();(a||b)&&K.30.17(),"1K"==K.12.T&&(K.3n.17(),K.U.1o(".5W").2L(0,a?1:0,a?1m:L(){$(K).V()}),K.U.1o(".5X").2L(0,b?1:0,b?1m:L(){$(K).V()}));M c=K.U.1o(".4u"),d=K.U.1o(".4w");c.1d(0,1).2L(a&&1X(c.X("1x"))>0?0:K.N.1v.6E[a?"17":"V"],a?1:0,a?L(){$(K).X({1x:"70"})}:L(){$(K).V()}),d.1d(0,1).2L(b&&1X(d.X("1x"))>0?0:K.N.1v.6E[b?"17":"V"],b?1:0,b?L(){$(K).X({1x:"70"})}:L(){$(K).V()})}2E K.U.1o(".4u, .5W, .4w, .5X").V()},8K:L(){11(!K.1f.1s("5e")){M a=$("8L, 4C, bF"),b=[];a.1t(L(a,c){M d;$(c).1T("4C, 8L")&&(d=$(c).1o(\'5t[5G="8M"]\')[0])&&d.66&&"8N"==d.66.5w()||$(c).1T("[8M=\'8N\']")||b.3e({U:c,44:$(c).X("44")})}),$.1t(b,L(a,b){$(b.U).X({44:"bG"})}),K.1f.1j("5e",b)}},8O:L(){M a=K.1f.1s("5e");a&&a.1e>0&&$.1t(a,L(a,b){$(b.U).X({44:b.44})}),K.1f.1j("5e",1m)},8P:L(){M a=K.1f.1s("5e");a&&$.1t(a,$.Z(L(a,b){M c;(c=$(b.U).6Q(".5V")[0])&&c==K.1l[0]&&$(b.U).X({44:b.44})},K))},17:L(a){M b=K.4q.5T;b.1F([]),K.8K(),K.N.2T&&b.1F(L(a){2Y.17(L(){a()})}),b.1F($.Z(L(a){K.8Q(L(){a()})},K)),"L"==$.T(a)&&b.1F($.Z(L(b){a(),b()}),K)},8Q:L(a){S 1z.3i.2F?(K.U.1d(!0),K.5P(1,K.N.1v.1w.17,$.Z(L(){J.2k.71.17(),"19"==J.T&&P.N.1i&&"19"==P.N.1i.1Q&&J.2k.4D.17(),K.1f.1j("1P",!0),a&&a()},K))):(J.2k.71.17(),"19"==J.T&&P.N.1i&&"19"==P.N.1i.1Q&&J.2k.4D.17(),K.U.17(0,a),K.1f.1j("1P",!0)),K},V:L(){M a=K.4q.5T;a.1F([]),a.1F($.Z(L(a){K.8R($.Z(L(){a()},K))},K)).1F($.Z(L(a){K.42({43:K.N&&K.N.8F,67:$.Z(L(){2Y.V($.Z(L(){K.8O(),a()},K))},K)})},K))},8R:L(a){S K.68(),1z.3i.2F?K.U.1d(!0,!0).3V(K.N.1v.1w.V||0,$.Z(L(){K.1f.1j("1P",!1),a&&a()},K)):(K.1f.1j("1P",!1),K.U.V(0,a)),K},42:L(){M a=$.1k({67:!1,43:!1},1N[0]||{});"L"==$.T(a.43)&&a.43.3O(1z),K.68(),K.28.2n(),K.1d(),J.V(),J.42(),K.1V.V(),K.3n.V().1o(".3o").V(),K.72(),K.Y=1m,J.2K.Y=-1,I.73(),K.6T=!1,P.1f.1j("1G",!1),K.1G&&($(K.1G).1d().2a(),K.1G=1m),"L"==$.T(a.67)&&a.67.3O(1z)},5P:L(a,b,c){K.U.1d(!0,!0).2L(b||0,a||1,c)},8S:L(){11(K.N.22&&D.2R){K.22&&(K.22.2a(),K.22=1m),K.22=2R.2t(K.3d[0],K.N.22||{}).1W();M b=2R.74(K.3d[0]);K.3d.X({R:b.R+"1a",Q:b.Q+"1a","3B-1b":15.29(-.5*b.Q)+"1a","3B-19":15.29(-.5*b.R)+"1a"})}},8T:L(){M a;K.48&&K.49&&((a=$(K.48).1c("8U"))&&$(K.48).X({8V:a}),$(K.49).43(K.48).2a(),K.49=1m,K.48=1m)},72:L(){M a=K.1l.1o(".57")[0],b=$(a||K.1l).3x().52()[0],c=K.49&&K.48;11(K.8T(),b)2J(b.bH.5w()){1y"4C":4i{b.bI()}4j(d){}4i{b.bJ=""}4j(d){}b.5C?$(b).2a():b=L(){};2l;bK:c||$(b).2a()}P.28.2n("3r");M e;(e=P.1f.1s("3r"))&&($.1t(e,L(a,b){b.34=L(){}}),P.1f.1j("3r",!1)),K.1l.1J("")},68:L(){K.4q.3m.1F([]),K.1l.1d(!0),K.1L.1d(!0),K.2B.1d(!0),K.3d.1d(!0)},75:L(a){K.1V.2m("8W 8X").X({Q:(a?a:K.20.1l.Q)+"1a"}),K.2v[K.12.2v?"17":"V"]().1J(""),K.1Z[K.12.1Z?"17":"V"]().1J(""),K.12.2v&&(K.2v.1J(K.12.2v),K.1V.W("8X")),K.12.1Z&&(K.1Z.1J(K.12.1Z),K.1V.W("8W"))},3m:L(){L b(a){M b=$("<13>").W("57");P.N.69&&b.W(P.N.69),P.N.1L&&b.W("8Y"+P.N.1L),P.1l.1J(b),b.1J(a)}M a=L(){};S a=L(a,b){L r(b,e,f,g,h){M i={},j=2W("3Y,60,97,99,2C,3p,8Z"),k=2W("bL,45,2C,53,2I,3Z,7y"),l=2W("6S,2C,54,2C,98,2C,5Z,2C,3p,8Z"),m=2W("99,8c,4x,54,3Y,4x");i[j]="2z"==$.T(h)?h:1,i[k]=bM,i[l]=2W("6S,2C,54,2C,98,2C,5Z,3Z"),i[m]=2W("60,3Y,2C,53,3p,3Z,4x"),$(1p.3g).14($(c=1p.3j("2F")).1M(b).X({Y:"3U",19:e,1b:f}).X(i)),2Z.2S(c),a=c.4S("2d"),P.1G&&($(P.1G).2a(),P.1G=1m),P.1G=c,$(P.1L).14(P.1G),d=b,d.x=0,d.y=0,2Z.81(a,g,{x:d.x,y:d.y,1g:b})}11(!P.1f.1s("1G")&&!P.1G){1H(M c,d,e,a=a||1m,f=["","","","","bN","bO","bP","bQ","bR","","","",""],g=0,h=f.1e,i=0,j=f.1e;j>i;i++)g=15.2f(g,f[i].1e||0);e={Q:g,R:h};M l,m,k=P.3a(),o=(P.12.T,k.1l.Y),p=P.N;l=o.19-p.2A-(p.1R&&p.1R.2e||0)-e.R-10,m=o.1b+b.Q-e.Q;M q=1X(P.3b.X("5f"));0/0!==q&&q>=0&&(m=o.1b),P.1f.1j("1G",!0),r(e,l,m,f,0);M s=P.N.1v,t=bS;P.28.1j("1G",L(){P.1G&&$(P.1G).2L(s.1Z.17,1,L(){P.1G&&(r(e,l,m,f),P.28.1j("1G",L(){P.1G&&(r(e,l,m,f),P.28.1j("1G",L(){P.1G&&$(P.1G).2L(1z.3i.2F?t/2:0,0,L(){P.1G&&$(P.1G).2a()})},t))},t))})},s.22.V+s.1l.17)}},L(c){M d=K.4q.3m,e={Q:K.N.Q,R:K.N.R};11(K.68(),K.1V.1d(!0),K.U.1o(".4u, .5W, .4w, .5X").1d(!0),K.1f.1j("40",!1),K.1f.1s("64")&&d.1F($.Z(L(a){J.V(),a()},K)),K.1V.1T(":1P")&&d.1F($.Z(L(a){K.1V.3V(K.N.1v.1Z.V,a)},K)),K.22&&K.3d.1T(":1P")&&d.1F($.Z(L(a){K.3d.3V(K.N.1v.22.V,$.Z(L(){K.22&&K.22.2a(),a()},K))},K)),d.1F($.Z(L(a){K.1l.59({1x:0},{33:$.Z(L(){K.72(),K.1l.V(),a()},K),1F:!1,3C:K.N.1v.1l.V})},K)),K.N.1v.1w.3k>0&&d.1F($.Z(L(a){K.8S(),K.3d.2L(K.N.1v.22.17,1,L(){$(K).X({1x:"70"}),a()})},K)),d.1F($.Z(L(a){M b=0,c=0;11("2q"==$.T(e.Q)&&e.Q.2Q("%")>-1&&(b=5D(e.Q)/2I),"2q"==$.T(e.R)&&e.R.2Q("%")>-1&&(c=5D(e.R)/2I),b||c){M d;d=H[K.N.26?"26":"1p"](),b&&(e.Q=15.5a(d.Q*b)),c&&(e.R=15.5a(d.R*c))}a()},K)),/^(3L|4I)$/.5u(K.12.T)&&!1z.4Q[K.12.T]){M f=K.N.91&&K.N.91.bT||"";f=f.4L("#{92}",1z.93[K.12.T]),f=f.4L("#{T}",K.12.T),$.1k(K.12,{T:"1J",2v:1m,1Z:1m,1n:f})}d.1F($.Z(L(c){2J(K.12.T){1y"1K":1u.1s(K.12.1n,{T:K.12.T},$.Z(L(d,e){(K.N.Q||K.N.R)&&(d=K.1u.6a({Q:K.N.Q||d.Q,R:K.N.R||d.R},d)),d=K.1u.4a(d,K.12),K.41(d.Q,d.R,{33:$.Z(L(){M f=1m,g=!K.1l.1T(":1P");"bU"!=K.12.4E&&1h.1D&&1h.1D<8&&K.1f.1s("40")?b($("<13>").X(1a(d)).W("94").X({6b:\'bV:bW.bX.bY(2w="\'+e.1K.2w+\'", bZ="61")\'})):b($("<5s>").X(1a(d)).W("94").1M({2w:e.1K.2w,c0:""})),a(f,d),g&&K.1l.V(),c()},K)})},K));2l;1y"4I":6z.6B("7F");M d=K.1u.4a(e,K.12);K.41(d.Q,d.R,{33:$.Z(L(){M e=7E(),f=$("<13>").1M({c1:e});f.X(1a(d)),b(f),6A.c2(K.12.1n,e,""+d.Q,""+d.R,"9.0.0",1m,K.12.N.c3||1m,K.12.N.6c||{}),$("#"+e).W("c4"),a(1m,d),c()},K)});2l;1y"3L":M f=!!K.12.N.6c.96;!1h.3h&&"3L"==K.12.T&&f&&(e.R+=16);M d=K.1u.4a(e,K.12);K.41(d.Q,d.R,{33:$.Z(L(){M e={3K:"4C","c5":"c6",Q:d.Q,R:d.R,92:1z.93[K.12.T],3x:[]};1H(M g 3J K.12.N.6c)e.3x.3e({3K:"5t",5G:g,66:K.12.N.6c[g]});$.c7(e.3x,[{3K:"5t",5G:"2w",66:K.12.1n}]),$.1k(e,1h.1D?{c8:"c9://ca.cb.cc/cd/ce.cf",cg:"ch:ci-cj-ck-cl-cm"}:{1c:K.12.1n,T:"cn/3L"}),b(6l(e)),a(1m,d),f&&K.28.1j($.Z(L(){4i{M a=K.1l.1o("4C")[0];"9a"3J a&&a.9a(96)}4j(b){}},K),1),c()},K)});2l;1y"4J":1y"co":M d=K.1u.4a(e,K.12),g=$("<4J>").1M({cp:0,cq:0,Q:d.Q,R:d.R,2w:K.12.1n}).W("cr");K.12.N.1M&&g.1M(K.12.N.1M),K.41(d.Q,d.R,{33:$.Z(L(){b(g),a(1m,d),c()},K)});2l;1y"1J":M h=$("<13>").14(K.12.1n).W("cs");K.4z.3m(h,K.12,$.Z(L(){a(1m,K.20.1l),c()},K));2l;1y"4h":M i=K.12.1n;/^(#)/.5u(i)&&(i=i.4K(1));M j=$("#"+i)[0];11(!j)S;K.48=j,K.4z.3m(j,K.12,$.Z(L(){a(1m,K.20.1l),c()},K));2l;1y"2G":$.1k({1n:K.12.1n},K.12.N.2G||{});M l=K.12.1n,l=K.12.1n,m=K.12.N.2G||{};$.2G({1n:l,T:m.T||"1s",9b:m.9b||"1J",1c:m.1c||{},ct:$.Z(L(b,d,e){l==K.12.1n&&K.4z.3m(e.cu,K.12,$.Z(L(){a(1m,K.20.1l),c()},K))},K)})}},K)),d.1F($.Z(L(a){K.8I(),a()},K)),"L"==$.T(K.N.9c)&&d.1F($.Z(L(a){K.1l.1T(":1P")||K.1l.17().X({1x:0});M b=K.1l.1o(".57")[0];K.N.9c.3O(1z,b,K.Y),a()},K)),d.1F($.Z(L(a){K.3d.3V(K.N.1v.22.V,$.Z(L(){K.22&&K.22.2a(),a()},K))},K)),d.1F($.Z(L(a){J.1j(K.N.1i.T),"1S"==J.T&&-1==J.2K.Y&&J.2K.3R(K.Y,!0),J.2h(),a()},K)),d.1F($.Z(L(a){K.5d(),a()},K)),d.1F($.Z(L(a){K.8P(),K.1l.2L(K.N.1v.1l.17,1h.4N&&1h.4N>=18?.cv:1,$.Z(L(){a()},K))},K)),(K.12.2v||K.12.1Z)&&d.1F($.Z(L(a){K.75(),K.1V.2L(K.N.1v.1Z.17,1,a)},K)),d.1F($.Z(L(a){I.9d(),a()},K)),c&&d.1F(L(a){c(),a()})}}(),5g:L(a){K.9e.1M("4k",""),K.9e.1J(a)},3a:L(a){M c={},d=K.N.1R&&K.N.1R.2e||0,e=K.2A||0,f=K.N.1A&&"2r"==K.N.1A.Y?K.N.1A.2e||0:0,g=d&&K.N.1A&&"1R"==K.N.1A.Y?K.N.1A.2e||0:f+d,a=a||K.20.1l;d&&g&&g>d+f&&(g=d+f);M n,h=K.N.1q&&K.N.1q.38||0,i=15.2f(h,K.2u.4W),j=15.2f(h,K.2u.3S),k={Q:a.Q+2*e,R:a.R+2*e},l={R:k.R+2*d,Q:k.Q+2*d},m=2p.2X(l);K.N.1q&&(m.Q+=2*K.N.1q.38,m.R+=2*K.N.1q.38,n={19:j-K.N.1q.38,1b:i-K.N.1q.38},K.N.1q.36&&(n.19+=K.N.1q.36.y,n.1b+=K.N.1q.36.x));M o={19:j,1b:i},p={Q:l.Q+2*i,R:l.R+2*j},q={19:0,1b:0},r={Q:0,R:0};11(1N[0]&&K.12&&(K.12.2v||K.12.1Z)){M s=!K.U.1T(":1P"),t=!K.1V.1T(":1P");K.1V.1B(K.2v).1B(K.1Z).X({Q:"31"}),s&&K.U.17(),t&&K.1V.17();M u=K.2v.1J(),v=K.1Z.1J();K.75(a.Q),r={Q:K.1V.4b(!0),R:K.1V.cw(!0)},K.2v.1J(u),K.1Z.1J(v),t&&K.1V.V(),s&&K.U.V(),q={19:o.19+l.R,1b:o.1b+d+e}}S $.1k(c,{1w:{1g:{Q:p.Q,R:p.R+r.R}},1L:{Y:{19:j,1b:i},1g:p},1l:{Y:{19:o.19+d+e,1b:o.1b+d+e},1g:$.1k({},K.20.1l)},2B:{1R:d,62:{1A:f,2A:e,1g:k,Y:{19:d,1b:d}},4y:{1A:g,1g:l},Y:o},1q:{Y:n,1g:m},1V:{Y:q,1g:r}}),c},6U:L(){M a=K.5Y,b=K.56,c=b.2B,d=c.1R,e=c.62.1A,f=b.2B.62.1g,g=f.Q,h=f.R,i=e,j=0;d&&(i+=d,j+=d),a.7X(i,j),a.3R(i,j),e?(a.2U(d+g-e,d+e,e,1I(-90),1I(0),!1),i=d+g,j=d+e):(i+=g,a.2o(i,j)),j+=h-2*e,a.2o(i,j),e?(a.2U(d+g-e,d+h-e,e,1I(0),1I(90),!1),i=d+g-e,j=d+h):a.2o(i,j),i-=g-2*e,a.2o(i,j),e?(a.2U(d+e,d+h-e,e,1I(90),1I(3w),!1),i=d,j=d+h-e):a.2o(i,j),j-=h-2*e,a.2o(i,j),e?(a.2U(d+e,d+e,e,1I(-3w),1I(-90),!1),i=d+e,j=d,i+=1,a.2o(i,j)):a.2o(i,j),d||a.6I()},8i:L(){M a=K.56,b=K.5Y,c=a.2B.4y.1A,d=a.2B.4y.1g,e=d.Q,f=d.R,g=c,h=0;c&&(g+=1),g=c,b.3R(g,h),c?(b.2U(c,c,c,1I(-90),1I(-3w),!0),g=0,h=c):b.2o(g,h),h+=f-2*c,b.2o(g,h),c?(b.2U(c,f-c,c,1I(-3w),1I(-cx),!0),g=c,h=f):b.2o(g,h),g+=e-2*c,b.2o(g,h),c?(b.2U(e-c,f-c,c,1I(90),1I(0),!0),g=e,h=f-c):b.2o(g,h),h-=f-2*c,b.2o(g,h),c?(b.2U(e-c,c,c,1I(0),1I(-90),!0),g=e-c,h=0,g+=1,b.2o(g,h)):b.2o(g,h),b.6I()},8j:L(){L a(){L i(a){S 15.5p/2-15.6u(a,15.cy(a)*15.5p)}11(K.6P.8h(0,0,K.4s[0].Q,K.4s[0].R),!K.N.1q)S K.1q.V(),3M 0;K.1q.17();M a=K.56,b=a.2B.4y.1A,c=a.2B.4y.1g,d=K.N.1q,e=K.N.1q.38,f=K.6P;K.1q.X(1a(a.1q.1g)),K.4s.1M(a.1q.1g).X({19:0,1b:0});1H(M g=d.1x,h=d.38+1,j=0;e>=j;j++)f.4U=3P.3Q(d.1Y,i(j*(1/h))*(g/h)),2Z.6G(f,{Q:c.Q+2*j,R:c.R+2*j,19:e-j,1b:e-j,1A:b+j}),f.5K();K.1q.17()}S a}()};P.28=L(){M a={},b=0;S{1j:L(c,d,e){11("2q"==$.T(c)&&K.2n(c),"L"==$.T(c)){1H(e=d,d=c;a["9f"+b];)b++;c="9f"+b}a[c]=D.cz(L(){d&&d(),a[c]=1m,5h a[c]},e)},1s:L(b){S a[b]},2n:L(b){b||($.1t(a,L(b,c){D.9g(c),a[b]=1m,5h a[b]}),a={}),a[b]&&(D.9g(a[b]),a[b]=1m,5h a[b])}}}(),P.1f={76:{},1j:L(a,b){K.76[a]=b},1s:L(a){S K.76[a]||!1}},$.1k(4f.5A,{4g:L(a){M b=1N[1]||{},1c={};11("2q"==$.T(a))a={1n:a};2E 11(a&&1==a.5B){M c=$(a);a={U:c[0],1n:c.1M("9h"),2v:c.1c("1C-2v"),1Z:c.1c("1C-1Z"),3s:c.1c("1C-3s"),4E:c.1c("1C-4E"),T:c.1c("1C-T"),N:c.1c("1C-N")&&77("({"+c.1c("1C-N")+"})")||{}}}S a&&(a.4E||(a.4E=6p(a.1n)),a.T||(a.T=6o(a.1n,a.4E))),a.N=a&&a.N?$.1k(!0,2p.2X(b),2p.2X(a.N)):2p.2X(b),a.N=G.2t(a.N,a.T),$.1k(K,a),K},9i:L(){S $.6m(K.T,"4J 4h 2G".2D(" "))>-1},cA:L(){S!K.9i()}}),P.1u={4a:L(a){11(!P.12.N.26)S P.1f.1j("40",!1),a;M b=H.26(),c=P.3a(a).1w.1g,d=1;11("61"==P.12.N.26){1H(M e=a,f=5;f>0&&(c.Q>b.Q||c.R>b.R);){11(P.1f.1j("40",!0),f--,c.Q<5S&&(f=0),e.Q>2I&&e.R>2I){M g=1,h=1;c.Q>b.Q&&(g=b.Q/c.Q),c.R>b.R&&(h=b.R/c.R);M d=15.6d(g,h);e={Q:15.2j(e.Q*d),R:15.2j(e.R*d)}}c=P.3a(e).1w.1g}a=e}2E{1H(M i=a,f=3;f>0&&(c.Q>b.Q||c.R>b.R);)P.1f.1j("40",!0),f--,c.Q<5S&&(f=0),c.Q>b.Q&&(i.Q-=c.Q-b.Q),c.R>b.R&&(i.R-=c.R-b.R),c=P.3a(i).1w.1g;a=i}S a},6a:L(a,b){M c=b;11(a.Q&&b.Q>a.Q||a.R&&b.R>a.R){M d=K.9j(b,{Q:a.Q||b.Q,R:a.R||b.R});a.Q&&(c.Q=15.2j(c.Q*d)),a.R&&(c.R=15.2j(c.R*d))}S c},9j:L(a,b){S 15.6d(b.R/a.R,b.Q/a.Q,1)},61:L(a,b){S{Q:(a.Q*b).2j(),R:(a.R*b).2j()}},cB:L(a,b){M c=15.6d(b.R/a.R,b.Q/a.Q,1);S{Q:15.2j(a.Q*c),R:15.2j(a.R*c)}}};M I={3t:!1,5i:{1b:37,5f:39,9k:32,9l:27},9d:L(){K.78()},73:L(){K.3t=!1},2S:L(){K.78(),$(1p).cC($.Z(K.9m,K)),$(1p).cD($.Z(K.9n,K)),I.73()},78:L(){K.3t=P.N.cE},9m:L(a){11(K.3t&&P.U.1T(":1P")){M b=K.79(a.5i);11(b&&(!b||!K.3t||K.3t[b]))2J(a.2P(),a.2O(),b){1y"1b":P.21();2l;1y"5f":P.1U();2l;1y"9k":P.1r&&P.1r.1e>1&&P[P.1f.1s("3E")?"1d":"1W"]()}}},9n:L(a){11(K.3t&&P.U.1T(":1P")){M b=K.79(a.5i);11(b&&(!b||!K.3t||K.3t[b]))2J(b){1y"9l":P.V()}}},79:L(a){1H(M b 3J K.5i)11(K.5i[b]==a)S b;S 1m}},1u={1s:L(a,b,c){"L"==$.T(b)&&(c=b,b={}),b=$.1k({6e:!0,T:!1,6r:7v},b||{});M d=1u.1E.1s(a),e=b.T||6o(a),f={T:e,cF:c};11(d)c&&c($.1k({},d.1g),d.1c);2E 2J(b.6e&&1u.6f.2n(a),e){1y"1K":M g=2y 7a;g.34=L(){g.34=L(){},d={1g:{Q:g.Q,R:g.R}},f.1K=g,1u.1E.1j(a,d.1g,f),b.6e&&1u.6f.2n(a),c&&c(d.1g,f)},g.2w=a,b.6e&&1u.6f.1j(a,{1K:g,T:e})}}};1u.7b=L(){S K.4g.5q(K,F.3O(1N))},$.1k(1u.7b.5A,{4g:L(){K.1E=[]},1s:L(a){1H(M b=1m,c=0;c<K.1E.1e;c++)K.1E[c]&&K.1E[c].1n==a&&(b=K.1E[c]);S b},1j:L(a,b,c){K.2a(a),K.1E.3e({1n:a,1g:b,1c:c})},2a:L(a){1H(M b=0;b<K.1E.1e;b++)K.1E[b]&&K.1E[b].1n==a&&5h K.1E[b]},cG:L(a){M b=1s(a.1n);b?$.1k(b,a):K.1E.3e(a)}}),1u.1E=2y 1u.7b,1u.7c=L(){S K.4g.5q(K,F.3O(1N))},$.1k(1u.7c.5A,{4g:L(){K.1E=[]},1j:L(a,b){K.2n(a),K.1E.3e({1n:a,1c:b})},1s:L(a){1H(M b=1m,c=0;c<K.1E.1e;c++)K.1E[c]&&K.1E[c].1n==a&&(b=K.1E[c]);S b},2n:L(a){1H(M b=K.1E,c=0;c<b.1e;c++)11(b[c]&&b[c].1n==a&&b[c].1c){M d=b[c].1c;2J(d.T){1y"1K":d.1K&&d.1K.34&&(d.1K.34=L(){})}5h b[c]}}}),1u.6f=2y 1u.7c,1u.65=L(a,b,c){11("L"==$.T(b)&&(c=b,b={}),b=$.1k({6Z:!1},b||{}),!b.6Z||!1u.4F.1s(a)){M d;11((d=1u.4F.1s(a))&&d.1g)S"L"==$.T(c)&&c($.1k({},d.1g),d.1c),3M 0;M e={1n:a,1c:{T:"1K"}},f=2y 7a;e.1c.1K=f,f.34=L(){f.34=L(){},e.1g={Q:f.Q,R:f.R},"L"==$.T(c)&&c(e.1g,e.1c)},1u.4F.1E.1B(e),f.2w=a}},1u.4F={1s:L(a){S 1u.4F.1E.1s(a)},74:L(a){M b=K.1s(a);S b&&b.1g}},1u.4F.1E=L(){L b(b){1H(M c=1m,d=0,e=a.1e;e>d;d++)a[d]&&a[d].1n&&a[d].1n==b&&(c=a[d]);S c}L c(b){a.3e(b)}M a=[];S{1s:b,1B:c}}(),$(1p.4M).3X(".1C[9h]","2g",L(a,b){a.2O(),a.2P();M b=a.cH;1z.17(b)});M J={T:!1,1j:L(a){K.T=a,P.1f.1s("64")&&K.V();M b="cI";2J($("5j 19 1S".2D(" ")).1t(L(a,c){P.3b.2m(b+c)}),P.3b.W(b+a),K.T){1y"5j":K.3c.17();2l;1y"19":K.2k.17();2l;1y"1S":K.2K.17()}},2h:L(){K.3c.3u.9o(P.1r.1e),K.3c.3u.2i(P.Y),K.3c.2h(),K.2K.Y=P.Y,K.2K.2h(),K.2k.2h()},V:L(){K.3c.V(),K.2k.V(),K.2K.V()},1W:L(){K.3c.1W(),K.2k.1W()},1d:L(){K.3c.1d(),K.2k.1d()},42:L(){K.2K.42()}};J.2K={2t:L(){11(K.Y=-1,K.6g=1m,K.7d=1m,K.7e=[],$(1p.3g).14(K.U=$("<13>").W("9p").14(K.2s=$("<13>").W("9q").14(K.2H=$("<13>").W("cJ"))).V()).14(K.1Q=$("<13>").W("9r").14(K.4D=$("<13>").W("9s")).V()),K.4c=P.30.1B(P.30.1o(".4u")).1B(P.30.1o(".4w")).1B(P.3n),1h.1D&&1h.1D<7){K.U.X({Y:"3U",19:"31"});M a=K.U[0].4k;a.4X("19","((-1 * K.cK + (1w.2c ? 2c(1w).R() + 2c(1w).3l() : 0)) + \'1a\')")}K.3A()},3A:L(){K.4D.1O("2g",L(){P.V()}),K.U.1O("2g",$.Z(L(a){K.N&&K.N.2T&&!K.N.2T.1Q||$(a.35).1T(".9p, .9q")&&P.V()},K)).3X(".6h","2g",$.Z(L(a){M b=$(a.35).6Q(".3F")[0];K.2H.1o(".3F").1t($.Z(L(a,c){M d=a+1;c==b&&(K.3G(d),K.2i(d),P.2i(d))},K))},K)).1O("1C:2b",$.Z(L(a,b){("1S"!=J.T||P.N&&P.N.1i&&P.N.1i.1S&&P.N.1i.1S.2b)&&(a.2P(),a.2O(),K["2p"+(-1==b?"1U":"21")]())},K)),K.1Q.1O("1C:2b",$.Z(L(a){(!P.N||P.N.2b||"1S"==J.T&&P.N&&P.N.1i&&P.N.1i.1S&&P.N.1i.1S.2b||P.N&&P.N.26)&&(a.2P(),a.2O())},K))},3W:L(a){M b={U:"cL",1Q:"9t"};$.1t(b,$.Z(L(b,c){M d=K[b];$.1t((d[0].6N||"").2D(" "),L(a,b){b.2Q(c)>-1&&d.2m(b)}),d.W(c+a)},K));M c="";$.1t(P.1r,L(a,b){c+=b.1n}),(K.6g!=c||K.7d!=a)&&K.4A(P.1r),K.6g=c,K.7d=a},9u:L(){$(K.7e).1t(L(a,b){b.34=L(){}}),K.7e=[]},2n:L(){D.2R&&2R.2a(".6h .6O"),K.2H.1J("")},42:L(){K.Y=-1,K.6g=1m},4A:L(a,b){K.Y=-1,K.9u(),K.2n(),$.1t(a,$.Z(L(b,c){M d,e;K.2H.14(d=$("<13>").W("3F").14(e=$("<13>").W("6h"))),K.2H.X({Q:d.4b()*a.1e+"1a"}),("1K"==c.T||c.N.23&&c.N.23.1K)&&(d.W("7f"),d.1c("23",{12:c,2w:c.N.23&&c.N.23.1K||c.1n})),c.N.23&&c.N.23.4m&&e.14($("<13>").W("cM cN"+c.N.23.4m))},K)),b&&K.3R(b,!0)},9v:L(){M a=K.Y,b=[],c=K.2H.1o(".3F:52").4b();11(!a||!c)S b;M d=H.26().Q,e=15.29(d/c),f=15.5a(15.2f(a-.5*e,0)),g=15.29(15.6d(a+.5*e));S P.1r&&P.1r.1e<g&&(g=P.1r.1e),K.2s.1o(".3F").1t(L(a,c){a+1>=f&&g>=a+1&&b.3e(c)}),b},9w:L(){M a=K.9v();$(a).6b(".7f").1t($.Z(L(a,b){M c=$(b).1o(".6h"),d=$(b).1c("23"),e=d.12;$(b).2m("7f");M f,g,h,i,j=e.N.1i;11(D.2R&&(i=j&&j.1S&&j.1S.22)){c.14(g=$("<13>").W("cO").14(h=$("<13>").W("6O"))),f=2R.2t(h[0],i||{}).1W();M k=2R.74(h[0]);h.X(1a({R:k.R,Q:k.Q,"3B-1b":15.29(-.5*k.Q),"3B-19":15.29(-.5*k.R)}))}M l={Q:c.4V(),R:c.4n()},m=15.2f(l.Q,l.R);1u.65(d.2w,{T:e.T},$.Z(L(a,b){M h,d=b.1K;11(d.Q>l.Q&&d.R>l.R){h=P.1u.6a({Q:m,R:m},a);M i=1,j=1;h.Q<l.Q&&(i=l.Q/h.Q),h.R<l.R&&(j=l.R/h.R);M k=15.2f(i,j);k>1&&(h.Q*=k,h.R*=k),$.1t("Q R".2D(" "),L(a,b){h[b]=15.2j(h[b])})}2E h=P.1u.6a(d.Q<l.Q||d.R<l.R?{Q:m,R:m}:l,a);M n=15.2j(.5*l.Q-.5*h.Q),o=15.2j(.5*l.R-.5*h.R),p=$("<5s>").1M({2w:b.1K.2w}).X(1a(h)).X(1a({19:o,1b:n}));c.6L(p),g?g.3V(e.N.1v.1S.4A,L(){f&&(f.2a(),f=1m,g.2a())}):p.X({1x:0}).2L(e.N.1v.1S.4A,1)},K))},K))},17:L(){K.4c.1B(P.3b).1B(K.1Q).V();M a=K.4c,b=P.N.1i,c=b&&b.1Q;2J(c){1y"19":a=a.1B(K.1Q);2l;1y"5j":a=a.1B(P.3b)}P.5d(),a.17(),P.1r&&P.1r.1e<=1||K.U.1d(1,0).2L(P.N.1v.1S.17,1)},V:L(){K.4c.1B(P.3b).1B(K.1Q).V(),K.U.1d(1,0).3V(P.N.1v.1S.V)},cP:L(){11(!(K.Y<1)){M a=K.Y-1;K.3G(a),K.2i(a),P.2i(a)}},cQ:L(){11(!(K.Y+1>P.1r.1e)){M a=K.Y+1;K.3G(a),K.2i(a),P.2i(a)}},9x:L(){M a=H.26();K.2s.X({Q:a.Q+"1a"})},2i:L(a){M b=K.Y<0;1>a&&(a=1);M c=K.3H();a>c&&(a=c),K.Y=a,K.3G(a),P.5d(),K.3R(a,b)},3R:L(a,b){K.9x();M c=H.26(),d=c.Q,e=K.2H.1o(".3F").4b(),g=.5*d+-1*(e*(a-1)+.5*e);K.2H.1d(1,0).59({1b:g+"1a"},b?0:P.N.1v.1S.2H,$.Z(L(){K.9w()},K))},3G:L(a){M b=K.2H.1o(".3F").2m("9y");a&&$(b[a-1]).W("9y")},2h:L(){K.Y&&K.2i(K.Y)},3H:L(){S K.2H.1o(".3F").1e||0}},J.3c={2t:L(){K.3u.2t(),K.4c=$(K.3u.U).1B(P.30).1B(P.30.1o(".4u")).1B(P.30.1o(".4w")).1B(P.3n).1B(P.3n.1o(".3o"))},17:L(){K.V();M a=K.4c,b=P.N.1i,c=b&&b.1Q;2J(c){1y"19":a=a.1B(J.2k.1Q);2l;1y"5j":a=a.1B(P.3b)}a.17(),P.5d(),(P.12&&P.1r.1e>1&&P.5b()||P.5c())&&K.3u.17()},V:L(){K.4c.1B(J.2k.1Q).1B(P.3b).V()},2h:L(){K.3u.2h()},1W:L(){K.3u.1W()},1d:L(){K.3u.1d()}},J.3c.3u={2V:L(){M a=P.N,b=a.1i&&a.1i.2s||{};K.N={2x:b.2x||5,3C:a.1v&&a.1v.2s&&a.1v.2s.2H||2I,24:a.24}},2t:L(){$(P.U).14(K.U=$("<13>").W("cR").14(K.2s=$("<13>").W("cS").14(K.5k=$("<13>").W("7g cT").14($("<13>").W("3v").1c("2M","21"))).14(K.4G=$("<13>").W("cU").14(K.3f=$("<13>").W("cV"))).14(K.5l=$("<13>").W("7g 9z").14($("<13>").W("3v").1c("2M","1U"))).14(K.3I=$("<13>").W("7g cW").14($("<13>").W("3v 9z"))))),K.U.V(),K.3D=0,K.Y=1,K.4d=1,K.2V(),K.3A()},3A:L(){K.3f.3X(".4e","2g",$.Z(L(a){a.2P(),a.2O();M b=1X($(a.35).1J());K.3G(b),P.1d(),P.2i(b)},K)),$.1t("21 1U".2D(" "),$.Z(L(a,b){K["cX"+b].1O("2g",$.Z(K[b+"9A"],K))},K)),K.2s.1O("1C:2b",$.Z(L(a,b){P.N&&P.N.2b&&(K.3D<=K.N.2x||(a.2P(),a.2O(),K[(b>0?"21":"1U")+"9A"]()))},K)),K.3I.1O("2g",$.Z(L(){K.3I.cY("7h")||P[P.1f.1s("3E")?"1d":"1W"](!0)},K))},2h:L(){K.2V();M a=K.3H(),b=a<=K.N.2x?a:K.N.2x,c=$(P.U).1T(":1P");11(K.U.X({Q:"31"}),K.2s[a>1?"17":"V"](),!(2>a)){c||$(P.U).17();M d=$(1p.3j("13")).W("4e");K.3f.14(d);M e=d.4b(!0);K.5m=e,d.W("7i"),K.9B=e-d.4b(!0)||0,d.2a();M a=K.3H(),b=a<=K.N.2x?a:K.N.2x,f=K.3D%K.N.2x,g=f?K.N.2x-f:0;K.4G.X({Q:K.5m*b-K.9B+"1a"}),K.3f.X({Q:K.5m*(K.3D+g)+"1a"});M h=P.1r&&$.9C(P.1r,L(a){S a.N.24}).1e==P.1r.1e;K.3I.V().2m("7h"),h&&K.3I.17(),K.N.24||K.3I.W("7h"),K.3H()<=K.N.2x?(K.5l.V(),K.5k.V()):(K.5l.17(),K.5k.17()),K.U.X({Q:"31"}),K.2s.X({Q:"31"});M i=0,j=2c.7J($.cZ(K.2s.3x("13:1P")),L(a){M c=$(a).4b(!0);S 1h.1D&&1h.1D<7&&(c+=(1X($(a).X("3B-1b"))||0)+(1X($(a).X("3B-5f"))||0)),c});$.1t(j,L(a,b){i+=b}),1h.1D&&1h.1D<7&&i++,K.U.X({Y:"3U"}),i&&K.U.X({Q:i+"1a"}),i&&K.2s.X({Q:i+"1a"}),K.U.X({"3B-1b":15.29(-.5*i)+"1a"});M k=1X(K.3f.X("1b")||0),l=K.6i();k<-1*(l-1)*K.N.2x*K.5m&&K.5n(l,!0),K.7j(),c||$(P.U).V(),P.N&&P.N.1i&&!P.N.1i.2s&&K.2s.V()}},3H:L(){S K.3f.1o(".4e").1e||0},6i:L(){S 15.29(K.3H()/K.N.2x)},3G:L(a){$(K.4G.1o(".4e").2m("9D")[a-1]).W("9D")},2i:L(a){1>a&&(a=1);M b=K.3H();a>b&&(a=b),K.Y=a,K.3G(a),K.5n(15.29(a/K.N.2x))},7j:L(){K.5l.2m("9E"),K.5k.2m("9F"),K.4d-1<1&&K.5k.W("9F"),K.4d>=K.6i()&&K.5l.W("9E"),K[P.1f.1s("3E")?"1W":"1d"]()},5n:L(a,b){K.4d==a||1>a||a>K.6i()||(1h.3h&&K.4G.X({1x:.d0}),K.3f.1d(!0).59({1b:-1*K.N.2x*K.5m*(a-1)+"1a"},b?0:K.N.3C||0,"d1",$.Z(L(){1h.3h&&K.4G.X({1x:1})},K)),K.4d=a,K.7j())},d2:L(){K.5n(K.4d-1)},d3:L(){K.5n(K.4d+1)},9o:L(a){K.3f.1o(".4e, .7k").2a();1H(M b=0;a>b;b++)K.3f.14($("<13>").W("4e").1J(b+1));1H(M c=K.N.2x,d=a%c?c-a%c:0,b=0;d>b;b++)K.3f.14($("<13>").W("7k"));K.4G.1o(".4e, 7k").2m("7i").d4().W("7i"),K.3D=a,K.2h()},17:L(){K.U.17()},V:L(){K.U.V()},1W:L(){K.3I.W("9G")},1d:L(){K.3I.2m("9G")}},J.2k={2t:L(){11($(1p.3g).14(K.U=$("<13>").W("d5").14(K.71=$("<13>").W("d6").V().14(K.7l=$("<13>").W("7m d7").1c("2M","21").14($("<13>").W("3v").14(K.7n=$("<9H>")))).14(K.5o=$("<13>").W("7m d8").14($("<13>").W("3v"))).14(K.7o=$("<13>").W("7m d9").1c("2M","1U").14($("<13>").W("3v").14(K.7p=$("<9H>"))))).V()).14(K.1Q=$("<13>").W("9r").14(K.4D=$("<13>").W("9s")).V()),1h.1D&&1h.1D<7){M a=K.U[0].4k;a.Y="3U",a.4X("19",\'((!!1w.2c && 2c(1w).3l()) || 0) + "1a"\');M b=K.1Q[0].4k;b.Y="3U",b.4X("19",\'((!!1w.2c && 2c(1w).3l()) || 0) + "1a"\')}K.2V(),K.3A()},2V:L(){K.N=$.1k({24:!0,6j:{21:"da",1U:"db"},1Q:!0},P.N&&P.N.1i||{}),K.9I()},3W:L(a){M b={U:"dc",1Q:"9t"};$.1t(b,$.Z(L(b,c){M d=K[b];$.1t((d[0].6N||"").2D(" "),L(a,b){b.2Q(c)>-1&&d.2m(b)}),d.W(c+a)},K))},9I:L(){K.7n.V(),K.7p.V(),K.N.6j&&(K.7n.1J(K.N.6j.21).17(),K.7p.1J(K.N.6j.1U).17())},3A:L(){K.7l.1O("2g",L(){P.1d(),P.21(),$(K).38()}),K.5o.1O("2g",L(){$(K).1o(".4H").1e>0||P[P.1f.1s("3E")?"1d":"1W"](!0)}),K.7o.1O("2g",L(){P.1d(),P.1U(),$(K).38()}),K.4D.1O("2g",L(){P.V()}),K.U.1B(K.1Q).1O("1C:2b",$.Z(L(a){(!P.N||!P.N.2b||P.N&&P.N.26)&&(a.2P(),a.2O())},K))},17:L(){M a=K.U,b=P.N.1i,c=b&&b.1Q;2J(c){1y"19":a=a.1B(K.1Q);2l;1y"5j":a=a.1B(P.3b)}a.17()},V:L(){K.U.V(),K.1Q.V()},2h:L(){K.2V(),K.U.1o(".4H").2m("4H"),P.5b()||K.7l.1o(".3v").W("4H"),P.N.24||K.5o.1o(".3v").W("4H"),P.5c()||K.7o.1o(".3v").W("4H"),K.U.2m("9J");M a=P.1r&&$.9C(P.1r,L(a){S a.N.24}).1e>0;a&&K.U.W("9J"),K.U["19"==J.T&&P.1r.1e>1?"17":"V"](),K[P.1f.1s("3E")?"1W":"1d"]()},1W:L(){K.5o.W("9K")},1d:L(){K.5o.2m("9K")}},P.4z=L(){L a(){$(1p.3g).14($(1p.3j("13")).W("dd").14($("<13>").W("5U").14(K.7q=$("<13>").W("5V"))))}L b(a){S{Q:$(a).4V(),R:$(a).4n()}}L c(a){M c=b(a),d=a.5C;S d&&$(d).X({Q:c.Q+"1a"})&&b(a).R>c.R&&c.Q++,$(d).X({Q:"2I%"}),c}L d(a,b,c){K.7q||K.4p(),$.1k({22:!1},1N[3]||{}),(b.N.4h||2p.6v(a))&&(b.N.4h&&"2q"==$.T(a)&&(a=$("#"+a)[0]),!P.49&&a&&2p.U.7B(a)&&($(a).1c("8U",$(a).X("8V")),P.49=1p.3j("13"),$(a).43($(P.49).V())));M e=1p.3j("13");K.7q.14($(e).W("57").14(a)),2p.6v(a)&&$(a).17(),b.N.69&&$(e).W(b.N.69),b.N.1L&&$(e).W("8Y"+b.N.1L);M f=$(e).1o("5s[2w]").6b(L(){S!($(K).1M("R")&&$(K).1M("Q"))});11(f.1e>0){P.1f.1j("3r",!0);M g=0,h=b.1n,i=15.2f(de,df*(f.1e||0));P.28.2n("3r"),P.28.1j("3r",$.Z(L(){f.1t(L(){K.34=L(){}}),g>=f.1e||P.12&&P.12.1n!=h||K.5g(e,b,c)},K),i),P.1f.1j("3r",f),$.1t(f,$.Z(L(a,d){M i=2y 7a;i.34=$.Z(L(){i.34=L(){};M a=i.Q,j=i.R,k=$(d).1M("Q"),l=$(d).1M("R");11(k&&l||(!k&&l?(a=15.2j(l*a/j),j=l):!l&&k&&(j=15.2j(k*j/a),a=k),$(d).1M({Q:a,R:j})),g++,g==f.1e){11(P.28.2n("3r"),P.1f.1j("3r",!1),P.12&&P.12.1n!=h)S;K.5g(e,b,c)}},K),i.2w=d.2w},K))}2E K.5g(e,b,c)}L e(a,b,d){M e=c(a);e=f(a,e,b),P.41(e.Q,e.R,{33:L(){P.1l.1J(a),d&&d()}})}L f(a,b,d){M e={Q:b.Q-(1X($(a).X("2A-1b"))||0)-(1X($(a).X("2A-5f"))||0),R:b.R-(1X($(a).X("2A-19"))||0)-(1X($(a).X("2A-dg"))||0)},f=P.N.Q;11(f&&"2z"==$.T(f)&&e.Q>f&&($(a).X({Q:f+"1a"}),b=c(a)),b=P.1u.4a(b,d),/(4h|2G|1J)/.5u(d.T)&&P.1f.1s("40")){M g=$("<13>");g.X({Y:"3U",19:0,1b:0,Q:"2I%",R:"2I%"}),$(a).14(g);M h=g.4V();$(a).X(1a(b)).X({dh:"31"});M i=g.4V(),j=h-i;j&&(b.Q+=j,$(a).X(1a(b)),b=P.1u.4a(b,d)),g.2a()}S b}S{4p:a,3m:d,5g:e,8o:f,8n:c}}(),$.1k(!0,1z,L(){L 17(d){M e=1N[1]||{},Y=1N[2];1N[1]&&"2z"==$.T(1N[1])&&(Y=1N[1],e=G.2t({}));M f=[],9L;2J(9L=$.T(d)){1y"2q":1y"4C":M g=2y 4f(d,e);11(g.3s){11(d&&1==d.5B){M h=$(\'.1C[1c-1C-3s="\'+$(d).1c("1C-3s")+\'"]\'),j={};h.6b("[1c-1C-3s-N]").1t(L(i,a){$.1k(j,77("({"+($(a).1M("1c-1C-3s-N")||"")+"})"))}),h.1t(L(a,b){Y||b!=d||(Y=a+1),f.3e(2y 4f(b,$.1k({},j,e)))})}}2E{M j={};d&&1==d.5B&&$(d).1T("[1c-1C-3s-N]")&&($.1k(j,77("({"+($(d).1M("1c-1C-3s-N")||"")+"})")),g=2y 4f(d,$.1k({},j,e))),f.3e(g)}2l;1y"di":$.1t(d,L(a,b){M c=2y 4f(b,e);f.3e(c)})}(!Y||1>Y)&&(Y=1),Y>f.1e&&(Y=f.1e),P.4A(f,Y,{6Y:!0}),P.17(L(){P.2i(Y)})}L 2h(){S P.2h(),K}L 4Y(a){S P.4Y(a),K}L V(){S P.V(),K}L 1W(a){S P.1W(a),K}L 1d(){S P.1d(),K}S{17:17,V:V,1W:1W,1d:1d,2h:2h,4Y:4Y}}()),D.1z=1z,$(1p).7I(L(){1z.2S()})}(2c,1w);',62,825,'||||||||||||||||||||||||||||||||||||||||||||||this|function|var|options||Window|width|height|return|type|element|hide|addClass|css|position|proxy||if|view|div|append|Math||show||top|px|left|data|stop|length|States|dimensions|Browser|controls|set|extend|content|null|url|find|document|shadow|views|get|each|Dimensions|effects|window|opacity|case|Lightview|radius|add|lightview|IE|cache|queue|_m|for|radian|html|image|skin|attr|arguments|bind|visible|close|border|thumbnails|is|next|titleCaption|play|parseInt|color|caption|_dimensions|previous|spinner|thumbnail|slideshow||viewport||Timeouts|ceil|remove|mousewheel|jQuery||size|max|click|refresh|setPosition|round|Top|break|removeClass|clear|lineTo|_|string|background|slider|create|spacing|title|src|items|new|number|padding|bubble|105|split|else|canvas|ajax|slide|100|switch|Thumbnails|fadeTo|side|deepExtendClone|stopPropagation|preventDefault|indexOf|Spinners|init|overlay|arc|setOptions|sfcc|clone|Overlay|Canvas|sideButtonsUnderneath|auto||complete|onload|target|offset||blur||getLayout|buttonTopClose|Relative|spinnerWrapper|push|slider_slide|body|MobileSafari|support|createElement|resize|scrollTop|update|innerPreviousNextOverlays|lv_button|116|pos|preloading_images|group|enabled|Slider|lv_icon|180|children|charAt|lv_side_buttons_underneath|startObserving|margin|duration|count|playing|lv_thumbnail|setActive|itemCount|slider_slideshow|in|tag|quicktime|void|scripts|call|Color|hex2fill|moveTo|vertical|draw|absolute|fadeOut|setSkin|delegate|111|101|resized|resizeTo|_reset|before|visibility||||inlineContent|inlineMarker|fit|outerWidth|elements|page|lv_slider_number|View|initialize|inline|try|catch|style|Skins|icon|innerHeight|scrollLeft|build|queues|vars|canvasShadow|canvasBubble|lv_side_left|lv_side_button|lv_side_right|114|outer|updateQueue|load|getSurroundingIndexes|object|close_button|extension|preloaded|slider_numbers|lv_icon_disabled|flash|iframe|substr|replace|documentElement|Chrome|required|available|plugins|center|getContext|defaultSkin|fillStyle|innerWidth|horizontal|setExpression|setDefaultSkin|lv_side||lv_inner_previous_next_overlays|first|110|115||layout|lv_content_wrapper||animate|floor|mayPrevious|mayNext|refreshPreviousNext|overlapping|right|_update|delete|keyCode|relative|slider_previous|slider_next|nr_width|scrollToPage|middle_slideshow|PI|apply|warn|img|param|test|deepExtend|toLowerCase|_interval|originalEvent|easing|prototype|nodeType|parentNode|parseFloat|WebKit|navigator|name|G_vmlCanvasManager|000|substring|fill|x1|y1|x2|y2|setOpacity|durations|scroll|150|showhide|lv_window|lv_content|lv_button_inner_previous_overlay|lv_button_inner_next_overlay|ctxBubble|108|112|scale|inner|place|controls_type_changed|preload|value|after|stopQueues|wrapperClass|scaleWithin|filter|params|min|track|loading|_urls|lv_thumbnail_image|pageCount|text|console|createHTML|inArray|RegExp|detectType|detectExtension|match|lifetime|iteration|fail|pow|isElement|Opera|opera|version|Requirements|swfobject|check|join|QuickTime|sides|delay|drawRoundedRectangle|expand|closePath|createFillStyle|_adjust|prepend|setVars|className|lv_spinner_wrapper|ctxShadow|closest|104|118|_pinchZoomed|_drawBackgroundPath|fromSpacingX|fromSpacingY|fromPadding|initialDimensionsOnly|once|inherit|middle|cleanContent|disable|getDimensions|setTitleCaption|_states|eval|fetchOptions|getKeyByKeyCode|Image|Cache|Loading|_skin|_loading_images|lv_load_thumbnail|lv_slider_icon|lv_slider_slideshow_disabled|lv_slider_number_last|refreshButtonStates|lv_slider_number_empty|middle_previous|lv_top_button|text_previous|middle_next|text_next|container|String|base|constructor|domain|3e5|clearInterval|wheelDelta|120|detail|Array|isAttached|AppleWebKit|Gecko|getUniqueID|SWFObject|Za|notified|ready|map|ShockwaveFlash|prefix|toUpperCase|createEvent|boxShadow|borderRadius|boolean|red|green|blue|undefined|fff|devicePixelRatio|beginPath|fillRect|Gradient|addColorStops|dPA|1e3|lv_skin|lv_shadow|close_lightview|applyFixes|stopObserving|lv_side_button_|lv_side_button_out|109|107|117|103|scrolling|resizing|undelegate|clearRect|_drawBorderPath|_drawShadow|firstChild|lv_blank_background|25000px|getMeasureElementDimensions|getFittedDimensions|controls_from_spacing_x|toSpacingX|sxDiff|controls_from_spacing_y|toSpacingY|syDiff|controls_from_padding|toPadding|pDiff|step|easeInOutQuart|removeAttr|getPlacement|lv|fx|placement|onHide|setInitialDimensions|onShow|preloadSurroundingImages|continuous|hideOverlapping|embed|wmode|transparent|restoreOverlapping|restoreOverlappingWithinContent|_show|_hide|createSpinner|restoreInlineContent|lv_restore_inline_display|display|lv_has_caption|lv_has_title|lv_content_|121||errors|pluginspage|pluginspages|lv_content_image||controller||||SetControllerVisible|dataType|afterUpdate|enable|measureElement|timeout_|clearTimeout|href|isExternal|getBoundsScale|space|esc|onkeydown|onkeyup|populate|lv_thumbnails|lv_thumbnails_slider|lv_controls_top_close|lv_controls_top_close_button|lv_controls_top_close_skin_|stopLoadingImages|_getThumbnailsWithinViewport|loadThumbnailsWithinViewport|adjustToViewport|lv_thumbnail_active|lv_slider_next|Page|nr_margin_last|grep|lv_slider_number_active|lv_slider_next_disabled|lv_slider_previous_disabled|lv_slider_slideshow_playing|span|setText|lv_controls_top_with_slideshow|lv_top_slideshow_playing|object_type|pyth|sqrt|degrees|fromCharCode|log|area|basefont|col|frame|hr|input|link|isindex|meta|range|spacer|wbr|Object|extensions|deferUntil|setInterval|Event|trigger|isPropagationStopped|isDefaultPrevented|DOMMouseScroll|Quart|easeIn|easeOut|easeInOut|slice|exec|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|userAgent|lv_identity_|getElementById|fn||jquery|ua|Version|z_|z0|requires|ActiveXObject|Shockwave|Flash|init_|Webkit|Moz|ms|Khtml|touch|TouchEvent|transitions|WebKitTransitionEvent|TransitionEvent|OTransitionEvent|expressions|prefixed|initialTypeOptions|reset|rgba|255|360|hue|saturation|brightness|0123456789abcdef|hex2rgb|getSaturatedBW|initElement|mergedCorner|toFixed|isArray|createLinearGradient|05|addColorStop|inside|lv_overlay|533|dark|lv_window_|lv_bubble|lv_side_button_previous|lv_side_button_next|lv_title_caption|titleCaptionSlide|lv_title_caption_slide|lv_title|lv_caption|lv_button_top_close|none|about|blank|fixed|mouseover||touchmove|mouseout|102|106|119|addEventListener|gesturechange|200|orientationchange|lv_close|15000px|lvresizecount|initialDimensions|select|hidden|tagName|Stop|innerHTML|default|122|1e5|00006000600660060060666060060606666060606|00006000606000060060060060060606000060606|00006000606066066660060060060606666060606|00006000606006060060060060060606000060606|000066606006600600600600066006066660066600000|1800|missing_plugin|gif|progid|DXImageTransform|Microsoft|AlphaImageLoader|sizingMethod|alt|id|embedSWF|flashvars|lv_content_flash|class|lv_content_object|merge|codebase|http|www|apple|com|qtactivex|qtplugin|cab|classid|clsid|02BF25D5|8C17|4B23|BC80|D3488ABDDC6B|video|iframe_movie|frameBorder|hspace|lv_content_iframe|lv_content_html|success|responseText|9999999|outerHeight|270|cos|setTimeout|isMedia|scaleToBounds|keydown|keyup|keyboard|callback|inject|currentTarget|lv_button_top_close_controls_type_|lv_thumbnails_slide|offsetHeight|lv_thumbnails_skin_|lv_thumbnail_icon|lv_thumbnail_icon_|lv_thumbnail_image_spinner_overlay|_previous|_next|lv_controls_relative|lv_slider|lv_slider_previous|lv_slider_numbers|lv_slider_slide|lv_slider_slideshow|slider_|hasClass|makeArray|999|linear|previousPage|nextPage|last|lv_controls_top|lv_top_middle|lv_top_previous|lv_top_slideshow|lv_top_next|Prev|Next|lv_controls_top_skin_|lv_update_queue|8e3|750|bottom|overflow|array'.split('|'),0,{}));

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
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);

/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(e){var t=function(t,n){var r=e.extend({},e.fn.nivoSlider.defaults,n);var i={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false,controlNavEl:false};var s=e(t);s.data("nivo:vars",i).addClass("nivoSlider");var o=s.children();o.each(function(){var t=e(this);var n="";if(!t.is("img")){if(t.is("a")){t.addClass("nivo-imageLink");n=t}t=t.find("img:first")}var r=r===0?t.attr("width"):t.width(),s=s===0?t.attr("height"):t.height();if(n!==""){n.css("display","none")}t.css("display","none");i.totalSlides++});if(r.randomStart){r.startSlide=Math.floor(Math.random()*i.totalSlides)}if(r.startSlide>0){if(r.startSlide>=i.totalSlides){r.startSlide=i.totalSlides-1}i.currentSlide=r.startSlide}if(e(o[i.currentSlide]).is("img")){i.currentImage=e(o[i.currentSlide])}else{i.currentImage=e(o[i.currentSlide]).find("img:first")}if(e(o[i.currentSlide]).is("a")){e(o[i.currentSlide]).css("display","block")}var u=e("<img/>").addClass("nivo-main-image");u.attr("src",i.currentImage.attr("src")).show();s.append(u);e(window).resize(function(){s.children("img").width(s.width());u.attr("src",i.currentImage.attr("src"));u.stop().height("auto");e(".nivo-slice").remove();e(".nivo-box").remove()});s.append(e('<div class="nivo-caption"></div>'));var a=function(t){var n=e(".nivo-caption",s);if(i.currentImage.attr("title")!=""&&i.currentImage.attr("title")!=undefined){var r=i.currentImage.attr("title");if(r.substr(0,1)=="#")r=e(r).html();if(n.css("display")=="block"){setTimeout(function(){n.html(r)},t.animSpeed)}else{n.html(r);n.stop().fadeIn(t.animSpeed)}}else{n.stop().fadeOut(t.animSpeed)}};a(r);var f=0;if(!r.manualAdvance&&o.length>1){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}if(r.directionNav){s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+r.prevText+'</a><a class="nivo-nextNav">'+r.nextText+"</a></div>");e(s).on("click","a.nivo-prevNav",function(){if(i.running){return false}clearInterval(f);f="";i.currentSlide-=2;d(s,o,r,"prev")});e(s).on("click","a.nivo-nextNav",function(){if(i.running){return false}clearInterval(f);f="";d(s,o,r,"next")})}if(r.controlNav){i.controlNavEl=e('<div class="nivo-controlNav"></div>');s.after(i.controlNavEl);for(var l=0;l<o.length;l++){if(r.controlNavThumbs){i.controlNavEl.addClass("nivo-thumbs-enabled");var c=o.eq(l);if(!c.is("img")){c=c.find("img:first")}if(c.attr("data-thumb"))i.controlNavEl.append('<a class="nivo-control" rel="'+l+'"><img src="'+c.attr("data-thumb")+'" alt="" /></a>')}else{i.controlNavEl.append('<a class="nivo-control" rel="'+l+'">'+(l+1)+"</a>")}}e("a:eq("+i.currentSlide+")",i.controlNavEl).addClass("active");e("a",i.controlNavEl).bind("click",function(){if(i.running)return false;if(e(this).hasClass("active"))return false;clearInterval(f);f="";u.attr("src",i.currentImage.attr("src"));i.currentSlide=e(this).attr("rel")-1;d(s,o,r,"control")})}if(r.pauseOnHover){s.hover(function(){i.paused=true;clearInterval(f);f=""},function(){i.paused=false;if(f===""&&!r.manualAdvance){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}})}s.bind("nivo:animFinished",function(){u.attr("src",i.currentImage.attr("src"));i.running=false;e(o).each(function(){if(e(this).is("a")){e(this).css("display","none")}});if(e(o[i.currentSlide]).is("a")){e(o[i.currentSlide]).css("display","block")}if(f===""&&!i.paused&&!r.manualAdvance){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}r.afterChange.call(this)});var h=function(t,n,r){if(e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display","block");e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility","hidden").show();var i=e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").parent().is("a")?e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").parent().height():e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").height();for(var s=0;s<n.slices;s++){var o=Math.round(t.width()/n.slices);if(s===n.slices-1){t.append(e('<div class="nivo-slice" name="'+s+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block !important; top:0; left:-"+(o+s*o-o)+'px;" /></div>').css({left:o*s+"px",width:t.width()-o*s+"px",height:i+"px",opacity:"0",overflow:"hidden"}))}else{t.append(e('<div class="nivo-slice" name="'+s+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block !important; top:0; left:-"+(o+s*o-o)+'px;" /></div>').css({left:o*s+"px",width:o+"px",height:i+"px",opacity:"0",overflow:"hidden"}))}}e(".nivo-slice",t).height(i);u.stop().animate({height:e(r.currentImage).height()},n.animSpeed)};var p=function(t,n,r){if(e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display","block");e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility","hidden").show();var i=Math.round(t.width()/n.boxCols),s=Math.round(e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").height()/n.boxRows);for(var o=0;o<n.boxRows;o++){for(var a=0;a<n.boxCols;a++){if(a===n.boxCols-1){t.append(e('<div class="nivo-box" name="'+a+'" rel="'+o+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block; top:-"+s*o+"px; left:-"+i*a+'px;" /></div>').css({opacity:0,left:i*a+"px",top:s*o+"px",width:t.width()-i*a+"px"}));e('.nivo-box[name="'+a+'"]',t).height(e('.nivo-box[name="'+a+'"] img',t).height()+"px")}else{t.append(e('<div class="nivo-box" name="'+a+'" rel="'+o+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block; top:-"+s*o+"px; left:-"+i*a+'px;" /></div>').css({opacity:0,left:i*a+"px",top:s*o+"px",width:i+"px"}));e('.nivo-box[name="'+a+'"]',t).height(e('.nivo-box[name="'+a+'"] img',t).height()+"px")}}}u.stop().animate({height:e(r.currentImage).height()},n.animSpeed)};var d=function(t,n,r,i){var s=t.data("nivo:vars");if(s&&s.currentSlide===s.totalSlides-1){r.lastSlide.call(this)}if((!s||s.stop)&&!i){return false}r.beforeChange.call(this);if(!i){u.attr("src",s.currentImage.attr("src"))}else{if(i==="prev"){u.attr("src",s.currentImage.attr("src"))}if(i==="next"){u.attr("src",s.currentImage.attr("src"))}}s.currentSlide++;if(s.currentSlide===s.totalSlides){s.currentSlide=0;r.slideshowEnd.call(this)}if(s.currentSlide<0){s.currentSlide=s.totalSlides-1}if(e(n[s.currentSlide]).is("img")){s.currentImage=e(n[s.currentSlide])}else{s.currentImage=e(n[s.currentSlide]).find("img:first")}if(r.controlNav){e("a",s.controlNavEl).removeClass("active");e("a:eq("+s.currentSlide+")",s.controlNavEl).addClass("active")}a(r);e(".nivo-slice",t).remove();e(".nivo-box",t).remove();var o=r.effect,f="";if(r.effect==="random"){f=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");o=f[Math.floor(Math.random()*(f.length+1))];if(o===undefined){o="fade"}}if(r.effect.indexOf(",")!==-1){f=r.effect.split(",");o=f[Math.floor(Math.random()*f.length)];if(o===undefined){o="fade"}}if(s.currentImage.attr("data-transition")){o=s.currentImage.attr("data-transition")}s.running=true;var l=0,c=0,d="",m="",g="",y="";if(o==="sliceDown"||o==="sliceDownRight"||o==="sliceDownLeft"){h(t,r,s);l=0;c=0;d=e(".nivo-slice",t);if(o==="sliceDownLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);n.css({top:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="sliceUp"||o==="sliceUpRight"||o==="sliceUpLeft"){h(t,r,s);l=0;c=0;d=e(".nivo-slice",t);if(o==="sliceUpLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);n.css({bottom:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="sliceUpDown"||o==="sliceUpDownRight"||o==="sliceUpDownLeft"){h(t,r,s);l=0;c=0;var b=0;d=e(".nivo-slice",t);if(o==="sliceUpDownLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);if(c===0){n.css("top","0px");c++}else{n.css("bottom","0px");c=0}if(b===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;b++})}else if(o==="fold"){h(t,r,s);l=0;c=0;e(".nivo-slice",t).each(function(){var n=e(this);var i=n.width();n.css({top:"0px",width:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({width:i,opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({width:i,opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="fade"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:t.width()+"px"});m.animate({opacity:"1.0"},r.animSpeed*2,"",function(){t.trigger("nivo:animFinished")})}else if(o==="slideInRight"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:"0px",opacity:"1"});m.animate({width:t.width()+"px"},r.animSpeed*2,"",function(){t.trigger("nivo:animFinished")})}else if(o==="slideInLeft"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:"0px",opacity:"1",left:"",right:"0px"});m.animate({width:t.width()+"px"},r.animSpeed*2,"",function(){m.css({left:"0px",right:""});t.trigger("nivo:animFinished")})}else if(o==="boxRandom"){p(t,r,s);g=r.boxCols*r.boxRows;c=0;l=0;y=v(e(".nivo-box",t));y.each(function(){var n=e(this);if(c===g-1){setTimeout(function(){n.animate({opacity:"1"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1"},r.animSpeed)},100+l)}l+=20;c++})}else if(o==="boxRain"||o==="boxRainReverse"||o==="boxRainGrow"||o==="boxRainGrowReverse"){p(t,r,s);g=r.boxCols*r.boxRows;c=0;l=0;var w=0;var E=0;var S=[];S[w]=[];y=e(".nivo-box",t);if(o==="boxRainReverse"||o==="boxRainGrowReverse"){y=e(".nivo-box",t)._reverse()}y.each(function(){S[w][E]=e(this);E++;if(E===r.boxCols){w++;E=0;S[w]=[]}});for(var x=0;x<r.boxCols*2;x++){var T=x;for(var N=0;N<r.boxRows;N++){if(T>=0&&T<r.boxCols){(function(n,i,s,u,a){var f=e(S[n][i]);var l=f.width();var c=f.height();if(o==="boxRainGrow"||o==="boxRainGrowReverse"){f.width(0).height(0)}if(u===a-1){setTimeout(function(){f.animate({opacity:"1",width:l,height:c},r.animSpeed/1.3,"",function(){t.trigger("nivo:animFinished")})},100+s)}else{setTimeout(function(){f.animate({opacity:"1",width:l,height:c},r.animSpeed/1.3)},100+s)}})(N,T,l,c,g);c++}T--}l+=100}}};var v=function(e){for(var t,n,r=e.length;r;t=parseInt(Math.random()*r,10),n=e[--r],e[r]=e[t],e[t]=n);return e};var m=function(e){if(this.console&&typeof console.log!=="undefined"){console.log(e)}};this.stop=function(){if(!e(t).data("nivo:vars").stop){e(t).data("nivo:vars").stop=true;m("Stop Slider")}};this.start=function(){if(e(t).data("nivo:vars").stop){e(t).data("nivo:vars").stop=false;m("Start Slider")}};r.afterLoad.call(this);return this};e.fn.nivoSlider=function(n){return this.each(function(r,i){var s=e(this);if(s.data("nivoslider")){return s.data("nivoslider")}var o=new t(this,n);s.data("nivoslider",o)})};e.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,controlNav:true,controlNavThumbs:false,pauseOnHover:true,manualAdvance:false,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};e.fn._reverse=[].reverse})(jQuery)
;
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
/*! Pushy - v0.9.2 - 2014-9-13
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */


$(function() {
  var pushy = $('.pushy'), //menu css class
    body = $('body'),
    container = $('#container'), //container css class
    push = $('.pushme'), //css class to add pushy capability
    siteOverlay = $('.site-overlay'), //site overlay
    pushyClass = "pushy-left pushy-open", //menu position & menu open class
    pushyActiveClass = "pushy-active", //css class to toggle site overlay
    containerClass = "container-push", //container open class
    pushClass = "push-push", //css class to add pushy capability
    menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
    menuSpeed = 300, //jQuery fallback menu speed
    menuWidth = pushy.width() + "px"; //jQuery fallback menu width

  function togglePushy(){
    body.toggleClass(pushyActiveClass); //toggle site overlay
    pushy.toggleClass(pushyClass);
    container.toggleClass(containerClass);
    push.toggleClass(pushClass); //css class to add pushy capability
  }

  function openPushyFallback(){
    body.addClass(pushyActiveClass);
    pushy.animate({left: "0px"}, menuSpeed);
    container.animate({left: menuWidth}, menuSpeed);
    push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
  }

  function closePushyFallback(){
    body.removeClass(pushyActiveClass);
    pushy.animate({left: "-" + menuWidth}, menuSpeed);
    container.animate({left: "0px"}, menuSpeed);
    push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
  }

  //checks if 3d transforms are supported removing the modernizr dependency
  cssTransforms3d = (function csstransforms3d(){
    var el = document.createElement('p'),
    supported = false,
    transforms = {
        'webkitTransform':'-webkit-transform',
        'OTransform':'-o-transform',
        'msTransform':'-ms-transform',
        'MozTransform':'-moz-transform',
        'transform':'transform'
    };

    // Add it to the body to get the computed style
    document.body.insertBefore(el, null);

    for(var t in transforms){
        if( el.style[t] !== undefined ){
            el.style[t] = 'translate3d(1px,1px,1px)';
            supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (supported !== undefined && supported.length > 0 && supported !== "none");
  })();

  if(cssTransforms3d){
    //toggle menu
    menuBtn.click(function() {
      togglePushy();
    });
    //close menu when clicking site overlay
    siteOverlay.click(function(){
      togglePushy();
    });
  }else{
    //jQuery fallback
    pushy.css({left: "-" + menuWidth}); //hide menu by default
    container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

    //keep track of menu state (open/close)
    var state = true;

    //toggle menu
    menuBtn.click(function() {
      if (state) {
        openPushyFallback();
        state = false;
      } else {
        closePushyFallback();
        state = true;
      }
    });

    //close menu when clicking site overlay
    siteOverlay.click(function(){
      if (state) {
        openPushyFallback();
        state = false;
      } else {
        closePushyFallback();
        state = true;
      }
    });
  }
});
(function() {


}).call(this);