const URL =
	'https://kitsune4280.github.io/prometheus-x-course-task/db/books.json';

//const URL = './../db/books.json';

export const fetchBooks = () => {
	return fetch(URL).then((resp) => resp.json());
};
