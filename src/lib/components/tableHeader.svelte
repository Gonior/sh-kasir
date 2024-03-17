<script lang="ts">
	import type {Tailwindest} from 'tailwindest'
	import { IModel } from '../types';
	export let textSize : Tailwindest['fontSize'] = 'text-base'
	export let marginRight : Tailwindest['marginRight'] = 'mr-2'

	export let tableHeaderItems : IModel.ITableHeaderItem[] = []

</script>

<table class="text-gray-700 dark:text-white uppercase {marginRight}">
	<tr class="{textSize}">
		{#each tableHeaderItems as item, i (i)}
			<th scope="col" class="py-2 {item.bgColor ? item.bgColor : 'bg-gray-100 dark:bg-gray-700' } {i === 0 ? 'rounded-tl-lg px-2' : i === tableHeaderItems.length - 1 ? 'rounded-tr-lg' : ''} {item.textAlign ?? 'text-left'} {item.width} {item.paddingRight} ">{item.value}</th>
		{/each}
	</tr>
</table>
