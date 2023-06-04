$(".submit-btn").click(function() {
    let data = {
        name: $('#name').val(),
        roomId: $("#room-id").val()
    }
    if(data.name === ""){
        alert("Name is required")
    }else{
        if(data.roomId === ""){
            $.ajax({
                "url":"/generate-room-id",
                "type": "get",
                "success": function(resp){
                    console.log(resp.roomId)
                }
            })
        }
        }
})