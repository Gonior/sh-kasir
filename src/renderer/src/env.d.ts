/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages-svelte/client" />
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			"on:click_outside"?: CompositionEventHandler<T>;
		}
	}
}

export {};
