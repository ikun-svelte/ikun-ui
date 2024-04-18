import type {KMenuInstance, KMenuInstanceOption, SubMenuType} from './types';
import { isArray, isString } from "baiwusanyu-utils";
export const createKMenu = (
	options: KMenuInstanceOption,
	onOpenChange: KMenuInstance['onOpenChange'],
	onSelect: KMenuInstance['onSelect'],
	onClick: KMenuInstance['onClick'],
): KMenuInstance => {
	return {
		/**
		 * @internal
		 */
		__propHandleEvtMap: [],
		__dynamicProps: {
			...options
		},
		__openUids: new Set(options.openUids),
		syncOpenUids(
			uid: string | string[],
			type: 'add' | 'delete' = 'add'){
			let uids = uid
			if(isString(uid)){
				uids = [uid as string]
			}
			if(isArray(uids)){
				(uids as string[]).forEach(id => {
					this.__openUids![type](id)
				});
			}
		},
		onOpenChange,
		onSelect,
		onClick,
	};
};

export function transitionIn(node: HTMLElement) {
	return {
		duration: 300,
		tick: (t: number) => {
			if (t === 0) {
				node.style.height = '0';
			} else if (t === 1) {
				node.style.removeProperty('height');
			} else {
				node.style.height = node.scrollHeight + 'px';
			}
		}
	};
}

export function transitionOut(node: HTMLElement) {
	const orgHeight = node.scrollHeight
	return {
		duration: 300,
		tick: (t: number) => {
			if (t <= 1 && t >= 0.9) {
				node.style.height = orgHeight + 'px';
			} else if (t === 0) {
				node.style.removeProperty('height');
			} else {
				node.style.height = '0';
			}
		}
	};
}

export function getUidPath(uid: string, list: SubMenuType[], path: string[] = []){
	// 遍历树结构数组中的每个节点
	for (const node of list) {
		// 如果当前节点的 uid 与给定的 uid 匹配，返回当前路径
		if (node.uid === uid) {
			return path.concat(uid);
		}

		// 如果当前节点包含子节点，则递归搜索子节点
		if (node.children && node.children.length > 0) {
			// 在路径中添加当前节点的 uid
			const newPath = path.concat(node.uid!);
			// 递归搜索子节点
			const result = getUidPath(uid, node.children!, newPath) as null | string[];
			// 如果找到了目标节点，则返回结果
			if (result) {
				return result;
			}
		}
	}

	// 如果在当前节点及其子节点中未找到目标节点，则返回空
	return null;
}
