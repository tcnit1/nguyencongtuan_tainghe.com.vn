/**
 * NEWS PRODUCT DETAIL JS
 * Update on : 07.15.2015
 * ---------------------------------------------------

 * 2. GALLERY SLIDE
 * 3. JS FOR TAB
 * 4. JS REVIEW BOX
 * 5. JS COLUMN RIGHT
 * 6. JS PRODUCT INTRO
 * 7. SHOW MODAL BOX PRE-ORDER LIST
 * 8. GET HEIGH BLK COLOR & BLK QUANLITY
 * 9. COUNT VIEW
 * 10. PRODUCT COUNTDOWN
 */
var prod_detail_fn = {};

/** 
 * 2. GALLERY SLIDE
 * Call SLIDER [ feaslider ] : #fea-slider
 * Navigator [ fea_nav ] : #fea-nav
 */
prod_detail_fn.gallerySlide = {
	runFeaSlider : function (feaslider, fea_nav) {
		if (!$(feaslider).length) {return;}
	    if (!$(fea_nav).length) {return;}

	    $(feaslider).flexslider({
	        directionNav: false,
	        controlNav: false,
	        animationLoop: false,
	        slideshow: false,
	        animationSpeed: 400,
	        sync: fea_nav
	    });

	    // Nav slide
	    $(fea_nav).flexslider({
	        animation: "slide",
	        controlNav: false,
	        animationLoop: false,
	        slideshow: false,
	        itemWidth: 70,
	        itemMargin: 2,
	        animationSpeed: 300,
	        prevText: "<i class='fa fa-angle-left'></i>",
	        nextText: "<i class='fa fa-angle-right'></i>",
	        asNavFor: feaslider
	    });
	},
	/**
	 * hoverFeaImg : hover Fea Img and show Zoom ico
	 * var [ feaimg ]     : #fea-slider
	 * var [ parent_fea ] : .specs-cp-pic
	 */
	hoverFeaImg : function (parent_fea, feaimg) {
		if (!$(feaimg).length) {return;}
	    if (!$(parent_fea).length) {return;}

	    $(parent_fea).on( "mouseover", feaimg, function() {
	        $(parent_fea).find('.ico-zoom').addClass('shw');
	    }).on( "mouseout", feaimg, function() {
	        $(parent_fea).find('.ico-zoom').removeClass('shw');
	    });
	},
	/**
     * runFeaZoom : Zoom Feature img in Detail Page
     * var [ fea_zoom ] : #fea-slider ul
     */
    runFeaZoom : function (fea_zoom) {
        if (!$(fea_zoom).length) {return;}
        $(fea_zoom).lightGallery({
            mode:"slide",
            speed : 400,
            lang: {
                allPhotos: 'Có tất cả'
            },
        });
    }
};
/** 
 * 3. JS FOR TAB
 */
prod_detail_fn.JS_Tab = {
	/** 
	 * General tab
	 */
	general_tab : function () {
		if(!$('.gen-more')) { return; }

		$('.gen-more').on('click', function (e) {
			var $a_click	=	$(this),
				$content	=	$a_click.closest('.gen-content'),
				$div_blur	=	$content.find('.tab-blur');

			if($a_click.hasClass('active')) {
				$a_click.removeClass('active');
				$content.css({'height': '500px', 'overflow': 'hidden'});
				$div_blur.removeClass('blur_close');
				$a_click.text('Xem thêm');
			} else {
				$a_click.addClass('active');
				$content.css({'height': 'auto', 'overflow': 'visible'});
				$div_blur.addClass('blur_close');
				$a_click.text('Thu gọn');
			}
		});
	},
	/** 
	 * Tab scroll col right
	 */
	colTabScroll : function () {
		$(window).scroll(function (e){
			var top = $(this).scrollTop();

			if(top >= 800) {
				$('.tab-scroll').css('top',0);
				$('.tab-scroll').stickyFloat({offsetY : 50 });
			}
		});	
	},
	/** 
	 * Show Hide Param
	 */
	

};
/** 
 * 4. JS REVIEW BOX
 */

/** 
 * 6. JS PRODUCT INTRO
 */
