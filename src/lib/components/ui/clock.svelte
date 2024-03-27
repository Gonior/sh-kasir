<script lang="ts">
    import {onMount} from 'svelte'
    let date = new Date()
	let opsiJam = { hour: 'numeric', minute: 'numeric', hour12: false } as  Intl.DateTimeFormatOptions
	let opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as  Intl.DateTimeFormatOptions

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
<div class=" text-sm">{tanggal} {jam}</div>