
function handle_click(){
    let timerID
    let cmd = "0";
    const socket = new WebSocket('ws://localhost:50000');

    socket.addEventListener('open', function (event) {

        socket.send('Connection Established');

    });



    socket.addEventListener('message', async function (event) {
        msg = await event.data.text();
        console.log(msg);
        const imageEl = document.getElementById("video-from-server");
        imageEl.src = `data:image/jpeg;base64, ${msg}`

        if (cmd !== "0") socket.send(cmd)
    });

    const contactServer = () => {

        socket.send("Initialize");

    }


    // document.addEventListener('keydown', function(event) {
    //     // Check which key was pressed
    //     if (event.code === 'KeyW') {
    //         socket.send('1');
    //     } else if (event.code === 'KeyS') {
    //         socket.send('2');
    //     } else if (event.code === 'KeyA') {
    //         socket.send('3');
    //     } else if (event.code === 'KeyD') {
    //         socket.send('4');
    //     }
    //
    // });


    let btn_up = document.querySelector("#btn-up");
    let btn_down = document.querySelector("#btn-down");
    let btn_left = document.querySelector("#btn-left");
    let btn_right = document.querySelector("#btn-right");
    btn_up.addEventListener("mousedown", e=>{
        timerId = setInterval(function() {
            // Do something repeatedly while the mouse button is held down
            cmd = "1"
        }, 100); // Trigger the action every 100 milliseconds
    });
    btn_up.addEventListener("mouseup", e=>{
        clearInterval(timerId);
        cmd = "0"

    });


    btn_down.addEventListener("mousedown", e=>{
        timerId = setInterval(function() {
            // Do something repeatedly while the mouse button is held down
            cmd = "2"
        }, 100); // Trigger the action every 100 milliseconds
    });
    btn_down.addEventListener("mouseup", e=>{
        clearInterval(timerId);
        cmd = "0"

    });


    btn_left.addEventListener("mousedown", e=>{
        timerId = setInterval(function() {
            // Do something repeatedly while the mouse button is held down
            cmd = "3"
        }, 100); // Trigger the action every 100 milliseconds
    });
    btn_left.addEventListener("mouseup", e=>{
        clearInterval(timerId);
        cmd = "0"

    });


    btn_right.addEventListener("mousedown", e=>{
        timerId = setInterval(function() {
            // Do something repeatedly while the mouse button is held down
            cmd = "4"
        }, 100); // Trigger the action every 100 milliseconds
    });
    btn_right.addEventListener("mouseup", e=>{
        clearInterval(timerId);
        cmd = "0"

    });


}

