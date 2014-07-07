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

// jquery.pjax.js 1.7.0
// copyright chris wanstrath
// https://github.com/defunkt/jquery-pjax

!function(a){function b(b,d,e){var f=this;return this.on("click.pjax",b,function(b){var g=a.extend({},p(d,e));g.container||(g.container=a(this).attr("data-pjax")||f),c(b,g)})}function c(b,c,d){d=p(c,d);var f=b.currentTarget;if("A"!==f.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(b.which>1||b.metaKey||b.ctrlKey||b.shiftKey||b.altKey||location.protocol!==f.protocol||location.hostname!==f.hostname||f.hash&&f.href.replace(f.hash,"")===location.href.replace(location.hash,"")||f.href===location.href+"#")){var g={url:f.href,container:a(f).attr("data-pjax"),target:f},h=a.extend({},g,d),i=a.Event("pjax:click");a(f).trigger(i,[h]),i.isDefaultPrevented()||(e(h),b.preventDefault(),a(f).trigger("pjax:clicked",[h]))}}function d(b,c,d){d=p(c,d);var f=b.currentTarget;if("FORM"!==f.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var g={type:f.method.toUpperCase(),url:f.action,data:a(f).serializeArray(),container:a(f).attr("data-pjax"),target:f};e(a.extend({},g,d)),b.preventDefault()}function e(b){function h(b,d){var e=a.Event(b,{relatedTarget:c});return f.trigger(e,d),!e.isDefaultPrevented()}b=a.extend(!0,{},a.ajaxSettings,e.defaults,b),a.isFunction(b.url)&&(b.url=b.url());var c=b.target,d=o(b.url).hash,f=b.context=q(b.container);b.data||(b.data={}),b.data._pjax=f.selector;var i;b.beforeSend=function(a,c){return"GET"!==c.type&&(c.timeout=0),a.setRequestHeader("X-PJAX","true"),a.setRequestHeader("X-PJAX-Container",f.selector),h("pjax:beforeSend",[a,c])?(c.timeout>0&&(i=setTimeout(function(){h("pjax:timeout",[a,b])&&a.abort("timeout")},c.timeout),c.timeout=0),b.requestUrl=o(c.url).href,void 0):!1},b.complete=function(a,c){i&&clearTimeout(i),h("pjax:complete",[a,c,b]),h("pjax:end",[a,b])},b.error=function(a,c,d){var e=t("",a,b),f=h("pjax:error",[a,c,d,b]);"GET"==b.type&&"abort"!==c&&f&&g(e.url)},b.success=function(c,i,j){var k="function"==typeof a.pjax.defaults.version?a.pjax.defaults.version():a.pjax.defaults.version,l=j.getResponseHeader("X-PJAX-Version"),n=t(c,j,b);if(k&&l&&k!==l)return g(n.url),void 0;if(!n.contents)return g(n.url),void 0;e.state={id:b.id||m(),url:n.url,title:n.title,container:f.selector,fragment:b.fragment,timeout:b.timeout},(b.push||b.replace)&&window.history.replaceState(e.state,n.title,n.url),document.activeElement.blur(),n.title&&(document.title=n.title),f.html(n.contents);var p=f.find("input[autofocus], textarea[autofocus]").last()[0];if(p&&document.activeElement!==p&&p.focus(),u(n.scripts),"number"==typeof b.scrollTo&&a(window).scrollTop(b.scrollTo),""!==d){var q=o(n.url);q.hash=d,e.state.url=q.href,window.history.replaceState(e.state,n.title,q.href);var r=a(q.hash);r.length&&a(window).scrollTop(r.offset().top)}h("pjax:success",[c,i,j,b])},e.state||(e.state={id:m(),url:window.location.href,title:document.title,container:f.selector,fragment:b.fragment,timeout:b.timeout},window.history.replaceState(e.state,document.title));var j=e.xhr;j&&j.readyState<4&&(j.onreadystatechange=a.noop,j.abort()),e.options=b;var j=e.xhr=a.ajax(b);return j.readyState>0&&(b.push&&!b.replace&&(y(e.state.id,f.clone().contents()),window.history.pushState(null,"",n(b.requestUrl))),h("pjax:start",[j,b]),h("pjax:send",[j,b])),e.xhr}function f(b,c){var d={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return e(a.extend(d,p(b,c)))}function g(a){window.history.replaceState(null,"","#"),window.location.replace(a)}function k(b){var c=b.state;if(c&&c.container){if(h&&i==c.url)return;if(e.state.id===c.id)return;var d=a(c.container);if(d.length){var f,j=v[c.id];e.state&&(f=e.state.id<c.id?"forward":"back",z(f,e.state.id,d.clone().contents()));var k=a.Event("pjax:popstate",{state:c,direction:f});d.trigger(k);var l={id:c.id,url:c.url,container:d,push:!1,fragment:c.fragment,timeout:c.timeout,scrollTo:!1};j?(d.trigger("pjax:start",[null,l]),c.title&&(document.title=c.title),d.html(j),e.state=c,d.trigger("pjax:end",[null,l])):e(l),d[0].offsetHeight}else g(location.href)}h=!1}function l(b){var c=a.isFunction(b.url)?b.url():b.url,d=b.type?b.type.toUpperCase():"GET",e=a("<form>",{method:"GET"===d?"GET":"POST",action:c,style:"display:none"});"GET"!==d&&"POST"!==d&&e.append(a("<input>",{type:"hidden",name:"_method",value:d.toLowerCase()}));var f=b.data;if("string"==typeof f)a.each(f.split("&"),function(b,c){var d=c.split("=");e.append(a("<input>",{type:"hidden",name:d[0],value:d[1]}))});else if("object"==typeof f)for(key in f)e.append(a("<input>",{type:"hidden",name:key,value:f[key]}));a(document.body).append(e),e.submit()}function m(){return(new Date).getTime()}function n(a){return a.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function o(a){var b=document.createElement("a");return b.href=a,b}function p(b,c){return b&&c?c.container=b:c=a.isPlainObject(b)?b:{container:b},c.container&&(c.container=q(c.container)),c}function q(b){if(b=a(b),b.length){if(""!==b.selector&&b.context===document)return b;if(b.attr("id"))return a("#"+b.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+b.selector}function r(a,b){return a.filter(b).add(a.find(b))}function s(b){return a.parseHTML(b,document,!0)}function t(b,c,d){var e={};if(e.url=n(c.getResponseHeader("X-PJAX-URL")||d.requestUrl),/<html/i.test(b))var f=a(s(b.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),g=a(s(b.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var f=g=a(s(b));if(0===g.length)return e;if(e.title=r(f,"title").last().text(),d.fragment){if("body"===d.fragment)var h=g;else var h=r(g,d.fragment).first();h.length&&(e.contents=h.contents(),e.title||(e.title=h.attr("title")||h.data("title")))}else/<html/i.test(b)||(e.contents=g);return e.contents&&(e.contents=e.contents.not(function(){return a(this).is("title")}),e.contents.find("title").remove(),e.scripts=r(e.contents,"script[src]").remove(),e.contents=e.contents.not(e.scripts)),e.title&&(e.title=a.trim(e.title)),e}function u(b){if(b){var c=a("script[src]");b.each(function(){var b=this.src,d=c.filter(function(){return this.src===b});if(!d.length){var e=document.createElement("script");e.type=a(this).attr("type"),e.src=a(this).attr("src"),document.head.appendChild(e)}})}}function y(a,b){for(v[a]=b,x.push(a);w.length;)delete v[w.shift()];for(;x.length>e.defaults.maxCacheLength;)delete v[x.shift()]}function z(a,b,c){var d,e;v[b]=c,"forward"===a?(d=x,e=w):(d=w,e=x),d.push(b),(b=e.pop())&&delete v[b]}function A(){return a("meta").filter(function(){var b=a(this).attr("http-equiv");return b&&"X-PJAX-VERSION"===b.toUpperCase()}).attr("content")}function B(){a.fn.pjax=b,a.pjax=e,a.pjax.enable=a.noop,a.pjax.disable=C,a.pjax.click=c,a.pjax.submit=d,a.pjax.reload=f,a.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:A},a(window).on("popstate.pjax",k)}function C(){a.fn.pjax=function(){return this},a.pjax=l,a.pjax.enable=B,a.pjax.disable=a.noop,a.pjax.click=a.noop,a.pjax.submit=a.noop,a.pjax.reload=function(){window.location.reload()},a(window).off("popstate.pjax",k)}var h=!0,i=window.location.href,j=window.history.state;j&&j.container&&(e.state=j),"state"in window.history&&(h=!1);var v={},w=[],x=[];a.inArray("state",a.event.props)<0&&a.event.props.push("state"),a.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),a.support.pjax?B():C()}(jQuery);

//      PJAX init
$(document).pjax('a[data-pjax]', '#wrapper', {fragment: '#wrapper',timeout: 10000});
$(document).on({
    'pjax:click': function() {
        NProgress.start();
    },
    'pjax:start': function() {
    },
    'pjax:end': function() {
        NProgress.done();
    }
});