var run = 0;
var fst_time = 0;
prod_detail_fn.prodIntro = {
	/**
     * hoverLocation in Product Detail Page
     * Color List [ colrlst ] : .in-stock
     * time out [ stimeout ] : 2000
     */
	hoverLocation : function (colrlst, stimeout) {
		if (!$(colrlst).length) {return;}
        if (!stimeout) { stimeout = 300; }

        mousein_trigger = function() {
            $(colrlst).addClass('shw');
            $(colrlst).find('.list-address').addClass('shw').show();
            $(colrlst).find('.close-instock').addClass('shw');
        };

        var mouseout_trigger = function() {
            $(colrlst).removeClass('shw');
            $(colrlst).find('.list-address').removeClass('shw').hide();
            $(colrlst).find('.close-instock').removeClass('shw');
        };

        if ($(window).width() >= 1200) {

	        var settings = {
	            interval: stimeout,
	            timeout: stimeout,
	            over: mousein_trigger,
	            out: mouseout_trigger
	        };

	        $(colrlst).find('.inner').hoverIntent(settings);
        } else {
        	$(colrlst).on('click', function(e) {
        		if (!$(colrlst).find('.list-address').hasClass('shw')) {
        			mousein_trigger();
        		} else {
        			mouseout_trigger();
        		}
        	});

        	$(colrlst).bind( "clickoutside", function(event){
				if ($(colrlst).find('.list-address').hasClass('shw')) {
					mouseout_trigger();
				}
			});
        }
	},
	closeLocation : function () {
		if(!$('.close-instock').length) { return; }

		$('.close-instock').on('click', function (e) { 
			var $a_close 		=	$(this);

			$a_close.removeClass('shw');
		});
	},
	getHeightIntroRight : function () {
		var w_scroll_window = 0;
		if (navigator.appVersion.indexOf("Win")!=-1) {
			w_scroll_window = 20;
		}

		prod_detail_fn.prodIntro.fixIntroRight (w_scroll_window);

		$( window ).resize(
			$.debounce(100, function(e){
				prod_detail_fn.prodIntro.fixIntroRight (w_scroll_window);
				prod_detail_fn.prodIntro.detroyIntroRight (w_scroll_window);
			})
		);
		
	},
	fixIntroRight : function (w_scroll_window) {
		if( ($(window).width() + w_scroll_window) < 992 && ( $(window).width() + w_scroll_window ) > 767) {
			var h_introRight = $('.prod-dtct-right').outerHeight();
			$('.prod-detail-right').css('padding-top', h_introRight + 80);
		}
	},
	detroyIntroRight : function (w_scroll_window) {
		if(($(window).width() + w_scroll_window) >= 992) {
			$('.prod-detail-right').css('padding-top', 'inherit');
		}
	},
	cloneModColRight : function () {
		var w_scroll_window = 0;
		if (navigator.appVersion.indexOf("Win")!=-1) {
			w_scroll_window = 20;
		}

		prod_detail_fn.prodIntro.fixcloneModColRight (w_scroll_window);

		$( window ).resize(
			$.debounce(100, function(e){
				prod_detail_fn.prodIntro.fixcloneModColRight (w_scroll_window);
			})
		);
	},
	fixcloneModColRight : function (w_scroll_window) {
		if(($(window).width() + w_scroll_window) < 767) {
			var $original_block		=	$('.original-block').clone(),
				$promotion_block	=	$('.promotion-block').clone(),
				$tags_block			=	$('.prod-detail-right .bar_tag').clone();
			if(run == 0) {
				$('.prod-dtct-right').append('<div class="f-tab-clone"></div><div class="s-tab-clone"></div>');
				$('.f-tab-clone').append($original_block);
				$('.s-tab-clone').append($promotion_block);
				$('.product-comment .comment_show').append('<div class="f-tab-tags"></div>');
				$('.f-tab-tags').append($tags_block);
			}
			run = 1;
		}
	},
	/**
	 * loadColr : click and load color by img
	 * var [ colr ] : #pro-colr
	 */
	loadColr : function (colr) {
		if (!$(colr).length) {return;}
	    if ($(colr).find('.list-color > li').length <= 1) {return;}

	    // VAR
	    $url_ajax = $(colr).data('url');
	    $a_colr   = $(colr).find('a');
	    $a_colr.each(function(n,e) {
	        $(this).on('click', function(event){ 
	            $this = $(this);
	            if ($this.hasClass('active')) {return;}

	            // Handle on click
                if (fst_time == 0) {
                    // store into cookie
                    $.ajax({
                      url: $url_ajax,
                      type: "GET",
                      data: { colr : $this.data('colr') },
                      dataType: "json"
                    }).done(function( data ) {
                        if(data == null || data == undefined) { return; }

                        $('.fea-img-blk').data('procolor', JSON.stringify(data));
                        prod_detail_fn.prodIntro.bHTML(data, $this, $this.data('colr'));
                        fst_time++;

                        // CHECK CLICK BUY
                        phone_detail_fn.checkClickBuy($('.prod_btn_buy'));
                    });  // END: Calling ajax


               } else {
                    // Get data form cookie
                    data = JSON.parse($('.fea-img-blk').data('procolor'));
                    prod_detail_fn.prodIntro.bHTML(data, $this, $this.data('colr'));

                    // CHECK CLICK BUY
                    phone_detail_fn.checkClickBuy($('.prod_btn_buy'));
               }

             // END: SET UP DATA.
	        });
	    });
	},
	/**
	 * bHTML : build HTML For feature imgs slider in detail page
	 * @param {json}               html_data
	 * @param {elemet html object} this_alink
	 * @param {string}             ac_color
	 */
	bHTML : function (html_data, this_alink, ac_color) {
		if (!html_data.length) {return;}

	    // BUILD HTML
	    html_8k = '<div id="fea-slider" class="flexslider"><ul class="slides">';
	    for (a= 0; a < html_data.length; a++) {
	        /* 800px IMG */
	        if (html_data[a].colr == ac_color) {
	            acolor = html_data[a];
	            for (i= 0; i < acolor.i_8k.length; i++) {
	                tmp = acolor.i_8k[i];
	                html_8k +=   '<li data-src="' + acolor.i_10k[i].img +'">'
	                           +   '<a href="javascript:;" class="z-fea">'
	                           +     '<img src="' + tmp.img + '" alt="' + tmp.img + '"/>'
	                           +   '</a>'
	                           +  '</li>';
	            }
	        }
	    }

	    /* All color IMGs - class="hiddenn" */
	    for (a= 0; a < html_data.length; a++) {
	        /* 800px IMG */
	        if (html_data[a].colr != ac_color) {
	            acolor = html_data[a];
	            for (i= 0; i < acolor.i_4k.length; i++) {
	                tmp = acolor.i_4k[i];
	                html_8k +=   '<li data-src="' + acolor.i_10k[i].img +'" class="hiddenn">'
	                           +   '<a href="javascript:;" class="z-fea">'
	                           +     '<img src="' + tmp.img + '" alt="' + tmp.img + '"/>'
	                           +   '</a>'
	                           +  '</li>';
	            }
	        }
	    }
	    html_8k += '</ul></div>';
	    /* 400px IMG */
	    html_4k = '<div id="fea-nav" class="flexslider"><ul class="slides">';
	    for (a= 0; a < html_data.length; a++) {
	        if (html_data[a].colr == ac_color) {
	             acolor = html_data[a];
	            for (i= 0; i < acolor.i_4k.length; i++) {
	                tmp = acolor.i_4k[i];
	                html_4k +=   '<li>'
	                           +   '<a href="javascript:;" class="z-fea">'
	                           +     '<img src="' + tmp.img + '" alt="' + tmp.img + '"/>'
	                           +   '</a>'
	                           +  '</li>';
	            }
	        }
	    }
	    html_4k += '</ul></div>';

	    // APPLY HTML AND SLIDER
	    $('#pro-colr a').removeClass('active');
	    $('.fea-img-blk').html(html_8k + html_4k, function() {
	        prod_detail_fn.gallerySlide.runFeaSlider ('#fea-slider', '#fea-nav');
	        prod_detail_fn.gallerySlide.runFeaZoom ('#fea-slider ul');
	        this_alink.addClass('active');
	    });
	}
};
/**
 * 8. GET HEIGH BLK COLOR & BLK QUANLITY
 */
