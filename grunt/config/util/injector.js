// Configuration for Injector task(s)
// Injects Link/Import statements in to specified files
'use strict';

var _str = require('underscore.string');

var taskConfig = function(grunt) {

  grunt.config.set('injector', {
    options: {

    },
    // Inject application script files into index.html (doesn't include bower)
    jade: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/templates/', '../');
          return 'include ' + filePath;
        },
        starttag: '//- [injector:jade]',
        endtag: '//- [endinjector]'
      },
      files: {
        '<%= yeogurt.client %>/templates/layouts/base.jade': [
          '<%= yeogurt.client %>/templates/modules/*.jade',
        ]
      }
    },
    // Inject application script files into index.html (doesn't include bower)
    scripts: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/', '');
          return '<script src="/' + filePath + '"></script>';
        },
        starttag: '// [injector:js]',
        endtag: '// [endinjector]'
      },
      files: {
        '<%= yeogurt.client %>/templates/layouts/base.jade': [
          '<%= yeogurt.client %>/scripts/**/*.js',
          '!<%= yeogurt.client %>/scripts/main.js'
        ]
      }
    },
    // Inject component scss into main.scss
    sass: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/styles/', '');
          filePath = filePath.replace(/(\/)(_)([a-zA-z]+\.[A-Za-z]*)/, '$1$3');
          
          return '@import ' + filePath.slice(0, -5);
        },
        starttag: '// [injector]',
        endtag: '// [endinjector]'
      },
      files: {
        '<%= yeogurt.client %>/styles/main.sass': [
          '<%= yeogurt.client %>/styles/**/*.sass',
          '!<%= yeogurt.client %>/styles/main.sass'
        ]
      }
    },
  });

};

module.exports = taskConfig;
