const sourceTree = {
    assets: [],
    sources: [],
    tree: {},
    init: function () {
        console.log('start');
        this.loadSources(function (data) {
            sourceTree.loadAssets(sourceTree.generateTree);
        });
    },


    getThen: function (url, callback) {
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Call .json() on the response
        })
            .then(function (data) {
                callback(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },

    loadAssets: function (callback) {
        sourceTree.onLoadAssets = callback;
        this.getThen('assets/js/assets.json', function (data) {
            console.log('loaded assets');
            sourceTree.assets = data.assets;
            sourceTree.onLoadAssets(sourceTree.assets);
        });
    },

    loadSources: async function (callback) {
        sourceTree.onLoadSources = callback;
        this.getThen('api/sources', function (data) {
            console.log('loaded sources');
            sourceTree.sources = data.data;
            sourceTree.onLoadSources(sourceTree.sources);
        });
    },



    /**
     * 
     * @param {Array} assets a flat list of assets from the API
     * @returns {Object} a tree of all assets and subdirectories
     */
    generateTree: async function (assets) {
        console.log('generating tree');
        sourceTree.sources.forEach(source => {
            const sourceAssets = sourceTree.assets.filter(item => item.source_id === source.id);
            console.log('generating source ' + source.name + ' branch');

            const sourceFiles = sourceAssets.filter(file => file.path === '');
            const rootFilesObject = {};
            sourceFiles.forEach(file => {
                rootFilesObject[file.filename] = file;
            });

            sourceTree.tree[source.id] = {
                is_source: true,
                source_id: source.id,
                name: source.name,
                files: rootFilesObject,
                branches: sourceTree.buildTreeBranches(sourceAssets)
            };
        });
        sourceTree.renderTree({ branches: sourceTree.tree }, document.getElementById('source-tree'));
    },

    buildTreeBranches: function (assets) {
        const root = {
            name: 'root',
            branches: {},
            files: {}
        };

        for (const asset of assets) {
            const parts = asset.path
                ? asset.path.split('/').filter(Boolean)
                : [];

            let current = root;

            // build folder structure from path
            for (const part of parts) {
                if (!current.branches[part]) {
                    current.branches[part] = {
                        name: part,
                        branches: {},
                        files: {}
                    };
                }

                current = current.branches[part];
            }

            // attach file (IMPORTANT: use filename, not path)
            current.files[asset.filename] = {
                ...asset
            };
            current.source_id = asset.source_id;
        }

        return root.branches;
    },

    renderTree: function (node, container) {
        const ul = document.createElement('ul');

        // ---- FOLDERS FIRST ----
        for (const key in node.branches) {
            const branch = node.branches[key];

            const li = document.createElement('li');
            li.classList.add('folder-element')

            const folderHeader = document.createElement('div');
            folderHeader.classList.add('folder-header');
            folderHeader.textContent = branch.name;
            folderHeader.style.cursor = 'pointer';
            folderHeader.setAttribute('data-name', branch.name);
            if(branch.is_source) {
                folderHeader.setAttribute('data-source_id', key);
                folderHeader.setAttribute('data-is_source', 'true');
                folderHeader.setAttribute('data-path', branch.name + '/');
                console.log('is source');
            } else {
                // not source
                folderHeader.setAttribute('data-parent', node.name);
                // setting path
                if(Object.keys(branch.files).length > 0) {
                    const anyFile = branch.files[Object.keys(branch.files)[0]];
                    const source_name = sourceTree.sources.find(s => s.id === anyFile.source_id).name
                    const path = source_name + '/' + anyFile.path;
                    folderHeader.setAttribute('data-path', path);
                }
            }

            const childrenContainer = document.createElement('div');
            childrenContainer.classList.add('children-container');
            childrenContainer.style.display = 'none';

            // toggle
            folderHeader.onclick = (e) => {
                if(!e.target.classList.contains('open')) {
                    e.target.classList.add('open');
                } else {
                    e.target.classList.remove('open');
                }
                if(e.target.getAttribute('data-is_source')) {
                    const files = node.branches[e.target.getAttribute('data-source_id')].files;
                    sourceTree.displayFiles(
                        document.getElementById('file-grid'),
                        files,
                        e.target.getAttribute('data-name') + '/'
                    );
                } else {
                    const files = node.branches[e.target.getAttribute('data-name')].files;
                    sourceTree.displayFiles(
                        document.getElementById('file-grid'),
                        files,
                        e.target.getAttribute('data-path')
                    );
                }

                childrenContainer.style.display =
                    childrenContainer.style.display === 'none' ? 'block' : 'none';
            };

            // recursive call
            sourceTree.renderTree(branch, childrenContainer);

            li.appendChild(folderHeader);
            li.appendChild(childrenContainer);
            ul.appendChild(li);
        }

        // ---- FILES ----
        if(node.files) {

            const unsortedFileKeys = Object.keys(node.files);
            const fileKeys = unsortedFileKeys.sort((a, b) => a.localeCompare(b, 'en', {'sensitivity': 'base'}));

            //for (const key in node.files) {
            for(let i = 0; i < fileKeys.length; i++) {
                const file = node.files[fileKeys[i]];
    
                const li = document.createElement('li');
                li.classList.add('file');
                li.classList.add('file-type-' + file.type);
                li.textContent = file.filename;
                //ul.appendChild(li);
            }
        }

        container.appendChild(ul);
    },

    renderFiles: function() {

    },

    displayFiles: function(container, files, path = null) {
        const filenames = Object.keys(files).sort((a, b) => a.localeCompare(b, 'en', {'sensitivity': 'base'}));
        
        document.getElementById('folder-path').textContent = path;

        container.innerHTML = '';
        let i = 0;
        const icons = {
            video: '🎬',
            text: '📄'
        };
        filenames.forEach(fn => {
            const file = files[fn];

            const fileHolder = document.createElement('div');
            fileHolder.classList.add('file-holder');
            fileHolder.setAttribute('tabindex', i);
            fileHolder.setAttribute('data-path', file.path);
            fileHolder.setAttribute('data-id', file.id);
            fileHolder.setAttribute('data-source_id', file.source_id);
            fileHolder.setAttribute('data-filename', file.filename);
            fileHolder.setAttribute('data-type', file.type);
            fileHolder.title = file.filename;
            i++;

            let innerHTML = '';
            if(file.type === 'image') {
                innerHTML += `<div class="file-icon icon-image"><img src="api/media/${file.id}"></div>`;
            } else {
                innerHTML += `<div class="file-icon icon-${file.type}">${icons[file.type]}</div>`;
            }
            innerHTML += `<div class="filename" title="${file.filename}">${file.filename}</div>`;
            fileHolder.innerHTML = `<div class="file-card">${innerHTML}</div>`;
            container.appendChild(fileHolder);
        });
    },
    getUniqueValues: function (arr, key) {
        return [...new Set(arr.map(item => item[key]))];
    }
}


