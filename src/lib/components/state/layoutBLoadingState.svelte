<div class="grid grid-cols-3 gap-2 p-2">
    <div class="grid grid-cols-1 grid-rows-7 gap-2">
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        
    </div>
    <div class="col-span-2 grid grid-cols-2 grid-rows-7 gap-2">
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
        <div class="holder-container"></div>
    </div>
</div>
<div class="grid grid-cols-3 gap-2 px-2 ">
    <div class="flex justify-between">
        <div class="holder-button"></div>
        <div class="holder-button"></div>
    </div>
    <div class="col-span-2 flex justify-end space-x-4">
        <div class="holder-button"></div>
        <div class="holder-button"></div>
    </div>
</div>

<style lang="postcss">
    .holder-container {
        @apply bg-gray-300 dark:bg-gray-700 animate-pulse h-14 rounded-md;
    }

    .holder-button {
        @apply bg-gray-300 dark:bg-gray-700 animate-pulse h-8 w-8 rounded-md;
    }
</style>