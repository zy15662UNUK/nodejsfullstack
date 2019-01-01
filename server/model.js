const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_URL = 'mongodb://localhost:27017/react-project-chat';
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('mongodb connected');
});
// 集合的schema
const model = {
    user: {
        user: {
            type: String,
            required: true // 必须有
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        desc: { // 个人或者职位简介
            type: String
        },
        title: {// 职位名
            type: String
        },
        company: { // boss才有
            type: String
        },
        money: {
            type: String
        }

    },
    chat: {
        chatid: { // from和to拼起来作为某一个聊天的唯一标志便于查询
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
            default: ''
        },
        read: {
            type: Boolean,
            default: false
        },
        create_time: {
            type: Number,
            default: (new Date()).getTime()
        }
    }
};
// 注册所有的集合
for (let k in model) {
    mongoose.model(k, new Schema(model[k]));
}
module.exports = {
    getModel: function (name) { // 获取对应名称的集合
        return mongoose.model(name);
    }
};