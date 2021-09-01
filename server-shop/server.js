let Koa = require('koa');
const routes = require('./routes/routes')
const koaJwt = require('koa-jwt')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const app = new Koa();
const jwtSecret = 'jwtSecret';
const tokenExpiresTime = 1000*60*60*24*7;

app.use(
    cors({
        origin:function(ctx) {
            if(ctx.url === '/test'){
                return '*';
            }
            return 'http://localhost:3000';
        },
        maxAge:5,
        credentials:true,
        allowMethods:['GET','POST','PUT','DELETE','OPTIONS'],
        allowHeaders:['Content-Type','Authorization','Accept'],
        exposeHeaders:['WWW-Authenticate','Server-Authorization']
    })
)

app.use(bodyParser());
app.use(routes.routes(), routes.allowedMethods());
app.use(
    koaJwt({
        secret:jwtSecret
    })
    .unless({
    path:['/api/v1/auth/manager_login',
    ]
}));

app.listen('3009',(e)=>{
    if(e){
        console.log(e)
    } else{
        console.log('服务器启动成功，运行于本地端口3009')
    }
})

