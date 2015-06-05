module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    jasmine : {
      src : 'dist/echoesworks.js',
      options : {
        host: "http://0.0.0.0:8000",
        vendor: ['node_modules/jasmine-ajax/lib/mock-ajax.js'],
        specs : 'specs/*-spec.js',
        template: require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: 'coverage/coverage.json',
          report: {
            type: 'lcov',
            options: {
              dir: 'coverage'
            }
          },
          thresholds: {
            lines: 80,
            statements: 80,
            branches: 50,
            functions: 50
          }
        }
      }
    },

    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: [
          'src/_intro.js',
          'src/main.js',
          'src/ajax.js',
          'src/slide.js',
          'src/umarkdown.js',
          'src/events_handler.js',
          'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['dist/echoesworks.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'jshint', 'qunit']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jshint','connect', 'jasmine']);
  grunt.registerTask('default', ['concat','connect', 'jshint','jasmine', 'uglify' ]);

};
