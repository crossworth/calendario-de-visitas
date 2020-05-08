import React from 'react'

import moment from 'moment'

import { getAppointments } from '../api'

import { Typography, Calendar, message, Tag } from 'antd'

import { Link } from 'react-router-dom'

const { Title } = Typography

export default class MyAppointments extends React.Component {

    constructor(props, context, state) {
        super(props, context)

        this.state = {
            data: []
        }

        getAppointments().then(result => {
            let data = result.data
            let appointmentsByDate = {}

            for (let appointment of data) {
                if (appointment.date) {
                    const momentDate = moment(appointment.date)
                    const key = momentDate.year() + '_' + momentDate.month() + '_' + momentDate.date()

                    if (!appointmentsByDate[key]) {
                        appointmentsByDate[key] = {}
                        appointmentsByDate[key]['date'] = []
                    }

                    appointmentsByDate[key]['date'].push(appointment)
                }

                if (appointment.return_date) {
                    const momentReturnDate = moment(appointment.return_date)
                    const key = momentReturnDate.year() + '_' + momentReturnDate.month() + '_' + momentReturnDate.date()

                    if (!appointmentsByDate[key]) {
                        appointmentsByDate[key] = {}
                        appointmentsByDate[key]['return'] = []
                    }

                    appointmentsByDate[key]['return'].push(appointment)
                }
            }

            this.setState({
                data: appointmentsByDate
            })

        }).catch(error => {
            let errorMessage = error

            if (error.response && error.response.request && error.response.request.response) {
                errorMessage = error.response.request.response
            }

            message.error('Ocorreu um erro recuperar os dados: ' + errorMessage)
        })

        this.dateCellRender = this.dateCellRender.bind(this)
        this.monthCellRender = this.monthCellRender.bind(this)
    }

    dateCellRender(value) {
        const key = value.year() + '_' + value.month() + '_' + value.date()

        let appointments = []
        let returns = []

        if (this.state.data[key] && this.state.data[key]['date']) {
            appointments = this.state.data[key]['date']
        }

        if (this.state.data[key] && this.state.data[key]['return']) {
            returns = this.state.data[key]['return']
        }

        return (
            <div>
                <div className="appointments">
                    {appointments.map(item => (
                        <div key={item.id}>
                            <Tag color="#2db7f5">Ag:</Tag>
                            <Link to={'/agendamentos/' + item.id}>
                                <span>{item.name}</span>
                            </Link>
                            <br/>
                        </div>
                    ))}
                </div>
                <div className="returns">
                    {returns.map(item => (
                        <div key={item.id}>
                            <Tag color="#f50">Rt:</Tag>
                            <Link to={'/agendamentos/' + item.id}>
                                <span>{item.name}</span>
                            </Link>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    monthCellRender(value) {
        const key = value.year() + '_' + value.month()

        let numberOfAppointments = 0
        let numberOfReturns = 0

        for (let currentKey in this.state.data) {
            if (currentKey.indexOf(key) !== -1) {

                if (this.state.data[currentKey]['date']) {
                    numberOfAppointments++
                }

                if (this.state.data[currentKey]['return']) {
                    numberOfReturns++
                }
            }
        }

        return (<div>
            <strong>Agendamentos:</strong> {numberOfAppointments}<br/>
            <strong>Retornos:</strong> {numberOfReturns}<br/>
        </div>)
    }

    render() {
        return <div>
            <Title level={3}>Meus agendamentos</Title>
            <Calendar
                dateCellRender={this.dateCellRender}
                monthCellRender={this.monthCellRender}/>
        </div>
    }
}
