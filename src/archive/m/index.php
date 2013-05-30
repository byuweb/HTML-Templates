<?php

 $pageName = "frontpage";
 include('_header.php');
 
?>
      <div class="flex-container">
  			<div id="slider" class="flexslider">
  			  
  			  <ul id="slides" class="slides">
  			  
  				  <?php include('inc/feature-mobile.php');
  				  
  				  /*
  				  if($w < 300) {
  				    include('inc/feature-mobile.php');
  				  } else {
    				  include('inc/feature.php');
    				}*/
    				
  				  ?>
  				
  				</ul>
  				
  				<a class="more" href="feature.php">More featured stories</a>
  			</div>
      </div>
			
		  <?php include ('inc/calendar.php'); ?>

		  <?php include('inc/news.php'); ?>


<?php include('_footer.php'); ?>