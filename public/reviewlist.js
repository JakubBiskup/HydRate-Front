$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/reviews/all",
        type : "GET",
        success : function(data) {
            var index;
            for (index=0;index<data.length; ++index) {
                var listElement=document.createElement("LI");

                var singleReviewLink=document.createElement("a");
                singleReviewLink.href="review.html?id="+data[index].id; //probably wrong href

                var textOnListElement=document.createTextNode(data[index].score.toString() + "/100  "+ data[index].water.name);
                singleReviewLink.appendChild(textOnListElement);

                listElement.appendChild(singleReviewLink)

                document.getElementById("reviewList").appendChild(listElement);
        }}})});