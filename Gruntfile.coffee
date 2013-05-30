'use strict'
path = require('path')
lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

folderMount = (connect, point) ->
  return connect.static(path.resolve(point))


module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    
    sass:
      options:
        style: 'compact',
        compass: 'config.rb'
      compile:
        files:[
          expand: true,
          cwd: 'src/sass/',
          src: ['**/*.scss', '**/*.sass'],
          dest: 'css/',
          ext: '.css'
        ]
  
    jade:
      options:
        pretty: true
      compile:
        files:[
          expand: true,
          cwd: 'src/jade/',
          src: ['**/*.jade'],
          dest: '',
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
      sass:
        files: ['src/css/**/*.sass', 'src/css/**/*.scss']
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
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-livereload')
  # grunt.loadNpmTasks('grunt-contrib-concat')

  # Default task(s).
  grunt.registerTask('compile', ['sass', 'jade'])
  grunt.registerTask('default', ['compile', 'livereload-start', 'connect', 'regarde'])