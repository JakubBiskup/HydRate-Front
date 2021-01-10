$(document).ready(function (){
    const logoutForm=document.getElementById("logout-form");
    logoutForm.onsubmit=function (e){
        e.preventDefault();
        document.cookie = "HydRateJWT=; expires=Thu, 01 Jan 1970 00:00:02 UTC; path=/C:/Users/User/Desktop/Spring/HydRate/hydrate%20front/public";
        window.location.href="index.html";
    }})