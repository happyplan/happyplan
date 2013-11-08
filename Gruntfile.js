module.exports = function(grunt) {
  "use strict";

  // using try instead of a file.exists also handle json parsing error
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
  var taskConfigLoader = require('./grunt_tasks/lib/tasks-config-loader');
  taskConfigLoader(grunt, happyplan._ + '/grunt_tasks/config')
  if (happyplan.cwd !== happyplan._) {
    taskConfigLoader(grunt, happyplan.cwd + '/grunt_tasks/config')
  }

  // imports tasks
  // (we must change cwd because of how loadNpmTasks works)
  process.chdir(happyplan._)
  var depScope = happyplan.cwd === happyplan._ ? ['devDependencies', 'dependencies'] : ['dependencies']
  require('load-grunt-tasks')(grunt, {scope: depScope})
  grunt.loadNpmTasks('assemble') // not handled by load-grunt-tasks
  grunt.loadTasks(happyplan._ + '/grunt_tasks')
  // reset cwd to previous value
  process.chdir(happyplan.cwd)

  // try to load local tasks
  if (happyplan.cwd !== happyplan._) {
    require('load-grunt-tasks')(grunt)
    grunt.loadTasks(happyplan.cwd + '/grunt_tasks')
  }
}
