export const timelineShortcuts: Record<string, string> = {
	'k-timeline': 'm-0 p-0 box-border text-base text-ikun-tx-base text-14px list-none',
	'k-timeline-item': 'm-0 pr text-14px list-none pb-20px',

	'k-timeline-item-head':
		'border-ikun-main text-ikun-main pa w-10px h-10px bg-white rounded-full border-solid bd-3 box-border',
	'k-timeline-item-head--center': '-m-is-4px pos-inset-is-50%',
	'k-timeline-item-head--right': '-m-is-4px pos-inset-is-100%',
	'k-timeline-item-head--pending': 'border-dashed bdtr-2 animate-spin',

	'k-timeline-item-tail':
		'pa border-solid border-ikun-bd-base bdl-2 pos-inset-bs-10px pos-inset-is-4px',
	'k-timeline-item-tail--center': 'pos-inset-is-50%',
	'k-timeline-item-tail--right': '-m-is-1px pos-inset-is-100%',
	'k-timeline-item-tail--pending': 'border-dashed',

	'k-timeline-item-c__left': 'text-left',
	'k-timeline-item-c__right': 'text-right',
	'k-timeline-item-content--cl': 'k-timeline-tx-cl k-timeline-item-c__right m-is-0 me-26px',
	'k-timeline-item-content--cr': 'k-timeline-tx-cr k-timeline-item-c__left',
	'k-timeline-item-content--right': 'k-timeline-item-c__right mx-0 me-26px m-is-0',
	'k-timeline-item-content':
		'min-h-48px pr -pos-inset-bs-7px break-all m-is-26px me-0 m-bs-0 m-be-0'
};
