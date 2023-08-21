import { Link } from 'react-router-dom';
import noImage from './../../images/no-image.png';

export default function RecentBookCard({ id, image, title, author, price }) {
	return (
		<Link
			to={`/books/${id}`}
			className='card recent-book-card'
			onClick={() => window.scrollTo(0, 0)}
		>
			<div className='recent-book-card__image-container'>
				<img src={image.length === 0 ? noImage : image} alt='Book cover' />
			</div>
			<h5>{title}</h5>
			<h5>{author}</h5>
			<h5>$ {price}</h5>
		</Link>
	);
}
