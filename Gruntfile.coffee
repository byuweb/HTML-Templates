'use strict'
path = require('path')
lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

folderMount = (connect, point) ->
  return connect.static(path.resolve(point))


module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    uglify:
      options:
        mangle: false
        preserveComments: 'some'
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %>  */'
      compile:
        files:
          'js/script.min.js' : ['src/js/plugins/jrespond.js', 'src/js/bootstrap/bootstrap-dropdown.js', 'src/js/script.js']
          'js/script-touch.min.js' : ['src/js/plugins/fastclick.js', 'src/js/plugins/jrespond.js', 'src/js/bootstrap/bootstrap-dropdown.js', 'src/js/script.js', 'src/js/touch.js']
          'js/slider.min.js' : 'src/js/slider-update.js'
          'js/fonts.min.js' : ['src/js/plugins/google-fontloader.js', 'src/js/fonts.js']
          'js/modernizr.js' : ['src/js/plugins/modernizr.js', 'src/js/plugins/modernizr-boxsizing.js']
      compile_no_uglify:
        options:
          compress: false
          mangle: false
          preserveComments: 'all'
          beautify: true
          banner: ''
        files:
          'js/init.js' : 'src/js/init.js'

    sass:
      options:
        style: 'compact'
        compass: 'config.rb'
        debugInfo: true
        trace: true
        loadPath: ['src/sass/','src/sass/shared/']
        sourcemap: true
      compile:
        files:[
          expand: true
          cwd: 'src/sass/'
          src: ['*.scss', '*.sass']
          dest: 'css/'
          ext: '.css'
        ]

    jade:
      options:
        pretty: true
      compile:
        files:[
          expand: true
          cwd: 'src/jade/'
          src: ['**/*.html.jade']
          dest: ''
          ext: '.html'
        ]
#     coffee:
#       compile:
#         files:
#           'js/main.js': 'js/main.coffee'
    connect:
      livereload:
        options:
          hostname: '0.0.0.0'
          port: 9001
          middleware: (connect, options) ->
            return [lrSnippet, folderMount(connect, '.')]
    regarde:
      uglify:
        files: ['src/js/**/*.js']
        tasks: ['uglify', 'livereload']
      sass:
        files: ['src/sass/**/*.sass', 'src/sass/**/*.scss']
        tasks: ['sass', 'livereload']
      jade:
        files: ['src/jade/**/*.jade']
        tasks: ['jade', 'livereload']
#      coffee:
#        files: ['js/*.coffee']
#        tasks: ['coffee', 'livereload']
      image:
        files: ['img/*']
        tasks: ['livereload']

  # grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-livereload')

  # Default task(s).
  grunt.registerTask('compile', ['sass', 'jade', 'uglify'])
  grunt.registerTask('default', ['compile', 'livereload-start', 'connect', 'regarde'])
