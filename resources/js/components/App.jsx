import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

import { ConfigProvider, Layout, Menu } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'

const { Sider, Content } = Layout

import CalendarOutlined from '@ant-design/icons/CalendarOutlined'
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined'
import FieldTimeOutlined from '@ant-design/icons/FieldTimeOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'

import MyAppointments from './MyAppointments'
import CreateAppointment from './CreateAppointment'

class App extends React.Component {
    constructor(props, context, state) {
        super(props, context)
        this.sta
    }

    render() {
        return <ConfigProvider locale={ptBR}>
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        className="side-area"
                        breakpoint="lg"
                        width="240px">
                        <div className="logo">
                            Visitas
                        </div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['my-appointments']}>
                            <Menu.Item key="my-appointments">
                                <Link to="/agendamentos">
                                    <CalendarOutlined/>
                                    <span>Meus agendamentos</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="new-appointment">
                                <Link to="/novo-agendamento">
                                    <PlusCircleOutlined/>
                                    <span>Novo agendamento</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="return-of-appointments">
                                <Link to="/retorno-de-agendamentos">
                                    <FieldTimeOutlined/>
                                    <span>Retorno de agendamentos</span>
                                </Link>
                            </Menu.Item>
                            {/*<Menu.Item key="integrations">*/}
                            {/*    <Link to="/integracoes">*/}
                            {/*        <SettingOutlined/>*/}
                            {/*        <span>Integrações</span>*/}
                            {/*    </Link>*/}
                            {/*</Menu.Item>*/}
                        </Menu>
                    </Sider>


                    <Content
                        className="main-content"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}>

                        <Switch>
                            <Route path="/agendamentos">
                                <MyAppointments/>
                            </Route>
                            <Route path="/novo-agendamento">
                                <CreateAppointment/>
                            </Route>
                            <Route path="/retorno-de-agendamentos">
                                Retorno de agendamentos
                            </Route>
                            <Route path="/integracoes">
                                Integrações
                            </Route>
                            <Route path="/">
                                <Redirect to="/agendamentos"/>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Router>
        </ConfigProvider>
    }
}

export default App
export const createAppComponent = React.createElement(App)
