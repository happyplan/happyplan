/*global module*/
module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('happyplan:newpost', 'Generate a new file ready for a fresh post', function () {
    var postName = grunt.option('name') || 'change-me';
    postName = grunt.util._.unquote(postName);
    
    // support tag & tags option
    var tags = grunt.option('tag') || grunt.option('tags') || "";
    tags = grunt.util._.unquote(tags).split(',');
    
    // Template
    var fileContent = [
      '---',
      'layout: post',
      'title: ' + postName + '',
      'tags: [\'' + tags.join('\', \'') + '\']',
      '---',
      '',
      '# ' + postName,
      '',
      ''
    ].join('\n');

    var fileName = grunt.template.process(
      '<%= happyplan.theme.local.posts %>/_drafts/<%= grunt.template.today("yyyy-mm-dd") %>-'+
      postName.toLowerCase().split(' ').join('-').split(',').join('') +
      '.md'
    );

    grunt.file.write(fileName, fileContent);

    grunt.log.writeln('Your new post was created: ' + fileName + '. Have fun!');
  });
};
