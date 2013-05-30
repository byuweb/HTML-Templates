<?php
/**
 * @file
 * Contains theme override functions and preprocess functions for the theme.
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. You can modify or override Drupal's theme
 *   functions, intercept or make additional variables available to your theme,
 *   and create custom PHP logic. For more information, please visit the Theme
 *   Developer's Guide on Drupal.org: http://drupal.org/theme-guide
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   The Drupal theme system uses special theme functions to generate HTML
 *   output automatically. Often we wish to customize this HTML output. To do
 *   this, we have to override the theme function. You have to first find the
 *   theme function that generates the output, and then "catch" it and modify it
 *   here. The easiest way to do it is to copy the original function in its
 *   entirety and paste it here, changing the prefix from theme_ to STARTERKIT_.
 *   For example:
 *
 *     original: theme_breadcrumb()
 *     theme override: STARTERKIT_breadcrumb()
 *
 *   where STARTERKIT is the name of your sub-theme. For example, the
 *   zen_classic theme would define a zen_classic_breadcrumb() function.
 *
 *   If you would like to override either of the two theme functions used in Zen
 *   core, you should first look at how Zen core implements those functions:
 *     theme_breadcrumbs()      in zen/template.php
 *     theme_menu_local_tasks() in zen/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called template suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node-forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and template suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440
 *   and http://drupal.org/node/190815#template-suggestions
 */


/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function STARTERKIT_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function STARTERKIT_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function STARTERKIT_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // STARTERKIT_preprocess_node_page() or STARTERKIT_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function STARTERKIT_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function STARTERKIT_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  $variables['classes_array'][] = 'count-' . $variables['block_id'];
}
// */

function byu_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
    $form['search_block_form']['#title'] = t('Search'); // Change the text on the label element
	$form['search_block_form']['#attributes']['placeholder'] = t('Search ' . variable_get('site_name')); // Add extra attributes to the text box
	$form['search_block_form']['#id'] = 'search';
    $form['search_block_form']['#title_display'] = 'invisible'; // Toggle label visibilty
    $form['search_block_form']['#size'] = 19;  // define size of the textfield
    //$form['actions']['submit']['#value'] = t('GO!'); // Change the text on the submit button
	$form['actions']['#id'] = 'search-button';
    $form['actions']['submit'] = array('#type' => 'image_button', '#src' => base_path() . path_to_theme() . '/img/search-button.png');
  }
}

/*This removes the menu tags and inserts the div instead*/
function byu_menu_tree($variables) {
  return '<ul>' . $variables['tree'] . '</ul>';
}

function byu_menu_link(array $variables) {
  $element = $variables['element'];
  /*$sub_menu = '';*/

  if ($element['#below']) {
	$sub_menu = drupal_render($element['#below']);
  }
  
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  /*return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";*/
  
  if (!isset($sub_menu)):
  	return '<li class="nochild">' . $output . '</li>';
  else:
  	return '<li>' . $output . '<div class="sub">' . $sub_menu . '</div>' .  '</li>';
  endif;
}


/** 
 * Return a themed breadcrumb trail. -- Copied and from Zen core
 *
 * @param $variables
 *   - title: An optional string to be used as a navigational heading to give
 *     context for breadcrumb links to screen-reader users.
 *   - title_attributes_array: Array of HTML attributes for the title. It is
 *     flattened into a string within the theme function.
 *   - breadcrumb: An array containing the breadcrumb links.
 * @return
 *   A string containing the breadcrumb output.
 */
 
function byu_breadcrumb($variables) {
	global $base_path;
	global $theme_path;
  $breadcrumb = $variables['breadcrumb'];
  // Determine if we are to display the breadcrumb.
  $show_breadcrumb = theme_get_setting('zen_breadcrumb');
  $front = drupal_is_front_page();
  if ($show_breadcrumb == 'yes' && $front == FALSE || $show_breadcrumb == 'admin' && arg(0) == 'admin' ) {

    // Optionally get rid of the homepage link.
    $show_breadcrumb_home = theme_get_setting('zen_breadcrumb_home');
    $home = array_shift($breadcrumb);
    $site_name = variable_get('site_name');
    if ($show_breadcrumb_home) {
		array_unshift($breadcrumb,str_replace("Home",$site_name,$home));
    }

    // Return the breadcrumb with separators.
    if (!empty($breadcrumb)) {
      //$breadcrumb_separator = theme_get_setting('zen_breadcrumb_separator'); //I think this can be removed. WE don't want users changing this.
	  $breadcrumb_separator = ' › ';
      $trailing_separator = $title = '';
      if (theme_get_setting('zen_breadcrumb_title')) {
        $item = menu_get_item();
        if (!empty($item['tab_parent'])) {
          $title = check_plain($item['title']); // If we are on a non-default tab, use the tab's title.
        }
        else {
          $title = drupal_get_title();
        }
        if ($title) {
          $trailing_separator = $breadcrumb_separator;
        }
      }
      elseif (theme_get_setting('zen_breadcrumb_trailing')) {
        $trailing_separator = $breadcrumb_separator;
      }

      // Provide a navigational heading to give context for breadcrumb links to
      // screen-reader users.
      if (empty($variables['title'])) {
        $variables['title'] = t('You are here');
      }
      // Unless overridden by a preprocess function, make the heading invisible.
      if (!isset($variables['title_attributes_array']['class'])) {
        $variables['title_attributes_array']['class'][] = 'element-invisible';
      }
      $heading = '<h2' . drupal_attributes($variables['title_attributes_array']) . '>' . $variables['title'] . '</h2>';

	  // Style breadcrumb so that only the last two appear on the page; the rest will be shown in a div like on lds.org
	  $finalBreadcrumb = array_slice($breadcrumb,-1,1);
	  array_pop($breadcrumb);
	  array_unshift($breadcrumb,"<a href=\"http://byu.edu\">BYU Home</a>");
	  if(empty($finalBreadcrumb[0])) { // Sometimes, the home page isn't loaded into the breadcrumb. this is my fix for that.
		$finalBreadcrumb[0] = '<a href="' . $base_path . '">' . $site_name . '</a>';
	  }
	  
      return $heading . '<div id="breadcrumb-home"><a href="#"><img alt="home" src="' . $base_path . $theme_path . '/img/home.png"></a><div class="bread-drop">' . implode("", $breadcrumb) . '</div></div>' . $breadcrumb_separator .  implode($breadcrumb_separator, $finalBreadcrumb) . $trailing_separator . $title;
    }
  }
  return ''; // Otherwise, return an empty string.
}

/**
* Implementation of theme_menu_item().
*
* Add active class and custom id to current menu item links.
*/

function phptemplate_menu_item($mid, $children = '', $leaf = TRUE) {
$item = menu_get_item($mid); // get current menu item

// decide whether to add the active class to this menu item
if ((drupal_get_normal_path($item['path']) == $_GET['q']) // if menu item path...
|| (drupal_is_front_page() && $item['path'] == '')) { // or front page...
$active_class = ' active'; // set active class
} else { // otherwise...
$active_class = ''; // do nothing
}

$attribs = isset($item['description']) ?
array('title' => $item['description']) : array();
$replace = array(' ', '&');
$attribs['id'] = 'menu-'. str_replace($replace, '-', strtolower($item['title']));

return
'

' .
menu_item_link($mid) . $children ."
\n";
}
