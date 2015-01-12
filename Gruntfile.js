module.exports = function(grunt) {
  grunt.initConfig({
    run: {
      metalsmith: {
        args: ['./node_modules/metalsmith/bin/metalsmith']
      },
      server: {
        args: ['./tools/server.js']
      }
    },
    remove: {
      options: {
        trace: true
      },
      dirList: ['build']
    },
    copy: {
      assets: {
        src: 'assets/**',
        dest: 'build/',
      },
      cname: {
        src: 'CNAME',
        dest: 'build/',
      }
    },
    watch: {
      scripts: {
        files: ['**', '!node_modules/**', '!build/**'],
        tasks: ['build'],
        options: {
          livereload: true,
        },
      },
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-remove');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['remove', 'run:metalsmith', 'copy']);
  grunt.registerTask('server', 'run:server');
  grunt.registerTask('publish', ['build', 'gh-pages']);
};
