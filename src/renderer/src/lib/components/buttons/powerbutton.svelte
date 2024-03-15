<script>
	import Icon from "../Icon.svelte";
	import {navigate} from 'svelte-routing'
	import {token, user} from '../../store'
	export let text = ""
	export let closeApp = false
	const handleClick = () => {
		token.set('')
		user.set(JSON.parse('{}'))
		navigate('/', {replace : true})
		if(closeApp) {
			// send event to electron
		}
	}

</script>

<button class={`btn-secondary !p-2 ${$$props.class}`} on:click={handleClick}>
	<Icon name="logout" class="h-6 w-6" stroke={1.5}/>
	<span>{text}</span>
</button>
