export const baseShortcuts: Record<string, string> = {
	// general
	// 'k-bg-base': 'bg-white dark:bg-[#222]',
	'k-border-base': 'border-gray-400/50',
	'k-transition': 'transition-all duration-200',
	'k-focus-base': 'ring-2 ring-context/50',
	'k-active-base': 'ring-3 ring-context/10',
	'k-borderless': '!border-none !shadow-none',
	'k-solid': 'bg-context border-context c-white',
	'k-transparent': 'bg-light-100 dark:bg-lightBackground c-baseText',
	'k-light':
		'shadow-transparent bg-context:12 !hover-bg-context border-context c-context !hover-c-white !active-c-white !hover-border-context !active-border-context:64 !active-bg-context:64',
	'k-light-simple': 'shadow-transparent bg-context:12 border-context c-context',
	'k-text': `!shadow-transparent !bg-transparent !hover-bg-context:32 !active-bg-context:12
                   !border-transparent
                   !c-context`,
	'k-description': 'text-darkSubText break-all',
	'k-disabled': 'opacity-40 cursor-not-allowed'
};
