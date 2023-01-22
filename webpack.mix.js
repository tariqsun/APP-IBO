const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.options({
        minimize:true,
        optimization: {
            minimize: false,
        },
        uglify: {
            uglifyOptions: {
                warnings: false,
                comments: false,
                beautify: true,
                minify: true,
                minimize: true,
                compress: {
                drop_console: true,
                minimize: true,
                }
            }
        },
        cssnano:true,
    })
    .js('resources/js/app.js', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css/app.css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer')
    ])
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve('resources/js')
            }
        },
    })
    .version()
    .sourceMaps();

