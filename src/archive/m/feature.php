<?php 
$pageName = 'features';
include('_header.php'); 

/* In inc/feature, there are some data attributes that can be added to the feature description tag
   to give a different background to the description text. They are:
   
   data-bg - A hexidecimal color for the background
   data-gradient - A value from -1 to 1, specifying the edge difference
   data-text - If this is set to "light", the text will be light (for a dark bg)
   
   For example:
   
   data-bg="#300f08" 
   data-gradient="-.25"
   data-text="light"
   
*/

?>

<div class="flex-container">
	<div id="slider" class="flexslider">
   <?php include('inc/feature.php'); ?>
	</div>
</div>

	<a class="more" href="index.php">Back to home page</a>
</div>
<?php include('_footer.php'); ?>

