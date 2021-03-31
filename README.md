# Todo App

![React](https://sun9-64.userapi.com/impg/LeQM4glVy5UuJbAJAH_N_wV9hkKkO6Y53jF5FA/2NG8BajZF_A.jpg?size=1877x1010&quality=96&sign=397c41c4eb3d2f476937c4115fced01e&type=album)
![React](https://sun9-27.userapi.com/impg/9w8wHqpGoFTQ9WdvZvc2sKlNya6Itgx5r1LtyQ/3Qho2UT2Nes.jpg?size=1877x1010&quality=96&sign=5b3432bd7fcb10ec2e2e084781c836af&type=album)

### Описание: 

Todo приложение сделанное в стиле Neomorphism, собранно через `create-react-app`. 
Цель для которой я создал этот проект это изучить React Hooks. Но также получить 
опыт в поддержке кода, так-как постепенно буду дописывать новые фичи.

Что я сделал: попросил друзей предложить что можно еще добавить в приложение и так на данный 
момент в правом-верхнем углу есть меню выбора цветовых тем (как пример). Постепенно я буду 
внедрять новые хуки и так-же прикреплю `Redux`, все это по мере изучения. Список изменений 
можно увидеть ниже.

Для демонтрации на данный момент все ToDo сохраняются в LocalStorage, дальше это будет Firebase.

### Запустить можно через команду `npm start`

Стек на данный момент: `React`, `react-fontawesome`, `SCSS`


___
### Запланированно: 

 - [X] ~~Поправить анимации, использовать `ReactTransitionGroup`.~~
 - [ ] Добавить больше цветовых тем. 
 - [ ] Добавить поиск по названию.
 - [X] ~~Добавить возможность редактировать текс ToDo~~.
 - [ ] Добавить возможность поставить подзадачу в ToDo.
___
### Список изменений: 

#### v 1.0
 - Основой функционал ToDo приложения. Задачу можно удалить пометить как важную и законченную
 - Поле для нового ToDo расширяется взависимости от размера текста.
 - Нажатие на Enter добавит ToDo, Shift + Enter переносит строку.
 - Фильтр будет отображать только то что выберет пользователь.
 - На уровне с фильтром добавленна информация о количестве ToDo, где a = All, i = Important, d = Done.
 - Если ToDo пометить как Done то метка о важности автоматически пропадет.
 - Добавленно меню выбора цветовой темы, все темы есть в файле `themes.scss`.
 
#### v 1.1
  - Добавил возможность редактировать текст после добавления.
    - (баг) Если перейти на другую строку с пустой строи то после сохранния добавится еще одна.
  - Теперь SCSS файлы лежат в отдельной папке. 

#### v 1.1.6
  - Незначительное изменение кода.
  - Практически весь код пропущен через `Prettier`.

#### v 2.0
  - Добавление анимации с `ReactTransitionGroup`.
  - Добавлено модальное окно при попытке удалить todo.
  - Меню выбора темы и модальное окно закрываются при клике вне обекта.
  - Исправлен баг при редактировании текста.
  - Исправления в стилях.
 #### v 2.0.1
  - Исправление в названиях классов.