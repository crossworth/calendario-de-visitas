import React from, {useState} 'react'

import { withRouter } from 'react-router-dom'

import { Typography, Form, Input, Button, Select, InputNumber, DatePicker, message, Upload } from 'antd'
import { createAppointment } from '../api'

import InboxOutlined from '@ant-design/icons/InboxOutlined'

const { Title } = Typography

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
}

const { Option } = Select


const possibleDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99]

const dddSelector = field => {
    return (
        <Form.Item name={'ddd_' + field} noStyle>
            <Select style={{ width: 70 }}>
                {possibleDDD.map(ddd => <Option key={ddd} value={ddd}>{ddd}</Option>)}
            </Select>
        </Form.Item>
    )
}

const phoneValidator = (rule, value) => {
    if (!value || value.length < 8) {
        return Promise.resolve()
    }

    let valid = /^[9]?\d{4}-?\d{4}$/g.exec(value)

    if (valid !== null) {
        return Promise.resolve()
    }

    return Promise.reject('Você deve informar um telefone válido')
}

const sanitizePhoneNumber = (ddd, phone) => {
    if (!phone) {
        return ''
    }

    return (ddd.toString() + phone.toString()).toString().replace('-', '').replace(' ', '')
}

const normFile = e => {
    if (Array.isArray(e)) {
        return e
    }
    return e && e.fileList
}
const CreateAppointment = (props) => {     
    
    const [fileList, setFileList] = useState([]);

    onSubmit(values) {
        const files = []

        const readFiles = () => {
            return new Promise((resolve, reject) => {
                if (this.state.fileList.length === 0) {
                    resolve()
                }

                for (let file of this.state.fileList) {
                    const reader = new FileReader()
                    reader.onload = e => {
                        files.push({
                            name: file.name,
                            content: btoa(e.target.result),
                        })

                        if (files.length === this.state.fileList.length) {
                            resolve()
                        }
                    }
                    reader.readAsBinaryString(file)
                }
            })
        }

        readFiles().then(() => {
            createAppointment({
                name: values.name,
                address: values.address,
                landline_phone_number: sanitizePhoneNumber(values.ddd_landline_phone_number, values.landline_phone_number),
                mobile_phone_number: sanitizePhoneNumber(values.ddd_mobile_phone_number, values.mobile_phone_number),
                email: values.email,
                number_of_employees: values.number_of_employees,
                date: values.date ? values.date.format() : null,
                return_date: values.return_date ? values.return_date.format() : null,
                due_date: values.due_date ? values.due_date.format() : null,
                observations: values.observations,
                documents: files,
            }).then(result => {
                message.success('Agendamento cadastrado com sucesso')
                this.props.history.push('/agendamentos/' + result.data.id)
            }).catch(error => {
                let errorMessage = error

                if (error.response && error.response.request && error.response.request.response) {
                    errorMessage = error.response.request.response
                }

                message.error('Ocorreu um erro ao cadastrar o agendamento: ' + errorMessage)
            })
        })
    }

    render() {
        const { fileList } = this.state
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file)
                    const newFileList = state.fileList.slice()
                    newFileList.splice(index, 1)
                    return {
                        fileList: newFileList,
                    }
                })
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }))

                return false
            },
            fileList,
            multiple: true,
        }

        return <div>
            <Title level={3}>Novo agendamento</Title>
            <Form
                {...layout}
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                    ddd_landline_phone_number: 41,
                    ddd_mobile_phone_number: 41,
                }}
                onFinish={this.onSubmit}>

                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Informe o nome' }]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Endereço"
                    name="address">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Telefone fixo"
                    name="landline_phone_number"
                    rules={[() => ({
                        validator: phoneValidator
                    })]}>
                    <Input addonBefore={dddSelector('landline_phone_number')}/>
                </Form.Item>

                <Form.Item
                    label="Telefone móvel"
                    name="mobile_phone_number"
                    rules={[
                        { required: true, message: 'Informe o telefone móvel' },
                        () => ({
                            validator: phoneValidator
                        })]}>
                    <Input addonBefore={dddSelector('mobile_phone_number')}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Informe o email' },
                        { type: 'email', message: 'Informe um email válido' }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Número de colaboradores"
                    name="number_of_employees">
                    <InputNumber min={0}/>
                </Form.Item>

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

                <Form.Item
                    label="Observações"
                    name="observations">
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item label="Documentos">
                    <Form.Item name="documents" valuePropName="documents" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Clique aqui ou solte arquivos para enviar</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

export default withRouter(CreateAppointment)
