<!-- <script>
	import { accordion } from '../../lib/accordion'
	import { config } from '../../lib/store'
	$: useTax = $config.tax.useTax
	const onChangeHandler = (event) => {
		$config.tax.useTax = event.target.checked // general
		$config.tax.toogleAble = event.target.checked
		if(!$config.tax.useTax) {
			$config.tax.name = ""
			$config.tax.toogleAble = false
			$config.tax.value = 0
		}
	}
</script>

<div class="flex my-2">
	<div class="flex items-start w-full">
		<div class="w-1/4">
			<h1 class="text-sm">Pajak</h1>
			<span class="text-gray-500 dark:text-gray-300 text-sm"
				>Centang bila menggunakan pajak</span
			>
		</div>
		<div class="w-3/4">
			<label
				for="check"
				class="bg-gray-200 dark:bg-gray-700 cursor-pointer relative inline-flex items-center h-6 w-12 rounded-full"
			>
				<input
					id="check"
					type="checkbox"
					checked={$config.tax.useTax}
					on:change={onChangeHandler}
					class="sr-only peer"
				/>
				<div
					class="h-4 w-4 bg-orange-300 absolute rounded-full left-1 top-1 peer-checked:bg-orange-500 peer-checked:left-7 transition-all duration-300"
				></div>
			</label>
			<div use:accordion={useTax} class="flex gap-2">
				<div class="flex items-center space-x-2">
					<span class="text-sm w-full"> Nama Pajak </span>
					<input
						class="form-control text-sm appearance-none"
						placeholder="PPN"
						type="text"
						bind:value={$config.tax.name}
					/>
				</div>
				<div class="flex items-center space-x-2">
					<span class="text-sm"> Persentase </span>
					<input
						class="form-control w-1/3 appearance-none"
						placeholder="10"
						type="number"
						bind:value={$config.tax.value}
					/>
					<span class="text-gray-500">%</span>
				</div>
			</div>
		</div>
	</div>
</div> -->
