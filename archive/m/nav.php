<?php

$q = '';

if(isset($_SERVER["QUERY_STRING"])) {
	$q = $_SERVER["QUERY_STRING"];
	$q = explode('=', $q);
	$q = array_pop($q);
}
if($q === '') { $q = 'all'; }

$pageName = 'nav ' . $q;
include('_header.php');
?>
    <nav id="primary-nav">
        <ul>
        		<?php if($q == 'about' || $q == 'all') { include('inc/nav-p/about.php'); } ?>
        		<?php if($q == 'academics' || $q == 'all') { include('inc/nav-p/academics.php'); } ?>
        		<?php if($q == 'admissions-aid' || $q == 'all') { include('inc/nav-p/admissions-aid.php'); } ?>
        		<?php if($q == 'arts' || $q == 'all') { include('inc/nav-p/arts.php'); } ?>
        		<?php if($q == 'athletics' || $q == 'all') { include('inc/nav-p/athletics.php'); } ?>
        		<?php if($q == 'campus-life' || $q == 'all') { include('inc/nav-p/campus-life.php'); } ?>
        		<?php if($q == 'news-events' || $q == 'all') { include('inc/nav-p/news-events.php'); } ?>
        		<?php if($q == 'service-faith' || $q == 'all') { include('inc/nav-p/service-faith.php'); } ?>
        </ul>
    </nav>

    <nav id="secondary-nav">
        <ul>
        		<?php if($q == 'all') { include('inc/nav-s/mobile.php'); } ?>
        		<?php if($q == 'future-students' || $q == 'all') { include('inc/nav-s/future-students.php'); } ?>
        		<?php if($q == 'students' || $q == 'all') { include('inc/nav-s/students.php'); } ?>
        		<?php if($q == 'faculty' || $q == 'all') { include('inc/nav-s/faculty.php'); } ?>
        		<?php if($q == 'staff' || $q == 'all') { include('inc/nav-s/staff.php'); } ?>
        		<?php if($q == 'parents' || $q == 'all') { include('inc/nav-s/parents.php'); } ?>
        		<?php if($q == 'alumni' || $q == 'all') { include('inc/nav-s/alumni.php'); } ?>
        </ul>
    </nav>
    
<?php include('_footer.php'); ?>

