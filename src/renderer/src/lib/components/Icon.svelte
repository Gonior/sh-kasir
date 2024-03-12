
<script lang="ts">
    import type { IconName } from '../types/index'
    import { icons } from "../utils";

    export let name: IconName  = "icon"
    export let stroke = 1.5

</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={stroke} stroke="currentColor" class={`h-5 w-5 ${$$props.class}`}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html icons.find(icon => icon.name === name)?.path}
</svg>


