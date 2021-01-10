function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', getCookie("HydRateJWT"));
            },
            data:JSON.stringify(objectFormData),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function (){
                window.location.href="water.html?id="+waterId;
            },
            error: function (xhr,status,error) {
                var failureResponseText=xhr.responseText;
                var parsedFailureResponseText=JSON.parse(failureResponseText);
                var statusFromXhr=toEmptyStringIfUndefined(xhr.status);
                var httpStatus=toEmptyStringIfUndefined(parsedFailureResponseText.httpStatus);
                var message=toEmptyStringIfUndefined(parsedFailureResponseText.message);
                var errorFromResponse=toEmptyStringIfUndefined(parsedFailureResponseText.error);
                var statusFromResponse=toEmptyStringIfUndefined(parsedFailureResponseText.status);
                alert(statusFromXhr+"   "+""+"  "+errorFromResponse+"   "+message+"   "+statusFromResponse+"  "+httpStatus);
             }
        })

    }
})
