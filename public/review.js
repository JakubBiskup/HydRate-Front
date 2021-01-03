function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let reviewId=getParameterByName("id")

$(document).ready(function() {
    document.getElementById('delete-button').onclick=function(e){
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:8080/reviews/"+reviewId,
                    success: function (){
                        alert("Review of id: " +reviewId+" is deleted");
                        window.location.href="all-reviews.html";
                        
                    },
                    error: function (errMsg) {
                        alert(errMsg);
                    }
                })
            }
        $.ajax({
            url: "http://localhost:8080/reviews/"+reviewId,
            type : "GET",
            success : function(data) {
                $('.review-header').append("Review of:  " + data.water.name);
                $('.score').append(data.score+"/100");
                $('.review-text').append(data.text);
                var a= document.getElementsByClassName("waterLink");
                a.href="/water?id="+data.water.id;

                var seeWaterLink=document.createElement("a");
                seeWaterLink.href="water.html?id="+data.water.id;

                var seeWaterText=document.createTextNode("See Water");
                seeWaterLink.appendChild(seeWaterText);

                $('.see-water-link').append(seeWaterLink);
                $('.title').append(data.id);
                document.getElementById('edit-link').href="edit-review-form.html?review-id="+reviewId+"&name="+data.water.name;
                
            }})});
    
