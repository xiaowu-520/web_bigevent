// 获取用户信息
function getUserInfo(){
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token'),
        // },
        success: (res) => {
            // console.log(res);
            if(res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            //渲染
            renderAvatar(res.data);
        },
        // complete: (res) => {
        //     // 判断是否获取认证信息
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    });    
}

//渲染用户信息
const renderAvatar = (user) => {
    const name =user.nickname || user.username;
    //渲染欢迎语
    $('#welcome').html(`欢迎 ${name}`);
    //渲染头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}

//退出
$('#btnLogout').click(() => {
    layui.layer.confirm("是否退出？",{icon: 3,title: "提示"},function(index){
        localStorage.removeItem('token');
        location.href = '/login.html'
    })
})

//切换高亮
function change(){
    $('#change').addClass('layui-this').next().removeClass('layui-this');
}
//调用
getUserInfo();