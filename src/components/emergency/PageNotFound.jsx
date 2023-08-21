import Error404 from './../../images/page-not-found.png';

export default function PageNotFound() {
	return (
		<div className='page-not-found'>
			<img src={Error404} alt='No books found' />
		</div>
	);
}
