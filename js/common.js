$(document).ready(function() {
	initSlider();
	prettyPrint();
    $("a[rel=tooltip]").tooltip()
});
$(window).resize(function() {
	resizeSlider();
});
/**
 * Init homepage slider
 */
var nbSlides = 0;
var sliderWidth = 0;
var slideIndex = 0;
var slideTimer = 0;
var slideDirection = 1;
var slideTimerDelay = 4000;
function initSlider() {

	if ($("#slider").length<=0) return;

	resizeSlider();

	$("#slider .arrow-left").bind("click", function() { slideLeft(true); });
	$("#slider .arrow-right").bind("click", function() { slideRight(true); });

	$("#slider").bind("mouseenter",function() {
		clearInterval(slideTimer);
		slideTimer = 0;
	}).bind("mouseleave", function() {
		if (slideTimer==0) slideTimer = setInterval(function() { tickSlider(); }, slideTimerDelay);
	});

	if ($("#slider .anchors").find ("span").length<=0) {
		for(var i=0; i<=nbSlides-1; i++) {
			var anchorClass = (i==0) ? " class='on'" : "";
			$("#slider .anchors").append("<span onclick='slideTo("+i+", true);' id='anchor"+i+"'"+anchorClass+"></span>")
		}
	}
	slideTimer = setInterval(function() { tickSlider(); }, slideTimerDelay);
}
function resizeSlider() {

	if ($("#slider").length<=0) return;

	sliderWidth = $("#slider").width();

	nbSlides = $("#slider .slide").length;
	var slideCount = 0;
	$("#slider .slide").each(function() {
		var slideWidth = $(this).width();
		var slideLeft = (sliderWidth*(slideCount - slideIndex)) + Math.round((sliderWidth-slideWidth)/2);

		$(this).css("left", slideLeft+"px");
		slideCount++;
		//if (slideCount>=nbSlides-1) slideCount = 0;
	});
	$("#slider .slide").fadeIn();
}
function tickSlider() {

	(slideDirection == 1) ? slideLeft() : slideRight();
	if ((slideIndex<=0)||(slideIndex>=nbSlides-1)) slideDirection*=-1;
}

function slideLeft(flagStopTimer) {

	if (slideIndex<=0) return false;
	slideTo(slideIndex-1, flagStopTimer);
}
function slideRight(flagStopTimer) {

	if (slideIndex>=nbSlides-1) return false;
	slideTo(slideIndex+1, flagStopTimer);
}
function slideTo(index, flagStopTimer) {

	if (typeof(flagStopTimer)=="undefined") flagStopTimer = false;
	if (flagStopTimer==true) {
		clearInterval(slideTimer);
		slideTimer = 0;
	}

	if ((index<0)||(index>=nbSlides)) return false;

	var slideDirection = ((index - slideIndex)>0) ? "-" : "+";
	var slideDiff = Math.abs((index - slideIndex) * sliderWidth);

	slideIndex = index;

	$("#slider .slide").animate({
		"left":slideDirection+"="+slideDiff+"px"
	},700, function() {
		if ($("#anchor"+index).length>0) {
			$(".anchors span").removeClass();
			$("#anchor"+index).addClass("on");
		}
	});
}

