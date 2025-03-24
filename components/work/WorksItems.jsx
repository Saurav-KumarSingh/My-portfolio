import React, { useState, useRef, useEffect } from 'react';

const WorksItems = ({ item }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const previewRef = useRef(null);
	const previewTimeoutRef = useRef(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(previewTimeoutRef.current);
		};
	}, []);

	const handleDemoClick = (e) => {
		e.preventDefault();
		if (item.status === 'development') {
			setShowTooltip(true);
		} else if (item.demoUrl && item.demoUrl !== '#') {
			window.open(item.demoUrl, '_blank');
		}
	};

	const handleSourceClick = (e) => {
		e.preventDefault();
		if (item.sourceUrl && item.sourceUrl !== '#') {
			window.open(item.sourceUrl, '_blank');
		}
	};

	const handleViewClick = () => {
		if (item.status === 'completed' && item.demoUrl && item.demoUrl !== '#') {
			window.open(item.demoUrl, '_blank');
		}
	};

	const handleImageHover = () => {
		if (!isMobile && item.status === 'completed' && item.demoUrl !== '#') {
			previewTimeoutRef.current = setTimeout(() => setShowPreview(true), 500);
		}
	};

	const handleImageLeave = () => {
		clearTimeout(previewTimeoutRef.current);
		setShowPreview(false);
	};

	return (
		<div className='work__card'>
			<div
				className='work__img-container'
				onMouseEnter={handleImageHover}
				onMouseLeave={handleImageLeave}
			>
				<img src={item.image} alt={item.title} className='work__img' />
				{!isMobile && showPreview && item.status === 'completed' && item.demoUrl !== '#' && (
					<div className="work__preview" ref={previewRef}>
						<img src={item.image} alt="Preview" className="work__preview-img" />
					</div>
				)}
			</div>
			<h3 className='work__title'>{item.title}</h3>
			<p className='description'>{item.description}</p>

			<div className='work__button-container'>
				<a
					href='#'
					className='work__button'
					onClick={handleDemoClick}
					onMouseEnter={() => item.status === 'development' && setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
				>
				{item.category}
				</a>
				{showTooltip && item.status === 'development' && (
					<div className='work__tooltip'>Under Development</div>
				)}
				{item.status === 'completed' && item.demoUrl !== '#' && (
					<button className="view-button" onClick={handleViewClick}>
						View ⮞
					</button>
				)}
			</div>
		</div>
	);
};

export default WorksItems;