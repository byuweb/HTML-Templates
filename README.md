## Documentation for HTML Templates 2.0

<i>To download the templates, go to the [release page](http://github.com/byuweb/HTML-Templates/releases)</i>.

<i>For developers who want to use SCSS, Jade, and Grunt to compile pages, <a href="http://github.com/byuweb/HTML-Templates/wiki/Documentation-for-Developers">see the developer documentation page</a></i>

Thank you for downloading BYU’s responsive HTML templates. This gives you a set of static pages that you can modify and copy to fill out your website. If you wish to modify styles, please add your own style sheet rather than edit style sheets in the template. This will protect you from going back and editing everything when the templates are updated or corrected.
Please be aware that we put the content before the nav in our code.

For your benefit, comments are sprinkled liberally throughout the code on all pages, as well as in css and js files. Use them as a guide.

Before you get started, please be aware of the following issues:

### Scripts
In the &lt;head&gt; section of each HTML page you will see a section containing some of these elements:<br>
&lt;script&gt;<br>
&nbsp;Window.pageSettings = {<br>
   &nbsp;&nbsp;AdditionalScripts: [ ]<br>
&lt;/script&gt;<br>
The AdditionalScripts line is where you would add scripts that are not included in the template.

### Slider
HTML pages have a “load slider” routine that sets up a sliding photo display. Init.js checks to see if it’s true or false. Please be aware of the loadslider variable in the head of the HTML page you’re using:<br>
&lt;head&gt;<br>
  &nbsp;&lt;script&gt;<br>
    &nbsp;&nbsp;var pageSettings = {<br>
       &nbsp;&nbsp;&nbsp;loadslider: false,<br>
  &nbsp;&lt;/script&gt;<br>
&lt;/head&gt;<br>

By default we have set loadslider to true for front pages and false for inside pages. If it says false then the slider scripts won’t load. This and other issues are explained in comments in the code for <b><a href="http://byuweb.github.io/byu-responsive-dev/elements.html">elements.html</a></b>. That’s an essential page to read.

### Responsive.css
Read the comments in this file. Note, for example, Line 41, where full menu width is explained. Note that the min-width of 60em should be reset depending on your layout. Also, please note that ems work much better with responsive layouts than pixels.

### Breakpoints
Screen width breakpoints are central to the responsive strategy. They are found on Line 57 in responsive.css. Please read the comments in this file.

We have set standard breakpoints for phones, tablets, desktops, and large displays. Your layout may vary and may “break” at different points. Please adjust accordingly.

### Notes
Go into 404.html and 500.html error pages and modify them to suit your own organization.
