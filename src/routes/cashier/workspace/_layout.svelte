<script lang="ts">
	import { IModel} from "@/lib/types"
	import { onMount } from "svelte"
    import { v4 as uuidv4 } from 'uuid';
    import LayoutA from "./layoutA.svelte";
    import LayoutB from './layoutB.svelte'
    import LayoutC from "./layoutC.svelte";
    import LayoutD from "./layoutD.svelte";
	import Errorstate from "@components/state/errorstate.svelte"
	import Loading from "@components/state/loading.svelte"
    import MenuService from "@lib/services/menu.service";
    import { selectId } from '@lib/utils'
    import ConfirmModal from "@components/modal/confirmModal.svelte";
    
    const menuService = new MenuService()
    
    onMount( async () => {
        if(_id) console.log('edit mode')
        let isSuccess = await menuService.load()
        if (isSuccess) {
            isValid = true
            listData = [...menuService.getDataByCategory()]
            listMenu = [...menuService.getData().map(menu => {return {...menu}})]
            
        }
        isLoading = false
    })
    // keperluan bill
    let _id :string = ''
    let invoice : string = "#2024112391671212317826318263871623812637126387"

    let status : string = ""
    let customer : string = ''
    let downpayment : number = 0
    let discount : IModel.IDiscount = {
		percentage: 0,
		value: 0
	}
    
    let selectedMenu : IModel.IItem
    let items : IModel.IItem[] = []
    let listData : IModel.ILayoutCData[] = []
    let listMenu : IModel.IMenu[] = []

    let isLoading = false
    let isValid = false
    let addedId : string = ""
    let inputElement : HTMLInputElement
    let openConfirmModalSetPrinted = false
    
    const handleClear = () => {
        handleReset()
        customer = ""
        invoice = ""
        status = ""
        _id = ""
        downpayment = 0
        discount = {
		    percentage: 0,
		    value: 0
	    }
        items = []
    }

    const handleSelectItem= (_id : string) => {
        items = [...selectId(items, _id)]
    }

    const handleAddMenu = (params : IModel.IMenu, qty? : number) => {
        let myItem : IModel.IItem= {...params, qty : qty ?? 1, total : 0, printed : false}
        myItem.total = myItem.price * myItem.qty
        
        let findOrder = items.find((o) => o._id === myItem._id)
        if( findOrder) {
            if(!findOrder.printed) {
                findOrder.qty += qty ?? 1
                findOrder.total = findOrder.qty * findOrder.price
                items = [...items]
                addedId = findOrder._id    
            } else {
                
                selectedMenu = findOrder
                inputElement.blur()
                setTimeout(() => {
                    openConfirmModalSetPrinted = true

                }, 100)
                return
            }
            
        }
        else {
            items = [...items, myItem]
            addedId = myItem._id
        }
        
        handleReset()
    }

    const handleAddNote = (params : {name : string} ) => {
        let myNote : IModel.IItem = {
            _id : uuidv4(),
            name : params.name,
            printed : false,
        }

        if(selectedMenu && !selectedMenu.forId) {
            myNote.forId = selectedMenu._id
            let index = items.indexOf(selectedMenu)
		    let addIndex = items.filter((i) => i.forId === myNote.forId).length + 1
		    items.splice(index + addIndex, 0, myNote)
        } else {
            let filteredItems = [...items.filter(item => !item.forId)]
            myNote.forId = filteredItems[filteredItems.length-1]._id
            items = [...items, myNote]
        }
        items = [...items]
        addedId = myNote._id
    }

    const handleReset = () => {
        if(items.length > 0)items = [...selectId(items, '')]
    }

    const handleSetPrinted = (e : CustomEvent<boolean>) => {
        if (e.detail && selectedMenu) {
            selectedMenu.printed = !selectedMenu.printed
            if(!selectedMenu.forId) {
                let notes = items.filter((item) => item.forId === selectedMenu._id)
                if (notes.length > 0) notes.forEach(note => note.printed = selectedMenu.printed)
            }

            items = [...items]
            inputElement.focus()
            handleReset()
        }
    }

</script>
{#if openConfirmModalSetPrinted}
    <ConfirmModal title="Konfirmasi Ubah Status Menu" confirmText="Ya, Ubah" on:close={() => openConfirmModalSetPrinted = false} on:confirm={(e) => {handleSetPrinted(e); openConfirmModalSetPrinted = false}} >
        <!-- {selectedMenu} -->
        <p>Status 
            <span class="font-bold uppercase">{selectedMenu?.name}</span> 
            adalah 
            <span class="font-bold uppercase">{selectedMenu?.printed ? '"sudah dipesan"' : '"belum dipesan"'}</span>
            apakah anda yakin merubah status menjadi
            <span class="font-bold uppercase">{selectedMenu?.printed ? '"belum dipesan"' : '"sudah dipesan"'}</span>
            ?
        </p>
    </ConfirmModal>
{/if}
<div class="grid grid-cols-2 h-full gap-2 p-2">
    {#if isLoading}
        <div class="row-span-12 col-span-2">
            <Loading/>
        </div>
    {:else if isValid}
        <div class="overflow-hidden grid grid-cols-1 grid-rows-12 gap-2">
            <!-- informasi bill -->
            <LayoutA 
                bind:_id={_id}
                bind:invoice={invoice}
                bind:customer={customer}
                bind:downpayment={downpayment}
                bind:status={status}
                bind:discount={discount}                
                bind:items={items}
                on:focus={() => inputElement.focus()}
                {handleClear}
                />
            <!-- pesanan -->
            <LayoutB 
                {invoice}
                bind:items={items}
                bind:selectedMenu={selectedMenu}
                bind:inputElement={inputElement}
                bind:openConfirmModalSetPrinted={openConfirmModalSetPrinted}
                {listMenu}
                {handleSelectItem}
                {handleAddNote}
                {handleAddMenu}
                {handleReset}
                {addedId}
             />
            
        </div>
        <div class="rounded-lg grid grid-rows-6 gap-2">
            <div class="border border-gray-200 dark:border-gray-700 row-span-4 rounded-lg p-2">
                <!-- daftar menu -->
                <LayoutC {handleAddMenu} {listData}  />
            </div>
            <div class="border border-gray-200 dark:border-gray-700 row-span-2 rounded-lg">
                <!-- daftar notes -->
                <LayoutD {selectedMenu} {handleAddNote} {items} />
            </div>
        </div>
    {:else}
        <div class="row-span-12 col-span-2">
            <Errorstate msg={"Gagal Memuat Data"} submsg={'Pastikan anda terkoneksi dengan server'}/>
        </div>
    {/if}
</div>