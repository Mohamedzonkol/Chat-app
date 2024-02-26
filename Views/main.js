const socket = new WebSocket('ws://localhost:3000');
socket.onopen = function (event) {
    console.log('WebSocket connection opened:', event);
};

socket.onmessage = function (event) {
    const message = event.data;
    console.log('Received message:', message);
    $('#conversation').append(`<li class="in"><div class="chat-img"><img alt="Avatar" src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"></div><div class="chat-body"><div class="chat-message">${message}</div></div></li>`);
};

$('form').submit(function (e) {
    e.preventDefault();
    const message = $('#messageInp').val();
    if (message.trim() !== '') {
        socket.send(message.toString());
        $('#messageInp').val('');
    }
    return false;
});

socket.onclose = function () {
    alert('WebSocket connection closed. Please refresh the page.');
};

// Function to escape HTML
// function escapeHtml(text) {
//     return $('<div>').text(text).html();
// }