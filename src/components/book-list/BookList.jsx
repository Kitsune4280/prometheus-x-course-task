import { useEffect } from 'react';
import { useBooks } from './../../hooks/use-books';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../search_bar/SearchBar';
import BookCard from '../book-card/BookCard';
import BooksNotFound from '../emergency/BooksNotFound';
import RecentBooks from '../recent-books/RecentBooks';

export default function BookList() {
	const {
		booksList,
		nameFilter,
		setNameFilter,
		authorFilter,
		setAuthorFilter,
		priceFilter,
		setPriceFilter,
		tagFilter,
		setTagFilter,
	} = useBooks();

	const params = useParams();
	const navigate = useNavigate();

	const handleTagClick = () => {
		setTagFilter('');
		navigate('/books');
	};

	useEffect(() => {
		document.title = 'JS Band Store | Books';
		setTagFilter(params.tag || '');
		setNameFilter('');
		setAuthorFilter('');
		setPriceFilter({ minPrice: 0, maxPrice: Number.MAX_VALUE });
	}, []);

	let filteredBooks =
		booksList
			.filter(
				(book) =>
					book.price >= priceFilter.minPrice &&
					book.price <= priceFilter.maxPrice
			)
			.filter((book) =>
				book.title.toLowerCase().includes(nameFilter.toLowerCase())
			)
			.filter((book) =>
				book.author.toLowerCase().includes(authorFilter.toLowerCase())
			) || [];

	if (tagFilter.length > 0)
		filteredBooks = filteredBooks.filter((book) =>
			book.tags.some((tag) => tag === tagFilter)
		);

	return (
		<div className='book-list'>
			<div className='book-list__content'>
				<SearchBar />
				<div
					className='book-list__tag-filter'
					style={{ display: tagFilter.length > 0 ? 'flex' : 'none' }}
				>
					<p onClick={handleTagClick}>
						{tagFilter}{' '}
						<span>
							<FontAwesomeIcon className='icon-clear' icon={faXmark} />
						</span>
					</p>
				</div>

				{filteredBooks.length === 0 ? (
					<BooksNotFound />
				) : (
					<div className='book-list__list'>
						{filteredBooks.map((book) => (
							<BookCard
								key={book.id}
								id={book.id}
								title={book?.title}
								author={book?.author}
								price={book?.price}
								image={book?.image}
								shortDescription={book?.shortDescription}
							/>
						))}
					</div>
				)}
			</div>
			<RecentBooks />
		</div>
	);
}
