import state from '../state';

function uploadFile(file, cb) {

    let data = new FormData();
    data.append('file', file);
    data.append('upload', state.get('uploadId'));

    fetch(state.get('uploadsHost')+'/upload', {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: data
    })
        .then(r => r.text())
        .then(r => {

            cb();

        })
}

export default uploadFile