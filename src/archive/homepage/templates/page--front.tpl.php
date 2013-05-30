<?php
/**
 * @file
 * Zen theme's implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/garland.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $secondary_menu_heading: The title of the menu used by the secondary links.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions: This needs to be redone ~ephraim
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 * - $page['bottom']: Items to appear at the bottom of the page below the footer.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see zen_preprocess_page()
 * @see template_process()
 */
?>
<header id="main-header">
  <div id="header-top" class="wrapper">
    <div id="logo">
      <?php
      // //This should probably be moved to improve efficiency. This doesn't need to be rebuilt on each page load
      $logo = base_path() . '/sites/all/themes/homepage/img/byulogo.png';
      $parent_org = theme_get_setting('parent_org');
      $logo_alt = base_path() . path_to_theme() . '/logo-small.png';
      $parent_org_link = theme_get_setting('parent_org_link');
      ?>
      <?php if ($parent_org != ''): ?>
        <a href="http://www.byu.edu/" title="<?php print t('Home'); ?>" rel="home"><img src="<?php print $logo_alt; ?>" alt="BYU Logo" /></a>
        <a href="<?php print $parent_org_link ?>" id="parent"><?php print $parent_org; ?></a>
      <?php else: ?>
        <a href="http://www.byu.edu/" title="<?php print t('Home'); ?>" rel="home"><h1>BYU - Brigham Young University</h1></a>
      <?php endif; ?>
    </div>
    <?php $search_image = $base_path . $directory . '/img/search-button.png'; ?>
    <div id="search-container">
      <a href="https://cas.byu.edu/cas/login?service=https://my.byu.edu/uPortal/Login" class="button">myBYU</a>
      <form action="/home/search" name="search-box">
        <!--        <form method="get" action="http://search.byu.edu/search" name="search-box">-->
        <input type="text" name="search" id="search" placeholder="Search BYU" label="Search Value"/>
<!--        <input type='hidden' name="client" value="homepage_frontend" />
        <input type='hidden' name="output" value="xml_no_dtd"/>
        <input type='hidden' name="proxystylesheet" value="homepage_frontend"/>-->
        <input type="image" src="<?php echo $search_image; ?>" alt="Search" id="search-button" value="Search"/>
      </form>
      <?php //print render($page['header-topright']);  ?>
    </div>
  </div>
  
  <div class="nav-container">
  <?php if ($secondary_menu): ?>
    <nav id="secondary-nav">
      <?php
      $menu_name = variable_get('menu_secondary_links_source', 'secondary-menu');
      print drupal_render(menu_tree($menu_name));

      //print render($page['navigation']);  //doesn't do anything, navigation is not in page array'
      ?>	
    </nav>
  <?php endif; ?>

  <?php if ($main_menu): ?>
    <nav id="primary-nav">
      <?php
      if (module_exists('simple_megamenu')) {
        print _renderMainMenu();
      } else {
        $menu_name = variable_get('menu_main_links_source', 'main-menu');
        print drupal_render(menu_tree($menu_name));
      }
      ?>
    </nav>
  <?php endif; ?>
  </div>

</header>

