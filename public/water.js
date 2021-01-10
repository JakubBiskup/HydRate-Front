function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


let waterId=getParameterByName("id")

$(document).ready(function() {
    document.getElementById('delete-button').onclick=function(e){
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/water/"+waterId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', getCookie("HydRateJWT"));
            },
            success: function (){
                alert("Water of id: " +waterId+" is deleted");
                window.location.href="all-water.html";
                
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
        })
    }
    $.ajax({
        url: "http://localhost:8080/water/"+waterId,
        type : "GET",
        success : function(data) {
            $('.title').append(data.name + " - HydRate");
            $('.water-name').append(data.name);
            $('.company').append(data.company);
            $('.source').append(data.source);
            $('.minerals').append(data.minerals);
            $('.water-description').append(data.description);

            var seeReviewsLink=document.createElement("a");
            seeReviewsLink.href="reviews-of-single-water.html?id="+waterId;
            seeReviewsLink.text="See reviews";
            document.getElementById("see-reviews-of-this-water-button").appendChild(seeReviewsLink);

            var addReviewLink=document.createElement("a");
            addReviewLink.href="add-review-form.html?water-id="+waterId+"&name="+data.name;
            addReviewLink.text="Add review";
            document.getElementById("add-review-of-this-water-button").appendChild(addReviewLink);

            var editLink=document.createElement("a");
            editLink.href="edit-water-form.html?id="+waterId;
            editLink.text="Edit water";
            document.getElementById("edit-this-water-button").appendChild(editLink);



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
         }})});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/"+waterId+"/average_score",
        type : "GET",
        success : function(data) {
            $('.avg-score').append(data);


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
         }})});