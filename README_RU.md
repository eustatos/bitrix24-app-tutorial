Для расширения функциональности Bitrix24 удобно использовать приложения. 
В данной статье описано создание с нуля локального serverless приложения.

Для установки нашего приложения нам понадобится собственно портал bitrix24, в котором мы обладаем правами администратора или правом установки и редактирования приложений.

Если такого портала нет - создать его можно [здесь](https://www.bitrix24.ru/).

Панель управления приложениями доступна по адресу `https://<your-portal-name>.bitrix24.com/marketplace/local/`.

Выбираем пункт `Для личного использования`. После нажатия кнопки `Добавить` мы попадаем в диалог создания приложения.

Заполняем следующие поля:
| Название поля | Значение ||
|-|-|-|
|Название приложения*| exampleApp|Или любое другое|
|Russian (ru)| Пример приложения| Также можно заполнить значения для других нужных языков|
|Пользователи (user)| отмечаем галочкой| Сейчас нам понадобится только это разрешения, но в дальнейшем разрешения для приложения можно будет корректировать|

Здесь нам нужно будет остановится, так как добавлять пока нечего. Оставим вкладку браузера открытой и приступим к созданию нашего приложения.

## Официальная javascript-библиотека
Создадим папку с произвольным названием и в ней единственный пока файл `index.html`со следующим содержанием ([исходный код](https://github.com/eustatos/bitrix24-app-tutorial/blob/stage0/index.html)):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Bitrix24 app tutorial</title>
    <!-- подключаем библиотеку BX24 -->
    <script src="https://api.bitrix24.com/api/v1/"></script>
  </head>
  <body>
    <script>
      /**
      * передаем методу  `init` в качестве параметра callback-функцию 
      * - наше приложение 
      */
      BX24.init(app);

      function app() {
        const initDate = BX24.getAuth();
        console.log("ititDate: ", initDate);
      }
    </script>
  </body>
</html>
```
Помещаем файл `index.html` в zip-архив и указываем этот архив в качестве значения поля `Загрузите архив с вашим приложением (zip)*` в диалоге создания приложения.
Затем нажимаем кнопку "Сохранить"

![](https://habrastorage.org/webt/rp/yr/ap/rpyrap4yg8u1_yzwqilxekoajoq.png)

Посмотрим, что у нас получилось.
![](https://habrastorage.org/webt/rp/yr/ap/rpyrap4yg8u1_yzwqilxekoajoq.png)
Кликаем по `Перейти к приложению` и видим ... пустое место на месте нашего приложения.

Все необходимое для нас на данном этапе находится сейчас в консоли разработчика.
![](https://habrastorage.org/webt/6w/l-/9x/6wl-9x5nbe8mqiuvx8o_mncbijc.png)
Мы видим, что наше приложение успешно получило данные необходимые для авторизации.

## Официальная javascript-библиотека c promise
Использование callback-функций имеет свои преимущества, но не всем нравится или не всегда подходит к ситуации. 
Поэтому попробуем получить тот же результат в promise-стиле. Для этого изменим наш `index.html` ([исходный код](https://github.com/eustatos/bitrix24-app-tutorial/blob/stage1/index.html)) 
```diff
   <body>
     <script>
       /**
-      * передаем методу  `init` в качестве параметра callback-функцию 
-      * - наше приложение 
-      */
-      BX24.init(app);
+       * оборачиваем метод  `init` в promise
+       */
+      var bx24Promise = new Promise(function(resolve, reject) {
+        try {
+          BX24.init(resolve);
+        } catch (err) {
+          resolve(err);
+        }
+      });
+
+      bx24Promise
+        .then(function() {
+          app();
+        })
+        })
+        .catch(function(err) {
+          console.error(err);
+        });
```
После этого переходим `https://<your-portal-name>.bitrix24.com/marketplace/local/list/`.
Переходим к редактированию нашего приложения. Измененный файл `index.html` помещаем в zip-архив и обновляем его в нашем приложении.
Смотрим результат - все работает.
Если откроем файл `index.html` в браузере локально, то увидим, что обработка ошибок тоже работает.
![](https://habrastorage.org/webt/gi/fj/kw/gifjkw_cdz6zfi2v-4yonllv620.png)

## Неофициальная библиотека BX24

Если вы планируете писать приложение на typescript (можно использовать и с javascript) и/или обладаете умеренным авантюризмом, то можно попробовать использовать сторонние библиотеки для авторизации.
Например [эту](https://www.npmjs.com/package/bx24).
В этом случае наш `index.html` нужно будет изменить следующим образом:
```diff
     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
     <title>Bitrix24 app tutorial</title>
     <!-- подключаем библиотеку BX24 -->
-    <script src="https://api.bitrix24.com/api/v1/"></script>
+    <script src="https://unpkg.com/bx24@latest/lib/index.js"></script>
   </head>
   <body>
     <script>
-      /**
-       * оборачиваем метод  `init` в promise
-       */
-      var bx24Promise = new Promise(function(resolve, reject) {
-        try {
-          BX24.init(resolve);
-        } catch (err) {
-          resolve(err);
-        }
-      });
+        var bx24 = new BX24();
 
-      bx24Promise
-        .then(function() {
-          app();
+        bx24.getAuth()
+        .then(function(auth) {
+            console.log(auth);
         })
-        .catch(function(err) {
-          console.error(err);
-        });
-
-      function app() {
-        const initDate = BX24.getAuth();
-        console.log("ititDate: ", initDate);
-      }
     </script>
   </body>
 </html>
```
Опять архивируем, опять обновляем наше приложение, опять смотрим, опять все работает.
