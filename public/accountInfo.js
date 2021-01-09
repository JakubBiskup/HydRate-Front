$(document).ready(function(){
    var loggedInUserInfo=document.createElement("div");
    loggedInUserInfo.style.cssText = 'background:teal';
    var paragraph=document.createElement("p");
    var textInP=document.createTextNode("You are authenticated as: " + recognize()+",your role: "+ recognizeRole());
    paragraph.appendChild(textInP);
    loggedInUserInfo.appendChild(paragraph);
    if(isCookieThere()){
        var logoutLink=document.createElement("a");
        var textInLink=document.createTextNode("Logout");
        logoutLink.href="logout.html";
        logoutLink.appendChild(textInLink);
        loggedInUserInfo.appendChild(logoutLink);
    }else{
        var loginLink=document.createElement("a");
        var textInLink=document.createTextNode("Log in");
        loginLink.href="login.html";
        loginLink.appendChild(textInLink);
        loggedInUserInfo.appendChild(loginLink);
    }

    document.body.appendChild(loggedInUserInfo);
})