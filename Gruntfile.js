module.exports = function (grunt) {

    grunt.initConfig({

        sass: {
            options: {
                includePaths: ['bower_components/foundation/scss', '_sass']
            },
            dist: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'css/cv.css': 'css/cv.scss',
                    'css/main.css': 'css/main.scss'
                }
            }
        },
        watch: {
            all: {
                files: ['*.html', 'css/**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build','watch']);

};