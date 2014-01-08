module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './obj'
        }
      }
    },
    jst: {
      compile: {
        options: {
          processName: function(filename) {
            return filename.replace('client/templates/', '');
          }
        },
        files: {
          "obj/jst.js": ["client/templates/**/*.html"]
        }
      }
    },
    concat: {
      dist: {
        'src': [
          'obj/jquery/jquery.js',
          'obj/underscore/underscore.js',
          'obj/q/q.js',
          'obj/sass-bootstrap/bootstrap.js',
          'obj/jst.js',
          'client/javascripts/init.js'
        ],
        'dest': 'dist/app.js'
      }
    },
    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/sass-bootstrap/lib/']
        },
        files: {
          'dist/style.css': 'client/stylesheets/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['client/javascripts/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      },
      stylesheets: {
        files: ['client/stylesheets/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      templates: {
        files: ['client/templates/**/*.html'],
        tasks: ['jst', 'concat'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['bower:install', 'jst', 'concat', 'sass']);

};