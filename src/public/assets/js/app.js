function postAPI(url, data, cb) {
    $.ajax({
        url: 'api/' + url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: cb
    });
}

function addSource() {
    const data = {
        name: $('#addSourceName').val(),
        type: 'file',
        path: $('#addSourcePath').val()
    }

    console.log(data);

    postAPI('sources', data, console.log);
}