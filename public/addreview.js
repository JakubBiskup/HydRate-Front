function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let waterId=getParameterByName("water-id");
let waterName=getParameterByName("name");
$(document).ready(function (){
    $('.title').append(waterName);
    $('.add-review-header').append(waterName);
    const newReviewForm=document.getElementById("add-review-form");
    var dummyWaterWithCorrectId={id:waterId,name:"wrong name",company:"blank",source:"idk",description:"all these fields must be filled(?) but only the id matters!",minerals:324};
    newReviewForm.onsubmit=function (e){
        e.preventDefault();
        var formData=new FormData(newReviewForm);
        var objectFormData=Object.fromEntries(formData);
        objectFormData['water']= dummyWaterWithCorrectId;
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/reviews",
            data:JSON.stringify(objectFormData),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function (){
                window.location.href="water.html?id="+waterId;
            },
            error: function (errMsg) {
                alert(errMsg);
            }
        })

    }
})
