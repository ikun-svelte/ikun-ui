export const carouselShortcuts: Record<string, string> = {
	// carousel
	'k-carousel': 'pr overflow-hidden [&>[data-carousel-container]>*]:flex-1',
	'k-carousel-wrap': 'pr flex',
	'k-carousel-pager': 'pa w-full fb k-carousel-center',
	'k-carousel-pager-icon':
		'rounded-full bg-white shadow h-32px w-32px infcc cursor-pointer hover:text-ikun-main border-none outline-none',
	'k-carousel-pager-prev': 'ml-2',
	'k-carousel-pager-next': 'mr-2',
	'k-carousel-indicators': 'pa w-full fc bottom-12px',
	'k-carousel-indicators-item':
		'h-6px w-6px rounded-full mr-8px bg-ikun-bg-grs cursor-pointer k-carousel-item',
	'k-carousel-indicators-item--active': 'bg-ikun-main w-24px k-carousel-item'
};
