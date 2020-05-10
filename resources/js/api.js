import axios from 'axios'

const xCSRFToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': xCSRFToken,
}

const api = axios.create({
    baseURL: '/api',
})

const createAppointment = appointment => {
    return api.post('/appointments', {
        name: appointment.name,
        address: appointment.address,
        landline_phone_number: appointment.landline_phone_number,
        mobile_phone_number: appointment.mobile_phone_number,
        email: appointment.email,
        number_of_employees: appointment.number_of_employees,
        date: appointment.date,
        return_date: appointment.return_date,
        due_date: appointment.due_date,
        observations: appointment.observations,
        documents: appointment.documents,
    })
}

const getAppointment = id => {
    return api.get('/appointments/' + id)
}

const getAppointments = () => {
    return api.get('/appointments')
}

const searchAppointments = (date, returnDate, issueDate) => {
    return api.get('/appointments', {
        params: {
            date: date ? date.format() : null,
            return_date: returnDate ? returnDate.format() : null,
            issue_date: issueDate ? issueDate.format() : null,
        }
    })
}

export { createAppointment, getAppointment, getAppointments, searchAppointments }
