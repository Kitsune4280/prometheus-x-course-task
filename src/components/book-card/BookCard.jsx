import { Link } from 'react-router-dom';
import noImage from './../../images/no-image.png';

export default function BookCard({
	id,
	title,
	author,
	price,
	image,
	shortDescription,
}) {
	return (
		<article className='card book-card' id={id}>
			<div className='book-card__cover'>
				<img src={image.length > 0 ? image : noImage} alt='Book cover' />
			</div>
			<div className='book-card__data'>
				<h3>{title}</h3>
				<h4>{author}</h4>
				<div className='book-card__bottom'>
					<h4>$ {price}</h4>
				</div>
			</div>
			<div className='book-card__description'>
				<p className='book-card__description-text'>{shortDescription}</p>
				<Link
					to={`/books/${id}`}
					className='book-card__link'
					onClick={() => window.scrollTo(0, 0)}
				>
					View
				</Link>
			</div>
		</article>
	);
}
