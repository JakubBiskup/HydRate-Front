function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/reviews/all",
        type : "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', getCookie("HydRateJWT"));
        },
        success : function(data) {
            var index;
            for (index=0;index<data.length; ++index) {
                var listElement=document.createElement("LI");

                var singleReviewLink=document.createElement("a");
                singleReviewLink.href="review.html?id="+data[index].id;

                var textOnListElement=document.createTextNode(data[index].score.toString() + "/100  "+ data[index].water.name);
                singleReviewLink.appendChild(textOnListElement);

                listElement.appendChild(singleReviewLink);

                document.getElementById("reviewList").appendChild(listElement);
        }},
        error: function (xhr,status,error) {
            var failureResponseText=xhr.responseText;
            var parsedFailureResponseText=JSON.parse(failureResponseText);
            var statusFromXhr=toEmptyStringIfUndefined(xhr.status);
            var httpStatus=toEmptyStringIfUndefined(parsedFailureResponseText.httpStatus);
            var message=toEmptyStringIfUndefined(parsedFailureResponseText.message);
            var errorFromResponse=toEmptyStringIfUndefined(parsedFailureResponseText.error);
            var statusFromResponse=toEmptyStringIfUndefined(parsedFailureResponseText.status);
            alert(statusFromXhr+"   "+""+"  "+errorFromResponse+"   "+message+"   "+statusFromResponse+"  "+httpStatus);
         }})});