import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSkeleton from '../src/index.svelte';
import KSkeletonLoading from './fixture/loading.svelte';
import KSkeletonTitle from './fixture/title.svelte';
import KSkeletonParagraph from './fixture/paragraph.svelte';
import KSkeletonAvatar from './fixture/avatar.svelte';
import KSkeletonActive from './fixture/active.svelte';
import KSkeletonRound from './fixture/round.svelte';
import KSkeletonSize from './fixture/size.svelte';
import KOverideParagraph from './fixture/overide.paragraph.svelte';
import KOverideTitle from './fixture/overide.title.svelte';
import KOverideAvatar from './fixture/overide.avatar.svelte';
import KOverideRound from './fixture/overide.round.svelte';
import KSkeletonTitleComp from '../src/title.svelte';
import KSkeletonParagraphComp from '../src/paragraph.svelte';
import KSkeletonAvatarComp from '../src/avatar.svelte';
import KSkeletonButtonComp from '../src/button.svelte';
import KSkeletonInputComp from '../src/input.svelte';
import KSkeletonImageComp from '../src/image.svelte';
import KSkeletonImageCompSlot from './fixture/image.slot.svelte';
import KSkeletonSlot from './fixture/slot.svelte';
import KSkeletonSlotSK from './fixture/slot.skeleton.svelte';
import { tick } from 'svelte';

