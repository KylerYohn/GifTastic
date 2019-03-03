

//create an inital array of actors of which the user can click on
var actors = ["Owen Wilson", "Drew Barrymore", "Jake Gyllanhaal", "Ryan Gosling", "Dylan o'Brien", "Meryl Streep", "Reese Witherspoon", "Charlize Theron",
              "Bill Murray", "Heath Ledger", "Christian Bale", "Tom Hardy", "Scarlett Johansson", "Samuel L. Jackson", "Halle Berry", "Angela Bassett", "Leonardo DiCaprio" ];

var clicked = false;


    function renderButtons() {

        //delete the actors prior to adding new actors to prevent repeat buttons
        $("#buttons").empty();

        //loop through the entier array of actors
        for (var i = 0; i < actors.length; i++) {
            //create a button for each item in the array
            var b = $("<button>");
            //add a the class to each button made
            b.addClass("actor-button");
            //add a data attribute to each button
            b.attr("data-name", actors[i]);
            //add text to the button
            b.text(actors[i]);
            //add the button to the actors div
            $("#buttons").append(b);
        }
    }

    function displayActor(){
        
        //hold what actor or thing wishes to be searched
        var q = $(this).attr("data-name");
        var querryURL = "https://api.giphy.com/v1/gifs/search?api_key=bRT1rso3yPlCBdqO2om3YnFPhdlqzTVO&q=" + q + "&limit=10&offset=0&lang=en";

        $.ajax({
        url: querryURL,
        method: "GET"
        }).then(function(response){
            //hold the response in a variable
            var results = response.data;
            
            
            //create a div to hold the gif
            
            $("#gif-view").empty();

                for (var h = 0; h < results.length; h++ ){
            
                var gif = $("<div>");

                gif.addClass("gifs");

                //store the results rating
                var rating = results[h].rating;

                //create a paragraph tag to display the rating
                var p = $("<p>").text("Rating: " + rating);

                var actorImage = $("<img>");

                
                
                actorImage.attr("src", results[h].images.fixed_height_still.url);
                actorImage.attr("data-still", results[h].images.fixed_height_still.url);
                actorImage.attr("data-animate", results[h].images.fixed_height.url);
                actorImage.attr("data-state", "still");

                //apeand the rating of the gif and the gif to the div on html
                gif.append(p);
                gif.append(actorImage);

                $("#gif-view").prepend(gif);
           
                
            
            
                $(actorImage).on("click", function(){
                    var state = $(this).attr("data-state");
                    
                   
                    if (state === "still"){
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", $(this).attr("data-animate"));
                       
                    
                    } else {
                        $(this).attr("data-state", "still");
                        $(this).attr("src", $(this).attr("data-still"))
                        
                    }
                    
                            
                            
                });
            }
        })



    }

    $("#add-actor").on("click", function(event) {
        event.preventDefault();

        //this line will grab the input from the textbox
        var actor = $("#actor-input").val();
        $("#actor-input").val("");

        //add the movie from the textbox
        actors.push(actor);

        //call the function which will process the newly updated array
        renderButtons();
    })


    //add a click listener 
    $(document).on("click", ".actor-button", displayActor);





    
    

    // call the function to process the array and display the buttons 
    renderButtons();