$(function() {
    const form = layui.form; //自定义校验规则
    form.verify({
        nickname:(val) => {
           if( val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    });
    //获取用户基本信息
    const initUserInfo = () => {
        $.ajax({
            type: 'GET',
            url:'/my/userinfo',
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // console.log(res);
                form.val("formUserInfo",res.data)
            }
        })
    }
    // 重置表单数据
    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserInfo()
    });
    
    //更新用户信息
    $('.layui-form').submit((e) => {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:$('.layui-form').serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 通知父页面更新信息
                window.parent.getUserInfo();
            }
        })
    })
    initUserInfo();
})