/**
 *  鍏ㄥ眬鍑芥暟澶勭悊
 *  -----------------------------
 *  浣滆€咃細ZXL
 *  鏃堕棿锛�2015-12-17
 *  鑱旂郴锛歈Q:771948524
 *********************************************************************************************/
var car2 = {
/****************************************************************************************************/
/*  瀵硅薄绉佹湁鍙橀噺/鍑芥暟杩斿洖鍊�/閫氱敤澶勭悊鍑芥暟
*****************************************************************************************************/	
/*************************
 *  = 瀵硅薄鍙橀噺锛屽垽鏂嚱鏁�
 *************************/
	_events 		: {},									// 鑷畾涔変簨浠�---this._execEvent('scrollStart');
	_windowHeight	: $(window).height(),					// 璁惧灞忓箷楂樺害
	_windowWidth 	: $(window).width(),

	_rotateNode		: $('.p-ct'),							// 鏃嬭浆浣�

	_page 			: $('.m-page'),							// 妯＄増椤甸潰鍒囨崲鐨勯〉闈㈤泦鍚�
	_pageNum		: $('.m-page').size(),					// 妯＄増椤甸潰鐨勪釜鏁�
	_pageNow		: 0,									// 椤甸潰褰撳墠鐨刬ndex鏁�
	_pageNext		: null,									// 椤甸潰涓嬩竴涓殑index鏁�

	_touchStartValY	: 0,									// 瑙︽懜寮€濮嬭幏鍙栫殑绗竴涓€�
	_touchDeltaY	: 0,									// 婊戝姩鐨勮窛绂�

	_moveStart		: true,									// 瑙︽懜绉诲姩鏄惁寮€濮�
	_movePosition	: null,									// 瑙︽懜绉诲姩鐨勬柟鍚戯紙涓娿€佷笅锛�
	_movePosition_c	: null,									// 瑙︽懜绉诲姩鐨勬柟鍚戠殑鎺у埗
	_mouseDown		: false,								// 鍒ゆ柇榧犳爣鏄惁鎸変笅
	_moveFirst		: true,
	_moveInit		: false,

	_firstChange	: false,

	_elementStyle	: document.createElement('div').style,	// css灞炴€т繚瀛樺璞�

	_UC 			: RegExp("Android").test(navigator.userAgent)&&RegExp("UC").test(navigator.userAgent)? true : false,

	_iPhoen			: RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)? true : false,
	_Android		: RegExp("Android").test(navigator.userAgent)? true : false,
	_IsPC			: function(){ 
						var userAgentInfo = navigator.userAgent; 
						var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
						var flag = true; 
						for (var v = 0; v < Agents.length; v++) { 
							if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
						} 
						return flag; 
					} ,
	_music			: true,

/***********************
 *  = gobal閫氱敤鍑芥暟
 ***********************/
 	// 鍒ゆ柇鍑芥暟鏄惁鏄痭ull绌哄€�
	_isOwnEmpty		: function (obj) { 
						for(var name in obj) { 
							if(obj.hasOwnProperty(name)) { 
								return false; 
							} 
						} 
						return true; 
					},
	
	// 鍒ゆ柇娴忚鍣ㄥ唴鏍哥被鍨�
	_vendor			: function () {
						var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
							transform,
							i = 0,
							l = vendors.length;
				
						for ( ; i < l; i++ ) {
							transform = vendors[i] + 'ransform';
							if ( transform in this._elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
						}
						return false;
					},
	// 鍒ゆ柇娴忚鍣ㄦ潵閫傞厤css灞炴€у€�
	_prefixStyle	: function (style) {
						if ( this._vendor() === false ) return false;
						if ( this._vendor() === '' ) return style;
						return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
					},
	// 鍒ゆ柇鏄惁鏀寔css transform-3d锛堥渶瑕佹祴璇曚笅闈㈠睘鎬ф敮鎸侊級
	_hasPerspective	: function(){
						var ret = this._prefixStyle('perspective') in this._elementStyle;
						if ( ret && 'webkitPerspective' in this._elementStyle ) {
							this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
								ret = node.offsetLeft === 9 && node.offsetHeight === 3;
							});
						}
						return !!ret;
					},
		_translateZ : function(){
						if(car2._hasPerspective){
							return ' translateZ(0)';
						}else{
							return '';
						}
					},

	// 鍒ゆ柇灞炴€ф敮鎸佹槸鍚�
	_injectStyles 	: function( rule, callback, nodes, testnames ) {
						var style, ret, node, docOverflow,
							div = document.createElement('div'),
							body = document.body,
							fakeBody = body || document.createElement('body'),
							mod = 'modernizr';

						if ( parseInt(nodes, 10) ) {
							while ( nodes-- ) {
								node = document.createElement('div');
								node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
								div.appendChild(node);
								}
						}

						style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
						div.id = mod;
						(body ? div : fakeBody).innerHTML += style;
						fakeBody.appendChild(div);
						if ( !body ) {
							fakeBody.style.background = '';
							fakeBody.style.overflow = 'hidden';
							docOverflow = docElement.style.overflow;
							docElement.style.overflow = 'hidden';
							docElement.appendChild(fakeBody);
						}

						ret = callback(div, rule);
						if ( !body ) {
							fakeBody.parentNode.removeChild(fakeBody);
							docElement.style.overflow = docOverflow;
						} else {
							div.parentNode.removeChild(div);
						}

						return !!ret;
					},
	// 鑷畾涔変簨浠舵搷浣�
 	_handleEvent 	: function (type) {
						if ( !this._events[type] ) {
							return;
						}

						var i = 0,
							l = this._events[type].length;

						if ( !l ) {
							return;
						}

						for ( ; i < l; i++ ) {
							this._events[type][i].apply(this, [].slice.call(arguments, 1));	
						}
					},
	// 缁欒嚜瀹氫箟浜嬩欢缁戝畾鍑芥暟
	_on				: function (type, fn) {
						if ( !this._events[type] ) {
							this._events[type] = [];
						}

						this._events[type].push(fn);
					},
	//绂佹婊氬姩鏉�
	_scrollStop		: function(){
						//绂佹婊氬姩
						$(window).on('touchmove.scroll',this._scrollControl);
						$(window).on('scroll.scroll',this._scrollControl);
					},
	//鍚姩婊氬姩鏉�
	_scrollStart 	: function(){		
						//寮€鍚睆骞曠姝�
						$(window).off('touchmove.scroll');
						$(window).off('scroll.scroll');
					},
	//婊氬姩鏉℃帶鍒朵簨浠�
	_scrollControl	: function(e){e.preventDefault();},

