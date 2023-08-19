import type { FormInstance } from './types';

export const createForm: () => FormInstance = () => {
	return {
		data: {},
		submit: () => console.log('submit')
	};
};
