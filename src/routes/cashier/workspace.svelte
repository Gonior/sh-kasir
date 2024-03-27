<script lang="ts">
    import LayoutA from "./components/layoutA.svelte";
    import LayoutB from "./components/layoutB.svelte";
    import LayoutC from "./components/layoutC.svelte";
</script>

<div class="grid grid-cols-2 h-full gap-2 p-2">
    <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-y-auto">
        <LayoutA />
    </div>
    <div class="rounded-lg grid grid-rows-6 gap-2">
        <div class="border border-gray-200 dark:border-gray-700 row-span-4 rounded-lg">
            <LayoutB />
        </div>
        <div class="border border-gray-200 dark:border-gray-700 row-span-2 rounded-lg">
            <LayoutC />
        </div>
    </div>
</div>