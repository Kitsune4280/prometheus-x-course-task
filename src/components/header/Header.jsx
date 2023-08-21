import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBooks } from '../../hooks/use-books';
import { LS_KEYS, LocalStorageService } from '../../services/localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import compLogo from './../../images/crane_logo.png';
import userpic from './../../images/userpic.png';

export default function Header({ navHidden }) {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const navigate = useNavigate();
	const { user, setUser, setBookCart, setRecent } = useBooks();

	const handleSignOutButtonClick = () => {
		setUser('');
		setBookCart([]);
		setRecent([]);
		LocalStorageService.remove(LS_KEYS.STORE_USER);
		LocalStorageService.remove(LS_KEYS.STORE_CART);
		LocalStorageService.remove(LS_KEYS.STORE_RECENT);
		navigate('/signin');
	};

	const handleMenuButtonClick = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<header className='header'>
			<div className='header__container'>
				<Link
					to={'/books'}
					className='header__company'
					onClick={() => window.scrollTo(0, 0)}
				>
					<img src={compLogo} alt='Company logo' className='header__logo' />
					<h2>JS Band Store | Zubareva</h2>
				</Link>
				<nav
					style={{
						display: !user || user.length === 0 || navHidden ? 'none' : 'flex',
					}}
				>
					<ul
						className={isCollapsed ? 'header__collapsed' : 'header__expanded'}
					>
						<li className='header__cart-item'>
							<Link to={'/cart'} onClick={() => window.scrollTo(0, 0)}>
								<FontAwesomeIcon
									className='header__cart-icon'
									icon={faCartShopping}
									size='xl'
								/>
							</Link>
						</li>
						<li className='header__logout-item'>
							<button onClick={handleSignOutButtonClick}>
								<span>Sign out</span>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
							</button>
						</li>
						<li className='header__username-item'>
							<p>{user}</p>
						</li>
					</ul>
					<button
						disabled={window.innerWidth > 600 ? true : false}
						className='header__menu-button'
						onClick={handleMenuButtonClick}
						style={{
							backgroundImage:
								`url("https://i.pravatar.cc/300?u=${user}")` || userpic,
						}}
					></button>
				</nav>
			</div>
		</header>
	);
}
