
const common = {
    init : function(){
        //this.gnbMenu();
        //this.inputType();
        this.fixedHeader();
        this.lnbWrap();
        this.select();
        this.toolTip();
        this.acrodion();
        this.sideFiexd();
        this.fixedTab();
        this.btnChoice();
        this.stepCheck();
    },
    fixedHeader: function(){
        // 통합검색 버튼
        $('.linkMenu .search').on('click',function(){
            $('.headerSearch').addClass('on');
            $(this).addClass('off');
        });

        $('.headerSearch input[type="text"]').on('click',function(e){
            $(".searchLayer").css({
                "display": 'block'
            });
            $('.headerSearch .btnClear').css({
                visibility: 'visible',
                opacity: 1
            })
            $('body').append(`<div class="searchMask"></div>`);
        });
        $('.searchLayer li,.headerSearch .btnClear').on('click',function(){
            $('.searchMask').remove();
            $(".searchLayer").css({
                "display": 'none'
            });
            $('.headerSearch .btnClear').css({
                visibility: 'hidden',
                opacity: 0
            })
        })

        // content 높이값 측정 후 scroll 생성
        const windowH = $(window).outerHeight();
        function heightScroll() {
            const windowH = $(window).outerHeight();
            $('.container').outerHeight(windowH - 80).css({
                'overflow': 'auto'
            });
            $('.wrap').parents('body').css({
                'overflow-y': 'hidden'
            });
            $('.container').scroll(function(){
                if($(this).scrollTop() > 0) {
                    $('.headerArea').removeClass('scrollOff').addClass('scrollOn');
                    $('.headerSearch').removeClass('on');
                    $('.linkMenu .search').removeClass('off');
                } else {
                    $('.headerArea').removeClass('scrollOn').addClass('scrollOff');
                }
            });
        }
        heightScroll();
        $(window).resize(function(){
            heightScroll();
        });
    },
    lnbWrap: function(){

        //login 버튼 클릭시
        $('.login').on('click',function(){
            $('.loginLayer').fadeToggle();
        });

        /*$('html').on('click',function(e){
            const clicked = $(e.target);
            if(!$(e.target).hasClass('loginLayer')){
                console.log('클릭시점');
            }
        });*/

        const activeIndex = $('.lnbWrap > ul > li.active').index();
        $('.subMenu__item').eq(activeIndex).addClass('on').siblings().removeClass('on');
        if($('.lnbWrap > ul > li').hasClass('active')) {
            $('.subMenu__item').eq(activeIndex).addClass('on').siblings().removeClass('on');
        } else {
            $('.subMenu__item').eq(0).addClass('on').siblings().removeClass('on');
        }
        //lnb icon 클릭시
        $('.lnbWrap > ul > li').on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.lnbWrap').removeClass('on');
            $('.content').removeClass('on');
            const indexNum = $(this).index();
            $('.subMenu__item').eq(indexNum).addClass('on').siblings().removeClass('on');
        });

        //lnb slide Toggle
        $('.subMenu__item > ul > li > a').on('click',function(){
            $(this).toggleClass('on');
            $(this).next('ul').stop().slideToggle();
        });

        // lnb 열고/닫힘 토글
        $('.menuArrow').on('click',function(){
            $(this).toggleClass('on');
            $('.lnbWrap,.content').toggleClass('on');
        });

        // lnb 하위리스트 존재여부
        $('.subMenu__item > ul > li > ul').closest('li').addClass('child');

    },
    select: function() {
        $('.selectWrap__box').on('click',function(){
            const select = $(this);
            select.parent().toggleClass('open');
            $(document).on('click',function(e){
                const clicked = $(e.target);
                if(!clicked.parent().hasClass('selectWrap')){
                    $('.selectWrap').removeClass('open');
                }
            });

            $('.selectWrap__dropdown a').on('click',function(){
                const text = $(this).html();
                $(this).parents('.selectWrap').find('.selectWrap__box').html(text);
                $('.selectWrap').removeClass('open');
            });

        });

        (function($){
            $(window).on("load",function(){
                $(".selectWrap__dropdown").mCustomScrollbar();
            });
        })(jQuery);
    },
    layerPopup : function(popid){
        const scrollTop = $(window).scrollTop();
        const mask = "<div class='mask'></div>";
        const popup = $("#"+popid);

        //$('html,body').css({"overflow":"hidden"});
        $('body').append(mask);
        const w = popup.outerWidth();
        const h=  popup.outerHeight();
        popup.addClass("on").fadeIn();
        popup.css({
            "margin-left": -(w/2),
            "margin-top" : -(h/2)
        });

        $(document).on("click", ".mask", function(){
            if($(this).parents("body").find(".layerPopup")){
                layerHide(popup);
            }
        });
        $(document).on("click", ".btnClose", function(){
            layerHide(popup);
        });
        function layerHide(popup) {
            popup.removeClass("on");
            $(".mask").remove();
            //$('html, body').removeAttr("style");
            popup.hide();
        }
        /*if( h < 760 || h > 560) {
            if((h+100) > $(window).height()) {
                const _h = ($(window).height()-100);
                popup.css({
                    "height" : _h,
                    "margin-top" : -(_h/2)
                });
                popup.find('.layerPopup__content').css({
                    "overflow": "auto",
                    "height" : _h
                });
                $(window).resize(function(){
                    const _h = ($(window).height());
                    popup.css({
                        "height" : _h,
                        "margin-top" : -(_h/2)
                    });
                    popup.find('.layerPopup__content').css({
                        "overflow": "auto",
                        "height" : _h
                    });
                });
            }
        }*/
        /*if(popup.hasClass('minLayer')) {
            console.log(popup.height());
            const popupHeight = popup.height();
            $('.post__content').css({
                height : popupHeight
            })

            popup.find('.layerPopup__content').css({
                "overflow": "auto",
                "height" : _h - 180
            });
            $(window).resize(function(){
                popup.css({
                    "height" : _h,
                    "margin-top" : -(_h/2)
                });
                popup.find('.layerPopup__content').css({
                    "overflow": "auto",
                    "height" : _h - 120
                });
            });
        }*/

    },
    toolTip: function() {
        $('.btnTooltip').on('click',function(){
            const targetTop = $(this).offset().top;
            const targetLeft = $(this).offset().left;
            //console.log(`targetTop : ${targetTop} , targetLeft : ${targetLeft}`);
            $('body').append(`
                <div class="tooltipArea">
                    <div class="text">검색할 대상 영역을 선택할 수 있습니다.</div>
                </div>
        `   );
            $('.tooltipArea').css({
                left: targetLeft + 30,
                top: targetTop - 12
            })
        });
        $(document).on('click',function(e){
            if(!$(e.target).hasClass('btnTooltip')) {
                $('.tooltipArea').hide();
            }
        })
        $('.container').scroll(function(){
            $('.tooltipArea').hide();
        });
    },

    acrodion : function(e){
        const acrodion = $(e).find(' > li');
        const title = acrodion.find('div:first-child');
        title.on('click',function(){
            const parent = $(this).parent();
            if(parent.hasClass('active') == false) {
                title.next().stop().slideUp();
                acrodion.removeClass('active');
            }
            if(parent.hasClass('active')) {
                if( false !==  acrodion) {
                    title.next().stop().slideUp();
                    acrodion.removeClass('active')
                }
            } else {
                $(this).next('div').stop().slideDown();
                parent.addClass('active');
            }
            return false;
        });
    },
    sideFiexd: function(){
        $('.sideFiexd__list01').on('click',function(){
            $('.layerNotice').addClass('active');
        });
        $('.sideFiexd .btnClose').on("click", function(){
            $('.layerNotice').removeClass('active');
        });
    },
    fixedTab: function() {
        $(window).scroll(function(){
            var scrollTop = $(document).scrollTop();
            var visualHeight = $('.subVisual').outerHeight();
            if (scrollTop > visualHeight) {
                $('.tabWrap--type01').addClass('fixedTab');
            } else {
                $('.tabWrap--type01').removeClass('fixedTab');
            }
        })
    },
    btnChoice : function() {
        // 예약선택 클릭시
        $(document).on('click',function(e){
            if(!$(e.target).hasClass('btnChoice')) {
                $('.selectListArea').fadeOut();
            }
        })

        $('.reserChoice button').on('click',function(){
            $('.selectListArea').fadeToggle();
        });
        $('.selectListArea li a').on('click',function(){
            $('.selectListArea').fadeOut();
            $('.reserChoice button').text($(this).text());
        });
    },
    stepCheck : function() {
        $('.stepWrap ol li.on').prevAll().addClass('stepChecked');
    }
}

