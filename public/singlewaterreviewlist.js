function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let waterId=getParameterByName("id")

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/reviews/water/"+waterId,
        type : "GET",
        success : function(data) {
            var index;
            for (index=0;index<data.length; ++index) {
                var listElement = document.createElement("LI");

                var singleReviewLink = document.createElement("a");
                singleReviewLink.href = "review.html?id=" + data[index].id;

                var scoreOnListElement = document.createTextNode(data[index].score.toString() + "/100");
                singleReviewLink.appendChild(scoreOnListElement);

                var brElement=document.createElement("br");

                var reviewTextOnListElement=document.createTextNode(data[index].text);

                listElement.appendChild(singleReviewLink);
                listElement.appendChild(brElement);
                listElement.appendChild(reviewTextOnListElement);

                document.getElementById("reviewList").appendChild(listElement);

            }}})});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/"+waterId,
        type : "GET",
        success : function(data) {

            $('.title').append(data.name);
            $('.water-reviews-header').append(data.name+":");


        }})});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/"+waterId+"/average_score",
        type : "GET",
        success : function(data) {
            $('.avg-score').append(data);


        }})});