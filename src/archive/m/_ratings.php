<form id="rating" action="processForm.php" method="post">
		<table id="feedbackTable">
			<tbody>
				<tr>
					<td class="label" id="starlabel">
						<h4>We've been working hard to make BYU's site faster and more mobile-friendly. <br /><strong>We'd love to have your feedback:</strong></h4>
					</td>
				</tr>
				
				<tr id="comment"><td class="label" id="emaillabel"><label>Rating</label></td>
				<tr>
					<td class="input" id="starbox">
						<input id="star-1" name="star" type="radio" class="star" value="1" />
						<label for="star-1">Hate it!</label>
						
						<input id="star-2" name="star" type="radio" class="star" value="2" />
						<label for="star-2">Don’t like it</label>

						<input id="star-3" name="star" type="radio" class="star" value="3" />
						<label for="star-3">It’s okay</label>

						<input id="star-4" name="star" type="radio" class="star" value="4" />
						<label for="star-4">Like it</label>
						
						<input id="star-5" name="star" type="radio" class="star" value="5" />
						<label for="star-5">Love it!</label>
					</td>
				</tr>
				
				<tr id="comment">
				  <td class="label" id="commentlabel"><label for="commentfield">Comments</label></td>
				  </tr>
				<tr>
				  <td class="input" id="commentbox">
  				  <textarea id="commentfield" name="commentfield"></textarea>
				  </td>
				</tr>
				
				<tr id="email"><td class="label" id="emaillabel"><label for="emailfield">Email Address</label></td>
				
				</tr>
				<tr><td class="input" id="emailbox"><input id="emailfield" name="emailfield" type="text" /><p>Add your email if you’d like to keep up with future developments. <br />We promise not to send too much mail or give your address to anyone :)</p></td></tr>
				
				<tr id="submit"><td><a href="#" id="feedbacksubmit">Send my feedback</a></td></tr>
				
				
			</tbody>
		</table>
		
		<a href="#" id="closebox">Close</a>
	</form>
