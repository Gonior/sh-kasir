const dateFormat = (date , optHours  = { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: false }, optDate  = { month: 'long', day: 'numeric', weekday:'long', year:"numeric" }) => {
	const myDate = new Date(date)
	let datestring
	let time
	try {
		datestring = new Intl.DateTimeFormat('id-ID', optDate).format(myDate)
		time = new Intl.DateTimeFormat('id-ID', optHours).format(myDate)
	} catch (error) {
		console.log(error)
	}
    // Minggu, 21 Maret 2024 16:12:20
    // 16:12:20
    // 21 Maret 2024
    // 21 Maret 2024 16:12
	return { datestring, time, full : `${datestring} ${time}` }
}
let date = new Date()
console.log(dateFormat(date))
