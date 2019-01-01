// /user/..类的路由
const express = require('express');
const util = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');

// 查询全部的用户
Router.get('/list', async (req, res) => {
    let {type} = req.query;
    console.log(type);
    try {
        let data
        if (type) {
            data = await User.find({type});
        }else {
            data = await User.find({});
        }
        console.log(data)
        res.json({code: 0, data});

    }catch (e) {
        console.log(e);
    }

});

// 查询用户聊天信息
Router.get('/getmsglist', async (req, res) => {
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({code: 1});
    }
    let users = {};
    let d = await User.find({});
    d.forEach(v => {
        users[v._id] = {name: v.user, avatar: v.avatar};
    });
    try {
        let data = await Chat.find({'$or': [{from: userId}, {to: userId}]}); // 仅查找发给该用户和该用户发出的信息
        return res.json({code: 0, data, users});
    }catch (e) {
        console.log(e);
    }
});

// 登陆
Router.post('/login', async (req, res) => {
    // console.log(req.body);
    let {user, password} = req.body;
    let check = await User.findOne({user, password: util.md5(util.md5(password))});
    // 先检查是否存在
    if (!check) {
        return res.json({code: 1, msg: '用户名或者密码不正确'});
    }
    // console.log(check);
    res.cookie('userId', check._id); // 用mongoDB生成的id作为cookie
    return res.json({code: 0, data: check});
});

// 注册
Router.post('/register', async (req, res) => {
    // console.log(req.body);
    let {user, password, type} = req.body;
    let check = await User.findOne({user});
    // 先检查是否重复
    if (check) {
        return res.json({code: 1, msg: '用户名重复'});
    }
    try {
        let data = await User.create({user, type, password: util.md5(util.md5(password))});
        // console.log(data);
        res.cookie('userId', data._id); // 用mongoDB生成的id作为cookie
        return res.json({code: 0});
    }catch (e) {
        return res.json({code: 1, msg: '后端出错了！ 存储失败'});
    }

});

// 附加信息
Router.post('/update', async (req, res) => {
    let body = req.body;
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({code: 1});
    }

    try {
        let check = await User.findOneAndUpdate({_id: userId}, body);
        // 先检查是否重复
        if (check) {
            const data = Object.assign({}, {user: check.user, type: check.type}, body);
            return res.json({code: 0, data});
        }
    }catch (e) {
        return res.json({code: 1, msg: '后端出错了！ 存储失败'});
    }

});

// 标记已读信息
Router.post('/readmsg', async (req, res) => {
    let {from} = req.body;
    const {userId} = req.cookies;
    // console.log(from, userId);
    try {
        let data = await Chat.update({from: from, to: userId}, {'$set': {read: true}}, {multi: true});
        // console.log(data);
        return res.json({code: 0, data: data.nModified});
    }catch (e) {
        return res.json({code: 1, msg: '后端出错了！ 修改失败'});
    }

});

// 验证登陆
Router.get('/info', async (req, res) => {
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({code: 1});
    }
    console.log(userId)
    try {
        let data = await User.findOne({_id: userId});
        if (!data) {
            return res.json({code: 1});
        }
        return res.json({code: 0, data});
    }catch (e) {
        return res.json({code: 1, msg: '后端出错了！ 存储失败'});
    }


});
module.exports = Router;
