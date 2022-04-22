(function ($) {
    "use strict";



    /*---------------------------
       Commons Variables
    ------------------------------ */
    var $window = $(window),
        $body = $("body");

    /*----------------------------------------
            Background Image             
    -------------------------------------------*/

    $('[data-bg-image]').each(function () {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });

    /*---------------------------
       Menu Fixed On Scroll Active
    ------------------------------ */
    $(window).on("scroll", function (e) {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 250) {
            $(".sticky-nav").addClass("menu_fixed animated fadeInDown");
        } else {
            $(".sticky-nav").removeClass("menu_fixed animated fadeInDown");
        }
    });



    /*-------------------------------
        Create an toggle
    ---------------------------------*/

    $('.color a').on('click', function () {
        $('.sidebar-widget-list a').removeClass('active');
        $(this).addClass('active');
    });

    $('.size a').on('click', function () {
        $('.sidebar-widget-list a').removeClass('active-2');
        $(this).addClass('active-2');
    });


    /*-------------------------------
        Create an toggle
    ---------------------------------*/

    $('.pro-details-color a').on('click', function () {
        $('.pro-details-color a').removeClass('active-color');
        $(this).addClass('active-color');
    });

    $('.pro-details-size a').on('click', function () {
        $('.pro-details-size a').removeClass('active-size');
        $(this).addClass('active-size');
    });




    /*----------------------------
        Cart Plus Minus Button
    ------------------------------ */
    var CartPlusMinus = $(".cart-plus-minus");
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });


    /*-------------------------------
        Create an account toggle
    ---------------------------------*/
    $(".checkout-toggle2").on("click", function () {
        $(".open-toggle2").slideToggle(1000);
    });

    $(".checkout-toggle").on("click", function () {
        $(".open-toggle").slideToggle(1000);
    });


    /*---------------------
        Scroll Up
    --------------------- */
    $.scrollUp({
        scrollText: '<i class="pe-7s-angle-up"></i>',
        easingType: "linear",
        scrollSpeed: 900,
        animation: "fade",
    });
    /*---------------------
        Countdown
    --------------------- */
    $("[data-countdown]").each(function () {
        var $this = $(this),
            finalDate = $(this).data("countdown");
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<span class="cdown day"><span class="cdown-1">%-D</span><p>Days</p></span> <span class="cdown hour"><span class="cdown-1">%-H</span><p>Hours</p></span> <span class="cdown minutes"><span class="cdown-1">%M</span> <p>Mins</p></span> <span class="cdown second"><span class="cdown-1"> %S</span> <p>Sec</p></span>'));
        });
    });

    /*---------------------------
          Nice Select 
       ------------------------------ */

    $('.shop-sort').niceSelect();

    /*-------------------------------
      Product Gallery - Image Zoom
     --------------------------------*/

    $('.zoom-image-hover').zoom();


    /*---------------------
        venobox
    --------------------- */
    $('.venobox').venobox();


})(jQuery);

// document.addEventListener("DOMContentLoaded", function () {


//     /////// Prevent closing from click inside dropdown
//     document.querySelectorAll('.dropdown-menu').forEach(function (element) {
//         element.addEventListener('click', function (e) {
//             e.stopPropagation();
//         });
//     })



//     // make it as accordion for smaller screens
//     if (window.innerWidth < 992) {

//         // close all inner dropdowns when parent is closed
//         document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
//             everydropdown.addEventListener('hidden.bs.dropdown', function () {
//                 // after dropdown is hidden, then find all submenus
//                 this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
//                     // hide every submenu as well
//                     everysubmenu.style.display = 'none';
//                 });
//             })
//         });

//         document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
//             element.addEventListener('click', function (e) {

//                 let nextEl = this.nextElementSibling;
//                 if (nextEl && nextEl.classList.contains('submenu')) {
//                     // prevent opening link if link needs to open dropdown
//                     e.preventDefault();
//                     console.log(nextEl);
//                     if (nextEl.style.display == 'block') {
//                         nextEl.style.display = 'none';
//                     } else {
//                         nextEl.style.display = 'block';
//                     }

//                 }
//             });
//         })
//     }
//     // end if innerWidth
// }); 





window.addEventListener("load", function(){
    truncateCardText();
});

function truncateCardText(){
    var cardList = document.getElementsByClassName("card-title");
    for(var i = 0; i < cardList.length; i++){
        var text = cardList[i].innerHTML;
        var newText = truncateString(text, 20);
        cardList[i].innerHTML = newText;
    }
}

function truncateString(str, num){
    if (str.length > num){
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}