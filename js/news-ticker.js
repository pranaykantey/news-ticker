(function($){
    $.fn.boishakhTicker = function(){

        let target      = $( this ); 
        let targetLi 	= target.children('ul').children('li');
        let tickerText 	= this.find('li.active').text();
        let count       = 1;
        let delay       = 4000;

        if( $(this).attr('data-type') === 'fade' ) {
            $(this).children('ul').children('li').first().addClass('active').addClass('faded');
            // do this code if the ticker type is fade
            var tickerIntervalFade = setInterval( tickerFadeFunc,  delay );
            targetLi.on('mouseover',function(){
                clearInterval(tickerIntervalFade); 
            });
            targetLi.on('mouseleave',function(){
                tickerIntervalFade = setInterval( tickerFadeFunc , delay );
            });
            // prev and next
            $('.prev').on('click',function(){
                clearInterval(tickerIntervalFade);
                if( count > 1 ){

                    tickerLI 	= target.children('ul').children('li.active');
                    count--;
                    tickerLI.removeClass('active').removeClass('faded').prev('li').addClass('active').addClass('faded');
                    tickerIntervalFade = setInterval( tickerFadeFunc , delay );

                }else if (  count == 1  ) {

                    targetLi.first('li').removeClass('active').removeClass('faded');
                    targetLi.last('li').addClass('active').addClass('faded');
                    tickerIntervalFade = setInterval( tickerFadeFunc , delay );
                    count = targetLi.length;

                }
            });
            // ticker fade functio starts here
            function tickerFadeFunc () {
                let tickerLI 	= target.children('ul').children('li.active');
                if( count < targetLi.length ){
                    tickerLI.removeClass('active').removeClass('faded').next('li').addClass('active').addClass('faded');
                    count++;
                }else if( count === targetLi.length ) {
                    count = 0;
                    targetLi.last().removeClass('active').removeClass('faded');
                    targetLi.first().addClass('active').addClass('faded');
                    count++;
                }
            }

        }else if( this.attr('data-type') === 'slide' ){

            // if the ticker style is slider
            this.children('ul').children('li').first().addClass('active').addClass('slide');


            targetLi.on('mouseover',function(){
                clearInterval(tickerInterval);
            });
            targetLi.on('mouseleave',function(){
                tickerInterval = setInterval( tickerSlideFunc ,4000 );
            });

            // ticker fade functio here
            function tickerSlideFunc(){
                let tickerLI 	= target.children('ul').children('li.active');
                if( count < targetLi.length ){
                    count++;
                    tickerLI.removeClass('active').removeClass('slide').next('li').addClass('active').addClass('slide');
                }else if( count === targetLi.length ) {
                    count = 0;
                    targetLi.last().removeClass('active').removeClass('slide');
                    targetLi.first().addClass('active').addClass('slide');
                    count++;
                }
            }
        }else if(  $(this).attr('data-type') === 'typeing' ){
            // do this code if the ticker type is typing
            // hiding default list
            target.children('ul').css('display','none');
            // adding div to show ticker content start
            target.children('ul').after('<div class="show-ticker-container"><a href="#" class="show-ticker"></a></div>');
            // adding div to show ticker content end
            let allLi 		= target.children('ul').children('li');
            allLi.first().addClass('active').addClass('typeing');

            let tickerLICount	= 0;
            let tickerLISplit 	= [];
            let type 			= true;
            // typing animation function
            let tickerTypingInterval = setInterval( tickerTypingFunc ,160);

            function tickerTypingFunc(){
                $('.show-ticker').removeClass('animate');
                let tickerLI 	= target.children('ul').children('li.active');
                let targetLia	= tickerLI.children('a');
                let tickerLIText 	= targetLia.text();
                $('.show-ticker').attr( 'href',targetLia.attr('href') );
                if( tickerLICount < tickerLIText.length && type === true ){

                    tickerLISplit += '<span class="ticker-latter">'+tickerLIText[tickerLICount]+'</span>';

                    tickerLICount++;

                    $('.show-ticker').html( tickerLISplit );
                    // $('.ticker-latter').last().addClass('ticker-latter-animate');

                }else if( tickerLICount === tickerLIText.length || tickerLICount > tickerLIText.length ){

                    $('.show-ticker').addClass('animate');
                    clearInterval( tickerTypingInterval );

                    setTimeout( function(){
                        clearInterval( tickerTypingInterval );

                        if( count < allLi.length ){

                            tickerLI.removeClass('active').next('li').addClass('active');
                            tickerLICount	= 0;
                            tickerLISplit 	= [];
                            tickerTypingInterval = setInterval( tickerTypingFunc ,100);
                            count++;

                        }else if( count === allLi.length ){

                            allLi.last('li').removeClass('active');
                            allLi.first('li').addClass('active');
                            tickerLICount	= 0;
                            tickerLISplit 	= [];
                            tickerTypingInterval = setInterval( tickerTypingFunc ,100);
                            count			= 1;

                        }


                    },5000 );
                }
            }
        }else{
            return false;
        }
    }
}(jQuery));
