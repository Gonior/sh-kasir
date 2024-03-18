<script lang="ts">
	// import Icon from "../Icon.svelte";
	import {SpinLine} from 'svelte-loading-spinners'
	import { theme } from  '@lib/store'
	let color = "#374151"
	theme.subscribe(val => {
		if (val === 'dark') color = "#374151"
		else color = "#6b7280"
	})

</script>

<div class="flex w-full h-full text-gray-500  items-center justify-center flex-col animate-pulse">
	<div class="mb-10">
		<SpinLine size={80} {color} />

	</div>
	<!-- <Icon name="loading" class=" !h-16 !w-16" /> -->
	<p class="font-semibold">Memuat</p>
</div>
