/**
 * @package 	WordPress
 * @subpackage 	Dijamant
 * @version 	1.2.0
 * 
 * Modes & Functions for jQuery Isotope Plugin
 * Created by Kiosk studio
 * 
 */

 
 
"use strict";
 
/* iLightbox Settings */
var ilightbox_settings = { 
	skin : 					cmsms_isotope_mode.ilightbox_skin, 
	path : 					cmsms_isotope_mode.ilightbox_path, 
	infinite : 				(cmsms_isotope_mode.ilightbox_infinite == '1') ? true : false, 
	keepAspectRatio : 		(cmsms_isotope_mode.ilightbox_aspect_ratio == '1') ? true : false, 
	mobileOptimizer : 		(cmsms_isotope_mode.ilightbox_mobile_optimizer == '1') ? true : false, 
	maxScale : 				Number(cmsms_isotope_mode.ilightbox_max_scale), 
	minScale : 				Number(cmsms_isotope_mode.ilightbox_min_scale), 
	innerToolbar : 			(cmsms_isotope_mode.ilightbox_inner_toolbar == '1') ? true : false, 
	smartRecognition : 		(cmsms_isotope_mode.ilightbox_mobile_optimizer == '1') ? true : false, 
	fullAlone : 			(cmsms_isotope_mode.ilightbox_fullscreen_one_slide == '1') ? true : false, 
	fullViewPort : 			cmsms_isotope_mode.ilightbox_fullscreen_viewport, 
	controls : { 
		toolbar : 			(cmsms_isotope_mode.ilightbox_controls_toolbar == '1') ? true : false, 
		arrows : 			(cmsms_isotope_mode.ilightbox_controls_arrows == '1') ? true : false, 
		fullscreen : 		(cmsms_isotope_mode.ilightbox_controls_fullscreen == '1') ? true : false, 
		thumbnail : 		(cmsms_isotope_mode.ilightbox_controls_thumbnail == '1') ? true : false, 
		keyboard : 			(cmsms_isotope_mode.ilightbox_controls_keyboard == '1') ? true : false, 
		mousewheel : 		(cmsms_isotope_mode.ilightbox_controls_mousewheel == '1') ? true : false, 
		swipe : 			(cmsms_isotope_mode.ilightbox_controls_swipe == '1') ? true : false, 
		slideshow : 		(cmsms_isotope_mode.ilightbox_controls_slideshow == '1') ? true : false 
	}, 
	text : { 
		close : 			cmsms_isotope_mode.ilightbox_close_text, 
		enterFullscreen : 	cmsms_isotope_mode.ilightbox_enter_fullscreen_text, 
		exitFullscreen : 	cmsms_isotope_mode.ilightbox_exit_fullscreen_text, 
		slideShow : 		cmsms_isotope_mode.ilightbox_slideshow_text, 
		next : 				cmsms_isotope_mode.ilightbox_next_text, 
		previous : 			cmsms_isotope_mode.ilightbox_previous_text 
	}, 
	errors : { 
		loadImage : 		cmsms_isotope_mode.ilightbox_load_image_error, 
		loadContents : 		cmsms_isotope_mode.ilightbox_load_contents_error, 
		missingPlugin : 	cmsms_isotope_mode.ilightbox_missing_plugin_error 
	} 
};


/* Isotope Timeline Layout Mode */
jQuery.Isotope.prototype._spineAlignReset = function () { 
	this.spineAlign = { 
		colA : 	0, 
		colB : 	0 
	};
};

