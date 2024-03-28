<div class="grid grid-rows-12 grid-cols-1 gap-1 h-full  ">
    <div class="grid grid-cols-3 gap-2 row-span-11">
        <div class="grid grid-cols-1 grid-rows-8 gap-2">
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
            <div class="container-placeholder h-12"></div>
        </div>
        <div class="col-span-2 grid grid-cols-2 grid-rows-7 gap-2 text-sm">
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
    <div class="grid grid-cols-3 gap-2 ">
        <div class="flex justify-between">
            <div class="holder-button"></div>
            <div class="holder-button"></div>
        </div>
        <div class="col-span-2 flex w-full">
            <div class="flex justify-between w-full">
                <div class="holder-button"></div>
                <div class="holder-button"></div>
            </div>
        </div>
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