


	var topics = ['Mean Girls','Pokemon', 'Batman', 'Rihanna', 'Dog', 'LOL'];
	var animatedGif;
	var staticGif;

	for (var i=0; i < topics.length; i++){	
		var gif_btn = $('<button>');
		gif_btn.attr("data-topic", topics[i]);
		gif_btn.text(topics[i]);
		$('#gifBtns').append(gif_btn);
	}

	$("button").on("click", function(){
		var topic = $(this).data("topic");
		console.log(topic);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {

        		var gifDiv = $("<div class='item'>");

        		var rating = results[i].rating;

        		var p = $("<p>").text(rating);

        		var topic_Image = $("<img>");

        		animatedGif = results[i].images.fixed_height.url;
        		

        		staticGif = results[i].images.fixed_height_still.url;
        		

        		topic_Image.addClass("gif");
        		topic_Image.attr("src", staticGif);
        		topic_Image.attr("data-state", "still");
        		topic_Image.attr("data-still", staticGif);
        		topic_Image.attr("data-animate", animatedGif);

        		gifDiv.prepend(p);
        		gifDiv.prepend(topic_Image);

        		$("#gifs_container").prepend(gifDiv);
        	}
		});
	});


	$(document).on("click", ".gif", function(){
        console.log("click");
		var state = $(this).attr("data-state");
        console.log(state);

		if (state === "still"){
			animatedGif = $(this).attr('data-animate');
			$(this).attr("src", animatedGif);
			$(this).attr("data-state", "animate");
		} else {
			staticGif = $(this).attr('data-still');
        	$(this).attr("src", staticGif);
        	$(this).attr("data-state", "still");
		}
	});