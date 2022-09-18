# vue-watch-decorator

Typesafe watch decorator for [vue-class-component](https://github.com/vuejs/vue-class-component)

## Installation

``` sh
npm i -S vue-watch-decorator
```

## Usage

```ts
import Vue from 'vue';
import Component from 'vue-class-component';
import { VueWatchDecorator } from 'vue-watch-decorator';

@Component
export default class App extends Vue {
	inputValue: string = '';

	@VueWatchDecorator<App>((t) => t.inputValue, { immediate: true })
	onChangeInputValue() {}
}
```

is equivalent to

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
	unwatchFn: (() => void) | null = null;

	inputValue: string = '';

	onChangeInputValue() {}

	created() {
		this.unwatchFn = this.$watch(() => this.inputValue, this.onChangeInputValue, { immediate: true });
	}

	beforeDestroy() {
		this.unwatchFn?.();
	}
}
```