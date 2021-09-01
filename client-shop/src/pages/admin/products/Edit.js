import React, {useState,useEffect} from 'react'
import {Form, Card, Input, Button, message, InputNumber, Upload} from 'antd'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import { createApi, getOneById, modifyOne } from '../../../services/products'
import {serverUrl} from '../../../utils/config'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

function Edit(props) {

    const [currentData, setCurrentData] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))

    useEffect(() => {
        if(props.match.params.id) {
            getOneById(props.match.params.id)
            .then(res=>{
                setCurrentData(res.data[0])
                setImageUrl(res.data[0].coverImg)
                setEditorState(BraftEditor.createEditorState(res.data[0].content))
            }).catch(e=>console.log(e))
        }
    },[])
    
    const uploadButton = (
        <div>
            {loading?<LoadingOutlined />:<PlusOutlined />}
            <div className='ant-upload-text'>Upload</div>
        </div>
    )
    const handleChange = (info) => {
        if(info.file.status==='uploading'){
            setLoading(true)
            return
        }
        if(info.file.status==='done'){
            setLoading(false)
            console.log(info)
            setImageUrl(info.file.response.info)
        }
    }

    const handleEditorChange = (editorState) => {
        setEditorState(editorState)
    }

    const handleFinish = (values) => {
        console.log(editorState.toHTML())
        if(props.match.params.id){
            modifyOne(props.match.params.id,{...values,coverImg:imageUrl,content:editorState.toHTML()})
            .then(res=>{
                message.info(res.data.msg)
                props.history.push('/admin/products')
            })
            .catch(e=>console.log(e))
        } else {
            createApi({...values,coverImg:imageUrl,content:editorState.toHTML()})
            .then(res=>{
                message.info(res.data.msg)
                props.history.push('/admin/products')
            })
            .catch(e=>console.log(e))
        }
    }
    const handleFailed = (values) => {
        console.log(values.values)
        message.error('请输入正确的内容')
    }


    return (
        <Card title='商品编辑'>
            <Form onFinish={handleFinish} onFinishFailed={handleFailed}>
                <Form.Item label='名字' name='name'
                    rules={[
                        {
                            required:true,
                            message:'请输入商品名'
                        },
                        {
                            type:'string',
                            message:'请输入正确的商品名'
                        }
                    ]}>
                    <Input placeholder='请输入商品名'></Input>
                </Form.Item>
                <Form.Item label='价格' name='price' 
                    rules={[
                        {
                            required:true,
                            message:'请输入商品价格'
                        },
                        {
                            type:'number',
                            min:0,max:100,
                            message:'价格必须介于0到100之间'
                        }
                    ]}>
                    <InputNumber placeholder='请输入商品价格'></InputNumber>
                </Form.Item>
                <Upload
                    name="file"
                    listType='picture-card'
                    className='avatar-uploader'
                    action={serverUrl+'/api/v1/common/file_upload'}
                    onChange={(info)=>handleChange(info)}
                >
                    {imageUrl ? <img src={serverUrl + imageUrl} alt="avatar" style={{width:'100%'}} /> : uploadButton}
                </Upload>
                <Form.Item label='详情'>
                    <BraftEditor 
                        value={editorState}
                        onChange={(values)=>handleEditorChange(values)}
                    />
                </Form.Item>
                <Form.Item><Button type='primary' htmlType='submit'>保存</Button></Form.Item>
            </Form>
        </Card>
    )
}

export default Edit