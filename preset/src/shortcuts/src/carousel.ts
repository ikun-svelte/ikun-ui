export const carouselShortcuts: Record<string, string> = {
	// carousel
	'k-carousel': 'pr',
	'k-carousel-wrap': 'pr overflow-hidden [&>[data-carousel-container]>*]:flex-1',
	'k-carousel-item-wrap': 'pr flex',
	'k-carousel-arrow': 'pa w-full fb k-carousel-center',
	'k-carousel-arrow-icon':
		'rounded-full bg-white shadow h-32px w-32px infcc cursor-pointer hover:text-ikun-main border-none outline-none',
	'k-carousel-arrow-prev': 'ml-2',
	'k-carousel-arrow-next': 'mr-2',
	// dark
	'k-carousel-arrow-icon--dark': 'dark:[&>span:hover]:text-ikun-main dark:[&>span]:text-black'
};
