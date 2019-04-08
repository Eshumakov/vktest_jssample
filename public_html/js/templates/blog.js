$("#create-form").submit(function( event ) {
    var title = $('#create-form').find('input[name="title"]').val();
    var message = $('#message').val();
    var id = $('#editId').val();
    if (id) {
        app.feed.edit.request(id, title, message);
    } else {
        app.feed.create.request(title, message);
    }

    return false;
});