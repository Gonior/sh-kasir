<script lang="ts">
    
    import {page} from '@lib/store'

</script>

<div class="h-full w-full justify-center items-center">
    
    <h1 class="text-4xl font-extrabold">404</h1>
    <p>Halaman tidak ditemukan.</p>
    <button class="btn-primary mt-2 " on:click={() => page.set('Home')}>Kembali ke Beranda</button>
</div>