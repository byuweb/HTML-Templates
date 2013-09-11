# Contributing to byu-responsive-dev

Development for BYU responsive theme

BYU HTML Responsive Templates  
Version: 1.2

This is the development repository of the BYU responsive templates

## Development Setup

To speed up development, we're using SCSS with Compass for CSS, and Jade for HTML compiling. These tasks are run via grunt task, which also includes a test server complete with livereload.

### Requirements

- **Node.js** (Including the node package manager <code>npm</code>) - Javascript-based server software. Installation info at [nodejs.org](http://nodejs.org/)
- **Ruby** - Pre-installed on Mac. For Windows, installation info at [ruby-lang.org](http://www.ruby-lang.org/en/downloads/), or use an installer package like [RubyInstaller](http://rubyinstaller.org/).
- **Grunt** - Javascript task runner. Automates compiling and other repetitive tasks. Installation info at [gruntjs.com](http://gruntjs.com/getting-started)  
- **Sass** - Compiler for CSS. Once Ruby is installed, run the command <code>gem install sass</code> in the command line to install. Info at [sass-lang.com](http://sass-lang.com/). (HEADS UP-- Don't forget to read the **Sass Gotcha** section below)
- **Compass** - Sass extension with pre-built mixins and variables. In the command line, run <code>gem install compass</code> to install. Info at [compass-style.org](http://compass-style.org/).

### Sass gotcha

Google Chrome has changed the way they do [source mapping](http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/). (If you're not familiar with source mapping, imagine the Chrome inspector telling you locations of your CSS in the pre-compiled sass files rather than compiled CSS. Very useful.)

Anyway, the source mapping in the currently released version of sass (v3.2.9 as of July 29, 2013) doesn't work in Chrome anymore. However, there's a pre-release version that does work. Install it like so:

<code>gem install sass -v 3.3.0.alpha.141 --pre</code>

### Setup

Once you've downloaded the repo, you'll need to run an initial setup command so that Node will download the required grunt plugins.

First, navigate in your command line to the site directory.

Run this command *once* for your environment:

<code>npm install</code>

You should see a list of items downloading to a node_modules directory. You now have all the dependencies for this project.

### Run grunt

Each time you want to work on the project, navigate in your command line to the site directory, and  run the command:

<code>grunt</code>

or

<code>grunt --force</code>

If there are no errors, you should see in your terminal a list of several tasks that have started running. Whenever you save a watched file you'll see the list of tasks updated based on the file you've saved. For instance, your SASS and Jade files should automatically compile. If you use the <code>--force</code> flag, grunt will continue running even if errors happen in any of the tasks (otherwise, you'll have to restart grunt after any error).

### Stop grunt

To quit watching files and directories, just use your standard command line exit keys, probably <code>Control + C</code>.

## Development Server

With grunt running, you've got an automatic test server for the project. Navigate in a browser to <code>localhost:9001</code> to see the index page for the project. 

### Livereload

You may notice that whenever you save a file one of the grunt tasks that runs is "livereload." This will automatically push any changes to the site out to browsers that happen to be viewing it. This could be a browser on your computer, or a browser on another device that is connected to your computer's server at port 9001. This enables easy testing and updating of multiple browsers and devices.

## Support

If you have any trouble with setup, contact one of the other project contributors and we can probably set you straight.

## Happy coding!
