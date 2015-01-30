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
					'js/script.min.js' : [
						#'src/js/plugins/jrespond.js', 
						'src/js/bootstrap/bootstrap-dropdown.js', 
						'src/js/plugins/plugins.js',
						'src/js/script.js']
					'js/script-touch.min.js' : [
						#'src/js/plugins/fastclick.js', 
						#'src/js/plugins/jrespond.js', 
						'src/js/plugins/touchswipe.js', 
						'src/js/bootstrap/bootstrap-dropdown.js', 
						'src/js/plugins/plugins.js',
						'src/js/script.js',
						'src/js/touch.js']
					'js/slider.min.js' : [
						'src/js/plugins/anythingslider.js'
						#'src/js/plugins/jquery.flexslider-min.js', 
						#'src/js/plugins/bjqs.min.js',
						'src/js/slider-update.js']
			compile_no_uglify:
				options:
					compress: false
					mangle: false
					preserveComments: 'all'
					beautify: true
					banner: ''
				files:
					'js/init.js' : 'src/js/init.js'
					'js/modernizr.js' : [
						'src/js/plugins/modernizr.js', 
						'src/js/plugins/modernizr-boxsizing.js']

		jshint:
			options:
				"camelcase" : false
				"es3" : false
				"trailing" : false
				"white" : false
				"smarttabs" : true
				"jquery" : true
				"browser" : true
			files:[
				'src/js/fonts.js', 
				'src/js/init.js', 
				'src/js/script.js', 
				'src/js/slider-update.js', 
				'src/js/touch.js'
			]


		sass:
			options:
				style: 'compact'
				compass: 'config.rb'
				#debugInfo: true
				trace: true
				loadPath: ['src/sass/','src/sass/shared/']
			compile:
				files:[
					expand: true
					cwd: 'src/sass/'
					src: ['*.scss', '*.sass']
					dest: 'css/'
					ext: '.css'
				]

		autoprefixer:
			options:
				map: true
				browsers: ['last 4 versions', '> 1%']
			files: 
				src: 'css/*.css'

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

		newer:
			options:
				override: (detail, include) ->
					if detail.task is 'sass' or detail.task is 'jade'
						include true
						# checkForModifiedImports grunt, detail.path, detail.time, include
					else
						include false

		connect:
			server:
				options:
					port: 9001
		
		watch:
			options:
				spawn: false
			sass:
				files: ['src/sass/**/*.sass', 'src/sass/**/*.scss']
				tasks: ['newer:sass']
			css:
				options:
					livereload: true
				files: ['css/**/*']
				tasks: ['newer:autoprefixer']
			jade:
				files: ['src/jade/**/*.jade']
				tasks: ['newer:jade']
			js:
				files: ['src/js/script.js', 'src/js/touch.js']
				tasks: ['newer:jshint', 'newer:uglify']
			livereload:
				files: ['img/*', '*.html', 'js/*.min.js']
				options:
					livereload: true

	require('load-grunt-tasks')(grunt);

	# Default task(s).
	grunt.registerTask('compile', ['sass', 'autoprefixer', 'jade', 'jshint', 'uglify'])
	grunt.registerTask('default', ['compile', 'connect', 'watch'])
