## Documentation for HTML Templates 2.0

Thank you for downloading BYU’s responsive HTML templates. This gives you a set of static pages that you can modify and copy to fill out your website. If you wish to modify styles, please add your own style sheet rather than edit style sheets in the template. This will protect you from going back and editing everything when the templates are updated or corrected.
Please be aware that we put the content before the nav in our code.

For your benefit, comments are sprinkled liberally throughout the code on all pages, as well as in css and js files. Use them as a guide.

Before you get started, please be aware of the following issues:

### Scripts
In the <head> section of each HTML page you will see a section containing some of these elements:
<script>
Window.pageSettings = {
   AdditionalScripts: []
</script>
The AdditionScripts line is where you would add scripts that are not included in the template.

### Slider
HTML pages have a “load slider” routine that sets up a sliding photo display. Init.js checks to see if it’s true or false. Please be aware of the loadslider variable in the head of the HTML page you’re using:
<head>
  <script>
    var pageSettings = {
       loadslider: false,
  </script>
</head>

By default we have set loadslider to true for front pages and false for inside pages. If it says false then the slider scripts won’t load. This and other issues are explained in comments in the code for elements.html. That’s an essential page to read.

### Responsive.css
Read the comments in this file. Note, for example, Line 41, where full menu width is explained. Note that the min-width of 60em should be reset depending on your layout. Also, please note that ems work much better with responsive layouts than pixels.

### Breakpoints
Screen width breakpoints are central to the responsive strategy. They are found in responsive.css. Please read the comments in this file.

We have set standard breakpoints for phones, tablets, desktops, and large displays. Your layout may vary and may “break” at different points. Please adjust accordingly.

### Notes
Go into 404.html and 500.html error pages and modify them to suit your own organization.
