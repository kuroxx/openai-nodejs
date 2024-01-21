function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default behavior of the Enter key (e.g., submitting a form)
        sendMessage();
    }
}

function sendMessage() {
    const userInput = $('#user-input').val();
    displayMessage('User', userInput);

    // Display a loading message while waiting for the AI response
    displayMessage('AI', '...');

    $.ajax({
        type: 'POST',
        url: '/api/chat',
        contentType: 'application/json',
        data: JSON.stringify({ message: userInput }),
        success: function (response) {
            const aiResponse = response.message;
            removeLoadingMessage();
            displayMessage('AI', aiResponse);
        },
        error: function (error) {
            console.error('Error calling backend API:', error);
            removeLoadingMessage();
            displayMessage('AI', 'Error processing the request.');
        }
    });
}

function displayMessage(sender, message) {
    $('#chat-messages').append(`<p><strong>${sender}:</strong> ${message}</p>`);
    $('#user-input').val('');
}

function removeLoadingMessage() {
    $('#chat-messages p:contains("...")').remove();
}
