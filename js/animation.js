$(window).on('load resize', function() {
    var windowWidth = window.innerWidth;
    var elements = $('#fixed-area');
    if (windowWidth >= 768) {
    Stickyfill.add(elements);
    }else{
    Stickyfill.remove(elements);
    } 
    });



/* slider */
    let sections = document.querySelectorAll(".vertical-area");
    let scrollContainer = document.querySelector(".vertical-slider__wrap");
    let images = gsap.utils.toArray(".js-img");
    let heading = gsap.utils.toArray(".heading-wrap h2");
    
    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none"
    });
    
    let horizontalScroll = ScrollTrigger.create({
        animation: scrollTween,
        trigger: scrollContainer,
        pin: true,
        scrub: 1,
        // markers:true,
        end: () => "+=" + scrollContainer.offsetWidth,
    });
    
    function txtSplit(el){//https://sinciate.co.jp/media/2999/
        var content = el.textContent;
        var text = content.trim();
        var newHtml = "";
    
        text.split("").forEach(function(v) {
            newHtml += "" + v + "";
        });
        el.innerHTML = newHtml;
    }
    images.forEach((img, i) => {
        gsap.to(img,{
            scrollTrigger:{
                trigger: img,
                start:'top center',
                end:'bottom center',
                horizontal:true,
                // markers:true,
                scrub:.2,
                containerAnimation:scrollTween,
            },
            x:-150,ease:"none"
        });
    });
    heading.forEach((h, i) => {
        txtSplit(h);
        if(i === 0){
            gsap.from(h.querySelectorAll('span'),{
                scrollTrigger:{
                    trigger: h,
                    start:'top 10%',
                    // markers:true,
                    horizontal:true,
                    containerAnimation:scrollTween,
                    toggleActions:'play none none reverse'
                },
                stagger:{
                    each:0.02,
                },
                y:'30%',autoAlpha:0,ease:Power4.easeIn,duration:.4,
            });
        }else{
            gsap.from(h.querySelectorAll('span'),{
                scrollTrigger:{
                    trigger: h,
                    start:'10% center',
                    // markers:true,
                    horizontal:true,
                    containerAnimation:scrollTween,
                    toggleActions:'play none none reverse'
                },
                stagger:{
                    each:0.02,
                },
                y:'50%',autoAlpha:0,ease:Power4.easeIn,duration:.4,
            });
        }
    });
    
    // total scroll amount divided by the total distance that the sections move gives us the ratio we can apply to the pointer movement so that it fits. 
    var dragRatio = scrollContainer.offsetWidth / (window.innerWidth * (sections.length - 1));
    var drag = Draggable.create(".proxy", {
      trigger: scrollContainer,
      type: "x",
      onPress() {
        this.startScroll = horizontalScroll.scroll();
      },
      onDrag() {
        horizontalScroll.scroll(this.startScroll - (this.x - this.startX) * dragRatio);
      }
    })[0];

    // 動きのきっかけとなるアニメーションの名前を定義
    function fadeAnime(){
    
      // ふわっ
      $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top-20;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
        }else{
        $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
        }
        });
    }
    
    // 画面をスクロールをしたら動かしたい場合の記述
      $(window).scroll(function (){
        fadeAnime();/* アニメーション用の関数を呼ぶ*/
      });// ここまで画面をスクロールをしたら動かしたい場合の記述
    
    // 画面が読み込まれたらすぐに動かしたい場合の記述
      $(window).on('load', function(){
        fadeAnime();/* アニメーション用の関数を呼ぶ*/
      });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述
    