jQuery.Isotope.prototype._spineAlignLayout = function (elems) { 
	var instance = 		this, 
		props = 		this.spineAlign, 
		gutterWidth = 	Math.round(this.options.spineAlign && this.options.spineAlign.gutterWidth) || 0, 
		centerX = 		Math.round(this.element.width() / 2), 
		arrayLeft = 	[], 
		arrayRight = 	[], 
		postMargin = 	30, 
		dateHeight = 	180;
	
	
	elems.each(function () { 
		var el = 			jQuery(this), 
			isColA = 		props.colA <= props.colB, 
			x = 			isColA ? 
							centerX - (el.outerWidth(true) + gutterWidth / 2) : // left side 
							centerX + gutterWidth / 2, // right side 
			yCache = 		isColA ? props.colA : props.colB, 
			y = 			yCache, 
			minMargin = 	postMargin;
		
		
		if (isColA) {
			el.addClass('cmsms_timeline_left');
			el.removeClass('cmsms_timeline_right');
			
			
			if (arrayRight.length > 0) {
				for (var i = 0, il = arrayRight.length; i < il; i += 1) {
					if (y < arrayRight[i] + dateHeight) {
						minMargin = dateHeight;
						
						
						y = arrayRight[i] + minMargin;
					} else {
						y = yCache + minMargin;
					}
				}
			}
			
			
			arrayLeft.push(y);
		} else {
			el.addClass('cmsms_timeline_right');
			el.removeClass('cmsms_timeline_left');
			
			
			if (arrayLeft.length > 0) {
				for (var j = 0, jl = arrayLeft.length; j < jl; j += 1) {
					if (y < arrayLeft[j] + dateHeight) {
						minMargin = dateHeight;
						
						
						y = arrayLeft[j] + minMargin;
					} else {
						y = yCache + minMargin;
					}
				}
			}
			
			
			arrayRight.push(y);
		}
		
		
		instance._pushPosition(el, x, y);
		
		
		props[(isColA ? 'colA' : 'colB')] = el.outerHeight(true) + y;
	} );
};

jQuery.Isotope.prototype._spineAlignGetContainerSize = function () { 
	var size = {};
	
	
	size.height = this.spineAlign[(this.spineAlign.colB > this.spineAlign.colA ? 'colB' : 'colA')];
	
	
	return size;
};

jQuery.Isotope.prototype._spineAlignResizeChanged = function () { 
	return true;
};



/* ========== Isotope Run ========== */

/* Get Columns Width Function */
function getNumbColumns(container) { 
	var containerWidth = container.width(), 
		firstPost = container.find('> article:eq(0), .cmsms_gallery_item:eq(0)'), 
		postMinWidth = Number(firstPost.css('minWidth').replace('px', '')), 
		maxColumnNumb = Math.floor(containerWidth / postMinWidth), 
		columnNumb = 1;
	
	
	maxColumnNumb = (maxColumnNumb !== 0) ? maxColumnNumb : 1;
	
	
	if (container.hasClass('cmsms_5')) {
		columnNumb = 5;
	} else if (container.hasClass('cmsms_4')) {
		columnNumb = 4;
	} else if (container.hasClass('cmsms_3')) {
		columnNumb = 3;
	} else if (container.hasClass('cmsms_2')) {
		columnNumb = 2;
	}
	
	
	if (maxColumnNumb < columnNumb) {
		columnNumb = maxColumnNumb;
	}
	
	
	return columnNumb;
}



/* Set Columns Width Function */
function setColumnWidth(container) { 
	var containerWidth = container.width(), 
		columnNumb = getNumbColumns(container), 
		postWidth = Math.floor(containerWidth / columnNumb);
	
	
	container.find('> article, .cmsms_gallery_item').each(function () { 
		jQuery(this).css( { 
			width : postWidth + 'px' 
		} );
	} );
}



/* Rearrange Posts Function */
function reArrangePosts(blog, blogColumns) { 
	if (blogColumns) {
		setColumnWidth(blog);
	}
	
	
	blog.isotope('reLayout');
}



