import React from 'react'

import { DatePicker, Form, Typography, Button, Divider, Spin, message, Table } from 'antd'

import { searchAppointments } from '../api'

const { Title } = Typography

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
}

export default class Search extends React.Component {
    constructor(props, context, state) {
        super(props, context)
        this.state = {
            results: [],
            loading: false,
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        this.setState({
            loading: true,
        })

        searchAppointments(values.date, values.return_date, values.issue_date)
            .then(result => {
                this.setState({
                    loading: false,
                    results: result.data,
                })

            }).catch(error => {
            let errorMessage = error

            if (error.response && error.response.request && error.response.request.response) {
                errorMessage = error.response.request.response
            }

            message.error('Ocorreu um erro ao pesquisar os agendamentos: ' + errorMessage)
        })
    }

    render() {
        let content

        const columns = [
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name',
                render: (text, data) => <a href={'/agendamentos/' + data.id}>{text}</a>
            },
            {
                title: 'Data (visita)',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Data de retorno',
                dataIndex: 'return_date',
                key: 'return_date',
            },
            {
                title: 'Data de vigência',
                dataIndex: 'issue_date',
                key: 'issue_date',
            }
        ]

        if (this.state.results.length === 0) {
            content = 'Nenhum resultado encontrado'
        } else {
            const data = this.state.results.map(result => {
                result.date = result.date ? (new Date(result.date)).toLocaleDateString() : ''
                result.return_date = result.return_date ? (new Date(result.return_date)).toLocaleDateString() : ''
                result.issue_date = result.issue_date ? (new Date(result.issue_date)).toLocaleDateString() : ''
                return result
            })

            content = <Table dataSource={data} columns={columns} rowKey="id"/>
        }

        return <div>
            <Title level={3}>Pesquisar</Title>
            <Form
                {...layout}
                name="basic"
                layout="inline"
                initialValues={{}}
                onFinish={this.onSubmit}>

                <Form.Item
                    label="Data (visita)"
                    name="date">
                    <DatePicker format="DD/MM/YYYY"/>
                </Form.Item>

                <Form.Item
                    label="Data de retorno"
                    name="return_date">
                    <DatePicker format="DD/MM/YYYY"/>
                </Form.Item>

                <Form.Item
                    label="Data de vigência"
                    name="due_date">
                    <DatePicker format="DD/MM/YYYY"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Pesquisar
                    </Button>
                </Form.Item>
            </Form>
            <Divider/>
            <Spin tip="Carregando..." spinning={this.state.loading}>
                {content}
            </Spin>
        </div>
    }
}
