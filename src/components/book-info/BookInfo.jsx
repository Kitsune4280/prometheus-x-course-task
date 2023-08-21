import React from 'react';
import { Link } from 'react-router-dom';
import noImage from './../../images/no-image.png';

export default function BookInfo({
	image,
	title,
	author,
	level,
	tags,
	description,
	isAvailable,
}) {
	const imgPath = image || '';
	const bookTags = tags || [];

	return (
		<div className='book-info'>
			<div className='book-info__top'>
				<div
					className='book-info__book-cover'
					style={{
						backgroundImage: `url(${imgPath.length > 0 ? imgPath : noImage})`,
					}}
				></div>

				<div className='book-info__book-data'>
					<h2
						style={{
							display: isAvailable ? 'none' : 'block',
							color: '#ff4d4d',
						}}
					>
						This book is out of stock!
					</h2>
					<h1>{title}</h1>
					<h2>{author}</h2>
					<p>
						<span className='bold'>Book level: </span>
						<span>{level}</span>
					</p>
					<ul>
						{bookTags.map((tag, index) => (
							<li key={index}>
								<Link to={`/tagsearch/${tag}`}>{tag}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='book-info__book-descr'>
				<p>{description}</p>
			</div>
		</div>
	);
}

export const MemoizedBookInfo = React.memo(BookInfo);