/**************************************************************************************************************/
/*  鍏宠仈澶勭悊鍑芥暟
***************************************************************************************************************/
/**
 *  鍗曢〉闈�-m-page 鍒囨崲鐨勫嚱鏁板鐞�
 *  -->缁戝畾浜嬩欢
 *  -->浜嬩欢澶勭悊鍑芥暟
 *  -->浜嬩欢鍥炶皟鍑芥暟
 *  -->浜嬩欢鍏宠仈鍑芥暟銆�
 */
 	// 椤甸潰鍒囨崲寮€濮�
 	page_start		: function(){
 		car2._page.on('touchstart mousedown',car2.page_touch_start);
 		car2._page.on('touchmove mousemove',car2.page_touch_move);
 		car2._page.on('touchend mouseup',car2.page_touch_end);
 	},

 	// 椤甸潰鍒囨崲鍋滄
 	page_stop		: function(){
		car2._page.off('touchstart mousedown');
 		car2._page.off('touchmove mousemove');
 		car2._page.off('touchend mouseup');
 	},

 	// page瑙︽懜绉诲姩start
 	page_touch_start: function(e){
 		//e.preventDefault();
 		if(!car2._moveStart) return;

 		if(e.type == "touchstart"){
        	car2._touchStartValY = window.event.touches[0].pageY;
        }else{
        	car2._touchStartValY = e.pageY||e.y;
        	car2._mouseDown = true;
        }

        car2._moveInit = true;

        // start浜嬩欢
        car2._handleEvent('start');
 	},

 	// page瑙︽懜绉诲姩move
 	page_touch_move : function(e){
 		e.preventDefault();

		if(!car2._moveStart) return;
		if(!car2._moveInit) return;

		// 璁剧疆鍙橀噺鍊�
 		var $self = car2._page.eq(car2._pageNow),
 			h = parseInt($self.height()),
 			moveP,
 			scrollTop,
 			node=null,
 			move=false;

 		// 鑾峰彇绉诲姩鐨勫€�
 		if(e.type == "touchmove"){
        	moveP = window.event.touches[0].pageY;
        	move = true;
        }else{
        	if(car2._mouseDown){
        		moveP = e.pageY||e.y;
        		move = true;
        	}else return;
        }


		// 鑾峰彇涓嬫娲诲姩鐨刾age
        node = car2.page_position(e,moveP,$self);
        //console.log(node);
        // page椤甸潰绉诲姩 		
 		car2.page_translate(node);

        // move浜嬩欢
        car2._handleEvent('move');
		
		
		
		
		
 	},

 	// page瑙︽懜绉诲姩鍒ゆ柇鏂瑰悜
 	page_position	: function(e,moveP,$self){ 		
 		var now,next;
	
 		// 璁剧疆绉诲姩鐨勮窛绂�
 		if(moveP!='undefined') car2._touchDeltaY = moveP - car2._touchStartValY;

 		// 璁剧疆绉诲姩鏂瑰悜
    	car2._movePosition = moveP - car2._touchStartValY >0 ? 'down' : 'up';
    	if(car2._movePosition!=car2._movePosition_c){
    		car2._moveFirst = true;
    		car2._movePosition_c = car2._movePosition;
    	}else{
			car2._moveFirst = false;
    	}

		// 璁剧疆涓嬩竴椤甸潰鐨勬樉绀哄拰浣嶇疆        
        if(car2._touchDeltaY<=0){
        	if($self.next('.m-page').length == 0){
        		car2._pageNext = 0;
        	} else {
        		car2._pageNext = car2._pageNow+1;	
        	}
 			
 			next = car2._page.eq(car2._pageNext)[0];
 		}else{
 			if($self.prev('.m-page').length == 0 ) {
 				if (car2._firstChange) {
 					car2._pageNext = car2._pageNum - 1;
 				} else {
 					return;
 				}
 			} else {
 				car2._pageNext = car2._pageNow-1;	
 			}
 			
 			next = car2._page.eq(car2._pageNext)[0];
 		}

 		now = car2._page.eq(car2._pageNow)[0];
 		node = [next,now];

 		// move闃舵鏍规嵁鏂瑰悜璁剧疆椤甸潰鐨勫垵濮嬪寲浣嶇疆--鎵ц涓€娆�
 		if(car2._moveFirst) init_next(node);

 		function init_next(node){
 			var s,l,_translateZ = car2._translateZ();

 			car2._page.removeClass('action');
 			$(node[1]).addClass('action').removeClass('f-hide');
 			car2._page.not('.action').addClass('f-hide');
 			
 			// 妯＄増楂樺害閫傞厤鍑芥暟澶勭悊
	 		car2.height_auto(car2._page.eq(car2._pageNext),'false');

 			// 鏄剧ず瀵瑰簲绉诲姩鐨刾age
			$(node[0]).removeClass('f-hide').addClass('active'); 
			
			
			
	 		// 璁剧疆涓嬩竴椤甸潰鐨勬樉绀哄拰浣嶇疆        
	        if(car2._movePosition=='up'){
 				s = parseInt($(window).scrollTop());
 				if(s>0) l = $(window).height()+s;
 				else l = $(window).height();
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+l+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',l);

 				$(node[1]).attr('data-translate',0);
	 		}else{
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+Math.max($(window).height(),$(node[0]).height())+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',-Math.max($(window).height(),$(node[0]).height()));

 				$(node[1]).attr('data-translate',0);
	 		}
 		}
 		
 		return node;
 	},

 	// page瑙︽懜绉诲姩璁剧疆鍑芥暟
 	page_translate	: function(node){
 		// 娌℃湁浼犲€艰繑鍥�
 		if(!node) return;
		
 		var _translateZ = car2._translateZ(),
 			y_1,y_2,scale,
 			y = car2._touchDeltaY;

 		// 鍒囨崲鐨勯〉闈㈢Щ鍔�
 		if($(node[0]).attr('data-translate')) y_1 = y + parseInt($(node[0]).attr('data-translate'));
		node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y_1+'px)'+_translateZ;
		
		// 褰撳墠鐨勯〉闈㈢Щ鍔�
		if($(node[1]).attr('data-translate')) y_2 = y + parseInt($(node[1]).attr('data-translate'));
		scale = 1 - Math.abs(y*0.2/$(window).height());
		y_2 = y_2/5;
		try{
			node[1].style[car2._prefixStyle('transform')] = 'translate(0,'+y_2+'px)'+_translateZ+' scale('+scale+')';
		}catch(e){
			console.log(e);	
		}
 	},

 	// page瑙︽懜绉诲姩end
 	page_touch_end	: function(e){
 		car2._moveInit = false;
 		car2._mouseDown = false;
 		if(!car2._moveStart) return;
 		if(!car2._pageNext&&car2._pageNext!=0) return;

 		car2._moveStart = false;

 		// 纭繚绉诲姩浜�
 		if(Math.abs(car2._touchDeltaY)>10){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 			car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 		}
			
		// 椤甸潰鍒囨崲
 		if(Math.abs(car2._touchDeltaY)>=100){		// 鍒囨崲鎴愬姛
 			car2.page_success();
 		}else if(Math.abs(car2._touchDeltaY)>10&&Math.abs(car2._touchDeltaY)<100){	// 鍒囨崲澶辫触		
 			car2.page_fial();
 		}else{									// 娌℃湁鍒囨崲
 			car2.page_fial();
 		}

 		// end浜嬩欢
        car2._handleEvent('end');

        // 娉ㄩ攢鎺у埗鍊�
 		car2._movePosition = null;
 		car2._movePosition_c = null;
 		car2._touchStartValY = 0;
		
         
		 if($('#j-mengban').hasClass('z-show')){
			 if(car2._pageNext == mengvalue){
			  car2.page_stop();
			  
		   }
		 }
		 



 	},

 	// 鍒囨崲鎴愬姛
 	page_success	: function(){
 		var _translateZ = car2._translateZ();
 		
 		// 涓嬩竴涓〉闈㈢殑绉诲姩
 		car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ;
 	
 		// 褰撳墠椤甸潰鍙樺皬鐨勭Щ鍔�
 		var y = car2._touchDeltaY > 0 ? $(window).height()/5 : -$(window).height()/5;
 		var scale = 0.8;
 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y+'px)'+_translateZ+' scale('+scale+')';
 	
 		// 鎴愬姛浜嬩欢
    	car2._handleEvent('success');
 	},

 	// 鍒囨崲澶辫触
 	page_fial	: function(){
 		var _translateZ = car2._translateZ();

 		// 鍒ゆ柇鏄惁绉诲姩浜�
		if(!car2._pageNext&&car2._pageNext!=0) {
			car2._moveStart = true;
			car2._moveFirst = true;
			return;
		}

 		if(car2._movePosition=='up'){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+$(window).height()+'px)'+_translateZ;
 		}else{
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+$(window).height()+'px)'+_translateZ;
 		}

 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ+' scale(1)';

 		// fial浜嬩欢
    	car2._handleEvent('fial');
 	},

