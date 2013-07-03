<?php
/**
 * @file
 * Zen theme's implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation. $language->dir
 *   contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $jump_link_target: The HTML ID of the element that the "Jump to Navigation"
 *   link should jump to. Defaults to "main-menu".
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It should be placed within the <body> tag. When selecting through CSS
 *   it's recommended that you use the body tag, e.g., "body.front". It can be
 *   manipulated through the variable $classes_array from preprocess functions.
 *   The default values can contain one or more of the following:
 *   - front: Page is the home page.
 *   - not-front: Page is not the home page.
 *   - logged-in: The current viewer is logged in.
 *   - not-logged-in: The current viewer is not logged in.
 *   - node-type-[node type]: When viewing a single node, the type of that node.
 *     For example, if the node is a Blog entry, this would be "node-type-blog".
 *     Note that the machine name of the content type will often be in a short
 *     form of the human readable label.
 *   The following only apply with the default sidebar_first and sidebar_second
 *   block regions:
 *     - two-sidebars: When both sidebars have content.
 *     - no-sidebars: When no sidebar content exists.
 *     - one-sidebar and sidebar-first or sidebar-second: A combination of the
 *       two classes when only one of the two sidebars have content.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see zen_preprocess_html()
 * @see template_process()
 */
$theme_path = path_to_theme();
//$theme_path = base_path() . $directory;
?><!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->

<head profile="<?php print $grddl_profile; ?>">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
	<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<!-- Adding "maximum-scale=1" fixes the Mobile Safari auto-zoom bug: http://filamentgroup.com/examples/iosScaleBug/ -->
 <meta name="google-site-verification" content="F3ZM9MkprxBgLJ2gl7Xx4aUz1T40Da9GNqexrsiIJvg" /> 
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#secondary-nav" class="element-invisible element-focusable"><?php print t('Jump to Navigation'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
  
  <?php print $scripts; ?>

  <!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> -->
  <script src="http://www.google.com/jsapi" type="text/javascript"></script>
  <script type="text/javascript">
  google.load('search', '1', {language : 'en'});
  google.setOnLoadCallback(function() {
    var customSearchControl = new google.search.CustomSearchControl('009932716493032633443:hlqjz33kfkc');
    customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
    customSearchControl.draw('cse');
        <?php if(isset($_REQUEST['search'])): ?>
    customSearchControl.execute('<?php echo $_REQUEST['search'];?>');
    <?php endif; ?>     
}, true);
</script>

  <?php print '<script src =' . base_path() . path_to_theme() . '/js/script.js' . '>'; ?></script>
  <?php print '<script src =' . base_path() . path_to_theme() . '/js/plugins/addthis.js' . '>'; ?></script>
<!-- SiteCatalyst code version: G.9.
Copyright 1997-2004 Omniture, Inc. More info available at
http://www.omniture.com --><script language="JavaScript">
addThisUsername = 'ra-4ed3d3a835e8ab1a';  
<!--
/* You may give each page an identifying name, server, and channel on the next lines. */


var s_pageName="<?php print $head_title ?>"
var s_server="<?php print $_SERVER["SERVER_NAME"] ?>"
var s_channel=""
var s_pageType=""
var s_prop1=""
var s_prop2=""
var s_prop3=""
var s_prop4=""
var s_prop5=""

/********* INSERT THE DOMAIN AND PATH TO YOUR CODE BELOW *********** */

//--></script>
<?php
	$devText = 'dev';
	$stgText = 'stg';

	if (stripos($_SERVER["SERVER_NAME"], $devText) == "" && stripos($_SERVER["SERVER_NAME"], $stgText) == "") {
?>
<script language="javascript" type="text/javascript" src="<?php print drupal_get_path('theme', 'homepage'); ?>/js/s_code_remote.js"></script>
<?php
		} else {
?>
<script language="javascript" type="text/javascript" src="<?php print drupal_get_path('theme', 'homepage'); ?>/js/s_code_remote_dev.js"></script>
<?php } ?>

<!-- End SiteCatalyst code version: G.9. -->
</body>
</html>
