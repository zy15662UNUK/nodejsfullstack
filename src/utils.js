// 用于计算跳转的url
export function redirPath({type, avatar}) {
    // 根据请求得到的类型确认接下来跳转页面是boss的还是genius的
    let url = type === 'boss'? '/boss': '/genius';
    // 如果没有avatar这个属性。那么说明是刚注册的，跳转到信息完善页面
    if (!avatar) {
        url += 'info';
    }
    return url;
}