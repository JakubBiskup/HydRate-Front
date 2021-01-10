$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/all",
        type : "GET",
        success : function(data) {
            var index;
            for (index=0;index<data.length; ++index) {
                var listElement=document.createElement("LI");

                var singleWaterLink=document.createElement("a");
                singleWaterLink.href="water.html?id="+data[index].id;

                var textOnListElement=document.createTextNode(data[index].name);

                singleWaterLink.appendChild(textOnListElement);
                listElement.appendChild(singleWaterLink);

                document.getElementById("water-list").appendChild(listElement);


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