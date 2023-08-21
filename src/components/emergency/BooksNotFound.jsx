import Empty from './../../images/empty.png';

export default function BooksNotFound() {
	return (
		<div className='books-not-found'>
			<h1>Nothing like that here &lt;(｀^´)&gt; </h1>
			<img src={Empty} alt='No books found' />
		</div>
	);
}
