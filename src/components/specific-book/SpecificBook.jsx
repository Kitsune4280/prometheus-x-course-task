import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../../hooks/use-books';
import { MemoizedBookInfo } from './../book-info/BookInfo';
import { SomethingWrong } from './../emergency/SomethingWrong';
import RecentBooks from '../recent-books/RecentBooks';
import 'react-toastify/dist/ReactToastify.css';
import SideComponent from '../side-component/SideComponent';

export default function SpecificBook() {
	const params = useParams();
	const { booksList, recent, setRecent, setCurrentBook } = useBooks();

	const book = booksList.find((item) => item.id === +params.id);

	useEffect(() => {
		if (book && !recent.some((obj) => obj.id === book.id)) {
			setRecent((prevState) => [
				...prevState,
				{
					id: book.id,
					title: book.title,
					author: book.author,
					image: book.image,
					price: book.price,
				},
			]);
		}
		document.title = `JS Band Store | ${book?.title || 'Oopsie'}`;
		setCurrentBook(book);
	}, [book]);

	return book ? (
		<main className='specific-book'>
			<div className='specific-book__content'>
				<MemoizedBookInfo
					image={book?.image}
					title={book?.title}
					author={book?.author}
					level={book?.level}
					tags={book?.tags}
					description={book?.description}
					isAvailable={book?.amount > 0}
				/>
				<SideComponent />
			</div>
			<RecentBooks />
		</main>
	) : (
		<SomethingWrong />
	);
}
