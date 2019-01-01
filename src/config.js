// 这里是配置拦截器。 也就是不论在app哪里发送请求/接受响应都会经过这里，在拦截器中挂载转圈圈动画。让每次发送请求时候都哦有这个动画
import axios from 'axios';
import {Toast} from 'antd-mobile';

axios.interceptors.request.use((config) => {
    Toast.loading('loading...', 0);
    return config;
});
axios.interceptors.response.use((config) => {
    Toast.hide();
    return config;
});