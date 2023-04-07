const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');

const hostname = '127.0.0.1';
const port = 3000;

const app = new Koa();
const router = new Router();

// 设置跨域
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*'); //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); // 只允许指定域名http://localhost:8080的请求
  
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE'); // 设置所允许的HTTP请求方法
  
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type'); //字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
  
  ctx.set('Access-Control-Allow-Credentials', true); // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";    
  await next();
});

// 获取目标院校数据
router.get('/targetInstitution', async (ctx) => {
    const filePath = path.join(__dirname, 'targetInstitution.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    ctx.body = data;
});

app.use(router.routes());

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
