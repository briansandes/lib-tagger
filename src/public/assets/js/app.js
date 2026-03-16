let sourcesAssets = {};

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

function getAPI(url, cb) {
    $.get({
        url: 'api/' + url,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: cb
    })
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


function loadSources() {
    getAPI('sources', response => {
        console.log('response sources', response);
        renderSources(response.data)
    });
}

function renderSources(sources) {
    const sourcesParent = $('#source-list');

    sources.forEach(s => {
        let e = $('<div class="folder" onclick="getAssets(' + s.id + ');">📁 ' + s.name + '</div>');
        let c = $('<div class="children" id="source-' + s.id + '" style="display: none;"></div>');
        sourcesParent.append(e);
        sourcesParent.append(c);
    });
}

const folderFiles = {};
const loadedSources = [];


function getAssets(source_id) {
    const folder_children = document.getElementById('source-' + source_id);
    if(loadedSources.indexOf(source_id) < 0) {
        getAPI('assets/?limit=999999&source_id=' + source_id, response => {
            const assets = response.data;
    
            assets.forEach(asset => {
    
                const folder = asset.path.replace(/\/$/, "")
    
                if (!folderFiles[folder]) folderFiles[folder] = []
    
                folderFiles[folder].push(asset);
            });
    
            const folderTree = buildTree(assets);
    
            renderTree(folderTree, folder_children);
            folder_children.style.display = 'block';
            loadedSources.push(source_id);
        });
    } else {
        folder_children.style.display = folder_children.style.display === 'none' ? 'block' : 'none';
    }
}