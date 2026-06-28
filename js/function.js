(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 


	/* Throttle Function */
	function throttle(func, limit) {
		let inThrottle;
		return function() {
			const args = arguments;
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		}
	}

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}	
	
		$window.on("scroll", throttle(function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		}, 100));
	}	
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Company Slider JS */
	if ($('.hero-company-slider').length) {
		const hero_company_slider = new Swiper('.hero-company-slider .swiper', {
			slidesPerView : 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768:{
				  	slidesPerView: 4,
				},
				991:{
				  	slidesPerView: 5,
				}
			}
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768:{
					slidesPerView: 1,
				},
				991:{
					slidesPerView: 1,
				}
			}
		});
	}

	/* Service Slider JS */
	if ($('.service-slider').length) {
		const service_slider = new Swiper('.service-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 4000,
			},
			pagination: {
				el: '.service-pagination',
				clickable: true,
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 3,
				}
			}
		});
	}

	/* Features Slider JS */
	if ($('.features-slider').length) {
		const features_slider = new Swiper('.features-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 450000,
			},
			pagination: {
				el: '.features-pagination',
				clickable: true,
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 4,
				}
			}
		});
	}


	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
				width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 1500 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation Start */
	if($('.text-effect').length) {
		var textheading = $(".text-effect");

		if(textheading.length == 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {
			
			el.split = new SplitText(el, { 
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			
			if( $(el).hasClass('text-effect') ){
				gsap.set(el.split.chars, {
					opacity: .3,
					x: "-7",
				});
			}
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 92%",
					end: "top 60%",
					markers: false,
					scrub: 1,
				},

				x: "0",
				y: "0",
				opacity: 1,
				duration: .7,
				stagger: 0.2,
			});
			
		});
	}
	/* Text Effect Animation End */

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Page Testimonials Item Active Start */
	var $page_testimonials = $('.page-testimonials');
	if ($page_testimonials.length) {
		var $testimonial_item = $page_testimonials.find('.testimonial-item');

		if ($testimonial_item.length) {
			$testimonial_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$testimonial_item.removeClass('active'); 
						$(this).addClass('active'); 
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Page Testimonials Item Active End */
	
	/* Industries Layout Interactivity Start */
	var $industry_list_item = $('.industry-list-item');
	if ($industry_list_item.length) {
		$industry_list_item.on('mouseenter click', function () {
			var industry = $(this).data('industry');
			
			// Remove active class from all list items and add to current
			$industry_list_item.removeClass('active');
			$(this).addClass('active');
			
			// Remove active class from all display items and add to matched
			var $display_items = $('.industry-display-item');
			$display_items.removeClass('active');
			$('#display-' + industry).addClass('active');
		});
	}
	/* Industries Layout Interactivity End */
	
	/* Tab Switch Animation Retrigger Start */
	$('a[data-bs-toggle="pill"], a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
		let targetId = $(e.target).attr("data-bs-target") || $(e.target).attr("href");
		let $targetPane = $(targetId);

		// 1. Re-trigger WOW animations
		$targetPane.find('.wow').each(function() {
			var $el = $(this);
			var rect = this.getBoundingClientRect();
			var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
			var inViewport = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

			if (inViewport) {
				$el.removeClass('animated');
				$el.css({
					'animation-name': 'none',
					'visibility': 'hidden'
				});
				
				void $el[0].offsetWidth;
				
				$el.css({
					'animation-name': 'fadeInUp',
					'visibility': 'visible'
				});
				$el.addClass('animated');
			}
		});

		let $images = $targetPane.find('.page-single-image .reveal');
		if ($images.length) {
			$images.each(function() {
				let container = this;
				let image = container.querySelector("img");
				
				// Left to right reveal logic matches the GSAP setup
				gsap.set(container, { autoAlpha: 1, xPercent: -100 });
				gsap.set(image, { xPercent: 100, scale: 1 });
				
				let tl = gsap.timeline();
				tl.to(container, 1, {
					xPercent: 0,
					ease: Power2.out
				});
				tl.to(image, 1, {
					xPercent: 0,
					scale: 1,
					ease: Power2.out
				}, "<");
			});
		}
	});
	/* Tab Switch Animation Retrigger End */

	/* Industry Excellence Slider JS */
	if ($('.industry-excellence-slider').length) {
		const industry_excellence_slider = new Swiper('.industry-excellence-slider .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			observer: true,
			observeParents: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.industry-excellence-pagination',
				clickable: true,
			},
			// navigation: {
			// 	nextEl: '.industry-excellence-button-next',
			// 	prevEl: '.industry-excellence-button-prev',
			// },
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 1,
				}
			}
		});
	}
})(jQuery);