/* Set Puzzle Columns Width Function */
function setPuzzleColumnWidth(container) { 
	var containerWidth = container.width(), 
		firstPost = container.find('> article:eq(0)'), 
		postMinWidth = Number(firstPost.css('minWidth').replace('px', '')), 
		postPaddingLeft = Number(firstPost.css('paddingLeft').replace('px', '')), 
		postPaddingRight = Number(firstPost.css('paddingRight').replace('px', '')), 
		postStaticWidth = Math.floor(containerWidth / 4), 
		postStaticHeight = Math.floor((postStaticWidth / 100) * 68.96/* preloader padding bottom in % */), 
		postStaticPadding = Math.floor(((postPaddingLeft + postPaddingRight) / 100) * 68.96/* preloader padding bottom in % */), 
		postWidth = postStaticWidth, 
		postHeight = postStaticHeight;
		
		
	if (containerWidth < postMinWidth * 4) {
		container.addClass('resp_portfolio_puzzle');
	} else {
		container.removeClass('resp_portfolio_puzzle');
	}
	
	
	container.find('article.project').each(function () { 
		if (jQuery(this).hasClass('four_x_four')) {
			postWidth = postStaticWidth * 4;
			postHeight = (postStaticHeight * 4) - postStaticPadding;
		} else if (jQuery(this).hasClass('three_x_three')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth * 3;
				postHeight = (postStaticHeight * 3) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('three_x_two')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth * 3;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = Math.floor((postStaticHeight * 4) / 3) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = Math.floor((postStaticHeight * 8) / 3) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('three_x_one')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth * 3;
				postHeight = postStaticHeight - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = Math.floor((postStaticHeight * 2) / 3) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = Math.floor((postStaticHeight * 4) / 3) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('two_x_three')) {
			if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 3) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 6) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('two_x_two')) {
			if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('two_x_one')) {
			if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = postStaticHeight - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('one_x_three')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth;
				postHeight = (postStaticHeight * 3) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 6) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 12) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('one_x_two')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 8) - postStaticPadding;
			}
		} else if (jQuery(this).hasClass('one_x_one')) {
			if (containerWidth > postMinWidth * 4) {
				postWidth = postStaticWidth;
				postHeight = postStaticHeight - postStaticPadding;
			} else if (containerWidth > postMinWidth * 2) {
				postWidth = postStaticWidth * 2;
				postHeight = (postStaticHeight * 2) - postStaticPadding;
			} else {
				postWidth = postStaticWidth * 4;
				postHeight = (postStaticHeight * 4) - postStaticPadding;
			}
		}
		
		
		jQuery(this).css( { 
			width : postWidth + 'px' 
		} );
		
		
		jQuery(this).find('.project_outer').css( { 
			height : postHeight + 'px' 
		} );
		
		
		jQuery(this).find('.preloader').css( { 
			paddingBottom : postHeight + 'px' 
		} );
	} );
}



/* Rearrange Projects Function */
function reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle) { 
	if (portfolioGrid) {
		setColumnWidth(portfolio);
	} else if (portfolioPuzzle) {
		setPuzzleColumnWidth(portfolio);
	}
	
	
	portfolio.isotope('reLayout');
}



