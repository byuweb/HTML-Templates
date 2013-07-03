<?php 


// Get the data from byu.edu
$content = get_data('http://home.byu.edu/home/');

if($content) {
  echo 'Thumbs up :)';
}

// Write the feature
/*
$feature = get_element('slider', $content);

write_data('inc/feature.php', $feature);
echo $feature;
*/


// Write the whole page to a file
write_data('inc/byu_homepage.php', $content);


// Make replacements
$content = str_replace('<img ', '<span class="img"', $content);
$content = str_replace('alt=', 'data-alt=', $content);
$content = str_replace(' src=', ' data-src=', $content);
$content = preg_replace('/<link (.)*/', '', $content);
$content = preg_replace('/<script (.)*/', '', $content);


// Write the calendar
$calendar = get_element('calendar', $content);
write_data('inc/calendar.php', $calendar);
echo $calendar;


// Write the news
$news = get_element('news', $content);
write_data('inc/news.php', $news);
echo $news;






/************************************************
  Functions
*************************************************/


/* Func: get_data()
 * Desc: Get the data from a URL
 */
function get_data($url)
{
  $ch = curl_init();
  $timeout = 5;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}




/* Func: get_element()
 * Desc: Extract an element from a DOMObject
 */
function get_element($id, $doc) {
  
  $DOM = new DOMDocument;
  libxml_use_internal_errors(true);
  $DOM->loadHTML($doc);
  libxml_clear_errors();
  
  //get the calendar
  $el = $DOM->getElementByID($id);
  $tmpDOM = new DOMDocument();
  $tmpDOM->appendChild($tmpDOM->importNode($el, true));
  $el = $tmpDOM->saveHTML();
  return $el;
}





/* Func: write_data()
 * Desc: Write a string to a file
 */
function write_data($file, $string) {
  $fp = fopen($file, 'w');
  fwrite($fp, $string);
  fclose($fp);
}


?>