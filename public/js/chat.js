let socket = io("/");
let name ="";
let roomId = "";
$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    name = urlParams.get("name")
    roomId  = urlParams.get("roomId")

    socket.emit("join-room", name , roomId)
})
socket.on("user-connected", (name) => {
    let html = `
        <div class="row">
        <div class="col-12 col-md-12 col-lg-12">
            ${name} just join the room
        </div>
        </div>
    `;
    $("#chat-area").append(html)
})