'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        minjson: {
            compile: {
                files: {
                    'working/docs-nav-data-from-minjson.json': ['source/smart-player-api.json',
                        'source/video-cloud.json',
                        'source/analytics-api.json',
                        'source/analytics-api-v0.json',
                        'source/audience-api.json',
                        'source/batch-provisioning.json',
                        'source/mobile-sdks.json',
                        'source/mobile-sdks-v1.json',
                        'source/brightcove-player.json',
                        'source/cms-api.json',
                        'source/di-api.json',
                        'source/ingest-profiles-api.json',
                        'source/live.json',
                        'source/media-management.json',
                        'source/forums.json',
                        'source/oauth-api.json',
                        'source/playback-api.json',
                        'source/player-management.json',
                        'source/media.json'
                    ],
                    'working/temp-perform.json': ['source/perform.json',
                        'source/brightcove-player.json',
                        'source/player-management.json',
                        'source/mobile-sdks.json',
                        'source/oauth-api.json'
                    ]
                },
            },
        },
        replace: {
            onVC: {
                src: ['working/docs-nav-data-from-minjson.json'],
                dest: 'working/docs-nav-data-from-minjson-replace.json',
                replacements: [{
                    from: '\[{"smart-player-api',
                    to: '\{"smart-player-api'
                }, {
                    from: '\}\},\{',
                    to: '\},'
                }, {
                    from: '"Media API"}}]',
                    to: '"Media API"}}'
                }]
            },
            onPerform: {
                src: ['working/temp-perform.json'],
                dest: 'working/temp-perform-replace.json',
                replacements: [{
                    from: '\/video-cloud\/',
                    to: '\/perform\/'
                },
                {
                    from: '\[{"perform',
                    to: '\{"perform'
                }, {
                    from: '\}\},\{',
                    to: '\},'
                }, {
                    from: '"Oauth API"}}]',
                    to: '"Oauth API"}}}'
                }]
            },
        },
        concat: {
            buildjson: {
                src: ['source/header.json',
                    'working/docs-nav-data-from-minjson-replace.json',
                    'source/once-main.json',
                    'source/once.json',
                    'source/comma.txt',
                    'source/perform-main.json',
                    'working/temp-perform-replace.json',
                    'source/footer.json'
                ],
                dest: 'working/docs-nav-data.json'
            },
            buildvar: {
                src: ['source/var-name.txt',
                    'working/docs-nav-data.json',
                    'source/semicolon.txt'
                ],
                dest: 'working/docs-nav-data.min.js'
            },
        },
        jsonlint: {
            sample: {
                src: ['working/docs-nav-data.json']
            }
        },
        uglify: {
            dist: {
                src: 'working/docs-nav-data.min.js',
                dest: '../scripts/docs-nav-data.min.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-minjson');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task.
    grunt.registerTask('default', ['minjson', 'replace:onVC', 'replace:onPerform', 'concat:buildjson', 'jsonlint', 'concat:buildvar', 'uglify']);
}
