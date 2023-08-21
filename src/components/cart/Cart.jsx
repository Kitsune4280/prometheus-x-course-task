import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/use-books';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CartItem from './../cart-item/CartItem';
import CartEmpty from './../emergency/CartEmpty';

export default function Cart() {
	const { bookCart, setBookCart } = useBooks();
	useEffect(() => {
		document.title = 'JS Band Store | Cart';
	}, []);

	const total = bookCart.reduce((acc, obj) => {
		const pr = +(obj.count * obj.price).toFixed(2);
		return acc + pr;
	}, 0);

	const showToastMessage = () => {
		toast.success('Transaction successfull! Thank you for your purchase!', {
			position: toast.POSITION.TOP_RIGHT,
			className: 'success-toast',
		});
	};

	const handlePurchase = () => {
		setBookCart([]);
		showToastMessage();
	};

	return (
		<div className='cart'>
			<div className='cart__buttons'>
				<Link to='/books' onClick={() => window.scrollTo(0, 0)}>
					Back to store
				</Link>
				<button disabled={bookCart.length === 0} onClick={handlePurchase}>
					Purchase
				</button>
				<ToastContainer />
			</div>
			{bookCart.length === 0 ? (
				<CartEmpty />
			) : (
				bookCart.map((book) => (
					<CartItem
						key={book?.id}
						id={book?.id}
						title={book?.title}
						author={book?.author}
						image={book?.image}
						count={book?.count}
						price={book?.price}
					/>
				))
			)}
			<div
				className='cart__total'
				style={{ visibility: bookCart.length === 0 ? 'hidden' : 'visible' }}
			>
				<h2>Total:</h2>
				<h2>$ {total.toFixed(2)}</h2>
			</div>
		</div>
	);
}
