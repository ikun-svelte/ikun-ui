/// <reference types="svelte" />

export enum KAFFIXPOSITION {
	top = 'top',
	bottom = 'bottom'
}

export type KAffixProps = {
	offset: number;
	position: KAFFIXPOSITION;
	target: string;
	z: number;
};
