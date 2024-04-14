# Movie App Инструкция 

### Методы API:

1. fetchMoviesWithFilters:
   - Данный метод предназначен для получения списка фильмов из Kinopoisk API с применением заданных критериев поиска и параметров пагинации.
   - Параметры:
     - params - Объект с критериями поиска и опциями пагинации.
   - Пример запроса:
 const params = {
         page: 1,
         limit: 10,
         selectFields: ['title', 'year'],
     };
     `const movies = await fetchMoviesWithFilters(params);`
2. searchMoviesByTitle:
   - Этот метод предназначен для поиска фильмов по названию.
   - Параметры:
     - query - Строка запроса для поиска по названию фильма.
     - page (необязательный) - Номер страницы результатов.
     - limit (необязательный) - Количество результатов на странице.
   - Пример запроса:
     `const query = 'The Matrix';
     const searchResults = await searchMoviesByTitle(query, 1, 10);`
   -Пример ответа:
`{
         "searchResults": [
             {
                 "title": "The Matrix",
                 // Другая информация о фильме
             }
         ]
     }`
3. fetchMovieDetails:
   - Метод предназначен для получения подробной информации о фильме по его ID.
   - Параметры:
     - movieId - ID фильма.
   - Пример запроса:
      `const movieId = '12345';
     const movieDetails = await fetchMovieDetails(movieId);`
   - Пример ответа: 
      `{
         "title": "Movie Title",
         "description": "Movie Description",
         // Другие детали о фильме
     }`



     


     