/**
 *  瀵硅薄鍑芥暟浜嬩欢缁戝畾澶勭悊
 *  -->start touch寮€濮嬩簨浠�
 *  -->mov   move绉诲姩浜嬩欢
 *  -->end   end缁撴潫浜嬩欢
 */
 	haddle_envent_fn : function(){
 		// 褰撳墠椤甸潰绉诲姩锛屽欢杩熷姞杞戒互鍚庣殑鍥剧墖
		car2._on('start',car2.lazy_bigP);

		// 褰撳墠椤甸潰绉诲姩
		car2._on('move',function(){
			
		});

		// 鍒囨崲澶辫触浜嬩欢
		car2._on('fial',function(){
			setTimeout(function(){
				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';

	 			car2._page.eq(car2._pageNext).removeClass('active').addClass('f-hide');
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._touchDeltaY = 0;
				car2._page.eq(car2._pageNow).attr('style','');
	 		},300)
		})

		// 鍒囨崲鎴愬姛浜嬩欢
		car2._on('success',function(){
			// 鍒ゆ柇鏈€鍚庝竴椤佃锛屽紑鍚惊鐜垏鎹�
			if (car2._pageNext == 0 && car2._pageNow == car2._pageNum -1) {
				car2._firstChange = true;
                //window.location.href="http://www.5.cn/magazine/822/1883/index.html";
			}

			
			setTimeout(function(){
				

				// 鍒ゆ柇鏄惁涓烘渶鍚庝竴椤碉紝鏄剧ず鎴栬€呴殣钘忕澶�
				/*if(car2._pageNext == car2._pageNum-1 ) $('.u-arrow').addClass('f-hide');
				else  $('.u-arrow').removeClass('f-hide');*/

	 			car2._page.eq(car2._pageNow).addClass('f-hide').removeClass('item_show');

				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';
	 			car2._page.eq(car2._pageNext).addClass('item_show');

	 			// 鍒濆鍖栧垏鎹㈢殑鐩稿叧鎺у埗鍊�
	 			$('.p-ct').removeClass('fixed');
	 			car2._page.eq(car2._pageNext).removeClass('active');
				car2._page.eq(car2._pageNext).removeClass('fixed');
				car2._pageNow = car2._pageNext;
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._page.eq(car2._pageNow).attr('style','');
				car2._page.eq(car2._pageNow).removeClass('fixed');
				car2._page.eq(car2._pageNow).attr('data-translate','');
				car2._touchDeltaY = 0;

				// 鍒囨崲鎴愬姛鍚庯紝鎵ц褰撳墠椤甸潰鐨勫姩鐢�---寤惰繜200ms
				setTimeout(function(){
					if(car2._page.eq(car2._pageNow).hasClass('z-animate')) return;
					car2._page.eq(car2._pageNow).addClass('z-animate');
				},20)

				// 闅愯棌鍥炬枃缁勪欢鐨勬枃鏈�
				$('.j-detail').removeClass('z-show');
				$('.txt-arrow').removeClass('z-toggle');

			
	 		},300)

			// 鍒囨崲鎴愬姛鍚庯紝鍙戦€佺粺璁�
			var laytouType = car2._page.eq(car2._pageNow).attr('data-statics');
			
		})
 	},


