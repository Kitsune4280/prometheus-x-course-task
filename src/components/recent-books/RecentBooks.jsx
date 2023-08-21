import { useBooks } from '../../hooks/use-books';
import RecentBookCard from '../recent-book-card/RecentBookCard';

export default function RecentBooks() {
	const { recent } = useBooks();

	return (
		<div
			className='recent-books'
			style={{
				display: recent.length === 0 ? 'none' : 'flex',
			}}
		>
			<h2>Recently wieved books:</h2>
			<div className='recent-books__list'>
				{recent.map((book) => (
					<RecentBookCard
						key={book?.id}
						id={book?.id}
						image={book?.image}
						title={book?.title}
						author={book?.author}
						price={book?.price}
					/>
				))}
			</div>
		</div>
	);
}
