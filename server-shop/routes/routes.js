const router = require('koa-router')()
const services = require('../services/services')
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwtSecret';
const productsController = require('../controller/products');
const products = require('../controller/products');
const upload = require('../controller/upload')  // 引入我们的中间键

router.prefix('/api/v1')

router.post('/auth/manager_login', async(ctx,next)=>{

    data = ctx.request.body;
    username = data.username;
    password = data.password;
    if(username==='admin' && password === 'admin'){
        ctx.body = {
            code:200,
            msg:'success',
            token: jwt.sign(
                {name:'admin',id:'1'},
                'jwtSecret',
                {expiresIn:'1h'}
            )
        }
    }else{
        ctx.body={
            code:400,
            msg:'failed'
        }
    }
    console.log(data)
})

router.get('/users/manager_info', async(ctx)=>{
    ctx.body={
        username:'admin'
    }
})

router.get('/admin/users', async(ctx)=>{
    params = ctx.query
    ctx.body=params
})

router.get('/admin/products',productsController.findAllProduct)
router.get('/admin/products/:id',productsController.findOneById)
router.post('/admin/products',productsController.addProduct)
router.put('/admin/products/:id',productsController.updateProduct)
router.delete('/admin/products/:id',productsController.deleteProduct)




module.exports = router
