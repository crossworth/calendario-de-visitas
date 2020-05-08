import React from 'react'

import { Typography, Spin, message, Alert, List } from 'antd'
import { getAppointment } from '../api'

const { Title } = Typography

const formatPhoneNumber = number => {
    if (!number || number.length === 0) {
        return 'Não informado'
    }

    number = number.replace(/\D/g, '')
    number = number.replace(/^(\d{2})(\d)/g, '($1) $2')
    number = number.replace(/(\d)(\d{4})$/, '$1-$2')
    return number
}

const formatDate = date => {
    if (!date) {
        return 'Não informado'
    }

    return (new Date(date)).toLocaleDateString()
}

const transformData = data => {
    return [
        {
            title: 'Nome',
            value: data.name,
        },
        {
            title: 'Endereço',
            value: data.address ? data.address : 'Não informado',
        },
        {
            title: 'Telefone fixo',
            value: formatPhoneNumber(data.landline_phone_number),
        },
        {
            title: 'Telefone móvel',
            value: formatPhoneNumber(data.mobile_phone_number),
        },
        {
            title: 'Email',
            value: data.email ? data.email : 'Não informado',
        },
        {
            title: 'Número de colaboradores',
            value: data.number_of_employees ? data.number_of_employees : 'Não informado',
        },
        {
            title: 'Data (visita)',
            value: formatDate(data.date),
        },
        {
            title: 'Data de retorno',
            value: formatDate(data.return_date),
        },
        {
            title: 'Data de vigência',
            value: formatDate(data.due_date),
        },
        {
            title: 'Observações',
            value: data.observations ? data.observations : 'Sem observações',
        },
    ]
}

export default class Appointment extends React.Component {

    constructor(props, context, state) {
        super(props, context)
        this.id = this.props.match.params.id

        this.state = {
            loading: true,
            error: false,
            message: '',
            appointment: {
                files: [],
            },
        }
    }

    componentDidMount() {
        getAppointment(this.id).then(result => {
            this.setState({
                loading: false,
                appointment: result.data,
            })
        }).catch(error => {
            let errorMessage = error

            if (error.response && error.response.request && error.response.request.response) {
                errorMessage = error.response.request.response
            }

            message.error('Ocorreu um erro recuperar a agendamento: ' + errorMessage)

            this.setState({
                loading: false,
                error: true,
                message: errorMessage,
            })
        })
    }

    render() {
        let content
        let filesContent

        if (!this.state.appointment.files || this.state.appointment.files.length === 0) {
            filesContent = <div>Nenhum arquivo</div>
        } else {
            filesContent = this.state.appointment.files.map(file =>
                <div key={file.name}>
                    <a href={file.url} target="_blank">{file.name}</a>
                    <br/>
                </div>
            )
        }

        if (this.state.error) {
            content = <div>
                <Alert
                    message="Ocorreu um erro"
                    description={this.state.message}
                    type="error"
                    showIcon
                />
            </div>
        } else {
            content = <div>
                <Title level={3}>Agendamento - {this.state.appointment.name}</Title>
                <List
                    size="small"
                    header={<div>Dados do agendamento</div>}
                    bordered
                    dataSource={transformData(this.state.appointment)}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={item.value}/>
                        </List.Item>
                    )}
                />
                <br/>
                <strong>Arquivos</strong><br/>
                {filesContent}
            </div>
        }

        return <div>
            <Spin tip="Carregando..." spinning={this.state.loading}>
                {content}
            </Spin>
        </div>
    }
}
