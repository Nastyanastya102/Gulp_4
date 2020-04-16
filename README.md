## Gulp 4. Версия с Bootstrap + SCSS

 Стартовая сборка для Фронтенда

# Что включает в себя сборка?

* gulp-autoprefixer — автоматически расставляет вендорные префиксы в CSS в соответствии с сервисом Can I Use;
* gulp-pug — компиляция Pug в HTML;
* gulp-concat - конкатенация файлов;
* gulp-sass — компиляция SASS,SCSS в CSS;
* gulp-rename — переименование файлов;
* gulp-watch — отслеживание изменений в файлах проекта;
* Browsersync — автообновление браузера;

# Как пользоваться?

Установить Node JS
Далее, используя cmd в Windows или Терминал Linux/macOS, проделайте следующие шаги:

Скачать сборку: git clone https://github.com/Nastyanastya102/Gulp_4.git
Ставим утилиту глобально $ npm install gulpjs/gulp-cli -g;
Устанавливаем Gulp 4 в папку с проектом $ npm install gulp --save-dev;
Проверка версии gulp и чтобы убедиться, что все корректно установлено: gulp - gulp -v;

# Начало работы

Устанавливаем пакеты из package.json: npm i;
Основная команда: gulp запускает слежку за файлами gulp-watch и browserSync
Сборка проекта: gulp build проект собирается в папке build

# Порядок установки нового плагина

После установки нового плагина через npm необходимо добавить его в gulpfile.js в таски default и build