/**
 *  media璧勬簮绠＄悊
 *  -->缁戝畾澹伴煶鎺у埗浜嬩欢
 *  -->鍑芥暟澶勭悊澹伴煶鐨勫紑鍚拰鍏抽棴
 *  -->寮傛鍔犺浇澹伴煶鎻掍欢锛堝欢杩熷仛锛�
 *  -->澹伴煶鍒濆鍖�
 *  -->瑙嗛鍒濆鍖�
 *  -->澹伴煶鍜岃棰戝垏鎹㈢殑鎺у埗
 */

	
 	// 澹伴煶鍒濆鍖�
 	audio_init : function(){
 		// 澹伴煶鎸夐挳鐐瑰嚮浜嬩欢
 		var f = $("#audio_play");
 		if(f.attr('class')=='audio'){
 			setTimeout(function(){
 				document.getElementById("audio_play").play();
 			},1000); 			
 			$("#soundButton").on('click',function(){
	 			//濡傛灉鏈夐煶涔愮殑璇�
	 			if(document.getElementById("audio_play").paused){
	 				car2.audio_play();
				}else{
					car2.audio_stop();
				}
	 		});
 		}else{
 			car2._music = false;
 			//涓嶆樉绀洪煶涔愭寜閽�
	 		$(".musicpage").addClass('f-hide');
 		}
 	},

 	// 澹伴煶鎾斁
 	audio_play : function(){
 		if(car2._music){
	 		document.getElementById("audio_play").play();
	 		$("#soundButton").addClass('openSound');
	 	}
 	},

 	// 澹伴煶鍋滄
 	audio_stop	: function(){
 		if(car2._music){
	 		document.getElementById("audio_play").pause();
	 		$("#soundButton").removeClass('openSound');
	 	}
 	},

 	// 瑙嗛鍒濆鍖�
 	video_init : function(){
 		// 瑙嗛
 		var v = $("#video_iframe_src").val();
 		//濡傛灉鏈夋爣绀哄紑鍚棰�
 		if(v){
 			$("#videoshow").on('click',function(){
 				//瑙嗛寮€鍚悗 璋冩暣z-index 鍦ㄦ渶涓婂眰鏄剧ず 闃叉 鐗规晥闃绘尅瑙嗛椤甸潰
 				$(".item_show").css({'z-index':'99'});
	 			//$("#video_iframe").attr("src",v);
	 			var videoframe='<iframe id="video_iframe" height="100%" width="100%" src="'+v+'" frameborder="0" allowfullscreen=""></iframe>'; 
	 			$(".m-Video").html(videoframe);
	 			$(".u-maskLayer").css({"display":"block","opacity":"1"});
	 			//鍋滄鎾斁闊充箰
		 		car2.audio_stop();
	 		});
	 		$("#videohide").on('click',function(){
	 			//瑙嗛鍏抽棴鍚� 杩樺師z-index 
	 			$(".item_show").css({'z-index':'9'});
	 			//$("#video_iframe").attr("src",'');
	 			$(".m-Video").empty();
	 			$(".u-maskLayer").css({"display":"none","opacity":"0"});
	 			//閲嶆柊鎾斁闊充箰
	 			car2.audio_play();
	 		});
 		}
 	},

	// media绠＄悊鍒濆鍖�
	media_init : function(){
        // 瑙嗛鍒濆鍖�
        car2.video_init();
		// 缁戝畾闊充箰鍔犺浇浜嬩欢
		car2.audio_init();
	},

