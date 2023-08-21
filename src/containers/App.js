import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { BooksProvider } from '../hooks/use-books';
import { fetchBooks } from '../services/booksAPI';
import { LS_KEYS, LocalStorageService } from '../services/localStorage';
import './App.css';
import LoginPage from '../routes/LoginPage';
import BooksListPage from '../routes/BooksListPage';
import SelectedBookPage from '../routes/SelectedBookPage';
import NotFoundPage from '../routes/NotFoundPage';
import { SomethingWrong } from './../components/emergency/SomethingWrong';
import CartPage from '../routes/CartPage';
import ProtectedRoute from '../routes/ProtetedRoute';

function App() {
	const [user, setUser] = useState(
		LocalStorageService.get(LS_KEYS.STORE_USER) || ''
	);
	const [booksList, setBooksList] = useState([]);
	const [nameFilter, setNameFilter] = useState('');
	const [authorFilter, setAuthorFilter] = useState('');
	const [priceFilter, setPriceFilter] = useState({
		minPrice: 0,
		maxPrice: Number.MAX_VALUE,
	});
	const [tagFilter, setTagFilter] = useState('');
	const [bookCart, setBookCart] = useState(
		LocalStorageService.get(LS_KEYS.STORE_CART) || []
	);
	const [recent, setRecent] = useState(
		LocalStorageService.get(LS_KEYS.STORE_RECENT) || []
	);
	const [currentBook, setCurrentBook] = useState({});

	useEffect(() => {
		fetchBooks().then((data) => setBooksList(data.books) || []);
	}, []);

	useEffect(
		() => LocalStorageService.set(LS_KEYS.STORE_CART, bookCart),
		[bookCart]
	);

	useEffect(
		() => LocalStorageService.set(LS_KEYS.STORE_RECENT, recent),
		[recent]
	);

	return (
		<ErrorBoundary fallback={<SomethingWrong />} onError={console.log(Error)}>
			<BooksProvider
				value={{
					user,
					setUser: (u) => setUser(u),
					booksList,
					setBooksist: (i) => setBooksList(i),
					nameFilter,
					setNameFilter: (f) => setNameFilter(f),
					authorFilter,
					setAuthorFilter: (f) => setAuthorFilter(f),
					priceFilter,
					setPriceFilter: (f) => setPriceFilter(f),
					tagFilter,
					setTagFilter: (f) => setTagFilter(f),
					bookCart,
					setBookCart: (f) => setBookCart(f),
					recent,
					setRecent: (f) => setRecent(f),
					// count,
					// setCount: (f) => setCount(f),
					currentBook,
					setCurrentBook: (f) => setCurrentBook(f),
				}}
			>
				<HashRouter>
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route index exact path='/signin' element={<LoginPage />} />
						<Route
							exact
							path='/books'
							element={
								<ProtectedRoute user={user}>
									<BooksListPage />
								</ProtectedRoute>
							}
						/>
						<Route
							exact
							path='/cart'
							element={
								<ProtectedRoute user={user}>
									<CartPage />
								</ProtectedRoute>
							}
						/>

						<Route
							exact
							path='books/:id'
							element={
								<ProtectedRoute user={user}>
									<SelectedBookPage />
								</ProtectedRoute>
							}
						/>
						<Route
							exact
							path='tagsearch/:tag'
							element={
								<ProtectedRoute user={user}>
									<BooksListPage />
								</ProtectedRoute>
							}
						/>
						{/* //! NOT SURE IF WORKING  */}
						<Route path='/404' element={<NotFoundPage />} />
						<Route path='*' element={<Navigate to='/404' replace />} />
					</Routes>
				</HashRouter>
			</BooksProvider>
		</ErrorBoundary>
	);
}

export default App;
