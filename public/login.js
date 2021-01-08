$(document).ready(function (){
    const loginForm=document.getElementById("login-form");
    loginForm.onsubmit=function (e){
        e.preventDefault();
        var formData=new FormData(loginForm)
        $.ajax({
            type:"POST",
            url:"http://localhost:8080/authenticate",
            data: JSON.stringify(Object.fromEntries(formData)),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function (data) {
                document.cookie="HydRateJWT=Bearer "+data+";SameSite=Lax";
                alert(data);
            },
            error: function(errMsg){
                alert(errMsg);
            }
        })
    }})