let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KSkeleton', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeleton({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: loading', async () => {
		// @ts-ignore
		const instance = new KSkeletonLoading({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('hello')).not.toBeTruthy();
		const btn = host.querySelector('#test_loading');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('hello')).toBeTruthy();
	});

	test('props: title show', async () => {
		// @ts-ignore
		const instance = new KSkeletonTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title')).toBeTruthy();
		const btn = host.querySelector('#test_title');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('k-skeleton-title')).not.toBeTruthy();
	});

	test('props: paragraph show', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraph({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph')).toBeTruthy();
		const btn = host.querySelector('#test_paragraph');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('k-skeleton-paragraph')).not.toBeTruthy();
	});

	test('props: avatar show', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatar({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar')).toBeTruthy();
		const btn = host.querySelector('#test_avatar');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('k-skeleton-avatar')).not.toBeTruthy();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonActive({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		const btn = host.querySelector('#test_active');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('k-skeleton--active')).not.toBeTruthy();
	});

	test('props: round', async () => {
		// @ts-ignore
		const instance = new KSkeletonRound({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--round')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--round')).toBeTruthy();
		const btn = host.querySelector('#test_round');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('k-skeleton-title--round')).not.toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--round')).not.toBeTruthy();
	});

	test('props: size', async () => {
		// @ts-ignore
		const instance = new KSkeletonSize({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar-sk--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar-container--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-content--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--sm')).toBeTruthy();

		expect(host!.innerHTML.includes('k-skeleton-avatar-sk--md')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar-container--md')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--md')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-content--md')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--md')).toBeTruthy();

		expect(host!.innerHTML.includes('k-skeleton-avatar-sk--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar-container--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-content--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--lg')).toBeTruthy();
	});
	test('props: The title component configuration should override active and size', async () => {
		// @ts-ignore
		const instance = new KOverideTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: The avatar component configuration should override active and size', async () => {
		// @ts-ignore
		const instance = new KOverideAvatar({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar-sk--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar-container--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: The paragraph component configuration should override active and size', async () => {
		// @ts-ignore
		const instance = new KOverideParagraph({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-content--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: props: The paragraph and title component configuration should override round', async () => {
		// @ts-ignore
		const instance = new KOverideRound({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--round')).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--round')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		// @ts-ignore
		const instance = new KSkeletonSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('hello')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: skeleton', async () => {
		// @ts-ignore
		const instance = new KSkeletonSlotSK({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('hello')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KSkeletonTitle', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeletonTitleComp({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonTitleComp({
			target: host,
			props: {
				active: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		// @ts-ignore
		const instance = new KSkeletonTitleComp({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: round', async () => {
		// @ts-ignore
		const instance = new KSkeletonTitleComp({
			target: host,
			props: {
				round: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-title--round')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: width', async () => {
		// @ts-ignore
		const instance = new KSkeletonTitleComp({
			target: host,
			props: {
				width: '100px'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('width: 100px')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KSkeletonParagraph', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				active: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: round', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				round: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-paragraph--round')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: width', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				width: '100'
			}
		});
		expect(instance).toBeTruthy();
		const li0 = host.querySelectorAll('.k-skeleton-paragraph--item')[0];
		const li1 = host.querySelectorAll('.k-skeleton-paragraph--item')[1];
		const li2 = host.querySelectorAll('.k-skeleton-paragraph--item')[2];

		expect(li0.style.width).toBe('100%');
		expect(li1.style.width).toBe('100%');
		expect(li2.style.width).toBe('100px');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: width & width is Array', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				width: [100, 200, 300]
			}
		});
		expect(instance).toBeTruthy();
		const li0 = host.querySelectorAll('.k-skeleton-paragraph--item')[0];
		const li1 = host.querySelectorAll('.k-skeleton-paragraph--item')[1];
		const li2 = host.querySelectorAll('.k-skeleton-paragraph--item')[2];

		expect(li0.style.width).toBe('100px');
		expect(li1.style.width).toBe('200px');
		expect(li2.style.width).toBe('300px');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: rows', async () => {
		// @ts-ignore
		const instance = new KSkeletonParagraphComp({
			target: host,
			props: {
				rows: 4,
				width: [100, 200, 300, 400]
			}
		});
		expect(instance).toBeTruthy();
		const li0 = host.querySelectorAll('.k-skeleton-paragraph--item')[0];
		const li1 = host.querySelectorAll('.k-skeleton-paragraph--item')[1];
		const li2 = host.querySelectorAll('.k-skeleton-paragraph--item')[2];
		const li3 = host.querySelectorAll('.k-skeleton-paragraph--item')[3];

		expect(li0.style.width).toBe('100px');
		expect(li1.style.width).toBe('200px');
		expect(li2.style.width).toBe('300px');
		expect(li3.style.width).toBe('400px');
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KSkeletonAvatar', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatarComp({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatarComp({
			target: host,
			props: {
				active: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatarComp({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shape is circle', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatarComp({
			target: host,
			props: {
				shape: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar--circle')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shape is round', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatarComp({
			target: host,
			props: {
				shape: 'round'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar--round')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shape is square', async () => {
		// @ts-ignore
		const instance = new KSkeletonAvatarComp({
			target: host,
			props: {
				shape: 'square'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-avatar--square')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KSkeletonButton', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				active: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-button--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shape is circle', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				shape: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-button--circle')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shape is round', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				shape: 'round'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-button--round')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: shape is square', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				shape: 'square'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-button--square')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: block', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				block: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-button--block--md')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: block & shape is circle', async () => {
		// @ts-ignore
		const instance = new KSkeletonButtonComp({
			target: host,
			props: {
				block: true,
				shape: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('block')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KSkeletonInput', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeletonInputComp({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonInputComp({
			target: host,
			props: {
				active: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		// @ts-ignore
		const instance = new KSkeletonInputComp({
			target: host,
			props: {
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-input--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: block', async () => {
		// @ts-ignore
		const instance = new KSkeletonInputComp({
			target: host,
			props: {
				block: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton-input--block--md')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KSkeletonImage', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSkeletonImageComp({
			target: host,
			props: {
				cls: 'k-skeleton--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: active', async () => {
		// @ts-ignore
		const instance = new KSkeletonImageComp({
			target: host,
			props: {
				active: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-skeleton--active')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		// @ts-ignore
		const instance = new KSkeletonImageCompSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('hello')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
