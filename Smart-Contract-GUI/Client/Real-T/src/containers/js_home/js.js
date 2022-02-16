/**
* Author: LimpidThemes
* Version: 1.0
* Description: Javascript file for the theme
* Date: 20-07-2015
**/

/**********************************************************
		BEGIN: PRELOADER
**********************************************************/
import jQuery from 'jquery';
import building1 from '../css_home/image_home/building1.jpg';
import building2 from '../css_home/image_home/building2.jpg';
/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : Core 3.2.0
	Site	: www.buildinternet.com/project/supersized
	
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/

(function($){

	/* Place Supersized Elements
	----------------------------*/
	$(document).ready(function() {
		$('body').append('<div id="supersized"></div>');
	});
    
    
    $.supersized = function(options){
    	
    	/* Variables
		----------------------------*/
    	var el = '#supersized',
        	base = this;
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        var vars = $.supersized.vars;
        // Add a reverse reference to the DOM object
        base.$el.data("supersized", base);
        var api = base.$el.data('supersized');
		
		base.init = function(){
        	// Combine options 
        	$.supersized.vars.options = $.extend({},$.supersized.defaultOptions, options);
            base.options = $.supersized.vars.options;
            
            base._build();
        };
        
        
        /* Build Elements
		----------------------------*/
        base._build = function(){
				
            base._start(); // Get things started
        };
        
        
        /* Initialize
		----------------------------*/
    	base._start = function(){
			
			// Determine if starting slide random
			if (base.options.start_slide){
				vars.current_slide = base.options.start_slide - 1;
			}else{
				vars.current_slide = Math.floor(Math.random()*base.options.slides.length);	// Generate random slide number
			}
			
			// If links should open in new window
			var linkTarget = base.options.new_window ? ' target="_blank"' : '';
			
			// Set current image
			var imageLink = (api.getField('url')) ? "href='" + api.getField('url') + "'" : "";
			var img = $('<img src="'+api.getField('image')+'"/>');
			img.appendTo(base.el).wrap('<a class="image-loading activeslide" ' + imageLink + linkTarget + '></a>').css('visibility','hidden');
			
			img.on('load', (function(){
				base._origDim($(this));
				base.resizeNow();	// Resize background image
				base.launch();
			}));
			
			//  Hide elements to be faded in
			base.$el.css('visibility','hidden');
			
    	};
		
		
		/* Launch Supersized
		----------------------------*/
		base.launch = function(){
		
			base.$el.css('visibility','visible');
			
			// Adjust image when browser is resized
			$(window).resize(function(){
	    		base.resizeNow();
			});
    		
    	};
        
        
        /* Resize Images
		----------------------------*/
		base.resizeNow = function(){
			
			return base.$el.each(function() {
		  		//  Resize each image seperately
		  		$('img', base.el).each(function(){
		  			
					var thisSlide = $(this);
					var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);	// Define image ratio
					
					// Gather browser size
					var browserwidth = base.$el.width(),
						browserheight = base.$el.height();
					
					/*-----Resize Image-----*/
					if (base.options.fit_always){	// Fit always is enabled
						if ((browserheight/browserwidth) > ratio){
							resizeWidth();
						} else {
							resizeHeight();
						}
					}else{	// Normal Resize
						if ((browserheight <= base.options.min_height) && (browserwidth <= base.options.min_width)){	// If window smaller than minimum width and height
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);		// If portraits are set to fit
							}
						
						} else if (browserwidth <= base.options.min_width){		// If window only smaller than minimum width
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);		// If portraits are set to fit
							}
							
						} else if (browserheight <= base.options.min_height){	// If window only smaller than minimum height
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();		// If portraits are set to fit
							}
						
						} else {	// If larger than minimums
							
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		// If portraits are set to fit
							}
							
						}
					}
					/*-----End Image Resize-----*/
					
					
					/*-----Resize Functions-----*/
					
					function resizeWidth(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.width() < browserwidth || thisSlide.width() < base.options.min_width ){
								if (thisSlide.width() * ratio >= base.options.min_height){
									thisSlide.width(base.options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
						    	}else{
						    		resizeHeight();
						    	}
						    }
						}else{
							if (base.options.min_height >= browserheight && !base.options.fit_landscape){	// If minimum height needs to be considered
								if (browserwidth * ratio >= base.options.min_height || (browserwidth * ratio >= base.options.min_height && ratio <= 1)){	// If resizing would push below minimum height or image is a landscape
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								} else if (ratio > 1){		// Else the image is portrait
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								} else if (thisSlide.width() < browserwidth) {
									thisSlide.width(browserwidth);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.width(browserwidth);
								thisSlide.height(browserwidth * ratio);
							}
						}
					};
					
					function resizeHeight(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.height() < browserheight){
								if (thisSlide.height() / ratio >= base.options.min_width){
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								}else{
									resizeWidth(true);
								}
							}
						}else{	// Otherwise, resized as normal
							if (base.options.min_width >= browserwidth){	// If minimum width needs to be considered
								if (browserheight / ratio >= base.options.min_width || ratio > 1){	// If resizing would push below minimum width or image is a portrait
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								} else if (ratio <= 1){		// Else the image is landscape
									thisSlide.width(base.options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.height(browserheight);
								thisSlide.width(browserheight / ratio);
							}
						}
					};
					
					/*-----End Resize Functions-----*/
					
					if (thisSlide.parent().hasClass('image-loading')){
						$('.image-loading').removeClass('image-loading');
					}
					
					// Horizontally Center
					if (base.options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}
					
					// Vertically Center
					if (base.options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}
					
				});
				
				// Basic image drag and right click protection
				if (base.options.image_protect){
					
					$('img', base.el).bind("contextmenu mousedown",function(){
						return false;
					});
				
				}
				
				return false;
				
			});
			
		};
        
		
		/* Get Original Dimensions
		----------------------------*/
		base._origDim = function(targetSlide){
			targetSlide.data('origWidth', targetSlide.width()).data('origHeight', targetSlide.height()).css('visibility','visible');
		};
		
		base.getField = function(field){
			return base.options.slides[vars.current_slide][field];
		};
		
        // Make it go!
        base.init();
	};
	
	
	/* Global Variables
	----------------------------*/
	$.supersized.vars = {
		
		// Internal variables
		current_slide			:	0,			// Current slide number
		options					:	{}			// Stores assembled options list
		
	};
	
	
	/* Default Options
	----------------------------*/
	$.supersized.defaultOptions = {
    
    	// Functionality
		start_slide             :   1,			// Start slide (0 is random)
		new_window				:	1,			// Image links open in new window/tab
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   1,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0			// Landscape images will not exceed browser width
    	
    };
    
    $.fn.supersized = function(options){
        return this.each(function(){
            (new $.supersized(options));
        });
    };
		
})(jQuery);


