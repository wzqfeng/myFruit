getData()
$("#add").click(function() {
    var intro = $("#intro").val();
    var jiage = $("#jiage").val();
    var urls = $("#urls").val();
    var uName = $("#name").val();
    var obj = {
        intro: intro,
        jiage: jiage,
        url: urls,
        uName: uName
    }
    $.post("http://127.0.0.1:81/addPost", obj, function(data) {
        console.log(data)
        getData()

    })

})

function getData() {
    $.get("http://127.0.0.1:81/getData", function(data) {
        console.log(data)
        show(data)
    })
}

function del(t) {
    var obj = {
        time: t
    }
    $.post("http://127.0.0.1:81/delData", obj, function(data) {
        console.log("删除成功")
        getData();
    })
}

function upd(i) {
    $("#ok").show()

    $("#intro").val(i.intro);
    $("#jiage").val(i.jiage);
    $("#urls").val(i.url);

    $("#name").val(i.uName)
    $("#ok").on("click", function() {
        var obj = {
            intro: $("#intro").val(),
            jiage: $("#jiage").val(),
            url: $("#urls").val(),
            uName: $("#name").val(),
            time: i.time
        }
        $.post("http://127.0.0.1:81/updData", obj, function(data) {
            console.log("修改成功")
            console.log("upd", data)
            getData()
        })
        $(this).off("click")
        $(this).hide()
    })
}

function show(arr) {

    var trtd = "";
    for (var i = 0; i < arr.length; i++) {
        var ss = $("option[value=" + arr[i].uName + "]").html()
        trtd += `<tr>
        <td>${ss}</td>
        <td>${arr[i].intro}</td>
        <td>${arr[i].jiage}</td>
        <td><img src=../public/${arr[i].url}></td>
        <td> 
        <span onclick=del(${arr[i].time})>删除</span>
        <span onclick=upd(${JSON.stringify(arr[i])})>修改</span></td>
        </tr>
        `
    }

    $("tbody").html(trtd)
}