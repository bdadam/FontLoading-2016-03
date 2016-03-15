module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            fontloader: {
                files: {
                    'dist/loadfont.js': 'src/loadfont.js'
                }
            }
        },

        replace: {
            inlinejs: {
                src: ['src/demo*.html'],
                dest: 'dist/',
                replacements: [{
                    from: '{{ loadfont.js }}',
                    to: '<%= grunt.file.read("dist/loadfont.js") %>'
                },
                {
                    from: '{{ loadfont.debug.js }}',
                    to: '<%= grunt.file.read("src/loadfont.js") %>'
                }]
            }
        }
    });

    grunt.registerTask('default', ['uglify', 'replace']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
};
