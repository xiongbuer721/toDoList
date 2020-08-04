$(function() {
    load();
    // alert(1);
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("输入待办事项");
            } else {
                // alert(1);
                //先读取本地存储原来的数据
                var local = getData();
                // console.log(local);
                //把local数组进行更新数据，把新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });

                //把这个数组local存储给本地存储
                saveData(local);
                //2.toDolist本地存储数据渲染加载到页面
                load();
                $(this).val(""); //清空输入框的内容

            }
        }

    });
    //3.删除本地存储的数据
    $("ol,ul").on("click", "a", function() {
        //现获取本地存储
        var data = getData();
        //修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        // console.log(index);
        //保存到本地储存
        saveData(data);
        //重新渲染页面
        load();
    });
    //toDolist 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
            //先获取本地存储的数据
            var data = getData();
            //修改数据
            var index = $(this).siblings("a").attr("id");
            //data[?].done=?
            data[index].done = $(this).prop("checked");
            // console.log(index);
            //保存到本地存储
            saveData(data);
            //渲染页面
            load();
        })
        //读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("toDoList");
        if (data !== null) {
            //本地存储的对象是字符串类型的，要转化为对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveData(data) {
        localStorage.setItem("toDoList", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        var data = getData();
        // console.log(data);
        //遍历数组之前先清空ol里的内容防止加载两次数据
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
                // console.log(todoCount);
            }


        });
        $("#todoCount").text(todoCount);
        $("#doneCount").text(doneCount);
    }
})