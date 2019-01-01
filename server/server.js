import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
assethook({
    extensions: ['png', 'jpg']
});
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from '../src/App';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import reducers from '../src/reducer';
import staticPath from '../build/asset-manifest.json';

const express = require('express');
const app = express();



// socketio work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
const models = require('./model');
const Chat = models.getModel('chat');
const path = require('path');
io.on('connection', (socket) => {
    console.log('user in');
    socket.on('sendmsg', async function (d) {
        let {chatid, from, to, content} = d;
        try {
            let data = await Chat.create({chatid, from, to, content});
            console.log('msg stored',data);
            io.emit('receiveMsg', data);
        }catch (e) {
            console.log(e);
        }
    });
});
// end socketio


// 中间件处理/user开头的请求
const userRouter = require('./user.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);




// 利用中间件进行请求拦截。如果请求是/user或者/static。那么直接什么都不做用next转发给下一个中间件。否则那就是初次请求，直接返回index.html
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    const store = createStore(
        reducers,
        compose(
            applyMiddleware(thunk)
        )
    );
    let context = {};
    const markup = renderToString((
        <Provider store={store}>
            <StaticRouter
            location={req.url}
            context={context}
            >
                <App/>
            </StaticRouter>
        </Provider>
    ));
    const pageHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" type="text/css" href="${staticPath['main.css']}">
        <link rel="stylesheet" type="text/css" href="${staticPath['static/css/1.9441e436.chunk.css']}">

        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${markup}</div>
        <script src="${staticPath['main.js']}"></script>
        <script src="${staticPath['static/js/1.82f20f4f.chunk.js']}"></script>
        <script src="${staticPath['runtime~main.js']}"></script>
      </body>
    </html>
    `;
    return res.send(pageHTML);
    // return res.sendFile(path.resolve('build/index.html')); // 没有ssr就直接返回这个
});

// 将静态资源的目录(包括各种图片和js地址)设置成打包好的前端目录build
app.use('/', express.static(path.resolve('build')));
server.listen(9093, () => {
    console.log('server running at port 9093');
});