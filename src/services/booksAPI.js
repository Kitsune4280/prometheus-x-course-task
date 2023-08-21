//const URL = 'http://localhost:3000/db/books.json';

const URL = './../db/books.json';

export const fetchBooks = () => {
	return fetch(URL).then((resp) => resp.json());
};
