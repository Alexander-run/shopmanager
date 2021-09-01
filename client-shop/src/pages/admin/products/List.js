import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm, message } from 'antd'
import { delOne, listApi, modifyOne } from '../../../services/products'
import './list.css'
import { serverUrl } from '../../../utils/config';
import { connect } from 'react-redux';
import {loadProduct} from '../../../store/actions/product';

function List(props) {
    // const [dataSource,setDataSource] =useState([]);
    // const [total,setTotal] =useState(0);

    // const loadData = ()=>{
    //     listApi()
    //     .then(res=>{
    //         setDataSource(res.data.products)
    //         setTotal(res.data.totalCount)
    //     })
    // }

    const {list} = props;

    useEffect(()=>{
        props.dispatch(
            loadProduct()
        )
        // loadData();
    },[])

    const columns = [{
        title:'序号',
        key:'id',
        dataIndex:'id',
        width:80,
        align:'center',
        // render: (txt,record,index) => index +1
    },{
        title:'名字',
        dataIndex:'name'
    },{
        title:'展示图',
        dataIndex:'coverImg',
        render:(txt,record)=>record.coverImg?(<img src={serverUrl+record.coverImg} alt={record.name} style={{width:'120px'}} />):("暂无图片")
    },{
        title:'价格',
        dataIndex:'price'
    },{
        title:'在售状态',
        dataIndexL:'onSale',
        render:(txt,record)=>{
            return record.onSale?"在售":"已下架"
        }
    },{
        title:'操作',
        render:(txt,record,index) => {
            return (
                <div>
                    <Button size='small' type='primary'
                        onClick={()=>{
                            props.history.push(`/admin/products/edit/${record.id}`);
                        }}>修改</Button>
                    <Popconfirm title='确定删除此项?' onCancel={()=>console.log('用户取消删除')} 
                        onConfirm={()=>{
                            delOne(record.id)
                            .then(res=>{
                                message.info(res.data.msg);
                                props.dispatch(loadProduct());
                            }).catch(e=>console.log(e))
                        }}>
                        <Button style={{margin:'0 1rem'}}  size='small' type='danger'>删除</Button>
                    </Popconfirm>
                    <Button size='small' onClick={()=>{
                            modifyOne(record.id,{onSale:!record.onSale})
                            .then(res=>props.dispatch(loadProduct())).catch(e=>console.log(e))
                        }}
                        >{record.onSale?"下架":"上架"}</Button>
                </div>
            )
        }
    }]

    return (
        <div>
            <Card title='商品列表' extra={
                <Button type='primary' size='small'
                    onClick={()=>props.history.push('/admin/products/edit')}    
                >新增</Button>}>
                <Table rowKey='id' 
                    rowClassName={record=>(record.onSale ? "" : "bg-red")}
                    columns={columns} bordered 
                    dataSource={list} 
                    pagination={{defaultPageSize:10, 
                      }} />
            </Card>
        </div>
    )
}

export default connect(state=>state.product)(List)