import React from 'react'
import {Button, Card,List, Typography} from 'antd'
import { connect } from 'react-redux'

const data = [
    "aaaaaaaaaaaaaaa",
    "bbbbbbbbbbbbbbb",
    "ccccccccccccc"
]

function index(props) {
    return (
        <Card title='通知中心'  extra={
            <Button onClick={()=>{
                props.dispatch({
                    type:"READ_ALL"
                })
            }}>全部已读</Button>}>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item=>(
                    <List.Item style={{
                        display:'flex',
                        alignContent:'space-between'
                    }}>
                        <Typography.Text mark>[ITEM]</Typography.Text>{item}
                        <Button size='small'>标记为已读</Button>
                    </List.Item>
                )}>

            </List>
        </Card>
    )
}

export default connect(state=>state)(index)