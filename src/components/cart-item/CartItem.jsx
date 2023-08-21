import { useBooks } from '../../hooks/use-books';
import { Link } from 'react-router-dom';
import noImage from './../../images/no-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CartItem({ id, title, author, image, count, price }) {
	const { bookCart, setBookCart } = useBooks();

	const handleItemRemoveClick = () => {
		const cart = bookCart.filter((el) => el.id !== id);
		setBookCart(cart);
	};

	return (
		<div className='cart-item'>
			<Link className='cart-item__link' to={`/books/${id}`}>
				<img src={image.length > 0 ? image : noImage} alt={`${title} cover`} />
				<div className='cart-item__book-info'>
					<h2>{title}</h2>
					<h4>{author}</h4>
				</div>
			</Link>
			<FontAwesomeIcon
				icon={faTrash}
				size='xl'
				className='cart-item__trash-icon'
				onClick={handleItemRemoveClick}
			/>
			<h3>{count}</h3>
			<h3>
				$ <span>{(count * price).toFixed(2)}</span>
			</h3>
		</div>
	);
}
