export type FormInstance = {
	values?: any;
	submit: () => void;
	setValue: (field: string, value: any) => void;
	setValues: (values: any) => void;
};
