var History = window.History;
var State = History.getState();
var prevScroll;

function getPage(name) {
    $.ajax({
      url: 'works/'+name+".html",
      context: document.body,
      success: function(data){

        // Adiciona o state à pilha do browser
        History.pushState({page: 'work'},'CoolAppse','?s='+name);

        $('#portfolio-window .work').html(data);


        if (!Modernizr.csstransitions) {
	        $('#portfolio-window').css('visibility', 'visible').animate({ left: '0%' }, 1000, function() {
				$('body').css({ 'overflow' : 'hidden'});
				$('#portfolio-window').addClass('open loaded');
		        $('#portfolio-window .work').animate({opacity: 1}, 1000);
	        });
        } else {
            $('#portfolio-window').addClass('open');
	        setTimeout(function(){
	            $('body').css({'overflow': 'hidden'});
	            $('#portfolio-window').addClass('loaded');
	            $('#portfolio-window .work').animate({opacity: 1}, 1000);

	            if (Modernizr.mq('only screen and (max-device-width: 1024px)') && Modernizr.touch) {
	                $('#portfolio-window').niceScroll({cursorborder:"",cursorcolor:"#373334",cursorwidth:8,boxzoom:false});
	            }
	        }, 1000);
	    }

      },
      error: function(data){
        $('#portfolio-window').removeClass('open');
        $('#portfolio-window .work').html("");
      }
    });


    return false;
}

// Apanha os state changes (quando faz back/fwd e processa a informação)
History.Adapter.bind(window,'statechange',function(){

    var State = History.getState();
    lastIndex = State.cleanUrl.lastIndexOf("=")+1
    section = State.cleanUrl.substr(lastIndex);

    //load if work
    if (lastIndex && section.length){
        getPage(section);
    }

    //close gallery
    if (!lastIndex && (State.data.page == 'main' || State.data.page === undefined)) {
        if (!Modernizr.csstransitions) {
            $('body').css({ 'overflow' : 'auto' });
            $('#portfolio-window .work').animate({ opacity: 0 }, 1000);
            $('#portfolio-window').animate({ left: '100%' }, 1000, function() {
              $(this).css('visibility', 'hidden');
            }).removeClass('loaded open');
        } else {
        	$('#portfolio-window .work').animate({opacity: 0}, 300);
	        $('#portfolio-window').removeClass('loaded open');
	        $('body').css({'overflow': 'auto'});

	        setTimeout(function(){
	            $('#portfolio-window .work').html("");
	        }, 500);
        }
    }
});

var touch = false;
var scrollTimer = null;

$(window).scroll(function(){
    var distTop = $(this).scrollTop();
    var brainTop = $(".brain").offset().top;
    var distBottom = distTop + $(this).height() ;
    touch = Modernizr.touch;


    //Parallax no background do about
    if (!touch && (distBottom >= brainTop)) {
        pos = (distBottom-brainTop)/30;

        if (pos < 0) {
            pos = 0;
        }

        if (pos > 100) {
            pos = 100;
        }

        $('#about .image').css({'background-position-y': pos+'%'});
    }

    //Parallax nos planetas
    if ($('.elements').length && !touch){
        $('.elements .saturn').css({'margin-top': (distTop / 1.5)+"px"});
        $('.elements .stones').css({'margin-top': (distTop * 1.5)+"px"});
        $('.elements .stones-out').css({'margin-bottom': (distTop * 1.5)+"px"});
    }


    if (!touch) {
        $("#navbar").addClass("hidden");

        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        //Fade do menu
        scrollTimer = setTimeout(function() {
            $('#navbar').removeClass("hidden");
        }, 2000);
    }

});

var awardsSlider;

$(document).ready(function () {

	$.fn.modal.defaults.maxHeight = function(){
	    // subtract the height of the modal header and footer
	    return $(window).height() - 100;
	}

	$('.open-modal').on('click', function() {
		$('#jobs').modal();
		if( $('#pageslide').is(':visible')) {
			$.pageslide.close();
		}

	});

    $('body').iealert({
    	support: "ie8"
    });

    var myScroll = null;
    var touch = Modernizr.touch;

    if(Modernizr.cssanimations && !touch){
        $('.can-animate').addClass('animate');
    }

	// Mobile menu
    $('.handle').pageslide({direction: 'left'});

    var lastIndex = window.location.href.lastIndexOf("=")+1;
    var section = window.location.href.substr(lastIndex);

    if(lastIndex && section.length){
        getPage(section);
    }

    $('#navbar .nav').localScroll();


	// Open Portfolio
    $('#portfolio').delegate('[data-load]','click', function(e){
        getPage($(this).data('load'));

        return false;
    });

	// Close Portfolio
    $('#portfolio-window').delegate('.close','click', function(e){
        History.pushState({page: 'main'},'CoolAppse','?');

        return false;
    });

	$('#contact').html5form({
        colorOn: '#fff',
        responseDiv: '#response',
        messages: 'en',
        allBrowsers: true
	});

	$('#spam-check').removeAttr('required');

    if ($(window).outerWidth(true) > 590 ){
        options = getSliderOptions();
        awardsSlider = $('.awards-slider').bxSlider(options);
    }

});


$(window).resize(function() {
	if ($('#pageslide').is(':visible') && $(window).outerWidth(true) > 960 ) {
		$.pageslide.close();
	}

    if ($(window).outerWidth(true) < 590 ){
        if (awardsSlider) {
            awardsSlider.destroySlider();
        }
    } else {
        if (awardsSlider) {
            awardsSlider.reloadSlider(getSliderOptions());
        } else {
            awardsSlider = $('.awards-slider').bxSlider(getSliderOptions());
        }
    }
});

function getSliderOptions(){
    var options;

    if ($(window).outerWidth(true) < 960) {
        options = {
            slideWidth: 400,
            minSlides: 1,
            maxSlides: 1,
            slideMargin: 100
        };
    } else {
        options = {
            slideWidth: 400,
            minSlides: 2,
            maxSlides: 2,
            slideMargin: 100
        };
    }

    return options;
}