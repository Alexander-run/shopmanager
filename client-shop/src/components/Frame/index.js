import React from 'react'
import logo from './favicon.ico'
import { Layout, Menu, Dropdown, Avatar, message, Badge } from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {adminRoutes} from '../../route'
import { withRouter } from 'react-router-dom';
import './frame.css'
import { clearToken } from '../../utils/auth';
import { connect } from 'react-redux';

const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route=>route.isShow)

function index(props) {
    const popMenu = (
        <Menu onClick={(p)=>{
            if(p.key ==='logout'){
                clearToken();
                props.history.push('/login');
            } else if(p.key=='noti'){
                props.history.push('/admin/notices')
            } else {
                message.info(p.key)
            }
        }}>
            <Menu.Item key='noti'>通知中心</Menu.Item>
            <Menu.Item key='set'>设置</Menu.Item>
            <Menu.Item key='logout'>退出</Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            <Header className="header" style={{backgroundColor:'#428bca'}}>
                <div className="logo">
                    <img src={logo} alt='logo' />
                </div>
                <Dropdown overlay={popMenu}> 
                    <div>
                        <Avatar>U</Avatar>
                        <Badge dot={!props.isAllRead}>
                            <span>超级管理员</span><DownOutlined />
                        </Badge>
                    </div>
                </Dropdown>
            </Header>
            <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                    {routes.map(route=>{
                        return(
                        <Menu.Item key={route.path} onClick={p=>props.history.push(p.key)}>
                            {route.title}
                        </Menu.Item>)
                    })}
                </Menu>
            </Sider>
            <Layout style={{ padding: '16px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                {props.children}
                </Content>
            </Layout>
            </Layout>
        </Layout>
    )
}

export default connect(state=>state.notice)(withRouter(index))
