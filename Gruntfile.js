module.exports = function(grunt) {
  "use strict";

  try {
    grunt.config.set('pkg', grunt.file.readJSON('package.json'))
  }
  catch(e) {
    throw "'package.json' is required. Check the file exist & make sure it's readable by happyplan"
  }

  require('./grunt_tasks/lib/load-config')(grunt, __dirname)
  require('./grunt_tasks/lib/prepare-theme')(grunt)
  require('./grunt_tasks/lib/hooks')(grunt)

  // now tasks
  var happyplan = grunt.config.getRaw('happyplan')
  require('./grunt_tasks/lib/tasks-config-loader')(grunt, happyplan._ + '/grunt_tasks/config')

  // imports tasks
  process.chdir(happyplan._) // (we must change cwd because of how loadNpmTasks works)
  // dev dep only...
  //https://github.com/sindresorhus/load-grunt-tasks/issues/7
  //require('load-grunt-tasks')(grunt)
  // load devDependencies if we are using grunt from happyplan source directory
  require('matchdep')[ happyplan.cwd !== happyplan._ ? 'filter' : 'filterAll']('grunt-*').forEach(grunt.loadNpmTasks)
  //grunt.loadNpmTasks('assemble') // not handled by load-grunt-tasks
  grunt.loadTasks('./grunt_tasks')
  // reset cwd to previous value
  process.chdir(happyplan.cwd)
}