<div id="content" role="main" class="wrapper">

  <?php print $messages; ?>

  <?php if ($breadcrumb): ?>
    <div id="breadcrumb"><?php print $breadcrumb; ?></div>
  <?php endif; ?>

  <?php if ($tabs = render($tabs)): ?>
    <div class="tabs"><?php print $tabs; ?></div>
  <?php endif; ?>

  <?php print render($page['help']); ?>
  <?php if ($action_links): ?>
    <ul class="action-links"><?php print render($action_links); ?></ul>
  <?php endif; ?>

  <?php if ($page['sidebar_first']): ?>
    <div class="sidebar"><?php print render($page['sidebar_first']); ?></div>
  <?php endif; ?>

  <?php if ($page['sidebar_first']): ?>
    <div class="sidebar"><?php print render($page['sidebar_first']); ?></div>
  <?php endif; ?>

  <div id="main-content">	
    <?php //print render($page['content']); ?>
    <?php //print $feed_icons; ?>
    <div id="feature"><?php print homepage_get_features(); ?></div>
    <div id="calendar">
      <h2>Calendar</h2>
      <!--      <div id="calendarDays"></div>-->
      <div class="day"><h3><span class="date">12</span>Nov, Monday</h3><a href="http://calendar.byu.edu/calendar/2012-11-12" title="Family Home Evening at &quot;Education in Zion&quot;  @ Joseph F. Smith Building - 6:00 PM">Family Home Evening at "Education in Zion"</a><span class="time">6:00 PM</span></div><div class="day"><h3><span class="date">13</span>Nov, Tuesday</h3><a href="http://calendar.byu.edu/calendar/2012-11-13" title="Forum: Alison Davis-Blake, Dean of the Ross School of Business at the University of Michigan  @ Marriott Center - 11:05 AM ">Forum: Alison Davis-Blake, Dean of the Ross School of Business at the University of Michigan</a><span class="time">11:05 AM</span><a href="http://calendar.byu.edu/calendar/2012-11-13" title="BYU-UVU Food Drive  @ BYU and UVU campus, and the surrounding community.  - All Day">BYU-UVU Food Drive</a><span class="time">All Day</span><a href="http://calendar.byu.edu/calendar/2012-11-13" title="Men's Basketball vs. Georgia State  @ Marriott Center - 7:00 PM">Men's Basketball vs. Georgia State</a><span class="time">7:00 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-13" title="Cougar Marching Band  @ de Jong Concert Hall, Harris Fine Arts Center - 7:30 PM">Cougar Marching Band</a><span class="time">7:30 PM</span></div><div class="day"><h3><span class="date">14</span>Nov, Wednesday</h3><a href="http://calendar.byu.edu/calendar/2012-11-14" title="BYU-UVU Food Drive  @ BYU and UVU campus, and the surrounding community.  - All Day ">BYU-UVU Food Drive</a><span class="time">All Day</span><a href="http://calendar.byu.edu/calendar/2012-11-14" title="International Study Programs Fair   @ 3220/22/24 Wilkinson Student Center  - 12:00 PM">International Study Programs Fair </a><span class="time">12:00 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-14" title="Synthesis  @ de Jong Concert Hall, Harris Fine Arts Center - 7:30 PM">Synthesis</a><span class="time">7:30 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-14" title="School of Family Life Distinguished Lecture   @ Gordon B. Hinckley Center Assembly Hall - 7:30 PM">School of Family Life Distinguished Lecture </a><span class="time">7:30 PM</span></div><div class="day"><h3><span class="date">15</span>Nov, Thursday</h3><a href="http://calendar.byu.edu/calendar/2012-11-15" title="BYU-UVU Food Drive  @ BYU and UVU campus, and the surrounding community.  - All Day ">BYU-UVU Food Drive</a><span class="time">All Day</span><a href="http://calendar.byu.edu/calendar/2012-11-15" title="College of Humanities P.A. Christensen Lecture  @ B92 Joseph F. Smith Building.  - 11:00 AM">College of Humanities P.A. Christensen Lecture</a><span class="time">11:00 AM</span><a href="http://calendar.byu.edu/calendar/2012-11-15" title="My Journey as an LDS Scholar (Susan Easton Black)  @ B-192 Joseph F. Smith Building - 4:00 PM">My Journey as an LDS Scholar (Susan Easton Black)</a><span class="time">4:00 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-15" title="French Idol - International Education Week  @ Varsity Theater - 7:00 PM">French Idol - International Education Week</a><span class="time">7:00 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-15" title="Utah Symphony  @ de Jong Concert Hall, Harris Fine Arts Center - 7:30 PM">Utah Symphony</a><span class="time">7:30 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-15" title="Opera Chorus  @ Madsen Recital Hall, Harris Fine Arts Center - 7:30 PM">Opera Chorus</a><span class="time">7:30 PM</span><a href="http://calendar.byu.edu/calendar/2012-11-15" title="Little Shop of Horrors  @ Margetts Theatre, Harris Fine Arts Center - 7:30 PM">Little Shop of Horrors</a><span class="time">7:30 PM</span></div>      <ul id="calendars">
        <li><a href="http://saas.byu.edu/calendar/">Academic Calendar</a></li>
        <li><a href="http://arts.byu.edu/">Arts Events</a></li>
        <li><a href="http://www.byucougars.com/schedule">Sports Schedules</a></li>
      </ul>
      <strong><a href="http://calendar.byu.edu/">Full Calendar</a></strong>	
    </div>
    <div id="news">
      <h2>News</h2>
      <?php print homepage_get_briefs(); ?>
      <div id="news-container"><?php print homepage_get_news(); ?></div>
      <a class="baseline" href="http://news.byu.edu/">Full News Site</a>    
    </div>
    <!-- /.section, /#content -->
  </div>


  <?php if ($page['sidebar_second']): ?>
    <div class="sidebar omega">
      <?php print render($page['sidebar_second']); ?>
    </div>
  <?php endif; ?>



</div><!-- /#main-wrapper, /.wrapper .clearfix -->

<footer>
  <?php if ($page['footer-column1'] || $page['footer-column2'] || $page['footer-column3'] || $page['footer-column4'] || $page['footer-column5']): ?>
    <div id="footer-links">
      <div class="wrapper"> 	
        <?php if ($page['footer-column1']): ?>
          <div class="col">
            <?php print render($page['footer-column1']); ?>
          </div>
        <?php endif; ?>

        <?php if ($page['footer-column2']): ?>
          <div class="col">
            <?php print render($page['footer-column2']); ?>
          </div>
        <?php endif; ?>

        <?php if ($page['footer-column3']): ?>
          <div class="col double">
            <?php print render($page['footer-column3']); ?>
          </div>
        <?php endif; ?>

        <?php if ($page['footer-column4']): ?>
          <div class="col">
            <?php print render($page['footer-column4']); ?>
          </div>
        <?php endif; ?>

        <?php if ($page['footer-column5']): ?>
          <div class="col omega">
            <?php print render($page['footer-column5']); ?>
          </div>
        <?php endif; ?>
      </div>	
    </div>
  <?php endif; ?>

  <div id="footer-bottom">
    <div class="wrapper">
      <?php print render($page['footer-bottom']); ?>
    </div>
  </div>

</footer>
