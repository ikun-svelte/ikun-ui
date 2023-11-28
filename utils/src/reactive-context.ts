import { jsonClone } from 'baiwusanyu-utils';

type ReactiveContextOption<T> = {
	props: T;
};

type Callback<T> = (props: T) => void;

export type ReactiveContext<T> = {
	props: T;
	evtMap: Callback<T>[];
};

export function reactiveContext<T extends Record<any, any>>(
	option: ReactiveContextOption<T>
): ReactiveContext<T> {
	return {
		props: jsonClone<T>(option.props),
		evtMap: []
	};
}
