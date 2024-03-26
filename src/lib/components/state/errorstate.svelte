<script lang="ts">
	import Icon from "../ui/Icon.svelte";

	// export let icon : IModel.IconName = "icon"
	export let msg : string = "Tidak ada data"
	export let submsg : string = ""
</script>

<div class={`${$$props} flex w-full h-full text-gray-400 dark:text-gray-600 items-center justify-center flex-col `}>
	<Icon name={"emoji-sad"} class="!h-24 !w-24" stroke={1.5}/>
	<h1 class="font-semibold">{msg}</h1>
	<h3 class="">{submsg}</h3>
</div>
