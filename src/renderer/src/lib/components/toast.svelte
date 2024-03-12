<script>
	import toast_ from '@teddy-error/svelte-french-toast';

	export let toast;
    export let someProp;
	// Use this component in your app:
	// toast(RichContent, { props: { someProp: '⭐' }})
</script>

<span>
	Custom and <b>bold</b> with props like {someProp}!
	<button on:click={() => toast_.dismiss(toast.id)}>Dismiss</button>
</span>