/* Start Blog Isotope Function */
function startBlog(id, layout, layoutMode, url, orderby, order, count, categories, metadata) {  
	var blogContainer = 	jQuery('#blog_' + id), 
		blog = 				blogContainer.find('> .blog'), 
		blogColumns = 		(layout === 'columns') ? true : false;
	
	
	if (blogColumns) {
		setColumnWidth(blog);
	}
	
	
	blog.imagesLoaded(function () { 
		blog.isotope( { 
			itemSelector : 	'article.post' 
		} );
		
		
		if (layout === 'columns' && layoutMode === 'grid') {
			blog.isotope( { 
				layoutMode : 	'fitRows', 
				resizable : 	false 
			} );
		} else if (layout === 'columns' && layoutMode === 'masonry') {
			blog.isotope( { 
				layoutMode : 	'masonry', 
				resizable : 	true 
			} );
		} else if (layout === 'timeline') {
			blog.isotope( { 
				layoutMode : 	'spineAlign', 
				resizable : 	true, 
				spineAlign : { 
					gutterWidth : 	0 
				}
			} );
		}
	} );
	
	
	blogContainer.find('.cmsms_post_filter_block .cmsms_post_filter_list a').bind('click', function () { 
		var filter = 			jQuery(this), 
			filterSelector = 	filter.attr('data-filter');
		
		
		filter.parent().parent().find('> li.current').removeClass('current');
		
		
		filter.parent().addClass('current');
		
		
		blog.isotope( { 
			filter : 	filterSelector 
		} );
		
		
		setTimeout(function () { 
			reArrangePosts(blog, blogColumns);
		}, 300);
		
		
		return false;
	} );
	
	
	blogContainer.find('.cmsms_post_filter_but').bind('click', function () { 
		if (blogContainer.find('.cmsms_post_filter_but').hasClass('current')) {
			blogContainer.find('.cmsms_post_filter_but').removeClass('current');
		} else {
			blogContainer.find('.cmsms_post_filter_but').addClass('current');
		}
	} );
	
	
	blogContainer.find('.cmsms_post_loader').bind('click', function () { 
		jQuery.ajax( { 
			type : 		'POST', 
			dataType : 	'html', 
			url : 		url + 'inc/post/posts-loader.php', 
			data : { 
				layout : 		layout, 
				orderby : 		orderby, 
				order : 		order, 
				count : 		count, 
				categories : 	categories, 
				metadata : 		metadata, 
				offset : 		blog.find('.post').length 
			}, 
			success : function (data) { 
				if (data !== '') {
					var newHTML = jQuery(data.replace(/cmsms_timeline_type/g, 'cmsms_timeline_type shortcode_animated').replace(/cmsms_masonry_type/g, 'cmsms_masonry_type shortcode_animated')), 
						lightboxVars = [];
					
					
					if (data.slice(0, 6) === 'finish') {
						newHTML = jQuery(data.replace(/cmsms_timeline_type/g, 'cmsms_timeline_type shortcode_animated').replace(/cmsms_masonry_type/g, 'cmsms_masonry_type shortcode_animated').slice(6, -1));
						
						
						blogContainer.find('.cmsms_wrap_more_posts').hide();
					}
					
					
					newHTML.find('a[rel^="ilightbox["]').each(function () { 
						if (jQuery.inArray(jQuery(this).attr('rel'), lightboxVars) === -1) {
							lightboxVars.push(jQuery(this).attr('rel'));
						}
					} );
					
					
					newHTML.imagesLoaded(function () { 
						blogContainer.find('.blog').isotope('insert', newHTML);
						
						
						setTimeout(function () { 
							reArrangePosts(blog, blogColumns);
							
							
							var settings = {};
							
							
							if (typeof _wpmejsSettings !== 'undefined') {
								settings.pluginPath = _wpmejsSettings.pluginPath;
							}
							
							
							jQuery('.wp-audio-shortcode, .wp-video-shortcode').filter(':not(.mejs-container)').mediaelementplayer(settings);
							
							
							for (var i = 0, il = lightboxVars.length; i < il; i += 1) { 
								blogContainer.find('a[rel="' + lightboxVars[i] + '"]').iLightBox(ilightbox_settings);
							}
						}, 300);
					} );
				}
			} 
		} );
		
		
		return false;
	} );


	jQuery(window).on('debouncedresize', function () { 
		reArrangePosts(blog, blogColumns);
	} );
}



