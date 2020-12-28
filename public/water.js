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



        }})});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/"+waterId+"/average_score",
        type : "GET",
        success : function(data) {
            $('.avg-score').append(data);


        }})});