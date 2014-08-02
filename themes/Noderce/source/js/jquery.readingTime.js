;(function ($, window, document, undefined) {
  
  var pluginName = "readingTime";
  
  var defaults = {
    bubble: '#scrollbubble'
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.scroll_timer = null;
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      $(window).scroll($.proxy(this.updateTime, this));
      $('<div id="scrollbubble"></div>').appendTo("body");
      $('<style>#scrollbubble{display:none;position:fixed;top:0;right:20px;z-index:500;background-color:#000;color:#fff;border-radius:3px;font-family:Georgia;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:3px 8px}#scrollbubble:after{content:" ";position:absolute;top:50%;right:-8px;height:0;width:0;margin-top:-4px;border:4px solid transparent;border-left-color:#000}</style>').appendTo('body');
    },
    updateTime: function () {
      var total_reading_time = 0,
        bubble = $(this.options.bubble),
        post_content = $(this.element);
      var viewportHeight = $(window).height(),
       scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
       progress = $(window).scrollTop() / ($(document).height() - viewportHeight),
       distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - bubble.height() / 2;
      var total_reading_time = this.calculate_total_time_words(post_content, this.element) / 60;
      var total_reading_time_remaining = Math.ceil(total_reading_time - (total_reading_time * progress));
      var text = '';

      if(total_reading_time_remaining > 1) {
        text = total_reading_time_remaining + ' minutes left';
      } else if(progress >= 1) {
        text = 'Thanks for reading';
      } else if (total_reading_time_remaining <= 1) {
        text = 'Less than a minute';
      }

      bubble
        .css('top', distance)
        .text(text)
        .fadeIn(100);

      // Fade out the annotation after 1 second of no scrolling.
      if (this.scroll_timer !== null) {
        clearTimeout(this.scroll_timer);
      }

      this.scroll_timer = setTimeout(function() {
        bubble.fadeOut();
      }, 1000);
    },
    calculate_total_time_words: function(post_content, element){
      var total = 0;
      post_content.each(function() {
        total += Math.round(60*$(element).text().split(' ').length/200); // 200 = number of words per minute
      });

      return total;
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);

/*! NProgress (c) 2013, Rico Sta. Cruz
 *  http://ricostacruz.com/nprogress */
;(function(a){if(typeof module==="function"){module.exports=a(this.jQuery||require("jquery"))}else{this.NProgress=a(this.jQuery)}})(function(e){var a={};a.version="0.1.2";var b=a.settings={minimum:0.08,easing:"ease",positionUsing:"",speed:200,trickle:true,trickleRate:0.02,trickleSpeed:800,showSpinner:true,template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};a.configure=function(g){e.extend(b,g);return this};a.status=null;a.set=function(l){var h=a.isStarted();l=f(l,b.minimum,1);a.status=(l===1?null:l);var g=a.render(!h),j=g.find('[role="bar"]'),i=b.speed,k=b.easing;g[0].offsetWidth;g.queue(function(m){if(b.positionUsing===""){b.positionUsing=a.getPositioningCSS()}j.css(c(l,i,k));if(l===1){g.css({transition:"none",opacity:1});g[0].offsetWidth;setTimeout(function(){g.css({transition:"all "+i+"ms linear",opacity:0});setTimeout(function(){a.remove();m()},i)},i)}else{setTimeout(m,i)}});return this};a.isStarted=function(){return typeof a.status==="number"};a.start=function(){if(!a.status){a.set(0)}var g=function(){setTimeout(function(){if(!a.status){return}a.trickle();g()},b.trickleSpeed)};if(b.trickle){g()}return this};a.done=function(g){if(!g&&!a.status){return this}return a.inc(0.3+0.5*Math.random()).set(1)};a.inc=function(g){var h=a.status;if(!h){return a.start()}else{if(typeof g!=="number"){g=(1-h)*f(Math.random()*h,0.1,0.95)}h=f(h+g,0,0.994);return a.set(h)}};a.trickle=function(){return a.inc(Math.random()*b.trickleRate)};a.render=function(g){if(a.isRendered()){return e("#nprogress")}e("html").addClass("nprogress-busy");var i=e("<div id='nprogress'>").html(b.template);var h=g?"-100":d(a.status||0);i.find('[role="bar"]').css({transition:"all 0 linear",transform:"translate3d("+h+"%,0,0)"});if(!b.showSpinner){i.find('[role="spinner"]').remove()}i.appendTo(document.body);return i};a.remove=function(){e("html").removeClass("nprogress-busy");e("#nprogress").remove()};a.isRendered=function(){return(e("#nprogress").length>0)};a.getPositioningCSS=function(){var g=document.body.style;var h=("WebkitTransform" in g)?"Webkit":("MozTransform" in g)?"Moz":("msTransform" in g)?"ms":("OTransform" in g)?"O":"";if(h+"Perspective" in g){return"translate3d"}else{if(h+"Transform" in g){return"translate"}else{return"margin"}}};function f(i,h,g){if(i<h){return h}if(i>g){return g}return i}function d(g){return(-1+g)*100}function c(j,h,i){var g;if(b.positionUsing==="translate3d"){g={transform:"translate3d("+d(j)+"%,0,0)"}}else{if(b.positionUsing==="translate"){g={transform:"translate("+d(j)+"%,0)"}}else{g={"margin-left":d(j)+"%"}}}g.transition="all "+h+"ms "+i;return g}return a});

  