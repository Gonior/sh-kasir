<script lang="ts">
    export let orders = []
</script>

<h1>layout a</h1>
<ol>
    {#each orders as order} 
    {order.name}
    {/each}
</ol>