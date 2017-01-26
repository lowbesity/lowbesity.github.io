//
// function start
// ---------------------------------------------------------

var $ = jQuery.noConflict();

(function($) {
  'use strict';

//
// BONEFISHCODE start
// ---------------------------------------------------------

  var BONEFISHCODE = {
    ready: function() {
      BONEFISHCODE.fn_isMobile();
      BONEFISHCODE.fn_scrollspy();
      BONEFISHCODE.fn_smooth_scroll();
      BONEFISHCODE.fn_popup();
      BONEFISHCODE.fn_form();
      BONEFISHCODE.fn_accordion();
      BONEFISHCODE.fn_countdown();
      BONEFISHCODE.fn_parallaxScrolling();
      BONEFISHCODE.fn_utility();
      BONEFISHCODE.fn_site_header_navbar_utility_class();
      BONEFISHCODE.fn_tooltip();
    },
    load: function() {
      BONEFISHCODE.fn_site_loader();
      BONEFISHCODE.fn_animation();
      BONEFISHCODE.fn_sticky();
      BONEFISHCODE.fn_hero();
      BONEFISHCODE.fn_slideshow();
      BONEFISHCODE.fn_bgYoutube();
    },
    resize: function() {
      BONEFISHCODE.fn_sticky();
    },
    scroll: function() {
      BONEFISHCODE.fn_sticky();
    },
    orientationchange: function() {
      BONEFISHCODE.fn_hero();
    },

//
// is mobile
// ---------------------------------------------------------

    fn_isMobile: function() {
      if ($html.hasClass('mobile') || $html.hasClass('tablet')) {
        isMobile = true;
        $html.addClass('js-is-mobile');
      } else {
        isMobile = false;
        $html.addClass('js-no-mobile');
      }
    },

//
// site loader
// ---------------------------------------------------------

    fn_site_loader: function() {
      var $elem = $('#site_loader');

      if ($elem.length) {
        $elem.fadeOut(site_loader_duration, function() {
          $(this).remove();
        });
      }
    },

//
// animation
// ---------------------------------------------------------

    fn_animation: function() {
      if (!isMobile && Modernizr.cssanimations && Modernizr.csstransforms && Modernizr.csstransforms3d && Modernizr.csstransitions) {
        setTimeout(function() {
          var wow = new WOW();

          wow.init();
        }, site_loader_duration);
      } else {
        $('.wow').removeClass('wow');
      }
    },

//
// scrollspy
// ---------------------------------------------------------

    fn_scrollspy: function() {
      var $elem = $('#site_header_navbar');

      $body.scrollspy({
        target: '#' + $elem.attr('id'),
        offset: parseInt($elem.find('.navbar-header').outerHeight() + 1, 10)
      });
    },

//
// smooth scroll
// ---------------------------------------------------------

    fn_smooth_scroll: function() {
      $('[data-smooth-scroll="true"]').on('click', function(e) {
        e.preventDefault();

        var $target = $($(this).attr('href'));

        if ($target.is(':visible')) {
          var offset = $target.offset().top - $('#site_header_navbar').find('.navbar-header').outerHeight();

          $('html, body').stop().animate({
            scrollTop: offset
          }, 1000, 'easeInOutQuint');
        }
      });
    },

//
// sticky
// ---------------------------------------------------------

    fn_sticky: function() {
      var offset = $('#site_header_navbar').find('.navbar-header').outerHeight();

      if ($(window).scrollTop() > 0) {
        $html.addClass('js-is-page-scrolled').removeClass('js-is-page-no-scroll');
      } else {
        $html.addClass('js-is-page-no-scroll').removeClass('js-is-page-scrolled');
      }
    },

//
// hero
// ---------------------------------------------------------

    fn_hero: function() {
      var $hero = $('.page-intro-section-hero, .js-hero');

      $hero.css('height', $(window).height() + 'px');
    },

//
// popup
// ---------------------------------------------------------

    fn_popup: function() {
      var $popupIframe = $('.popup-youtube, .popup-vimeo, .popup-gmaps');

      if ($popupIframe.length) {
        $popupIframe.each(function() {
          var $this = $(this);

          $this.magnificPopup({
            items: {
              src: $this.data('mfp-src'),
            },
            type: 'iframe',
            midClick: true,
            fixedContentPos: true,
            fixedBgPos: true,
            callbacks: {
              beforeOpen: function() {
                if (!isMobile && $this.hasClass('popup-youtube') || $this.hasClass('popup-vimeo')) {
                  $('.js-bg-youtube-is-playing').each(function() {
                    $(this).YTPPause().toggleClass('js-bg-youtube-is-playing js-bg-youtube-is-paused-by-popup');
                  });
                }
              },
              afterClose: function() {
                if (!isMobile && $this.hasClass('popup-youtube') || $this.hasClass('popup-vimeo')) {
                  $('.js-bg-youtube-is-paused-by-popup').each(function() {
                    $(this).YTPPlay().toggleClass('js-bg-youtube-is-paused-by-popup js-bg-youtube-is-playing');
                  });
                }
              },
            }
          });
        });
      }

      var $popupInline = $('.popup-inline');

      if ($popupInline.length) {
        $popupInline.each(function() {
          var $this = $(this);

          $this.magnificPopup({
            type: 'inline',
            midClick: true,
            closeBtnInside: true,
            fixedContentPos: true,
            fixedBgPos: true,
          });
        });
      }

      var $popupGallery = $('.popup-gallery');

      if ($popupGallery.length) {
        $popupGallery.each(function() {
          var $this = $(this);

          $this.magnificPopup({
            delegate: '.popup-gallery-link',
            type: 'image',
            gallery: {
              enabled: true
            },
            midClick: true,
            fixedContentPos: true,
            fixedBgPos: true
          });
        });
      }
    },

//
// form
// ---------------------------------------------------------

    fn_form: function() {
      var $form_control = $('.form-control');

      if ($form_control.length) {
        $form_control.each(function() {
          var $this = $(this);

          $this.on('focus', function() {
            $(this).parents('.form-group').addClass('js-is-focus');
          }).on('blur', function() {
            $(this).parents('.form-group').removeClass('js-is-focus');
          });
        });
      }

      var $elem = $('.form');

      if ($elem.length) {
        $elem.each(function() {
          var $form = $(this);
          var $formNotify = $form.find('.form-notify');
          var formUrl = $form.data('action');

          $form.validate({
            errorClass: 'js-has-error',
            onclick: false,
            //onfocusout: false,
            //onkeyup: false,
            ignore: '.ignore',
            errorPlacement: function(error, element) {
            },
            highlight: function(element, errorClass) {
              $(element).closest('.form-group').addClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
              $(element).closest('.form-group').removeClass(errorClass);
            },
            submitHandler: function(form, errorClass) {
              $.ajax({
                type: 'POST',
                dataType: 'json',
                url: formUrl,
                cache: false,
                data: $form.serialize(),
                success: function(data) {
                  if (data.type != 'success') {
                    $formNotify.html('<i class="form-notify-icon form-notify-icon-error"></i>' + data.msg).show();
                  } else {
                    $form.validate().resetForm();
                    $form[0].reset();
                    $form.find(errorClass).removeClass(errorClass);
                    $form.addClass('success');
                    $form.find('button').blur();
                    $formNotify.html('<i class="form-notify-icon form-notify-icon-success"></i>' + data.msg).show();
                  }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                  $formNotify.html('<i class="form-notify-icon form-notify-icon-error"></i>An error occurred. Please try again later.').show();
                },
              });
            },
            invalidHandler: function(event, validator) {
              var errors = validator.numberOfInvalids();

              if (errors) {
                var message = errors == 1 ?
                '<i class="form-notify-icon form-notify-icon-error"></i>You missed 1 field. It has been highlighted.' :
                '<i class="form-notify-icon form-notify-icon-error"></i>You missed ' + errors + ' fields. They have been highlighted.';
                $formNotify.html(message).show();
              }
            }
          });
        });
      }
    },

//
// accordion
// ---------------------------------------------------------

  fn_accordion: function() {
    var $collapse = $('.collapse');

    if ($collapse.length) {
      $collapse.on('show.bs.collapse', function() {
        $('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      });

      $collapse.on('hide.bs.collapse', function() {
        $('a[href="#' + $(this).attr('id') + '"]').removeClass('active');
      });
    }
  },

//
// countdown
// ---------------------------------------------------------

  fn_countdown: function() {
    var $el = $('.countdown');

    if ($el.length) {
      $el.each(function() {
        var $countdown = $(this);
        var date = $(this).data('countdown-date');

        $countdown.countdown(date, function(e) {
          var $this = $(this);

          $this.find('.countdown-day > .countdown-digit').html(e.strftime('%D'));
          $this.find('.countdown-hour > .countdown-digit').html(e.strftime('%H'));
          $this.find('.countdown-minute > .countdown-digit').html(e.strftime('%M'));
          $this.find('.countdown-second > .countdown-digit').html(e.strftime('%S'));
        });
      });
    }
  },

//
// parallax scrolling
// ---------------------------------------------------------

    fn_parallaxScrolling: function() {
      if (!isMobile) {
        $('.bg-img-parallax').each(function() {
          $(this).parallax('50%', .1);
        });
      }
    },

//
// slideshow
// ---------------------------------------------------------

  fn_slideshow: function() {
    var $elem = $('.bg-slideshow');

    if ($elem.length) {
      $elem.each(function() {
        var $slideshow = $(this);
        var $amount = $slideshow.data('bg-slideshow-amount');
        var slides = [];
        var animation = $slideshow.data('bg-slideshow-animation');

        for (var i = 1; i <= $amount; i++) {
          slides.push({
            src: $slideshow.data('bg-slideshow-src').replace('%', i)
          })
        }

        $slideshow.vegas({
          slides: slides,
          delay: $slideshow.data('bg-slideshow-delay'),
          animation: animation
        });
      });
    }
  },

//
// bg youtube
// ---------------------------------------------------------

  fn_bgYoutube: function() {
    var $elem = $('.bg-youtube');

    if ($elem.length) {
      $elem.each(function() {
        var $bgYoutube            = $(this);
        var $bgYoutubeFallback    = $bgYoutube.find('.bg-youtube-fallback');
        var $bgYoutubePlaceholder = $bgYoutube.find('.bg-youtube-placeholder');
        var $bgYoutubePlayer      = $bgYoutube.find('.bg-youtube-player');

        if (isMobile) {
          $bgYoutubePlaceholder.add($bgYoutubePlayer).remove();
        } else {
          $bgYoutubePlayer.YTPlayer();
          $bgYoutubeFallback.remove();

          $bgYoutubePlayer.on('YTPPlay', function() {
            $(this).addClass('js-bg-youtube-is-playing').removeClass('js-bg-youtube-is-paused');
          });
          $bgYoutubePlayer.on('YTPPause', function() {
            $(this).addClass('js-bg-youtube-is-paused').removeClass('js-bg-youtube-is-playing');
          });
        }
      });
    }
  },

//
// utility
// ---------------------------------------------------------

    fn_utility: function() {
      $('[data-css-opacity]').each(function() {
        var $this = $(this);
        $this.css('opacity', $this.data('css-opacity'));
      });

      $('[data-css-background-image]').each(function() {
        var $this = $(this);
        $this.css('background-image', 'url(' + $this.data('css-background-image') + ')');
      });

      $('[data-css-background-image-mobile]').each(function() {
        if (isMobile) {
          var $this = $(this);
          $this.css('background-image', 'url(' + $this.data('css-background-image-mobile') + ')');
        }
      });

      $('[data-css-background-image-desktop]').each(function() {
        if (!isMobile) {
          var $this = $(this);
          $this.css('background-image', 'url(' + $this.data('css-background-image-desktop') + ')');
        }
      });
    },

//
// site header navbar utility class
// ---------------------------------------------------------

  fn_site_header_navbar_utility_class: function() {
    var $elem = $('#site_header_navbar');

    if ($elem.length) {
      if (!$elem.hasClass('navbar-bg-from-transparent')) {
        $body.addClass('js-site-header-navbar-has-bg');
      }
    }
  },

//
// tooltip
// ---------------------------------------------------------

  fn_tooltip: function() {
    var $elem = $('[data-toggle="tooltip"]')

    if ($elem.length) {
      $elem.tooltip();
    }
  },

//
// BONEFISHCODE end
// ---------------------------------------------------------

  };

//
// global variable
// --------------------------------------------------
//

  var $html = $('html'),
      $body = $('body'),
      isMobile,
      site_loader_duration = 500;
      if ($('#site_loader').is(':visible') && typeof BONEFISHCODE.fn_site_loader !== 'undefined' && $.isFunction(BONEFISHCODE.fn_site_loader)) {
        site_loader_duration = 1500;
      }

//
// init
// --------------------------------------------------

	$(function() {
		BONEFISHCODE.ready();

    $(window).on('load', function() {
      BONEFISHCODE.load();
    });

    $(window).on('resize', function() {
      BONEFISHCODE.resize();
    });

    $(window).on('scroll', function() {
      BONEFISHCODE.scroll();
    });

    $(window).on('orientationchange', function() {
      BONEFISHCODE.load();
    });
	});

//
// function end
// ---------------------------------------------------------

})(jQuery);