/**
 *  鍥剧墖寤惰繜鍔犺浇鍔熻兘
 *  -->鏇夸唬闇€瑕佸欢杩熷姞杞界殑鍥剧墖
 *  -->浼樺寲鍔犺浇鏇夸唬鍥剧墖
 *  -->鍒囨崲鍔熻兘瑙﹀彂鍥剧墖鐨勫欢杩熷姞杞�
 *  -->鏇夸唬鍥剧墖涓�400*400鐨勯€忔槑澶у浘鐗�
 */
	/* 鍥剧墖寤惰繜鍔犺浇 */
	lazy_img : function(){
		var lazyNode = $('.lazy-img');
		lazyNode.each(function(){
			var self = $(this);
			if(self.is('img')){
				self.attr('src','http://img0.hx.com/magazine/img/load.gif');
			}else{
				// 鎶婂師鏉ョ殑鍥剧墖棰勫厛淇濆瓨涓嬫潵
				var position = self.css('background-position'),
					size = self.css('background-size');

				self.attr({
					'data-position' : position,
					'data-size'	: size
				});

				if(self.attr('data-bg')=='no'){
					self.css({
						'background-repeat'	: 'no-repeat'
					})
				}

				self.css({
					'background-image'	: 'url(http://img0.hx.com/magazine/img/load.gif)',
					'background-size'	: '120px 120px',
					'background-position': 'center'
				})

				if(self.attr('data-image')=='no'){
					self.css({
						'background-image'	: 'none'
					})
				}
			}
		})
	},

	// 寮€濮嬪姞杞藉墠涓変釜椤甸潰
	lazy_start : function(){
		// 鍓嶄笁涓〉闈㈢殑鍥剧墖寤惰繜鍔犺浇
		setTimeout(function(){
			for(var i=0;i<3;i++){
				var node = $(".m-page").eq(i);
				if(node.length==0) break;
				if(node.find('.lazy-img').length!=0){
					car2.lazy_change(node,false);
					// 椋炲嚭绐楀彛鐨勫欢杩�
					if(node.attr('data-page-type')=='flyCon'){
						car2.lazy_change($('.m-flypop'),false);
					}
				}else continue;
			}
		},200)
	},
	
	// 鍔犺浇褰撳墠鍚庨潰绗笁涓�
	lazy_bigP : function(){
		for(var i=3;i<=5;i++){
			var node = $(".m-page").eq(car2._pageNow+i);
			if(node.length==0) break;
			if(node.find('.lazy-img').length!=0){
				car2.lazy_change(node,false);
				// 椋炲嚭绐楀彛鐨勫欢杩�
				if(node.attr('data-page-type')=='flyCon'){
					car2.lazy_change($('.m-flypop'),false);
				}
			}else continue;
		}
	},

	// 鍥剧墖寤惰繜鏇挎崲鍑芥暟
	lazy_change : function(node,goon){
		// 3d鍥剧墖鐨勫欢杩熷姞杞�
		if(node.attr('data-page-type')=='3d') car2.lazy_3d(node);

		// 椋炲嚭绐楀彛鐨勫欢杩�
		if(node.attr('data-page-type')=='flyCon'){
			var img = $('.m-flypop').find('.lazy-img');
			img.each(function(){
				var self = $(this),
					srcImg = self.attr('data-src');

				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}
					})
					.attr("src",srcImg);
			})
		}

		// 鍏朵粬鍥剧墖鐨勫欢杩熷姞杞�
		var lazy = node.find('.lazy-img');
		lazy.each(function(){
			var self = $(this),
				srcImg = self.attr('data-src'),
				position = self.attr('data-position'),
				size = self.attr('data-size');

			if(self.attr('data-bg')!='no'){
				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}else{
							self.css({
								'background-image'	: 'url('+srcImg+')',
								'background-position'	: position,
								'background-size' : size
							})
						}

						// 鍒ゆ柇涓嬮潰椤甸潰杩涜鍔犺浇
						if(goon){
							for(var i =0;i<$(".m-page").size();i++){
								var page = $(".m-page").eq(i);
								if($(".m-page").find('.lazy-img').length==0) continue
								else{
									car2.lazy_change(page,true);
								}
							}
						}
					})
					.attr("src",srcImg);

				self.removeClass('lazy-img').addClass('lazy-finish');
			}else{
				if(self.attr('data-auto')=='yes') self.css('background','none');
			}
		})	
	},

	

