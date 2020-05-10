import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

import { ConfigProvider, Layout, Menu } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'

const { Sider, Content } = Layout

import CalendarOutlined from '@ant-design/icons/CalendarOutlined'
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined'
import FieldTimeOutlined from '@ant-design/icons/FieldTimeOutlined'

import MyAppointments from './MyAppointments'
import CreateAppointment from './CreateAppointment'
import Appointment from './Appointment'
import Search from './Search'

class App extends React.Component {
    constructor(props, context, state) {
        super(props, context)
    }

    render() {
        let defaultKey = 'agendamentos'

        if (window.location.pathname) {
            defaultKey = window.location.pathname.substr(1)
        }

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
                            defaultSelectedKeys={[defaultKey]}>
                            <Menu.Item key="agendamentos">
                                <Link to="/agendamentos">
                                    <CalendarOutlined/>
                                    <span>Meus agendamentos</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="novo-agendamento">
                                <Link to="/novo-agendamento">
                                    <PlusCircleOutlined/>
                                    <span>Novo agendamento</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="pesquisar">
                                <Link to="/pesquisar">
                                    <FieldTimeOutlined/>
                                    <span>Pesquisar</span>
                                </Link>
                            </Menu.Item>
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
                            <Route path="/agendamentos/:id" render={(props) => <Appointment {...props}/>}/>
                            <Route path="/agendamentos">
                                <MyAppointments/>
                            </Route>
                            <Route path="/novo-agendamento">
                                <CreateAppointment/>
                            </Route>
                            <Route path="/pesquisar">
                                <Search/>
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
