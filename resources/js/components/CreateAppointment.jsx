import React from 'react'

import { withRouter } from 'react-router-dom'

import { Typography, Form, Input, Button, Select, InputNumber, DatePicker, message, Upload } from 'antd'
import { createAppointment, xCSRFToken } from '../api'

import InboxOutlined from '@ant-design/icons/InboxOutlined'

const { Title } = Typography

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
}

const { Option } = Select

const dddSelector = field => {
    return (
        <Form.Item name={'ddd_' + field} noStyle>
            <Select style={{ width: 70 }}>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
                <Option value="13">13</Option>
                <Option value="14">14</Option>
                <Option value="15">15</Option>
                <Option value="16">16</Option>
                <Option value="17">17</Option>
                <Option value="18">18</Option>
                <Option value="19">19</Option>
                <Option value="21">21</Option>
                <Option value="22">22</Option>
                <Option value="24">24</Option>
                <Option value="27">27</Option>
                <Option value="28">28</Option>
                <Option value="31">31</Option>
                <Option value="32">32</Option>
                <Option value="33">33</Option>
                <Option value="34">34</Option>
                <Option value="35">35</Option>
                <Option value="37">37</Option>
                <Option value="38">38</Option>
                <Option value="41">41</Option>
                <Option value="42">42</Option>
                <Option value="43">43</Option>
                <Option value="44">44</Option>
                <Option value="45">45</Option>
                <Option value="46">46</Option>
                <Option value="47">47</Option>
                <Option value="48">48</Option>
                <Option value="49">49</Option>
                <Option value="51">51</Option>
                <Option value="53">53</Option>
                <Option value="54">54</Option>
                <Option value="55">55</Option>
                <Option value="61">61</Option>
                <Option value="62">62</Option>
                <Option value="63">63</Option>
                <Option value="64">64</Option>
                <Option value="65">65</Option>
                <Option value="66">66</Option>
                <Option value="67">67</Option>
                <Option value="68">68</Option>
                <Option value="69">69</Option>
                <Option value="71">71</Option>
                <Option value="73">73</Option>
                <Option value="74">74</Option>
                <Option value="75">75</Option>
                <Option value="77">77</Option>
                <Option value="79">79</Option>
                <Option value="81">81</Option>
                <Option value="82">82</Option>
                <Option value="83">83</Option>
                <Option value="84">84</Option>
                <Option value="85">85</Option>
                <Option value="86">86</Option>
                <Option value="87">87</Option>
                <Option value="88">88</Option>
                <Option value="89">89</Option>
                <Option value="91">91</Option>
                <Option value="92">92</Option>
                <Option value="93">93</Option>
                <Option value="94">94</Option>
                <Option value="95">95</Option>
                <Option value="96">96</Option>
                <Option value="97">97</Option>
                <Option value="98">98</Option>
                <Option value="99">99</Option>
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
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
        return e
    }
    return e && e.fileList
}

class CreateAppointment extends React.Component {

    constructor(props, context, state) {
        super(props, context)
        this.state = {
            fileList: []
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        const files = []

        const readFiles = () => {
            return new Promise((resolve, reject) => {
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
                date: values.date,
                return_date: values.return_date,
                due_date: values.due_date,
                observations: values.observations,
                documents: files,
            }).then(result => {
                message.success('Agendamento cadastrado com sucesso')
                console.log(result.data.id)
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
                    rules={[() => ({
                        validator: phoneValidator
                    })]}>
                    <Input addonBefore={dddSelector('mobile_phone_number')}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ type: 'email', message: 'Informe um email válido' }]}>
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
