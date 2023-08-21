import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../hooks/use-books';
import { LS_KEYS, LocalStorageService } from '../../services/localStorage';
import compLogo from './../../images/crane_logo.png';

export default function Signin() {
	useEffect(() => {
		document.title = 'JS Band Store | Signin';
	}, []);
	const navigate = useNavigate();
	const { user, setUser, setBookCart, setRecent } = useBooks();
	const handleUserChange = ({ target: { value } }) => {
		setUser(value);
	};

	const handleSubmitButtonClick = (event) => {
		event.preventDefault();
		if (user !== LocalStorageService.get(LS_KEYS.STORE_USER)) {
			setBookCart([]);
			setRecent([]);
			LocalStorageService.set(LS_KEYS.STORE_USER, user);
		}
		navigate('/books');
	};

	return (
		<div className='signin'>
			<div className='card signin__container'>
				<img src={compLogo} alt='Company logo' />
				<form action='/' method='post'>
					<div className='signin__input-container'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							id='username'
							placeholder='Username'
							value={user}
							onChange={handleUserChange}
						/>
					</div>
					<p
						className='signin__warning-msg'
						style={{
							visibility:
								user.length > 0 && (user.length < 4 || user.length > 16)
									? 'visible'
									: 'hidden',
						}}
					>
						Username should be 4-16 characters long
					</p>
					<button
						type='submit'
						disabled={user.length < 4 || user.length > 16}
						onClick={handleSubmitButtonClick}
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
}
