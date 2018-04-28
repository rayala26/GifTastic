// create an array of shows
var topics = ["Saved by the Bell", "Fresh Prince", "Martin", "Full House", "All That", "In Living Color", "Seinfeld", "Home Improvement", "Married with Children", "Family Matters"];

// creates buttons for each of these
function makeButtons(){ 
    // deletes the shows prior to adding new shows so there are no repeat buttons
    $('#buttons').empty();
    // loops through the shows array
    for (var i = 0; i < topics.length; i++){
        // dynamically makes buttons for every show in the array
        var a = $('<button>') 
        a.addClass('topic'); // add a class
        a.attr('data-name', topics[i]); // add a data-attribute
        a.text(topics[i]); // make button text
        $('#buttons').append(a); // append the button to buttonsView div
    }
};

// function for animating gifs
$(document).ready(function(){
    $('#gifsView').delegate('click', 'img.gif', function(){
        var state = $(this).data('state');
        console.log(state);
        if (state == 'still'){
            state = 'animate';
                $(this).data('state', state);
                $(this).attr('src', $(this).data('animate'));
            }
            else{
                state = 'still';
                $(this).data('state', state);
                $(this).attr('src', $(this).data('still'));
            }
    });


// handles addButton button event
$("#addButton").on("click", function(event){
    event.preventDefault();
    // grabs the user show input
    var newButton = $("#topic-input").val().trim();
    // that input is now added to the array
    topics.push(newButton);
    // the makeButtons function is called, which makes buttons for all my shows plus the user show
    makeButtons(); 
});    

makeButtons();
// function to display gifs
$("#buttons").delegate("button.topic", "click", function(){
    var show = $(this).attr("data-name");
    console.log(show);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=i3Sex5B3VqtdOhA23HOAU5qz5wDrv7vR";

        // creates ajax call
        $.ajax({url: queryURL, method: "GET"}).then(function(response) {
            // save results as a variable
            var results = response.data;
            // for loop goes through each gif and adds these variables
            for (var i = 0; i < 10; i++) {
                // creates a generic div to hold the results
                var gifDiv = $('<div class="item">'),
                    rating = results[i].rating,
                    p = $('<p>').text("Rating: " + rating);

                var showGif = $('<img>');
                showGif.attr("src", results[i].images.fixed_height_still.url)
                         .data('still', results[i].images.fixed_height_still.url)
                         .data('animate', results[i].images.fixed_height.url)
                         .data('state', 'still')
                         .addClass('gif');
                    
                gifDiv.prepend(p).prepend(showGif);
                // gifDiv.append(p)

                $("#gifsView").prepend(gifDiv);
            }
            
        });
    });
});
