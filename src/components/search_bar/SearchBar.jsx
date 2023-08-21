import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useBooks } from '../../hooks/use-books';

export default function SearchBar() {
	const {
		nameFilter,
		setNameFilter,
		authorFilter,
		setAuthorFilter,
		setPriceFilter,
	} = useBooks();

	const handleNameFilterChange = ({ target: { value } }) => {
		setNameFilter(value);
	};

	const handleAuthorFilterChange = ({ target: { value } }) => {
		setAuthorFilter(value);
	};

	const handlePriceFilterChange = ({ target: { value } }) => {
		switch (value) {
			case '<15':
				setPriceFilter({
					minPrice: 0,
					maxPrice: 15,
				});
				break;
			case '15-30':
				setPriceFilter({
					minPrice: 15,
					maxPrice: 30,
				});
				break;
			case '>30':
				setPriceFilter({
					minPrice: 30,
					maxPrice: Number.MAX_VALUE,
				});
				break;
			default:
				setPriceFilter({
					minPrice: 0,
					maxPrice: Number.MAX_VALUE,
				});
				break;
		}
	};

	const clearNameSearch = () => setNameFilter('');

	const clearAuthorFilter = () => setAuthorFilter('');

	return (
		<div className='search-bar'>
			<div className='search-bar__search'>
				<FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
				<input
					value={nameFilter}
					type='text'
					placeholder='Search books by name'
					onChange={handleNameFilterChange}
				/>
				<FontAwesomeIcon
					className='icon-clear'
					icon={faXmark}
					size='lg'
					onClick={clearNameSearch}
				/>
			</div>

			<div className='search-bar__search'>
				<FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
				<input
					value={authorFilter}
					type='text'
					placeholder='Search books by author'
					onChange={handleAuthorFilterChange}
				/>
				<FontAwesomeIcon
					className='icon-clear'
					icon={faXmark}
					size='lg'
					onClick={clearAuthorFilter}
				/>
			</div>

			<select
				name='price'
				id='price_select'
				defaultValue='all'
				onChange={handlePriceFilterChange}
			>
				<option value='all'>All prices</option>
				<option value='<15'>&lt; 15$</option>
				<option value='15-30'>15$ - 30$</option>
				<option value='>30'>&gt; 30$</option>
			</select>
		</div>
	);
}
