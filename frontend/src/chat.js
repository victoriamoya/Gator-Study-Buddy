import { $where } from "../../backend/models/groupModel";

(function() {
    var socket = io();
    $("form").submit(function(e) {
        e.preventDefault();
        socket.emit("chat message", $("#m").val());
        $("#m").val("");
        return true;
    })
})