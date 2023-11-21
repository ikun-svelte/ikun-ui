
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KFormInit from './fixture/init.svelte';

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
  host.remove();
});

describe('Test: KForm', () => {
  vi.mock('svelte', async () => {
    const actual = (await vi.importActual('svelte')) as object;
    return {
      ...actual,
      // @ts-ignore
      onMount: (await import('svelte/internal')).onMount
    };
  });

  test('props: initValue', async () => {
    const instance = new KFormInit({
      target: host,
    });
    expect(instance).toBeTruthy();
    const input = host.querySelector('.k-input--inner')

    expect(input.value).toBe('KInput')

    expect(host.innerHTML.includes(`k-form-item-label__right`)).toBeTruthy();

    expect(host.querySelectorAll('.k-rate--active-icon').length === 4).toBeTruthy();

    expect(host.querySelectorAll('.k-radio__selected').length === 1).toBeTruthy();
    expect(host.querySelectorAll('.k-radio')[2].innerHTML.includes('k-radio__selected')).toBeTruthy();

    expect(host.querySelectorAll('.i-carbon-checkmark').length === 1).toBeTruthy();
    expect(host.querySelectorAll('.k-checkbox--base')[1].innerHTML.includes('i-carbon-checkmark')).toBeTruthy();

    const selectInput = host.querySelectorAll('.k-select--inner')
    expect(selectInput[0].value).toBe('不知明镜里')
    expect(selectInput[1].value).toBe('Huge')

    const value = JSON.parse(host.querySelector('#form_value')?.innerHTML)
    expect(value).toMatchObject({
      "KInput":"KInput",
      "KSwitch":true,
      "KRate":4,
      "KRadio":"3",
      "KCheckbox":["2"],
      "KSelect":{
        "label":"不知明镜里",
        "value":"不知",
        "id":"3"
      },
      "KSelectString":"Huge"
    })
    expect(host.innerHTML).matchSnapshot();
  });
})
