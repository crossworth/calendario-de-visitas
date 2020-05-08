import axios from 'axios'

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
        observations: appointment.observations
    })
}

export { createAppointment, }
