const formatCurrency = (num : number) : string => {
    try {
        let rupiah = ''
        let angkarev = num.toString().split('').reverse().join('')
        for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
        return rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('')
    } catch (err) {
        console.log(err)
    }
    return '0'
	
}

export default formatCurrency