/* Start Portfolio Isotope Function */
function startPortfolio(id, layout, layoutMode, url, orderby, order, count, categories, metadata) {
	var portfolioContainer = 	jQuery('#portfolio_' + id), 
		portfolio = 			portfolioContainer.find('> .portfolio'), 
		portfolioGrid = 		(layout === 'grid') ? true : false, 
		portfolioPuzzle = 		(layout === 'puzzle') ? true : false;
	
	
	if (portfolioGrid) {
		setColumnWidth(portfolio);
	} else if (portfolioPuzzle) {
		setPuzzleColumnWidth(portfolio);
	}
	
	
	portfolio.imagesLoaded(function () { 
		if (portfolioGrid) {
			portfolio.isotope( { 
				itemSelector : 	'article.project',
				getSortData : { 
					project_name : function (el) { 
						return el.find('.entry-title > a').text();
					}, 
					project_date : function (el) { 
						return parseInt(el.find('.meta-date').text());
					} 
				} 
			} );
			
			
			if (layoutMode === 'perfect') {
				portfolio.isotope( { 
					layoutMode : 	'fitRows', 
					resizable : 	false 
				} );
			} else if (layoutMode === 'masonry') {
				portfolio.isotope( { 
					layoutMode : 	'masonry', 
					resizable : 	true 
				} );
			}
		} else if (portfolioPuzzle) {
			portfolio.isotope( { 
				itemSelector : 	'article.project', 
				layoutMode : 	'masonry', 
				resizable : 	false, 
				masonry : { 
					columnWidth : Math.floor(portfolio.width() / 4) 
				}
			} );
		}
		
		
		if ( 
			!checker.os.iphone && 
			!checker.os.ipod && 
			!checker.os.ipad && 
			!checker.os.blackberry && 
			!checker.os.android 
		) {
			portfolio.waypoint(function (dir) { 
				if (dir === 'down') {
					var el = 		jQuery(this), 
						items = 	el.find('article.project'), 
						delay = 	200, 
						i = 		1;
					
					
					items.each(function () { 
						var item = 	jQuery(this);
						
						
						setTimeout(function () { 
							item.addClass('shortcode_animated');
						}, delay * i);
						
						
						i += 1;
					} );
				}
			}, { 
				offset : 		'100%' 
			} ).waypoint(function (dir) { 
				if (dir === 'up') {
					var el = 		jQuery(this), 
						items = 	el.find('article.project'), 
						delay = 	200, 
						i = 		1;
					
					
					items.each(function () { 
						var item = 	jQuery(this);
						
						
						setTimeout(function () { 
							item.addClass('shortcode_animated');
						}, delay * i);
						
						
						i += 1;
					} );
				}
			}, { 
				offset : 		'25%' 
			} );
		} else {
			portfolio.find('article.project').addClass('shortcode_animated');
		}
		
		
		setTimeout(function () { 
			reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		}, 300);
	} );
	
	
	portfolioContainer.find('.cmsms_project_filter_block .cmsms_project_filter_list a').bind('click', function () { 
		var filter = 			jQuery(this), 
			filterSelector = 	filter.attr('data-filter');
		
		
		filter.parent().parent().find('> li.current').removeClass('current');
		
		
		filter.parent().addClass('current');
		
		
		portfolio.isotope( { 
			filter : 	filterSelector 
		} );
		
		
		setTimeout(function () { 
			reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		}, 300);
		
		
		return false;
	} );
	
	
	portfolioContainer.find('.cmsms_project_filter_but').bind('click', function () { 
		if (portfolioContainer.find('.cmsms_project_filter_but').hasClass('current')) {
			portfolioContainer.find('.cmsms_project_filter_but').removeClass('current');
		} else {
			portfolioContainer.find('.cmsms_project_filter_but').addClass('current');
		}
	} );
	
	
	portfolioContainer.find('.cmsms_project_sort_block .cmsms_project_sort_but').bind('click', function () { 
		var type = jQuery(this).attr('name'), 
			asc = (type === 'project_name') ? true : false, 
			current = (jQuery(this).hasClass('current')) ? true : false, 
			reversed = (jQuery(this).hasClass('reversed')) ? true : false;
		
		if (current) { 
			if (reversed) { 
				jQuery(this).removeClass('reversed');
				
				asc = true;
			} else { 
				jQuery(this).addClass('reversed');
				
				asc = false;
			}
		} else { 
			jQuery(this).parent().find('.current').removeClass('current');
			
			jQuery(this).parent().find('.reversed').removeClass('reversed');
			
			if (type === 'project_name') { 
				jQuery(this).addClass('current');
			} else { 
				jQuery(this).addClass('current reversed');
			}
		}
		
		
		portfolio.isotope( { 
			sortBy : type, 
			sortAscending : asc 
		} );
		
		
		setTimeout(function () { 
			reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		}, 300);
		
		
		return false;
	} );
	
	
	portfolioContainer.find('.cmsms_project_loader').bind('click', function () { 
		jQuery.ajax( { 
			type : 		'POST', 
			dataType : 	'html', 
			url : 		url + 'inc/project/projects-loader.php', 
			data : { 
				layout : 		layout, 
				layoutmode: 	layoutMode, 
				orderby : 		orderby, 
				order : 		order, 
				count : 		count, 
				categories : 	categories, 
				metadata : 		metadata, 
				offset : 		portfolio.find('.project').length
			}, 
			success : 	function (data) { 
				if (data !== '') {
					var newHTML = jQuery(data.replace(/type-project/g, 'type-project shortcode_animated')), 
						lightboxVars = [];
					
					
					if (data.slice(0, 6) === 'finish') {
						newHTML = jQuery(data.replace(/type-project/g, 'type-project shortcode_animated').slice(6, -1));
						
						
						portfolioContainer.find('.cmsms_wrap_more_projects').hide();
					}
					
					
					newHTML.find('a[rel^="ilightbox["]').each(function () { 
						if (jQuery.inArray(jQuery(this).attr('rel'), lightboxVars) === -1) {
							lightboxVars.push(jQuery(this).attr('rel'));
						}
					} );
					
					
					newHTML.imagesLoaded(function () { 
						portfolioContainer.find('.portfolio').isotope('insert', newHTML);
						
						
						setTimeout(function () { 
							reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
							
							
							var settings = {};
							
							
							if (typeof _wpmejsSettings !== 'undefined') {
								settings.pluginPath = _wpmejsSettings.pluginPath;
							}
							
							
							jQuery('.wp-audio-shortcode, .wp-video-shortcode').filter(':not(.mejs-container)').mediaelementplayer(settings);
							
							
							for (var i = 0, il = lightboxVars.length; i < il; i += 1) { 
								portfolioContainer.find('a[rel="' + lightboxVars[i] + '"]').iLightBox(ilightbox_settings);
							}
						}, 300);
					} );
				}
			} 
		} );
		
		
		return false;
	} );


	jQuery(window).on('debouncedresize', function () { 
		reArrangeProjects(portfolio, portfolioGrid, portfolioPuzzle);
		
		
		if (portfolioPuzzle) {
			portfolio.isotope( { 
				masonry : { 
					columnWidth : Math.floor(portfolio.width() / 4) 
				}
			} );
		}
	} );
}



