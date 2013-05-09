<?php 

$w = null;

if (isset($_COOKIE["screenwidth"])) {
	$w = $_COOKIE["screenwidth"];
}

?><!doctype html>
<!--[if IE 8]> <html class="no-js oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js no-flexslider" lang="en"> <!--<![endif]-->
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<title>BYU - Brigham Young University</title>
	<meta name="description" content="The home page of Brigham Young University. Provo, Utah, USA" />
	<meta name="author" content="Brigham Young University" />
	<meta name="keywords" content="brigham young, university, byu, cougars" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	
	<link rel="stylesheet" href="css/mobile.css?v=2" />
	<link rel="stylesheet" media="all and (min-width:1px)" href="css/style.css?v=2" />
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600' rel='stylesheet' type='text/css'>
	
	<script src="js/init.min.js"></script>
</head>

<body<?php 
	if(isset($pageName)) { echo ' class="'.$pageName.'"'; }
	if($w !== null) { echo ' data-width="'.$w.'"'; }
?>>

	
	<header id="main-header">
		<div id="header-top" class="wrapper">
			<div id="logo">
				<h1><a href="index.php">BYU - Brigham Young University</a></h1>
			</div>
			
			<a id="myBYU" href="http://home.byu.edu/home/cas" class="mybyu">myBYU</a>
			
			<div id="search-container">
				<a href="search.php" class="search">Search</a>
			</div>               
		</div>
		
		<nav id="primary-nav-menu"><a href="menu.php">Menu</a></nav>
	</header>
	

	<div id="content" class="wrapper">
