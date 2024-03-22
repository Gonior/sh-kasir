<script>
	import { page } from '@/lib/store'
	import Powerbutton from '@components/buttons/powerbutton.svelte';
	// import {link} from 'svelte-routing'

</script>
<h1>cashier</h1>
<a href="/" on:click={() => page.set('Home')}>home</a>
<Powerbutton/>
