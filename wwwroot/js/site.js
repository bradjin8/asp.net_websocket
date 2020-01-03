
$(document).ready(function () {
    var connection = new WebSocketManager.Connection('wss://localhost:44354/chat');
    var port = window.location.port;
    connection.enableLogging = true;
    var user = document.getElementById('username').innerText;
    $.getJSON("https://api.ipify.org?format=json",
        function (data) {
            
            // Setting text of element P with id gfg 
            $("#users").html('<li>' + user+ '<br>' + data.ip + '(' + port + ')'+ '</li>');
        });
    connection.connectionMethods.onConnection = () => {

    }

    connection.connectionMethods.onDisconnection = () => {

    }

    connection.clientMethods["pingMessage"] = (socketId, message) => {
        console.log(window.location.port);
        console.log(window.location.host);
        var messageText = socketId + ' said: ' + message;
        $('#messages').append('<li>' + messageText + '</li>');
        console.log(messageText);
    }

    connection.start();

    var $messagecontent = $('#message-content');
    $messagecontent.keyup(function (e) {
        if (e.keyCode == 13) {
            var message = $messagecontent.val().trim();
            if (message.length == 0) {
                return false;
            }
           connection.invoke("SendMessage", connection.connectionId, message);
            $messagecontent.val('');
        }
    })
});


