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
    document.getElementById('delete-button').onclick=function(e){
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/water/"+waterId,
            success: function (){
                alert("Water of id: " +waterId+" is deleted");
                window.location.href="all-water.html";
                
            },
            error: function (errMsg) {
                alert(errMsg);
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



        }})});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/water/"+waterId+"/average_score",
        type : "GET",
        success : function(data) {
            $('.avg-score').append(data);


        }})});