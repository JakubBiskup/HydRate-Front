function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let waterId=getParameterByName("id")
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/"+waterId,
        type : "GET",
        success : function(data) {
            $('.title').append(data.name + " - HydRate");

            document.getElementById("name").value=data.name;
            document.getElementById('company').value=data.company;
            document.getElementById('source').value=data.source;
            document.getElementById('minerals').value=data.minerals;
            document.getElementById('description').value=data.description;

        }})});

$(document).ready(function() {

    const editWaterForm=document.getElementById("edit-water-form");

    editWaterForm.onsubmit=function(e){
        e.preventDefault();
        var formData=new FormData(editWaterForm);
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/water/"+waterId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', getCookie("HydRateJWT"));
            },
            data: JSON.stringify(Object.fromEntries(formData)),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function (data) {
                window.location.href="water.html?id="+data.id;
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
        })}});