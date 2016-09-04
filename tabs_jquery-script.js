
//	<div class="jsTabs">
//		<ul>
//			<li></li>
//			<li></li>
//			<li></li>
//		</ul>
//		<div></div>
//		<div></div>
//		<div></div>
//	</div>


// $('.jsTabs').changetab();

(function() {
	$(function() {

		$.fn.changetab = function(options){

			var o = $.extend({
				attabitem: 0, //значение при добавлении id к div
				attabs: 0, //значение при добавлении id к ul li
				direction:'right', //принимает значение left и right
				duration: 'fast', //принимает значение slow, normal, fast или число
				backgroundColor:''

			}, options);

			var make = function(){

				var root = $(this),
					dataName = root.data('name'),
					ulFirst = $('ul', root),
					ulFirstLi = $('li', ulFirst ),
					items = $('.tabs-text', root),
					itemFirst = items.eq(0),
					ulFirstHeight = ulFirst.height(),
					size = ulFirstLi.size(),
					maxzin = size+ 1,
					rootHeight = root.children('ul').height(),
					fhTabItem = itemFirst.height(),
					rootPadding = root.css('padding-left');


				root.height(fhTabItem + ulFirstHeight);

				ulFirstLi.each(function(){

					o.attabs++
					$(this).attr('id', dataName+o.attabs);

				});


				items.each(function(){

					if(o.direction == 'left'){
						items.css({'left':'-100%'});
						itemFirst.css({'left':'15px'});
					}

					if(o.direction == 'right'){
						items.css({'left':'100%'});
						itemFirst.css({'left':'15px'});
					}

					o.attabitem++
					$(this).attr('id', 'tabItem'+o.attabitem).css({'z-index':size});
					size--


				});


				ulFirstLi.click(function(){

					var tabID = parseInt($(this).attr('id').match(/\d+/)[0]),
						bHasClass = $(this).hasClass('tab-active'),
						tabItem = $('#tabItem'+tabID),
						tabitemH = tabItem.height();

					root.height(tabitemH + rootHeight);

					items.each(function(){

						if(o.direction == 'left' && bHasClass == false){
							$(this).css({'z-index':size}).animate({
								left: "-100%"
							}, o.duration);
						}

						if(o.direction == 'right' && bHasClass == false){
							$(this).css({'z-index':size}).animate({
								left: "100%"
							}, o.duration);
						}

						size--

					});

					tabItem.css({'z-index':maxzin}).animate({
					 	left: rootPadding
					}, o.duration);

					ulFirstLi.removeClass('tab-active');
					$(this).addClass('tab-active');

				});

			};

			return this.each(make);

		};


		$('.jsTabs').changetab();

	});
})(jQuery);
