import { afterEach, beforeEach, describe } from 'vitest';

let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	document.body.innerHTML = '';
});

describe('Test: KAlert', () => {});
