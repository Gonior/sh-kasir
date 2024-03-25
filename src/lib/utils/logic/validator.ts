import * as yup from 'yup'

export const userSchema = yup.object().shape({
	name : yup.string().required('Nama harus diisi'),
	passcode : yup.string().required('PIN Harus diisi!').min(6, 'PIN harus terdiri dari 6 karakter atau lebih'),
	confirmPasscode : yup.string().required("Konfirmasi PIN harus diisi!").oneOf([yup.ref("passcode"), null], "Konfirmasi PIN tidak cocok")
})

export const categorySchema = yup.object().shape({
	name : yup.string().required('Nama kategori harus diisi')
})

export const menuSchema = yup.object().shape({
	name : yup.string().required('Nama menu harus diisi'),
	price : yup.number().required('Harga tidak boleh null').integer('Harga harus terdiri dari angka')
})



