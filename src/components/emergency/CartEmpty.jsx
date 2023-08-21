import EmptyCart from './../../images/cart-empty.png';

export default function CartEmpty() {
	return (
		<div className='cart-empty'>
			<h1>Your cart is empty!</h1>
			<img src={EmptyCart} alt='Empty cart' />
		</div>
	);
}
