function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


$(document).ready(function() {

const newWaterForm=document.getElementById("new-water-form");

newWaterForm.onsubmit=function(e){
    e.preventDefault();
    var formData=new FormData(newWaterForm);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/water",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', getCookie("HydRateJWT"));
        },
        data: JSON.stringify(Object.fromEntries(formData)),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function (data) {
            window.location.href="water.html?id="+data.id;
        },
        error: function (errMsg) {
            alert(errMsg);
        }
    })}});