/**************************************************************************************************************/
/*  鍗曚釜澶勭悊鍑芥暟
***************************************************************************************************************/
/**
 * 鍗曚釜鍑芥暟澶勭悊-unit
 * -->楂樺害鐨勮绠�
 * -->鏂囨湰鐨勫睍寮€
 * -->鏂囨湰鐨勬敹璧�
 * -->杈撳叆琛ㄥ崟鐨勬搷浣�
 * -->寰俊鐨勫垎浜彁绀�
 */
	// 鏍规嵁璁惧鐨勯珮搴︼紝鏉ラ€傞厤姣忎竴涓ā鐗堢殑楂樺害锛屽苟涓旈潤姝㈡粦鍔�
	// --鏂囨。鍒濆鍖栬绠�
	// --椤甸潰鍒囨崲瀹屾垚璁＄畻
	height_auto	: function(ele,val){
		ele.children('.page-con').css('height','auto');
		var height = $(window).height();

		// 闇€瑕佽В闄ゅ浐瀹氶珮搴︾殑page鍗＄墖
		var vial = true;
		if(!vial){
			if(ele.height()<=height){
				ele.children('.page-con').height(height+2);
				if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
			}else{
				car2._scrollStart();
				if(val=='true') $('.p-ct').removeClass('fixed');
				ele.children('.page-con').css('height','100%');
				return;
			}
		}else{
			ele.children('.page-con').height(height+2);
			if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
		}
	},



	// 瀵硅薄绉佹湁鍙橀噺鍒锋柊
	refresh	: function(){
		$(window).height() = $(window).height();
		car2._windowWidth = $(window).width();
	},

/**************************************************************************************************************/
/*  鍑芥暟鍒濆鍖�
***************************************************************************************************************/
/**
 *  鐩稿叧鎻掍欢鐨勫惎鍔�
 */
	//鎻掍欢鍚姩鍑芥暟
 	plugin : function(){
        
		car2.start_callback();
		//鐣欒█缁戝畾
      	car2.liuyan_bind();

 	},


	// 钂欐澘鎻掍欢鍥炶皟鍑芥暟澶勭悊
 	start_callback : function(){

 		// 寮€鍚痺indow鐨勬粴鍔�
 		car2._scrollStart();

 		// 寮€鍚〉闈㈠垏鎹�
		car2.page_start();

		// 绠ご鏄剧ず
		//$('.u-arrow').removeClass('f-hide');
       
 	},

