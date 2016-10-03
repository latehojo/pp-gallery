/* Pavel Palchik gallery */

$(document).ready(function(){
	var totalIteams = $('.ppgallery .biglist > li').length;
	var margin = 80;

	function responsive(){
		var widthWindow = $(window).width();

		function addWidth(){
			widthSlide = widthWindow;

			$('.ppgallery .biglist__item').css({
				'width' : (widthSlide/100)*margin,
			});
		};
		function movedElement(){
			$('.ppslide').each(function(){
				var movedElem = $(this).find('.ppslide__right');
				
				$(this).addClass('separate');
				$(this).closest('.biglist__item').after(
					"<li class='biglist__item'><div class='ppslide separate'></div></li>"
					);
				$(this).closest('.ppgallery').find('.smalllist li:first-child').after(
					"<li class='smalllist__item'></li>"
					);
				var newPos = movedElem.closest('.biglist__item').next().find('.ppslide');

				movedElem.appendTo(newPos);
			});
		}
		function removedElement(){
			$('.ppslide__right').each(function(){
				var newPos = $(this).closest('.biglist__item').prev().find('.ppslide');
				var movedElem = $(this);
				
				$('.ppslide').removeClass('separate');
				movedElem.appendTo(newPos);
				$(this).closest('.biglist__item').next().remove();
				$(this).closest('.ppgallery').find('.smalllist li:first-child').remove();
			});
		}

		if (widthWindow < 992){
			if ($('.ppslide').hasClass('separate')) {
				addWidth();
			}else{
				movedElement();
			}
		}else{
			if ($('.ppslide').hasClass('separate')) {
				removedElement();
			}else{
				addWidth();
			}
		}
		if (widthWindow < 768){
			margin = 60;
		}else{
			margin = 80;
		}
		addWidth();
	}
	function moveSlide(cs,margin){
		var itemsContainer = cs.closest('.ppgallery').find('.biglist');
		var actualActiveSlide = $('.ppgallery .biglist__item_active').index();
		var move = ((widthSlide/100)*margin)*actualActiveSlide;

		itemsContainer.css({'marginLeft': -move});
	}
	function toDefaultClass(){
		$('.ppgallery .biglist__item').removeClass('biglist__item_active');
		$('.ppgallery .smalllist__item').removeClass('smalllist__item_active');
	};
	function bigActive(){
		var numActiveItem = $(this).index()+1;

		toDefaultClass();

		$(this).addClass('biglist__item_active');
		$('.ppgallery .smalllist__item:nth-child('+ numActiveItem +')').addClass('smalllist__item_active');
		moveSlide($(this),margin);
	}
	function smallActive(){
		var numActiveItem = $(this).index()+1;

		toDefaultClass();

		$(this).addClass('smalllist__item_active');
		$('.ppgallery .biglist__item:nth-child('+ numActiveItem +')').addClass('biglist__item_active');
		moveSlide($(this),margin);
	};

	responsive();

	$(window).resize(responsive);

	$(document).on('click','.ppgallery .biglist__item',bigActive);
	$(document).on('click','.ppgallery .smalllist__item',smallActive);
});