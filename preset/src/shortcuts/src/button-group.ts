const KButtonBaseClass = 'k-button--base';

export const buttonGroupShortcuts: Record<string, string> = {
	// button group
	'k-button-group': `inline-block v-mid before-content-empty before-table after-content-empty after-table after-clear-both
	[&>.${KButtonBaseClass}]:float-left [&>.${KButtonBaseClass}]:relative [&>.${KButtonBaseClass}]:z-0
	[&>.${KButtonBaseClass}+&>.${KButtonBaseClass}]:ml-0
	[&>.${KButtonBaseClass}:first-child]:b-rd-r-0!
	[&>.${KButtonBaseClass}:last-child]:b-rd-l-0!
	[&>.${KButtonBaseClass}:not(:first-child):not(:last-child)]:b-rd-0!
	[&>.${KButtonBaseClass}:not(:last-child)]:mr-2px
	[&>.${KButtonBaseClass}]:hover:z-1
	[&>.${KButtonBaseClass}]:focus:z-1
	[&>.${KButtonBaseClass}]:active:z-1`
};
