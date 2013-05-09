<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function byu_form_system_theme_settings_alter(&$form, &$form_state)  {

  // Create the form using Forms API: http://api.drupal.org/api/7

  $form['theme_settings']['parent_org'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Parent Organization'),
    '#default_value' => theme_get_setting('parent_org'),
    '#description'   => t("Enter the name of your parent organization to be displayed in the header. Leave blank to use the full Brigham Young University logo."),
  );
  
  $form['theme_settings']['parent_org_link'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Parent Organization Website'),
    '#default_value' => theme_get_setting('parent_org_link'),
    '#description'   => t("Enter the URL of your parent organization. (Example: http://college.byu.edu)"),
  );
 

  // Remove some of the base theme's settings.
  unset($form['themedev']['zen_layout']); // We don't need to select the layout stylesheet.
  unset($form['breadcrumb']['breadcrumb_options']['zen_breadcrumb_separator']); //Dont want them changing
  unset($form['logo']); //Don't want them changing to other logos
 // unset($form['theme_settings']['site name']);
	//This can be removed once we are finished developing the theme
	//unset($form['themedev']['zen_rebuild_registry']);
  // We are editing the $form in place, so we don't need to return anything.
}