jQuery(function($){
	$.supersized({
	
		//Functionality
		slideshow               :   1,		//Slideshow on/off
		autoplay				:	1,		//Slideshow starts playing automatically
		start_slide             :   1,		//Start slide (0 is random)
		random					: 	0,		//Randomize slide order (Ignores start slide)
		slide_interval          :   10000,	//Length between transitions
		transition              :   1, 		//0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	500,	//Speed of transition
		new_window				:	1,		//Image links open in new window/tab
		pause_hover             :   0,		//Pause slideshow on hover
		keyboard_nav            :   0,		//Keyboard navigation on/off
		performance				:	1,		//0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,		//Disables image dragging and right click with Javascript

		//Size & Position
		min_width		        :   0,		//Min width allowed (in pixels)
		min_height		        :   0,		//Min height allowed (in pixels)
		vertical_center         :   1,		//Vertically center background
		horizontal_center       :   1,		//Horizontally center background
		fit_portrait         	:   1,		//Portrait images will not exceed browser height
		fit_landscape			:   0,		//Landscape images will not exceed browser width
		
		//Components
		navigation              :   1,		//Slideshow controls on/off
		thumbnail_navigation    :   1,		//Thumbnail navigation
		slide_counter           :   1,		//Display slide numbers
		slide_captions          :   1,		//Slide caption (Pull from "title" in slides array)
		slides 					:  	[		//Slideshow Images 
											{image : building2, title : 'Slide 2'},
											{image : building1, title : 'Slide 1'}
									]
									
	}) 
});