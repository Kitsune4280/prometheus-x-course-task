import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useBooks } from '../../hooks/use-books';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SideComponent() {
	const [count, setCount] = useState(1);
	const { bookCart, setBookCart, currentBook } = useBooks();
	const maxCount = currentBook?.amount;

	const handleCountInputChange = ({ target: { value } }) => {
		value < 1
			? setCount(1)
			: value > maxCount
			? setCount(maxCount)
			: setCount(value);
	};

	const handleUpButtonClick = () => {
		if (maxCount > 0)
			setCount((prev) => (+prev < maxCount ? +prev + 1 : maxCount));
	};

	const handleDownButtonClick = () => {
		if (maxCount > 0) setCount((prev) => (+prev > 1 ? +prev - 1 : 1));
	};

	const showToastMessage = () => {
		toast.success('Book added to cart!', {
			position: toast.POSITION.TOP_RIGHT,
			className: 'success-toast',
		});
	};

	const handleAddButtonClick = () => {
		if (!bookCart.some((obj) => obj.id === currentBook?.id))
			setBookCart((prevState) => [
				...prevState,
				{
					id: currentBook.id,
					count: count,
					title: currentBook.title,
					author: currentBook.author,
					image: currentBook.image,
					price: currentBook.price,
				},
			]);
		else {
			let cart = [...bookCart];
			cart = cart.map((item) => {
				return item.id === currentBook.id
					? {
							id: currentBook.id,
							count: count,
							title: currentBook.title,
							author: currentBook.author,
							image: currentBook.image,
							price: currentBook.price,
					  }
					: item;
			});
			setBookCart(cart);
		}
		showToastMessage();
	};

	return (
		<div className='side-component'>
			<div className='side-component__row'>
				<span className='bold'>Price, $ </span>
				<span>{currentBook?.price}</span>
			</div>
			<div className='side-component__row'>
				<label htmlFor='count' className='bold'>
					Count
				</label>
				<div className='side-component__count-container'>
					<input
						data-testid='count-input'
						type='number'
						id='count'
						value={count}
						disabled={maxCount === 0}
						onChange={handleCountInputChange}
					/>
					<div className='side-component__count-btns'>
						<FontAwesomeIcon
							data-testid='up-btn'
							icon={faCaretUp}
							size='lg'
							className={count < maxCount ? '' : 'side-component__disabled'}
							onClick={handleUpButtonClick}
						/>
						<FontAwesomeIcon
							data-testid='down-btn'
							icon={faCaretDown}
							size='lg'
							className={count > 1 ? '' : 'side-component__disabled'}
							onClick={handleDownButtonClick}
						/>
					</div>
				</div>
			</div>
			<div className='side-component__row'>
				<span className='bold'>Total, $ </span>
				<span data-testid='total-price'>
					{(count * currentBook?.price).toFixed(2)}
				</span>
			</div>
			<button
				className='side-component__add-button'
				onClick={handleAddButtonClick}
				disabled={maxCount === 0}
			>
				Add to cart
			</button>
			<ToastContainer />
		</div>
	);
}
