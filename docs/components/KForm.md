---
title: KAlert
lang: en-US
---

# KAlert

With form, you can collect, verify and submit data.

## Install

::: code-group

```bash [pnpm]
pnpm add @ikun-ui/from
```

```bash [yarn]
yarn add @ikun-ui/from
```

```bash [npm]
npm install @ikun-ui/from
```

:::

## Basic usage

Form contains three components, they are KFrom, KFromItem

<demo src="form/basic.svelte"  github='Form'></demo>

## Alignment

Label has three alignment methods and two position settings.

<demo src="form/align.svelte" github='Form'></demo>

## Validation

The following is a best practice for form validation

<demo src="form/validation.svelte" github='Form'></demo>

## Custom Validation Rules

Support custom form verification functions by setting rules

<demo src="form/custom-rules.svelte" github='Form'></demo>

## Size Control

Form supports three sizes

<demo src="form/size.svelte" github='Form'></demo>

## Form Props

| Name           | Type                      | Default      | Description                       |
| -------------- | ------------------------- | ------------ | --------------------------------- |
| rules          | `KFormRules`              | `-`          | Form validation rules             |
| initValue      | `any`                     | `-`          | Form initial value.               |
| size           | `sm \| md \| lg`          | `md`         | Size of form                      |
| disabled       | `boolean`                 | `false`      | Disabled the form                 |
| manualValidate | `boolean`                 | `false`      | Whether to verify when inputting. |
| labelAlign     | `left \| right \| center` | `right`      | Label aligned horizontally.       |
| labelPosition  | `horizontal \| vertical ` | `horizontal` | Label display position.           |
| labelWidth     | `string`                  | `-`          | Label width                       |
| cls            | `string`                  | `''`         | Additional class for component    |
| attrs          | `any`                     | `{}`         | Additional attributes             |

```typescript
export interface KFormRule {
	// maximum value
	max?: number;
	// minimum value
	min?: number;
	required?: boolean;
	// Custom verification function
	validator?: (value: any, callback: any) => void;
	// error message
	msg?: string;
}

export type KFormRules = Record<string, KFormRule[]>;
```

## Form Events

| Name     | Description                                                                                   | Type                           |
| -------- | --------------------------------------------------------------------------------------------- | ------------------------------ |
| validate | Triggers when the form is validated, but it doesn't fire when the validateForm api is called. | `(event: ValidateData)=> void` |

```typescript
export interface ValidateData {
	// current form value
	data: any;
	// Whether the verification passed
	isValid: boolean;
	// Fields and information that fail verification
	invalidFields?: ValidateError[];
}

export type Value = any;
export type Values = Record<string, Value>;
export interface ValidateError {
	// error message
	message?: string;
	fieldValue?: Value;
	field?: string;
}
```

## Form Slots

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
| default | Customize default content, Please pass in the `KFormItem`. |

## Form API

| Name               | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| validateForm       | Validate the entire form object.                              |
| resetForm          | Reset the entire form to default values and clear validation. |
| setForm            | Set the entire form object value.                             |
| getForm            | Get the entire form object value.                             |
| validateField      | Validate the specified fields.                                |
| clearValidateField | Clear verification information of specific field.             |
| setField           | Set the specified field value.                                |

```typescript
export interface IKunFormInstance {
	/**
	 * Validate the entire form object
	 * @public
	 * @param callback
	 */
	validateForm(callback: FormValidateCallback): void;
	/**
	 * Reset the entire form to default values and clear validation
	 * @public
	 */
	resetForm(): void;
	/**
	 * Set the entire form object value
	 * @public
	 * @param values
	 * @param isValidate Whether to Validate form fields
	 */
	setForm(values: any, isValidate: boolean): void;
	/**
	 * get the entire form object value
	 * @public
	 */
	getForm<T>(): T;
	/**
	 * Validate the specific fields
	 * @public
	 * @param path field path
	 */
	validateField(path: string): void;
	/**
	 * Clear verification information of specific field
	 * @public
	 * @param path field path
	 */
	clearValidateField(path: string): void;
	/**
	 * Set the specified field value
	 * @public
	 * @param path field path
	 * @param value
	 * @param isValidate Whether to Validate form fields
	 */
	setField(path: string, values: any, isValidate: boolean): void;
}
```

## Form Props

| Name    | Type      | Default | Description                                                                               |
| ------- | --------- | ------- | ----------------------------------------------------------------------------------------- |
| field   | `string`  | `-`     | Specify the field. If you want to specify a subfield of the object, please use `foo.xxx`. |
| label   | `string`  | `md`    | Label content.                                                                            |
| showMsg | `boolean` | `false` | Whether to display an error message when the verification is triggered                    |
| cls     | `string`  | `''`    | Additional class for component                                                            |
| attrs   | `any`     | `{}`    | Additional attributes                                                                     |

## Form Item Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | Customize default content |
