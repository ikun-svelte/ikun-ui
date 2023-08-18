import type { FormInstance } from './types';

export const createForm: () => FormInstance = () => {
	return {
		submit: () => console.log('submit')
	};
};
