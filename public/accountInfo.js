$(document).ready(function(){
    var loggedInUserInfo=document.createElement("div");
    loggedInUserInfo.style.cssText = 'background:lightblue';
    var paragraph=document.createElement("p");
    var textInP=document.createTextNode("You are authenticated as: " + recognize());
    var textInPLine2=document.createTextNode('Your role: '+ recognizeRole());
    paragraph.appendChild(textInP);
    var br=document.createElement("br");
    paragraph.appendChild(br);
    paragraph.appendChild(textInPLine2);
    loggedInUserInfo.appendChild(paragraph);
    var logButton=document.createElement("button");
    if(isCookieThere()){
        var logoutLink=document.createElement("a");
        var textInLink=document.createTextNode("Logout");
        logoutLink.href="logout.html";
        logoutLink.appendChild(textInLink);
        logButton.appendChild(logoutLink);
        loggedInUserInfo.appendChild(logButton);
    }else{
        var loginLink=document.createElement("a");
        var textInLink=document.createTextNode("Log in");
        loginLink.href="login.html";
        loginLink.appendChild(textInLink);
        logButton.appendChild(loginLink);
        loggedInUserInfo.appendChild(logButton);
    }

    document.body.appendChild(loggedInUserInfo);
})