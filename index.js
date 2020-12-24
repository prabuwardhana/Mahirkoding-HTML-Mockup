// Navigation
(function ($) {
	$.fn.mkNav = function (options) {
		// Variables
		var headerContainer = $(".header-area");
		var navContainer = $(".mk-nav-container");
		var mk_nav = $(".mknav ul");
		var mk_navli = $(".mknav > ul > li");
		var navbarToggler = $(".mk-navbar-toggler");
		var closeIcon = $(".mkcloseIcon");
		var navToggler = $(".navbarToggler");
		var mkMenu = $(".mk-menu");
		var var_window = $(window);

		// default options
		var defaultOpt = $.extend(
			{
				theme: "light",
				breakpoint: 991,
				openCloseSpeed: 350,
				megaopenCloseSpeed: 700,
				alwaysHidden: false,
				openMobileMenu: "left",
				stickyNav: true,
			},
			options
		);

		return this.each(function () {
			// light or dark theme
			if (defaultOpt.theme === "light" || defaultOpt.theme === "dark") {
				navContainer.addClass(defaultOpt.theme);
			}

			// open mobile menu direction 'left' or 'right' side
			if (defaultOpt.openMobileMenu === "left" || defaultOpt.openMobileMenu === "right") {
				navContainer.addClass(defaultOpt.openMobileMenu);
			}

			// navbar toggler
			navbarToggler.on("click", function () {
				navToggler.toggleClass("active");
				mkMenu.toggleClass("menu-on");
			});

			// close icon
			closeIcon.on("click", function () {
				mkMenu.removeClass("menu-on");
				navToggler.removeClass("active");
			});

			// add dropdown & megamenu class in parent li class
			mk_navli.has(".dropdown").addClass("cn-dropdown-item");

			// adds toggle button to li items that have children
			mk_nav.find("li a").each(function () {
				if ($(this).next().length > 0) {
					$(this).parent("li").addClass("has-down").append('<span class="dd-trigger"></span>');
				}
			});

			// expands the dropdown menu on each click
			mk_nav.find("li .dd-trigger").on("click", function (e) {
				e.preventDefault();
				$(this).parent("li").children("ul").stop(true, true).slideToggle(defaultOpt.openCloseSpeed);
				$(this).parent("li").toggleClass("active");
			});

			// check browser width in real-time
			function breakpointCheck() {
				var windoWidth = window.innerWidth;
				if (windoWidth <= defaultOpt.breakpoint) {
					navContainer.removeClass("breakpoint-off").addClass("breakpoint-on");
				} else {
					navContainer.removeClass("breakpoint-on").addClass("breakpoint-off");
				}
			}

			breakpointCheck();

			var_window.on("resize", function () {
				breakpointCheck();
			});

			// always hidden enable
			if (defaultOpt.alwaysHidden === true) {
				navContainer.addClass("breakpoint-on").removeClass("breakpoint-off");
			}

			// sticky
			if (defaultOpt.stickyNav === true) {
				var_window.on("scroll", function () {
					if (var_window.scrollTop() > 0) {
						headerContainer.addClass("sticky");
					} else {
						headerContainer.removeClass("sticky");
					}
				});
			}
		});
	};
})(jQuery);

$("#mkNav").mkNav();

// Offset position for body element depending on header height
$(window)
	.on("resize", function () {
		$(document.body).css("margin-top", $(".header-area").height());
	})
	.resize();

// Entry card animation
if ($(".entry-card").length) {	
	$(".entry-card").hover(function () {
		$(this).find(".description").stop().animate(
			{
				height: "toggle",
				opacity: "toggle",
			},
			200
		);
	});
}

// Landing page Counters
if ($(".counters").length) {
    var viewed = false;
	$(window).on("scroll", function () {
		if (isScrolledIntoView($(".counters")) && !viewed) {
			viewed = true;
			$(".counter").each(function () {
				$(this)
					.prop("Counter", 0)
					.animate(
						{
							Counter: $(this).attr("data-target"),
						},
						{
							duration: 3000,
							easing: "swing",
							step: function (now) {
								$(this).text(Math.ceil(now));
							},
						}
					);
			});
		}
	});

	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return elemBottom <= docViewBottom && elemTop >= docViewTop;
	}
}

// Sticky widget
if ($(".widget.ebook").length) {
	var ebookWidgetYPosOffset = $(".widget.ebook").offset().top - 100;

	$(window).on("scroll", function () {
		if ($(window).scrollTop() >= ebookWidgetYPosOffset) {
			$(".widget.ebook").addClass("sticky");
			$(".widget.ebook").css("top", $(".header-area").height() + 20);
		} else {
			$(".widget.ebook").removeClass("sticky");
			$(".widget.ebook").removeAttr("style");
		}
	});
}

// Sticky share button
if ($(".icon-bar a").length) {
	$(window).on("scroll", function () {
		if ($(window).scrollTop() > 300) {
			$(".icon-bar a").css("opacity", 1);
		} else {
			$(".icon-bar a").removeAttr("style");
		}
	});
}

// Select an option using nav element
if ($(".placeholder").length) {
	$(".placeholder").on("click", function () {
		$(".list__ul").toggle();
	});

	$(".list__ul a").on("click", function (e) {
		e.preventDefault();

		$(".placeholder").text($(this).text()).css("opacity", "1");
		$(".list__ul").toggle();
	});
}
