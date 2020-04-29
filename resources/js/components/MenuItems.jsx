import React from 'react'

import { Link } from 'react-router-dom'

import { Menu } from 'antd'


export default class MenuItems extends React.Component {
    render() {
        return <Menu
            mode="inline"
            defaultSelectedKeys={['my-appointments']}>
            <Menu.Item key="my-appointments">
                <Link to="/agendamentos">
                    <CalendarOutlined/>
                    <span>Meus agendamentos</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="new-appointment">
                <PlusCircleOutlined/>
                <Link to="/novo-agendamento"><span>Novo agendamento</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="return-of-appointments">
                <FieldTimeOutlined/>
                <Link to="/retorno-de-agendamentos"><span>Retorno de agendamentos</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="integrations">
                <SettingOutlined/>
                <Link to="/integracoes"><span>Integrações</span></Link>
            </Menu.Item>
        </Menu>
    }
}
