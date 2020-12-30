function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let waterName=getParameterByName("name");
let reviewId=getParameterByName("review-id");
let water='empty';

$(document).ready(function (){
    $('.title').append(reviewId);
    $('.edit-review-header').append(waterName);

    $.ajax({
        url: "http://localhost:8080/reviews/"+reviewId,
        type : "GET",
        success : function(data) {
            document.getElementById('score').value=data.score;
            document.getElementById('text').value=data.text;
            water=data.water;

        }})});
$(document).ready(function (){
    const editReviewForm=document.getElementById("edit-review-form");
    editReviewForm.onsubmit=function (e){
        e.preventDefault();
        var formData=new FormData(editReviewForm);
        var objectFormData=Object.fromEntries(formData);
        objectFormData['water']= water;
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/reviews/"+reviewId,
            data:JSON.stringify(objectFormData),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function (){
                window.location.href="review.html?id="+reviewId;
            },
            error: function (errMsg) {
                alert(errMsg);
            }
        })

    }

})






