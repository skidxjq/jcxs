$(function(){
    console.log(window.location.hash);
    var hash = window.location.hash;
    var paraArr = hash.split("#");
    function loadDetails(paraArr){
        $.ajax({
            url:'./config/'+paraArr[1]+'/'+paraArr[2]+'.json',
//                async:false,
            type:'GET',
            success:function(resp){
                console.log(resp);
                $("#candidate-school").html(resp.school);
                $("#candidate-name").html(resp.name);
                $("#candidate-avater").attr("src",resp.path);
//                    console.log($("#candidate-avater")[0]);
                $("#candidate-words").html(resp.words);
                $("#candidate-details").slideDown();

                $.ajax({
                    url:'./config/'+paraArr[1]+'/'+paraArr[2]+'.txt',
                    type:'GET',
                    success:function(resp){
                        $("#candidate-content").html(resp);
                        $("#candidate-details").toggleClass("hidden");

                    }
                })
            }

        });



    }
    loadDetails(paraArr)
})();