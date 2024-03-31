<script lang="ts">
    import {onMount} from 'svelte'
    let date = new Date()
	let opsiJam = { hour: 'numeric', minute: 'numeric', hour12: false } as  Intl.DateTimeFormatOptions
	let opsiTanggal = {year: 'numeric', month: '2-digit', day: 'numeric',  } as  Intl.DateTimeFormatOptions

	$: tanggal = new Intl.DateTimeFormat('id', opsiTanggal).format(date)
    $: jam = new Intl.DateTimeFormat('en', opsiJam).format(date)

    onMount(() => {
        const interval = setInterval(() => {
			date = new Date()
		}, 1500)

        return () => {
			clearInterval(interval)
		}
    })  
</script>
<div class="grid grid-rows-2 justify-end items-end text-sm">
    <p class="text-right">{jam}</p>
    <p class="text-right">{tanggal}</p>
</div>
<!-- <div class=" text-sm">{tanggal} {jam}</div> -->