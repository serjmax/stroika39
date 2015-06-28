// Configuration for Watch task(s)
// Runs specified tasks when file changes are detected
'use strict';

var _ = require('lodash');

var taskConfig = function(grunt) {

  var config = {
    configFiles: {
      files: [
        'Gruntfile.js',
        'grunt/**/*.js',
        '*.json'
      ],
      options: {
        reload: true,
        interrupt: true
      },
      tasks: [
        'wiredep',
        'serve:nowatch'
      ]
    },
    jade: {
      files: [
        '<%= yeogurt.client %>/templates/*.jade'
      ],
      tasks: [
        'newer:jade:server'
      ]
    },
    jadePartials: {
      files: [
        '<%= yeogurt.client %>/templates/**/*.jade',
        '!<%= yeogurt.client %>/templates/*.jade'
      ],
      tasks: [
        'injector:jade',
        'jade:server'
      ]
    },
    sass: {
      files: ['<%= yeogurt.client %>/styles/**/*.{scss,sass,md}'],
      tasks: [
        'injector:sass',
        'sass:server',
        'autoprefixer:server'
      ]
    },
    injectCss: {
      files: [
        '<%= yeogurt.client %>/styles/**/*.css'
      ],
      tasks: [
        'injector:css',
        'autoprefixer:server'
      ]
    },
    injectJs: {
      files: [
        '<%= yeogurt.client %>/scripts/**/*.js',
        '!<%= yeogurt.client %>/scripts/{main,app}.js'
      ],
      tasks: ['injector:scripts']
    },
    js: {
      files: [
        '<%= yeogurt.client %>/scripts/**/*.js'
      ],
      tasks: [
        'newer:jshint'
      ]
    },
    livereload: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      files: [
        '<%= yeogurt.client %>/*.{ico,png,txt}',
        '<%= yeogurt.tmp %>/**/*.html',
        '<%= yeogurt.tmp %>/styles/**/*.{css,ttf,otf,woff,svg,eot}',
        '<%= yeogurt.client %>/scripts/**/*.js',
        '<%= yeogurt.client %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    }
  };
  
  // Documentation specific configuration
  var docsConfig = {
    jade: {
      tasks: [
        'dashboard:server'
      ]
    },
    jadePartials: {
      tasks: [
        'dashboard:server'
      ]
    },
    sass: {
      tasks: [
        'styleguide:server'
      ]
    },
    kss: {
      files: [
        '<%= yeogurt.client %>/docs/styleguide/**/*.*'
      ],
      tasks: ['styleguide:server']
    },
    dashboard: {
      files: [
        '<%= yeogurt.client %>/docs/dashboard/**/*.*'
      ],
      tasks: ['dashboard:server']
    }
  };

  grunt.config.set('watch', config);

  grunt.registerTask('listen:docs', function() {
    // Merge docsConfig object with the config object without overwriting arrays
    // Instead concatenate all arrays with each other
    grunt.config('watch', _.merge(config, docsConfig, function(a, b) {
      return _.isArray(a) ? a.concat(b) : undefined;
    }));
    grunt.task.run('watch');
  });
  

};

module.exports = taskConfig;
