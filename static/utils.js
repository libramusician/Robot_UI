window.m = 0
window.c = 0
stop_play = {
    videoSource1: false,
    videoSource2: false,
}

move_method = {
    rotate_left: () => {
        window.c = 1
        console.log(c)
    },
    rotate_right: () => {
        window.c = 3
        console.log(c)
    },
    front: () => {
        window.c = 2
        console.log(c)
    },
    backwards: () => {
        window.c = 5
        console.log(c)
    },
    to_left: () => {
        window.c = 4
        console.log(c)
    },
    to_right: () => {
        window.c = 6
        console.log(c)
    },
    key_up: () => {
        window.c = 0
        console.log(c)
    }
}

function hide_menu(obj,_id) {
    window.stop_play[_id] = false
    $($(obj).parent().find("i")[0]).hide()
    $(obj).parent().find("h3").hide()
    $(obj).parent().find("p").hide()
    $(obj).parent().find("h5").hide()
}

function show_menu(obj,_id) {
    window.stop_play[_id] = true
    $($(obj).parent().find("i")[0]).show()
    $(obj).parent().find("h3").show()
    $(obj).parent().find("p").show()
    $(obj).parent().find("h5").show()
}

function change_status (obj){
    if ($(obj).parent().find("span").text() == "ON") {
        $(obj).parent().find("span").text("OFF")
        $(obj).find("div").css("left","5px");
    } else {
        $(obj).parent().find("span").text("ON")
        $(obj).find("div").css("left","35px");
    }
}

// 打开摄像头
function getVideo(sourceId,showId){
    let constraints = {
        video: true,
        // audio: true //开启麦克风
    };

    let _this=this;
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then(function (MediaStream) {
        let videoSource = document.getElementById(sourceId)
        videoSource.srcObject = MediaStream;
        _this.MediaStreamTrack=typeof MediaStream.stop==='function'?MediaStream:MediaStream.getTracks()[0];
        videoSource.play();
        showVideo(sourceId,showId)

    }).catch(function (PermissionDeniedError) {
        console.log(PermissionDeniedError);
    })
}

function showVideo(sourceId,showId) {
    let video = document.getElementById(sourceId)
    let rect = video.getBoundingClientRect();
    console.log(rect)
    video.width = rect.width
    video.height = rect.height
    let src = new cv.Mat(video.height,video.width, cv.CV_8UC4);
    var camera = new cv.VideoCapture(sourceId)
    console.log(camera)

    function playing(){
        camera.read(src)
        cv.imshow(showId,src)
        if (window.stop_play[sourceId]) {
            return
        } else {
            setTimeout(playing,20)
        }
    }
    playing()
}

$(function () {
    setInterval(function () {
        var myDate = new Date();
        $("#date").text(`${myDate.getFullYear()}/${myDate.getMonth()+1}/${myDate.getDate()}`)
        $("#time").text(`${myDate.getHours()-12>0 ? myDate.getHours()-12 : myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}${myDate.getHours()-12>0 ? ' pm' : ' am'}`)
    },500)

    $(".faq-box > div > div > i:nth-of-type(2)").click(function (){
        if ($(this).parent().find("i:nth-of-type(1)").hasClass("fa-minus")) {
            $(this).parent().find("i:nth-of-type(1)")
                .removeClass("fa-minus")
                .addClass("fa-plus")
            $(this).parent().find("i:nth-of-type(2)")
                .removeClass("fa-chevron-up")
                .addClass("fa-chevron-down")
        } else {
            $(this).parent().find("i:nth-of-type(1)")
                .removeClass("fa-plus")
                .addClass("fa-minus")
            $(this).parent().find("i:nth-of-type(2)")
                .removeClass("fa-chevron-down")
                .addClass("fa-chevron-up")
        }

        $(this).parent().parent().find("textarea").toggle()
    })

    $(document).keypress((event)=>{
        // console.log(event.keyCode)
        if (event.keyCode === 96) {
            window.m = +!window.m
            console.log(m)
        }
    })

    $(document).keyup((event)=>{
        if (event && event.keyCode===81) {  // 按 q
                move_method.key_up()
            } else if (event && event.keyCode===87) {  // 按 w
                move_method.key_up()
            } else if (event && event.keyCode===69) {  // 按 e
                move_method.key_up()
            } else if (event && event.keyCode===65) {  // 按 a
                move_method.key_up()
            } else if (event && event.keyCode===83) {  // 按 s
                move_method.key_up()
            } else if (event && event.keyCode===68) {  // 按 d
                move_method.key_up()
            }
    })

    $(document).keydown((event)=>{
            if (event && event.keyCode===81) {  // 按 q
                move_method.rotate_left()
            } else if (event && event.keyCode===87) {  // 按 w
                move_method.front()
            } else if (event && event.keyCode===69) {  // 按 e
                move_method.rotate_right()
            } else if (event && event.keyCode===65) {  // 按 a
                move_method.to_left()
            } else if (event && event.keyCode===83) {  // 按 s
                move_method.backwards()
            } else if (event && event.keyCode===68) {  // 按 d
                move_method.to_right()
            }
    })
})