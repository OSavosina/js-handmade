
//	<div id="tabs">
//		<ul>
//			<li></li>
//			<li></li>
//			<li></li>
//		</ul>
//		<div></div>
//		<div></div>
//		<div></div>
//	</div>


// $('#tabs').changetab();

(function($){
	$.fn.changetab = function(options){

		options = $.extend({
			attabitem: 0, //значение при добавлении id к div
			attabs: 0, //значение при добавлении id к ul li
			direction:'right', //принимает значение left и right
			duration: 'fast', //принимает значение slow, normal, fast или число
			backgroundColor:''
	
		}, options);
		
		var make = function(){
			
			var $this = $(this);
			var $thisName = $(this).attr('id');
			var $tab = $this.children('ul:first-child').children('li');
			var $firstTab = $this.children('ul:first-child').children('li:first-child');
			var $tabItem = $this.children('div');
			var $firstTabItem = $tabItem.first();
			var $thisHeight = $this.children('ul').height();
			var $thisPadding = $this.css('padding-left');
			
			$firstTab.addClass('tab-active');
			
			var size = $tabItem.size(); 
			var maxzin = size+1;
			
			var fhTabItem = $firstTabItem.height();
				$this.height(fhTabItem + $thisHeight);
				
			$tabItem.css({
				'background': options.backgroundColor
			});
            
			
			$tab.each(function(){
			
				options.attabs++
				$(this).attr('id', $thisName+options.attabs);
				
			});
			
			$tabItem.each(function(){
			
				if(options.direction == 'left'){
					$tabItem.css({'left':'-100%'});
					$firstTabItem.css({'left':$thisPadding});
				}	
				
				if(options.direction == 'right'){
					$tabItem.css({'left':'100%'});
					$firstTabItem.css({'left':$thisPadding});
				}	
				
				options.attabitem++
				$(this).attr('id', 'tabItem'+options.attabitem).css({'z-index':size});	
					size--
					
					
			});
			
			
            $tab.click(function(){
			
				var tabID = parseInt($(this).attr('id').match(/\d+/)[0]);
				var bHasClass = $(this).hasClass('tab-active');
 				
				$tabItem.each(function(){
				
					if(options.direction == 'left' && bHasClass == false){
						$(this).css({'z-index':size}).animate({ 
							left: "-100%"
						  }, options.duration);
					}
					
					if(options.direction == 'right' && bHasClass == false){
						$(this).css({'z-index':size}).animate({ 
							left: "100%"
						  }, options.duration);
					}
					
					size--
				
				});
				
				$tab.removeClass('tab-active');
				$(this).addClass('tab-active');
				
				
				if(options.direction == 'left' && bHasClass == false){
					$('#tabItem'+tabID).css({'z-index':maxzin}).animate({ 
							left: $thisPadding
						  }, options.duration);
						  
				}
				
				if(options.direction == 'right' && bHasClass == false){
					$('#tabItem'+tabID).css({'z-index':maxzin}).animate({ 
							left: $thisPadding
						  }, options.duration);
						
				}
				
				var htabitem = $('#tabItem'+tabID).height();
				$this.height(htabitem + $thisHeight);
				console.log($thisHeight);
				
            });
			
			
		};
	
 
    return this.each(make);
		
		
		
	};


})(jQuery);