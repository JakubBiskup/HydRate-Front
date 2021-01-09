function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function isCookieThere(){
    try {
        var HydrateJWTCookie=getCookie("HydRateJWT");
        if(HydrateJWTCookie==null||HydrateJWTCookie==undefined){
            throw error;
        }else {
            return true;
        }
    } catch (error) {
        return false;
    }
}


function recognize(){
    try {
    var payload=JSON.parse(atob(getCookie("HydRateJWT").split('.')[1]));
    var username=payload.sub;
    return username;
    } catch (error) {
        var notAuthenticatedString=" Actually you are NOT authenticated!";
        return notAuthenticatedString;
    }
}


function recognizeRole(){
    try {
        var payload=JSON.parse(atob(getCookie("HydRateJWT").split('.')[1]));
        var role=payload.role;
        var topRole=null;
        var arrayLength = role.length;
        for (var i = 0; i < arrayLength; i++) {
            var authority=role[i].authority;
            if(authority=="ROLE_ADMIN"){
                topRole="Admin";
                break;
            }
            if(authority=="ROLE_REVIEWER"){
                if(topRole!="Admin"){
                    topRole="Reviewer";
                }
            }
        }
        return topRole;
    } catch (error) {
        var noRoleMsg="None";
        return noRoleMsg;
        }
}