$(function() {
    common.init();
    fileUpload();
    InputType("text");
    InputType("password");
});

// 파일찾기
function fileUpload() {
    const fileTarget = $('.fileBox .uploadHidden');

    fileTarget.on('change',function() {
        if(window.FileReader) {
            var fileName = $(this)[0].files[0].name;
        } else {
            var fileName = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('.uploadName').val(fileName);
    })
}


// Tab
function tabmenu(e,num){
    var num = num || 0;
    var menu = $(e).children();
    var con = $(e + '__con').children();
    var select = $(menu).eq(num);
    var i = num;

    con.hide();
    select.addClass('on').append("<span class='blind'>현재선택</span>");
    con.eq(num).show();

    menu.click(function(){
        if(select !==null) {
            $(".blind").remove();
            select.removeClass('on');
            con.eq(i).hide();
        }
        select = $(this);
        i = $(this).index();

        select.addClass('on').append("<span class='blind'>현재선택</span>");
        con.eq(i).show();
        return false;
    });
}

//Layer
$('.btn-example').click(function(){
    var $href = $(this).attr('href');
    layer_popup($href);
});
function layer_popup(el){

    var $el = $(el);		//레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');	//dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.dim-layer .dimBg').click(function(){
        $('.dim-layer').fadeOut();
        return false;
    });
}

//Input Type
function InputType(type) {

    $('.inputType input[type=type]').on('click',function(){
        $(this).vayle = '';
    });
    const inputType = $('.inputType input[type=type]');
    inputType.each(function(){
        $(this).on('keyup focus', function(){
            $(this).closest('.inputType').addClass('on');
            $(this).next('.btnClear').css({
                display: 'block'
            })
            if($(this).val().length == 0) {
                $(this).next('.btnClear').css({
                    display: 'none'
                });
            } else {
                $(this).next('.btnClear').css({
                    display: 'block'
                });
            }
        });
        $(this).on('blur', function(){
            setTimeout(() => {
                $(this).next('.btnClear').css({
                    display: 'none'
                })
                $(this).closest('.inputType').removeClass('on');
            },300);
        });

        $(this).next('.btnClear').on('click', function(){
            $(this).prev('input[type="text"]').val('');
            $(this).closest('.inputType').removeClass('on');
        });
    });
}