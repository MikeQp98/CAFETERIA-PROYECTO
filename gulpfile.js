

const { src,dest,watch,series} = require ('gulp'); //para ejecutar las funciones
const sass = require ('gulp-sass')(require('sass')); // para compilar los estilos con sass
const postcss = require ('gulp-postcss');
const autoprefixer = require('autoprefixer'); //para darle soport a viejos navegadores
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//imagenes
const imagemin = require('gulp-imagemin'); // reducir peso de las imagenes
const webp = require('gulp-webp'); //convierte imagenes a webp
const avif = require('gulp-avif'); //convierte imagenes a webp


function css (done) {
    //pasos
    //Identificar archivo, compilar archivos y por ultimo almacenarlo
    src('src/scss/app.scss')
        .pipe(sourcemaps.init() )
        .pipe( sass( { outputStyle:'compressed'} ) ) // esto es para reducir la hoja de estilos
        .pipe( postcss([autoprefixer(), cssnano() ] ) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )
     done();
}

function imagenes() {
    return src ('src/img/**/*')
        .pipe( imagemin({optimizationLevel: 3}) )
        .pipe(dest('build/img'));
}

function imageneswebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp() )
        .pipe(dest ('build/img'))
}

function imagenesavif() {
    const opciones = {
        quality: 50
    }
         return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones) )
        .pipe(dest ('build/img'))
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imageneswebp = imageneswebp;
exports.imagenesavif = imagenesavif
exports.default = series(css, dev );


