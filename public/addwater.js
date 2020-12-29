$(document).ready(function() {

const newWaterForm=document.getElementById("new-water-form");

newWaterForm.onsubmit=function(e){
    e.preventDefault();
    var formData=new FormData(newWaterForm);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/water",
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