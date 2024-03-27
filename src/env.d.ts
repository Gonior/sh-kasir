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

	declare type Item = import('svelte-dnd-action').Item
	declare type DndEvent<ItemType = Item>= import('svelte-dnd-action').DndEvent<ItemType>
	declare namespace svelte.JSX {
		interface HTMLAttributes<T> {
			onconsider? : (event : CustomEvent<DndEvent<ItemType>> & { targer : EventTarget & T }) => void
			oncfinalize : (event : CustomEvent<DndEvent<ItemType>> & { targer : EventTarget & T }) => void
		}
	}

	
}


export {};