/**
 * app鍒濆鍖�
 */
	// 鏍峰紡閫傞厤
	styleInit : function(){
		// 绂佹鏂囩増琚嫋鍔�
		document.body.style.userSelect = 'none';
		document.body.style.mozUserSelect = 'none';
		document.body.style.webkitUserSelect = 'none';

		// 鍒ゆ柇璁惧鐨勭被鍨嬪苟鍔犱笂class
		if(car2._IsPC()) $(document.body).addClass('pc');
		else $(document.body).addClass('mobile');
		if(car2._Android) $(document.body).addClass('android');
		if(car2._iPhoen) $(document.body).addClass('iphone');

		// 鍒ゆ柇鏄惁鏈�3d
		if(!car2._hasPerspective()){
			car2._rotateNode.addClass('transformNode-2d');
			$(document.body).addClass('no-3d');
		}else{
			car2._rotateNode.addClass('transformNode-3d');
			$(document.body).addClass('perspective');
			$(document.body).addClass('yes-3d');
		}

		// 鍥剧墖寤惰繜鍔犺浇鐨勫鐞�
		this.lazy_img();
		
		// 妯＄増鎻愮ず鏂囧瓧鏄剧ず
		setTimeout(function(){
			$('.m-alert').find('strong').addClass('z-show');

		},3000)

		$('.u-arrow').on('touchmove',function(e){e.preventDefault()})

		$('.p-ct').height($(window).height());
		$('.m-page').height($(window).height());
		$('#j-mengban').height($(window).height());
		$('.translate-back').height($(window).height());
	},
	//濠氱ぜ鍊掕鏃�
	djs:function(sstime){
		var stime = sstime;
		setInterval(function(){
			if (stime < 1) { stime = 0; }
			var day = Math.floor(stime / (24 * 60 * 60));
			var hour = Math.floor((stime - day * (24 * 60 * 60)) / (60 * 60));
			var minute = Math.floor((stime - day * (24 * 60 * 60) - hour * (60 * 60)) / 60);
			var second = Math.floor(stime - day * (24 * 60 * 60) - hour * (60 * 60) - minute * 60);
			$('#day').text(day);
			$('#hour').text(hour);
			$('#minute').text(minute);
			$('#second').text(second);
			stime--;	
		}, 1000);
	},
	//寰俊鍒嗕韩
	weixinfenxiang:function(desc,title,url,imgurl,acurl){
		$.getJSON(acurl, {url: location.href},function(data){
		  wx.config({
		    appId   : data.entity.appid,
		    timestamp : data.entity.timestamp,
		    nonceStr  : data.entity.noncestr,
		    signature : data.entity.signature,
		    jsApiList: [
		      // 鎵€鏈夎璋冪敤鐨� API 閮借鍔犲埌杩欎釜鍒楄〃涓�
		      "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"
		    ]
		  });
		   wx.ready(function () {
		    // 1 鍒ゆ柇褰撳墠鐗堟湰鏄惁鏀寔鎸囧畾 JS 鎺ュ彛锛屾敮鎸佹壒閲忓垽鏂�
		      wx.checkJsApi({
		        jsApiList: [
		          'getNetworkType',
		          'previewImage',
		           'onMenuShareTimeline',
		          'onMenuShareAppMessage',
		          'onMenuShareQQ',
		          'onMenuShareWeibo'
		        ],
		        success: function (res) { /*alert(JSON.stringify(res));*/ }
		      });
		    var shareData = {
		        title: title,
		        desc: desc,
		        link: document.url,
		        imgUrl: imgurl,
		        trigger: function (res) {/*alert('鐢ㄦ埛鐐瑰嚮鍙戦€佺粰鏈嬪弸');*/},
		        success: function (res) {/*alert('宸插垎浜�');*/},
		        cancel: function (res) {/*alert('宸插彇娑�');*/},
		        fail: function (res) {/*alert(JSON.stringify(res));*/}
		    };
		    wx.onMenuShareAppMessage(shareData);
		    wx.onMenuShareTimeline(shareData);
		    wx.onMenuShareQQ(shareData);
		    wx.onMenuShareWeibo(shareData);
		  });

		  wx.error(function (res) {/*alert(res.errMsg);*/}); 
		});
	},
	//璇锋煬椤甸潰鍒囨崲for pc
	pnext:function(){

		var a=$(".item_show"); //鏄剧ず椤甸潰
		var b=a.next(); //涓嬩竴椤�
		var c=a.prev();
		//if(a.attr('class').indexOf('pageend')>=0){//鏈€鍚庝竴椤�
		if(a.html()==$(".m-page:last").html()){
			a.addClass('pt-page-moveToTop');
			$('.m-fengye').addClass('item_show1');
			setTimeout(function (){ 
				a.removeClass('pt-page-moveToTop').removeClass('item_show').addClass('f-hide').addClass('action');
			    $('.m-fengye').removeClass('f-hide').removeClass('item_show1').addClass('item_show');
				car2._pageNow=0;
			},500);
			c.removeClass('action');
		}else{//鍏朵粬椤�
			a.addClass('pt-page-moveToTop');
			b.addClass('item_show1');
			setTimeout(function (){ 
				a.removeClass('pt-page-moveToTop').removeClass('item_show').addClass('f-hide').addClass('action');
			    b.removeClass('f-hide').removeClass('item_show1').addClass('item_show');
				car2._pageNow+=1;
			},500);
			if(a.attr('class').indexOf('m-fengye')>=0){//绗竴椤�
				//c.removeClass('action');
			}else{
				c.removeClass('action');
			}
		}
		//console.log(car2._pageNow);
	},
	pprev:function(){
		var a=$(".item_show"); //鏄剧ず椤甸潰
		var b=a.prev(); //涓嬩竴椤�
		//濡傛灉褰撳墠鍦ㄦ渶鍚庝竴椤�
		if(a.attr('class').indexOf("m-fengye")>=0){
			console.log('no');
			car2._pageNow=0;
		}else{
			a.addClass('pt-page-moveToBottom');
			b.addClass('item_show1');
			setTimeout(function (){ 
				a.removeClass('pt-page-moveToBottom').removeClass('item_show').addClass('f-hide').addClass('action');
			    b.removeClass('f-hide').removeClass('item_show1').addClass('item_show').removeClass('action');
			    b.next().next().removeClass('action');
				car2._pageNow-=1;
			},500);
		}
		//console.log(car2._pageNow);
	},
	//鐣欒█浜嬩欢缁戝畾
	liuyan_bind:function(){
		//鐐瑰嚮鎵撳紑鐣欒█绐�
		$(".item6_btn1").on("click",function(e){
			e.stopPropagation();
			$("#message").removeClass('cpm-hide');
			//ajax 鑾峰彇璇勮鍒楄〃
			if($("#J_book_list").attr('datainfo')!='ok'){
				$.ajax({
				 	url: zthisurl+'index.php/wap/querybooks?page=1&sitecode='+qid+'&pagesize=200&_=1450076414075',
				 	dataType: 'json',
				 	type:'POST',
				 	success: function(msg){ 
				 		//鑾峰彇鎴愬姛璁剧疆鏍囩ず
				 		var html = '';
						$("#J_book_list").attr('datainfo',"ok");
						var data = msg.entity.list;
						for(var o in data){  
							if(data[o].guesttype==1){
					        	guanxi="鐢�";
					        }else{
					        	guanxi="濂�";
					        }
					        html+='<li><p><span class="name">'+data[o].guestname+'</span>璇达細</p><div class="txt">'+data[o].bookcontent+'</div><p class="time" style="text-align:right">('+guanxi+'鏂逛翰鍙�)&nbsp;</p></li>';
					    }  
					    $("#J_book_list").html(html);
				 	}
				});
			}

		});
		//鍏抽棴鐣欒█绐�
		$(".message-close").on("click",function(){
			car2._scrollStart();
			$("#message").addClass('cpm-hide');
		});
		//缁戝畾鎻愪氦鎸夐挳
		$("#J_SaveReback_btn").on("click",function(){
			var msgname = $("#msgname").val();
			var msgnum = $("#msgnum").val();
			var msgguanxi = $("#msgguanxi").val();
			var msgdianhua = $("#msgphone").val();
			var msgzhufu = $("#msgzhufu").val();
			var guanxi='';
			if(msgname.length > 0 && msgguanxi.length > 0 && msgdianhua.length > 0 && msgzhufu.length > 0 ){
				var data = {p1:msgname,p2:msgnum,p3:msgguanxi,p4:msgdianhua,p5:msgzhufu,id:qid};
				if(msgguanxi==1){
				  guanxi="鐢�";
				}else{
				  guanxi="濂�";
				}
				inserthtml='<li><p><span class="name">'+msgname+'</span>璇达細</p><div class="txt">'+msgzhufu+'</div><p class="time" style="text-align:right">('+guanxi+'鏂逛翰鍙�)&nbsp;</p></li>';
				if($("#J_book_list").attr('datasend')!='ok'){
					//ajax 鑾峰彇璇勮鍒楄〃
					$.ajax({
					 	url: zthisurl+'app/inmsg',
					 	dataType: 'json',
					 	type:'POST',
					 	data: data,
					 	success: function(msg){
							$("#J_book_list").prepend(inserthtml);
							$("#J_book_list").attr('datasend',"ok");
							alert('鎰熻阿浣犵殑绁濈');
					 	}
					});		
				}else{
					alert('鎰熻阿浣犵殑绁濈!');
				}
			}else{
				alert('璇锋鏌ヨ緭鍏ヤ俊鎭�');
			}
		});
	},

	// 瀵硅薄鍒濆鍖�
	init : function(){
		// 鏍峰紡锛屾爣绛剧殑娓叉煋
		// 瀵硅薄鎿嶄綔浜嬩欢澶勭悊
		this.styleInit();
		this.haddle_envent_fn();
		
		// 绂佹婊戝姩
		//this._scrollStop();

		// 缁戝畾鍏ㄥ眬浜嬩欢鍑芥暟澶勭悊
		// $(window).on('resize',function(){
		// 	car2.refresh();
		// })
		
		$('input[type="hidden"]').appendTo($('body'));
		
		// 鍥剧墖棰勫厛鍔犺浇
		$('<img />').attr('src',$('#r-cover').val());
		$('<img />').attr('src',$('.m-fengye').find('.page-con').attr('data-src'));
        
		// loading鎵ц涓€娆�
		var loading_time = new Date().getTime();
		
		$(window).on('load',function(){
			var now = new Date().getTime();
			var loading_end = false;
			var time;
			var time_del = now - loading_time;

			if ( time_del >= 500 ) {
				loading_end = true;
			}

			if ( loading_end ) {
				time = 0;
			} else {
				time = 500 - time_del;
			}
			$('.p-ct').addClass('f-hide');
			$('.u-arrow').addClass('f-hide');

			var loadingnumd = 0;
            
			var loadingnum = window.setInterval(function(){
				var v =parseInt(loadingnumd/1);
				if(loadingnumd>=100){
					v=100;
					window.clearInterval(loadingnum);
                    //褰撳嚱鏁版墽琛岃嚦姝ゆ椂涓€瀹氳浇鍏ュ畬鎴愪簡涓旇繘搴︽潯杈惧埌浜�100
                    //姝ゆ椂鎵ц涓嬮潰鐨勬柟娉曪紝绛夊緟0.5绉掑悗杩涘叆璇锋煬椤甸潰
                    setTimeout(function(){
                       $('#j-mengban').addClass('z-show');
					   runuarrow();
					   car2.media_init();
                    }, 500);
				}
				$(".persent").text(v+"%");
				loadingnumd += 6;
			},100);
		})
	}

};