prod_detail_fn.getHeightBLK = {
	resizeGetHeight : function () {
		var w_scroll_window = 0;
		if (navigator.appVersion.indexOf("Win")!=-1) {
			w_scroll_window = 20;
		}
		$( window ).resize(
			$.debounce(100, function(e){ 
				prod_detail_fn.getHeightBLK.checkWidthDevice (w_scroll_window);
			})
		); 
		prod_detail_fn.getHeightBLK.checkWidthDevice (w_scroll_window);
	},
	checkWidthDevice : function (w_scroll_window) {
		if(($(window).width() + w_scroll_window) <= 767 ) { 
			var dime = {};
			if(!$('#pro-colr').length) {
				var h_color = 0;
			} else {
				var h_color = $('#pro-colr').outerHeight();
			}

			var h_qlty  = $('#quality-box').outerHeight(),
				h_total;

			h_total = h_color + h_qlty;			

			if(!$('.review-box').length) {
				if(!$('#pro-colr').length) {
					dime.quali_top = h_color - 20;
					dime.marg_top  = h_total;
				} else {
					dime.quali_top = h_color + 15;
					dime.marg_top  = h_total + 40;
				}
			} else {
				if(!$('#pro-colr').length) {
					dime.quali_top = h_color;
					dime.marg_top  = h_total + 25;
				} else {
					dime.quali_top = h_color + 15;
					dime.marg_top  = h_total + 40;
				}
			}

			$('#quality-box').css('top', dime.quali_top);
			$('.mrg-top').css('margin-top', dime.marg_top);
		}
	}
};

/* ==================================================== */
/* OnLoad Page */
$(document).ready(function($){

	// JS GALLERY SLIDE
	prod_detail_fn.gallerySlide.runFeaSlider ('#fea-slider', '#fea-nav');
	prod_detail_fn.gallerySlide.runFeaZoom ('#fea-slider ul');
	prod_detail_fn.gallerySlide.hoverFeaImg ('.specs-cp-pic', '#fea-slider');
	
});
/* OnLoad Window */
var init = function () {};
window.onload = init;