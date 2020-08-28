
// 对axios进行二次封装

// 之前配置的
// axios.defaults.baseURL = "http://localhost:8888";  // 配置请求的基本路径
// localhost和127.0.0.1之间也是有跨域的
axios.defaults.baseURL = "http://127.0.0.1:8888";  // 配置请求的基本路径

axios.defaults.withCredentials = true; //配置为true 后台的请求都会带上cookie

// 数据以表单的形式扔给服务器
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 还是以表单的形式扔给服务器，数据格式是这样的：name=z3&age=4
axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = ``;
    for (let attr in data) {
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
};

// 配置请求拦截器(里面什么都没有配置)
/*axios.interceptors.request.use(config => {
    return config
})*/

// 配置响应拦截器
axios.interceptors.response.use(response=> {
    return response.data;
}, reason=> {
    // 如果路径出错了，通过会返回404 还有一些其它错误....
    // console.dir(reason)
    if(reason.response){
        switch (String(reason.response.status)) {
            case "404":
                alert("当前请求的地址不存在！")
                break;
            default:
                break;
        }
    }
    //　直接创建出一个失败的promise
    return Promise.reject(reason);
})

axios.defaults.validateStatus = function (status) {
    return /^(2|3)\d{2}$/.test(status);
}











