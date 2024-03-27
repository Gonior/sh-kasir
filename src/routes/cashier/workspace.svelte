<script lang="ts">
	import type { IModel } from "@/lib/types"
    import LayoutA from "./components/layoutA.svelte";
    import LayoutB from "./components/layoutB.svelte";
    import LayoutC from "./components/layoutC.svelte";
    let orders = []
    const handleAddMenu = (e : CustomEvent<IModel.IMenu>) => {
        
        orders = [...orders, e.detail]
    }
</script>

<div class="grid grid-cols-2 h-full gap-2 p-2">
    <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-y-auto">
        <LayoutA {orders} />
    </div>
    <div class="rounded-lg grid grid-rows-6 gap-2">
        <div class="border border-gray-200 dark:border-gray-700 row-span-4 rounded-lg p-2">
            <LayoutB on:addMenu={handleAddMenu} />
        </div>
        <div class="border border-gray-200 dark:border-gray-700 row-span-2 rounded-lg">
            <LayoutC />
        </div>
    </div>
</div>