/* 绉诲姩绔祻瑙堝櫒涓嶆敮鎸乤udio鐨勮嚜鍔ㄦ挱鏀惧姛鑳斤紝蹇呴』瑕佺敤鎴疯Е鍙戜竴涓簨浠跺悗鎵嶈兘杩涜鎾斁 */
$(document).ready(function(){
    $('html').one('touchstart', function(){
            car2.audio_play();
    });
});


function runuarrow(){
	//寮€鍚吹瀹�
	if(guest == '1'){
		$('.mb-alert').removeClass('f-hide');
		$('.m-alert').addClass('f-hide');
		$('#app_coveretc1').show();
	}else{
		//涓荤▼搴�
		appstart();	
	}
}

/**杩愯涓荤▼搴�*/
function appstart(){
	//寮€鍚挋鐗�
	if(ismengban && ismengban!='cmoren' && openmb){
		$("#app_coveretc1").hide();
		console.log(1);
		$('.m-alert').addClass('f-hide');
		$('.mb-alert').removeClass('f-hide');
		if(ismengban=="kiss"){
			txkiss.init();
		}else if(ismengban=="guaguaka"){
			txguaguaka.init();
		}else if(ismengban=="sandian"){
			//txsandian.init();
		}else if(ismengban=="fingerprint"){
			txfingerprint.init();
		}else if(ismengban=="yaoyiyao"){
			txyaoyiyao.init();
		}else if(ismengban=="ring"){
			inc('http://libs.useso.com/js/jqueryui/1.8.21/jquery-ui.min.js');
			setTimeout("txring.init()",2400);
		}
	}else{
		//寮€鍚壒鏁� 锛坖s鎺у埗锛�
		if(texiao){
			initf();
		}
		$('.f-abs').removeClass('f-hide');
		$('.mb-alert').addClass('f-hide');
		$('.translate-back').removeClass('f-hide');
		$('.p-ct').removeClass('f-hide');
		$('.u-arrow').removeClass('f-hide');
		//缁戝畾鐐瑰嚮浜嬩欢
		$('.u-arrow').on("click",function(){
			car2.pnext();
		});
		$('#leafContainer').removeClass('f-hide');
		$('.m-alert').addClass('f-hide');
		car2.height_auto(car2._page.eq(car2._pageNow),'false');	
		

		// 寤惰繜鍔犺浇鍚庨潰涓変釜椤甸潰鍥剧墖
		car2.lazy_start();
		
		// 鎻掍欢鍔犺浇
		car2.plugin();

	 	$('.p-ct').height($(window).height());
		$('.m-page').height($(window).height());
		$('.translate-back').height($(window).height());	
	}
}