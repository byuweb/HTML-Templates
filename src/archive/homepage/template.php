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
  function homepage_preprocess_html(&$variables, $hook) {
  if($variables['node']->type == 'emergency_page') {
  drupal_add_css(path_to_theme() . '/css/emergency.css', array('group' => CSS_THEME, 'every_page' => FALSE));
  }

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
/* -- Delete this line if you want to use this function */
function homepage_preprocess_page(&$variables, $hook) {
  $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
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

function homepage_form_alter(&$form, &$form_state, $form_id) {
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

/* This removes the menu tags and inserts the div instead */

function homepage_menu_tree($variables) {
  return '<ul>' . $variables['tree'] . '</ul>';
}

function homepage_menu_link(array $variables) {
  $element = $variables['element'];
  /* $sub_menu = ''; */

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  /* return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n"; */

  if (!isset($sub_menu)):
    return '<li class="nochild">' . $output . '</li>';
  else:
    return '<li>' . $output . '<div class="sub">' . $sub_menu . '</div>' . '</li>';
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
function homepage_breadcrumb($variables) {
  global $base_path;
  global $theme_path;
  $breadcrumb = $variables['breadcrumb'];
  // Determine if we are to display the breadcrumb.
  $show_breadcrumb = theme_get_setting('zen_breadcrumb');
  $front = drupal_is_front_page();
  if ($show_breadcrumb == 'yes' && $front == FALSE || $show_breadcrumb == 'admin' && arg(0) == 'admin') {

    // Optionally get rid of the homepage link.
    $show_breadcrumb_home = theme_get_setting('zen_breadcrumb_home');
    $home = array_shift($breadcrumb);
    $site_name = variable_get('site_name');
    if ($show_breadcrumb_home) {
      array_unshift($breadcrumb, str_replace("Home", $site_name, $home));
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
        } else {
          $title = drupal_get_title();
        }
        if ($title) {
          $trailing_separator = $breadcrumb_separator;
        }
      } elseif (theme_get_setting('zen_breadcrumb_trailing')) {
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
      $finalBreadcrumb = array_slice($breadcrumb, -1, 1);
      array_pop($breadcrumb);
      array_unshift($breadcrumb, "<a href=\"http://byu.edu\">BYU Home</a>");
      if (empty($finalBreadcrumb[0])) { // Sometimes, the home page isn't loaded into the breadcrumb. this is my fix for that.
        $finalBreadcrumb[0] = '<a href="' . $base_path . '">' . $site_name . '</a>';
      }

      return $heading . '<div id="breadcrumb-home"><a href="#"><img alt="home" src="' . $base_path . $theme_path . '/img/home.png"></a><div class="bread-drop">' . implode("", $breadcrumb) . '</div></div>' . $breadcrumb_separator . implode($breadcrumb_separator, $finalBreadcrumb) . $trailing_separator . $title;
    }
  }
  return ''; // Otherwise, return an empty string.
}

/*
 * This function is simply used to get the data out for the features on the homepage 
 */

function homepage_get_features() {
  $html_list = '';
  $query = db_select('node', 'n');
  $query->join('field_data_field_feature_image', 'fi', 'n.nid = fi.entity_id'); //JOIN node with field_data_field_feature_image
  $query->join('field_data_field_feature_link', 'fl', 'n.nid = fl.entity_id'); //JOIN node with field_data_field_feature_link
  $query->join('field_data_field_feature_sort', 'fs', 'n.nid = fs.entity_id'); //JOIN node with field_data_field_feature_sort
  $query->join('field_data_body', 'fdb', 'n.nid = fdb.entity_id'); //JOIN node with field_data_body
  $query->fields('n', array('title', 'nid'))//SELECT the fields from node
          ->fields('fi', array('field_feature_image_fid', 'field_feature_image_alt', 'field_feature_image_title'))//SELECT the fields from field_data_field_feature_image
          ->fields('fl', array('field_feature_link_url', 'field_feature_link_title'))//SELECT the fields from field_data_field_feature_link            
          ->fields('fdb', array('body_value'))//SELECT the fields from field_data_body
          ->condition('n.status', 1)//limits it to published content
          ->condition('n.type', 'feature')//limits it to only features
          //->orderRandom(); //ORDER BY random
          ->orderBy('fs.field_feature_sort_value', 'ASC');//ORDER BY sort value
          //->orderBy('n.created', 'ASC'); //ORDER BY created

  $result = $query->execute();
  $html_list .= '<ul id="slider">';

//  print_r($result->fetchAssoc());
  while ($feature = $result->fetchAssoc()) {
    $feature_title = $feature['title'];
    $feature_body = $feature['body_value'];
    $image_path = file_create_url(file_load($feature['field_feature_image_fid'])->uri);
    $feature_image_alt = $feature['field_feature_image_alt'];
    $feature_link_url = $feature['field_feature_link_url'];
//    $feature_link_title = $feature['field_feature_link_title'];

    $html_list .= '<li><a href="' . $feature_link_url . '">' . '<img src=' . $image_path . ' alt=""></a>';
    $html_list .= '<div class="feature-description">';
    $html_list .= '<h2><a href="' . $feature_link_url . '">' . $feature_title . '</a></h2>';
    $html_list .= $feature_body;
    $html_list .= '</div>';
    $html_list .= '</li>';
  }
  $html_list .= '</ul>';
  return $html_list;
}

/*
 * This function will return calendar items themed for display
 */

function homepage_get_calendar() {

  $total_rows = 16;
  $row_count = 0;
  $calendar_list = '';
  $query = Database::getConnection('calendar', 'calendar')->query("select title, place,begdate,date_format(begdate,'%b') as item_month,date_format(begdate,'%e') as item_date,date_format(begdate,'%W') as item_weekday,enddate,strtime,endtime from tblevents where begdate>=curdate() order by begdate, priority ASC");

  $today_date = date("j");
  $today_month = date("M");
  $today_weekday = date("l");
  $calendar_list .= '<div class="day">';
  $calendar_list .= '<h3><span class="date">' . $today_date . '</span>' . $today_month . ', ' . $today_weekday . '</h3>';
  $row_count = 2;
  $check_date = $today_date;
  while ($calendar_item = $query->fetchAssoc()) {
    $item_date = $calendar_item['item_date']; //format for date
    $item_month = $calendar_item['item_month']; //format for month
    $item_weekday = $calendar_item['item_weekday']; //format for day
    $item_time = $calendar_item['strtime']; //format for time
    if ($item_time == "12:00 AM") {
      $item_time = "All Day";
    }
    $item_url = 'http://calendar.byu.edu/calendar/' . $calendar_item['begdate']; //url for calendar event
    $item_title = htmlspecialchars($calendar_item['title'], ENT_QUOTES);
    if (!is_null($calendar_item['place'])) {
      $item_location = ' @ ' . $calendar_item['place'];
    } else
      $item_location = '';
    if ($row_count < $total_rows || $check_date == $item_date) {
      if ($check_date == $item_date) {
        $calendar_list .= '<a href="' . $item_url . '" title="' . $item_title . ' ' . $item_location . ' - ' . $item_time . '">' . $item_title . '</a><span class="time">' . $item_time . '</span>';
        $row_count++;
      } else {
        $calendar_list .= '</div>';
        $calendar_list .= '<div class="day">';
        $calendar_list .= '<h3><span class="date">' . $item_date . '</span>' . $item_month . ', ' . $item_weekday . '</h3>';
        $calendar_list .= '<a href="' . $item_url . '" title="' . $item_title . ' ' . $item_location . ' - ' . $item_time . ' ">' . $item_title . '</a><span class="time">' . $item_time . '</span>';
        $row_count = $row_count + 3;
        $check_date = $item_date;
      }
    }
  }
  $calendar_list .= '</div>';
  db_set_active($key = $default_db);
  return $calendar_list;
}

/*
 * This function will return news items themed for display
 */

function homepage_get_news() {
  $html_list = '';
  $query = db_select('node', 'n');
  $query->join('field_data_field_news_image', 'fi', 'n.nid = fi.entity_id'); //JOIN node with field_data_field_news_image
  $query->join('field_data_field_news_link', 'fl', 'n.nid = fl.entity_id'); //JOIN node with field_data_field_news_link
  $query->join('field_data_body', 'fdb', 'n.nid = fdb.entity_id'); //JOIN node with field_data_body
  $query->join('field_data_field_news_sort', 'fs', 'n.nid = fs.entity_id'); //JOIN node with field_data_field_news_sort
  $query->fields('n', array('title', 'nid'))//SELECT the fields from node
          ->fields('fi', array('field_news_image_fid', 'field_news_image_alt', 'field_news_image_title'))//SELECT the fields from field_data_field_news_image
          ->fields('fl', array('field_news_link_url', 'field_news_link_title'))//SELECT the fields from field_data_field_news_link            
          ->fields('fdb', array('body_value'))//SELECT the fields from field_data_body
          ->condition('n.status', 1)//limits it to published content
          ->condition('n.type', 'news_items')//limits it to only news_items
          ->orderBy('fs.field_news_sort_value', 'ASC')//ORDER BY sort value
          ->orderBy('n.created', 'ASC')//ORDER BY created
          ->range(0, 2); //limit to 2 entries

  $result = $query->execute();

  $news_counter = 0;
  $html_list = '';
  while ($news = $result->fetchAssoc()) {
    $news_title = $news['title'];
    $news_body = $news['body_value'];
    $news_image_path = file_create_url(file_load($news['field_news_image_fid'])->uri);
    $news_image_alt = $news['field_news_image_alt'];
    $news_image_title = $news['field_news_image_title'];
    $news_link_url = $news['field_news_link_url'];
    $news_link_title = $news['field_news_link_title'];
    if ($news_counter) {
      $html_list .= '<div class="news-item omega">';
    } else {
      $html_list .= '<div class="news-item">';
    }
    $html_list .= '<a href="' . $news_link_url . '" title="' . $news_link_title . '"><img alt="' . $news_image_alt . '" src="' . $news_image_path . '"></a>';
    $html_list .= '<h3><a href="' . $news_link_url . '" title="' . $news_link_title . '">' . $news_title . '</a></h3>';
    $html_list .= $news_body;
    $html_list .= '</div>';
    $news_counter = 1;
  }

  return $html_list;
}

/*
 * This function will return annoucements items themed for display
 */

function homepage_get_briefs() {
  $briefs_counter = 0;
  $html_list = '';
  $query = <<<briefs
SELECT  
  n.title, 
  bi.field_briefs_image_fid, 
  bi.field_briefs_image_alt,
  bl.field_briefs_link_url, 
  bso.field_briefs_sort_order_value
FROM 
  {node} n,
  {field_data_field_briefs_image} bi,
  {field_data_field_briefs_link} bl,
  {field_data_field_briefs_sort_order} bso
WHERE n.status = 1 AND n.type IN  ('briefs')
  and n.nid= bi.entity_id
  and n.nid= bl.entity_id
  and n.nid= bso.entity_id
ORDER BY bso.field_briefs_sort_order_value, n.title
briefs;
  $result = db_query_range($query, 0, 3);
  if ($result->rowCount() == 0) {
    $html_list = '';
  } else {
    $html_list .= '<div id="briefs-container">';
    foreach ($result as $brief) {
      $brief_title = $brief->title;
      $brief_image_path = file_create_url(file_load($brief->field_briefs_image_fid)->uri);
      $brief_image_alt = $brief->field_briefs_image_alt;
      $brief_link_url = $brief->field_briefs_link_url;
      if ($briefs_counter == 2) {
        $html_list .= '<div class="briefs-item omega">';
      } else {
        $html_list .= '<div class="briefs-item">';
      }
    $html_list .= '<a href="' . $brief_link_url . '" title="' . $brief_link_title . '"><img alt="' . $brief_image_alt . '" src="' . $brief_image_path . '"></a>';
    $html_list .= '<h3><a href="' . $brief_link_url . '" title="' . $brief_link_title . '">' . $brief_title . '</a></h3>';
    $html_list .= '</div>';
    $briefs_counter++;
    }
    $html_list .= '</div>';
  }
  return $html_list;
}
