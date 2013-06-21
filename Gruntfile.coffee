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
      my_target:
        files:
          'js/script.min.js' : ['src/js/bootstrap/bootstrap-dropdown.js', 'src/js/script.js']
          'js/slider-update.min.js' : 'src/js/slider-update.js'
          'js/fonts.min.js' : ['src/js/google-fontloader.js', 'src/js/fonts.js']

    sass:
      options:
        style: 'compact'
        compass: 'config.rb'
        debugInfo: true
      compile:
        files:
          'css/fonts.css' : 'src/sass/fonts.scss'
          'css/base.css' : 'src/sass/base.scss'
          'css/responsive.css' : 'src/sass/responsive.scss'
  
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
  grunt.registerTask('compile', ['sass', 'jade'])
  grunt.registerTask('default', ['compile', 'livereload-start', 'connect', 'regarde'])
