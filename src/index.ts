import Vue, { WatchOptions } from 'vue';
import { createDecorator } from 'vue-class-component';

export function VueWatchDecorator<T extends Vue>(fn: (ctx: T) => any, options?: WatchOptions) {
	return createDecorator((componentOptions, handler) => {
		let handlerFn = componentOptions.methods![handler];
		if (typeof handlerFn !== 'function') {
			throw new TypeError('watch handler is not a function');
		}
		let created = componentOptions.created;
		let beforeDestroy = componentOptions.beforeDestroy;
		let unwatchFn: (() => void) | null = null;
		componentOptions.created = function () {
			unwatchFn = (this as T).$watch(() => fn(this as T), handlerFn, options);
			created?.call(this);
		};

		componentOptions.beforeDestroy = function () {
			unwatchFn?.();
			beforeDestroy?.call(this);
		};
	});
}