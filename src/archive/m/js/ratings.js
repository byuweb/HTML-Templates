/* Ratings.js */

$(function(){

	var dbRow = 0,
		rating = false,
		comments = false;
		
		$('#rating').delay(2000).fadeIn(1000);

	// Show ratings
	$('div.star-rating').each(function(){
		var id = $(this).attr('id'),
			label = $('td label[for="' + id + '"]').html();
		$(this).append('<div class="label">' + label + '</div>');
	});
	
	// Process star ratings 
	$('div.star-rating a').click(function(e){
		e.preventDefault();
	
		var star = $(this).attr('title'),
			width = $(window).width(),
			height = $(window).height(),
			text = 'Tell us more...';
		
		// Submit Ratings
		$.ajax({
			type: "POST",
			data: "stars=" + star + "&uid=" + dbRow + "&width=" + width + "&height=" + height,
			url: 'processForm.php',
			success: function(data) {
				if(dbRow == 0) {
					dbRow = data;
					log('Load was performed. UID = ' + data);
				} else {
					log('Rating updated. UID = ' + dbRow);
				}
			}
		});
		
		// Add the comment fields if they're not showing yet
		switch(star){
			case '1':
				text = "Yikes! Tell us what’s so terrible...";
				break;
			case '2':
				text = "Got it. Tell us what needs to change...";
				break;
			case '3':
				text = "No problem. Tell us how we can improve it...";
				break;
			case '4':
				text = "Great! Tell us what you like or don’t like...";
				break;
			case '5':
				text = "Thanks! Tell us what you like so much...";
				break;
		}
		
		if(!rating) {
			rating = true;
			$('form#rating table tbody').append('<tr id="comment"><td class="label" id="commentlabel"><a href="#">' + text + '</a></td><td class="input" id="commentbox"></td></tr>');
			$('#commentlabel a').hide().slideDown(150);
			
		} else if (!comments) {
			$('#commentlabel a').html(text);
		}
	});
	
	
	
	// Add the comment box when people ask for it
	$('#rating').delegate('#commentlabel a', 'click', function(e){
		e.preventDefault();
	
		var initHeight = $('#rating').height();	
	
		$('#commentlabel').html('<label for="commentfield">Comments</label');
		$('#commentbox').html('<textarea id="commentfield" name="commentfield"></textarea>');
		$('form#rating table tbody').append('<tr id="email"><td class="label" id="emaillabel"><label for="emailfield">Email Address</label></td><td class="input" id="emailbox"><input id="emailfield" name="emailfield" type="text" /></td></tr>');
		$('#emailbox').append('<p>Add your email if you’d like to keep up with future developments. <br />We promise not to send too much mail or give your address to anyone :)</p>');
		$('form#rating table tbody').append('<tr id="submit"><td>&nbsp;</td><td><a href="#" id="feedbacksubmit">Send my feedback</a></td></tr>');
	});
	
	
	
	// Submit info when the submit button is clicked
	$('#rating').delegate('#feedbacksubmit', 'click', function(e){
		e.preventDefault();
				
		var comments = $('#commentfield').val(),
			email = $('#emailfield').val(),
			stars = $('.star-rating-on:last a').attr('title');
		
		$.ajax({
			type: "POST",
			data: "uid=" + dbRow + "&comments=" + comments + "&email=" + email + "&stars=" + stars,
			url: 'processForm.php',
			success: function(data) {
				log('Comments updated. UID = ' + dbRow);
				log('Feedback: ' + data);
			}
		});
		
		$('#rating').slideUp(250, function(){
			$(this)
				.find('table')
				.html('<tr><td class="label" id="thankslabel">Thanks for the comments!</td><td class="input" id="thanksbox">Feel free to come back often and leave more feedback or check our progreess! <a href="http://web.byu.edu/wiki/whats_happening_redesign" class="moreinfolink">Learn about the BYU Community website project</a><a href="http://beta.byu.edu/stats" class="moreinfolink">View live stats for this test</a></td></tr>')
				.end().slideDown(250);
		});
	});
	
	
	
	// Close the comment box if you want to
	$('#closebox').click(function(e){
		e.preventDefault();
		$('#rating').fadeOut(300);
	});
	
	

});