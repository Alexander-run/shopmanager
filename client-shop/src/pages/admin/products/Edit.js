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
        message.error('????????????????????????')
    }


    return (
        <Card title='????????????'>
            <Form onFinish={handleFinish} onFinishFailed={handleFailed}>
                <Form.Item label='??????' name='name'
                    rules={[
                        {
                            required:true,
                            message:'??????????????????'
                        },
                        {
                            type:'string',
                            message:'???????????????????????????'
                        }
                    ]}>
                    <Input placeholder='??????????????????'></Input>
                </Form.Item>
                <Form.Item label='??????' name='price' 
                    rules={[
                        {
                            required:true,
                            message:'?????????????????????'
                        },
                        {
                            type:'number',
                            min:0,max:100,
                            message:'??????????????????0???100??????'
                        }
                    ]}>
                    <InputNumber placeholder='?????????????????????'></InputNumber>
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
                <Form.Item label='??????'>
                    <BraftEditor 
                        value={editorState}
                        onChange={(values)=>handleEditorChange(values)}
                    />
                </Form.Item>
                <Form.Item><Button type='primary' htmlType='submit'>??????</Button></Form.Item>
            </Form>
        </Card>
    )
}

export default Edit