/* Start Gallery Isotope Function */
function startGallery(id, gallery_type, gallery_count, gallery_arr) { 
	var galleryContainer = 	jQuery('#cmsms_gallery_' + id), 
		gallery = 			galleryContainer.find('> .cmsms_gallery'), 
		gallery_count = 	gallery_count, 
		gallery_arr = 		gallery_arr, 
		gallery_items = 	'', 
		gallery_new_item = 	'', 
		ilightbox_run = 	'';
	
	
	setColumnWidth(gallery);
	
	
	gallery.imagesLoaded(function () { 
		if (gallery_type === 'grid') {
			gallery.isotope( { 
				itemSelector : 	'.cmsms_gallery_item', 
				layoutMode : 	'fitRows', 
				resizable : 	false 
			} );
		} else if (gallery_type === 'masonry') {
			gallery.isotope( { 
				layoutMode : 	'masonry', 
				resizable : 	true 
			} );
		}
	} );
	
	
	ilightbox_run = gallery.find('[rel^="ilightbox["]').iLightBox(ilightbox_settings);
	
	
	if (gallery_count !== 'false' && gallery_arr !== 'false') {
		galleryContainer.find('.cmsms_gallery_items_loader').on('click', function () {
			gallery_items = gallery_arr.splice(0, gallery_count);
			
			
			jQuery(gallery_items).each(function () {
				gallery_new_item = jQuery(this.replace(/cmsms_gallery_item/g, 'cmsms_gallery_item shortcode_animated'));
				
				
				gallery.isotope('insert', gallery_new_item);
			});
			
			
			ilightbox_run.refresh();
			
			
			setTimeout(function () { 
				reArrangePosts(gallery, true);
			}, 300);
			
			
			if (gallery_arr.length == 0) {
				galleryContainer.find('.cmsms_more_gallery_items').hide();
			}
		} );
	}
	
	
	jQuery(window).on('debouncedresize', function () { 
		reArrangePosts(gallery, true);
	} );
}
;