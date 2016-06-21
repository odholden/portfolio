module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'css/app.css': 'src/scss/app.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'css/app.min.css': 'src/scss/app.scss' }
      }
    },
    concat: {
      dist: {
        src: ['src/js/app.js', 'src/js/**/*.js'],
        dest: 'js/app.js'
      }
    },
    uglify: {
      'js/app.min.js': 'js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:expanded'],
        options: { livereload: true }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint', 'concat'],
        options: { livereload: true }
      },
      index: {
        files: ['index.html'],
        options: { livereload: true }
      }
    },
    replace: {
      production: {
        options: {
          patterns: [{
            match: /app\.js/,
            replacement: 'app.min.js'
          },{
            match: /app\.css/,
            replacement: 'app.min.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['index.html'] }
        ]
      },
      development: {
        options: {
          patterns: [{
            match: /app\.min\.js/,
            replacement: 'app.js'
          },{
            match: /app\.min\.css/,
            replacement: 'app.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['index.html'] }
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass:expanded', 'concat', 'replace:development', 'watch']);
  grunt.registerTask('build', ['sass:compressed', 'concat', 'uglify', 'replace:production']);
}