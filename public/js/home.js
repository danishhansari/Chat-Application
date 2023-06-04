$(".submit-btn").click(function() {
    let data = {
        name: $('#name').val(),
        roomId: $("#room-id").val()
    }
    if(data.name === ""|| data.roomId===""){
        alert("Name and Room ID are required")
    }else{
        $.ajax({
            "url":"/enter-room",
            "type": "post",
            "data": data, 
            "success": function(resp){
                console.log(resp)
            }
        })
        }
})