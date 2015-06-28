// Configuration for Concurrent task(s)
// Runs tasks in parallel to speed up the build process
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('concurrent', {
    images: [
      'imagemin:dist',
    ],
    compile: [
      'jade:dist',
      'sass:dist',
    ],
    docs: [
      'dashboard:dist',
      'styleguide:dist'
    ]
  });

};

module.exports = taskConfig;
