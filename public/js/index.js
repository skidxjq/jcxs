/**
 * Created by skidxjq on 15/12/7.
 */
var by = function(name){
    return function(o, p){
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
}
$(document).ready(function() {
    $(window).scroll(function() {
//            console.log($(this).scrollTop());

        if (($(".header.fixed").length > 0)) {
            if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                $("body").addClass("fixed-header-on");
            } else {
                $("body").removeClass("fixed-header-on");
            }
        }
    });

    $(window).load(function() {
        if (($(".header.fixed").length > 0)) {
            console.log("header fixed length >0 on load");
            if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                $("body").addClass("fixed-header-on");
            } else {
                $("body").removeClass("fixed-header-on");
            }
        };
    });


    $('#fullpage').fullpage({
        anchors: ['introduce', 'brief','undergraduate', 'graduate'],
        continuousVertical: false,
//            menu:"#menu"
        menu: '#menu',

        slidesNavigation: true,
        scrollBar:true,
        normalScrollElements:'.candidate-content',
        afterLoad: function(anchorLink, index){
//                    loadImages();

            if($('#section1').attr("data-loaded") == '0' ){
                loadImages(0,18,$('#section1'),0);
            }

            if($('#section2').attr("data-loaded") == '0' ){
                loadImages(0,22,$('#section2'),1);
            }

        },

        onLeave:function(index,nextIndex,direction){
//
//                    if($('#section1').attr("data-loaded") == '0' && nextIndex === 2){
//                        loadImages();
//                    }
        }


    });

    function loadImages(start,num,obj,type){
        var level;
        type === 0? level = "undergraduate" : level = "graduate";
        $.ajax({
            url:"./config/"+level+"/list.json",
            type:"GET",
            success: function(resp){
//                        console.log(resp);
//                        console.log(resp.sort(by("order")));
//                        resp = resp.sort(by("order"));
                var lists=obj.find('.candidate').slice(start, num);
                lists.each(function(index, item){
                    var that = $(this);
                    that.find(".img-candidate").attr("src",resp[index+start].path);
                    that.find(".name-candidate").html(resp[index+start].name);
                    that.find(".school-candidate").html(resp[index+start].school).toggleClass("candidate-"+ resp[index+start].gender);
                    that.find(".overlay").toggleClass("overlay-"+resp[index+start].gender).attr("href", "details.html#"+level+"#"+resp[index+start].id);
                    that.find(".href-candidate").attr("href","details.html#" + resp[index+start].id);

                });

            }
        });

        obj.attr("data-loaded",1)

    }



});