import removeClass from 'dom-helpers/src/removeClass';
import change from 'dom-helpers/src/event/change';
import addClass from 'dom-helpers/src/addClass';
import post from 'dom-helpers/src/http/post';
import append from 'dom-helpers/src/append';
import onp from 'dom-helpers/src/event/onp';
import jsx from 'dom-helpers/src/jsx';
import q from 'dom-helpers/src/q';

let field;
let uploadId;
let uploadsHost = 'http://upload.darbs.xyz:8065';

function handleFiles(files) {

    createFileList(files);
    addClass(field, 'file-picker--file-list');

    if (uploadId) {
        uploadFiles(files)
    }
    else {
        createUpload(() => uploadFiles(files))
    }
}

function createFileList(files) {
    for (let i = 0; i < files.length; i++) {
        append(q(field, '.file-list'), (
            <li>
                <a>{files[i].name}</a>
                <span>0%</span>
            </li>
        ))
    }
}

function uploadFiles(files) {

    let done = 0;

    for (let i = 0; i < files.length; i++) {

        let data = new FormData();
        data.append('file', files[i]);
        data.append('upload', uploadId);

        fetch(uploadsHost+'/upload', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            method: 'POST',
            body: data
        })
            .then(r => r.text())
            .then(r => {

                // Change progress to 100%
                q(field, '.file-list li:nth-of-type('+(i+1)+') span').innerHTML = '100%'

                done++

                if (done >= files.length) {
                    addClass(field, 'file-picker--success');

                    setTimeout(reset, 4000)
                }

            })
    }
}

function createUpload(cb) {
    post(uploadsHost+'/new').then(r => {
        uploadId = r.hash;

        cb()
    })
}

function reset() {
    removeClass(field, 'file-picker--success');
    removeClass(field, 'file-picker--file-list');
    q(field, '.file-list').innerHTML = '';
}

export default function(el) {

    field = el;

    console.log(field);

    change(field, '[type=file]', (ev, el) => {
        handleFiles(el.files);
    })
    onp(field, 'dragenter', () => {
        addClass('.file-picker', 'file-picker--dragover');
    });
    onp(field, 'dragover');
    onp(field, 'drop', ev => {
        removeClass('.file-picker', 'file-picker--dragover');
        handleFiles(ev.dataTransfer.files);
    });
}