$(function(){
    const form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        newPwd:(val) => {
            if(val === $("[name = oldPwd]").val()) return "新密码不能和原密码一致"
        },
        rePwd:(val) => {
            if(val !== $("[name = newPwd]").val()) return "确认密码和新密码不一致"
        }
    });
    
    //更新密码
    $('.layui-form').submit((e) => {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                //清空token
                localStorage.removeItem('token');
                //跳转到登录页面
                window.parent.location.href = '/login.html';
            }
        })
    })
})