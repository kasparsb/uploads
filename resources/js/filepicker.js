import replaceContent from 'dom-helpers/src/replaceContent';
import removeClass from 'dom-helpers/src/removeClass';
import change from 'dom-helpers/src/event/change';
import addClass from 'dom-helpers/src/addClass';
import append from 'dom-helpers/src/append';
import onp from 'dom-helpers/src/event/onp';
import jsx from 'dom-helpers/src/jsx';
import q from 'dom-helpers/src/q';

import state from './state';

import createUpload from './requests/createUpload';
import finishUpload from './requests/finishUpload';
import uploadFile from './requests/uploadFile';

let field = null;
let filesToUpload = [];
let metaFields = [];
let onSuccess = null;
let clearSuccess = null;
let maxSize = 20 * 1024 * 1024; // 20Mb


function submit() {

    console.log('submit');

    // Gadījumā, ja nav failu
    createUpload(() => {

        console.log('createUpload done');

        let meta = {};

        metaFields.forEach(field => {
            meta[field.name] = field.getValue();
        })

        finishUpload(meta, () => {

            if (onSuccess) {
                onSuccess();
            }
            else {
                addClass(field, 'file-picker--success');
            }

            filesToUpload = [];
            createFileList(filesToUpload);

            // Notīrām meta laukus
            metaFields.forEach(field => field.clear())
            // Notīrām selected file
            q(field, '[type=file]').value = '';

            setTimeout(() => {
                if (clearSuccess) {
                    clearSuccess();
                }
                else {
                    removeClass(field, 'file-picker--success');
                }
            }, 4000)
        })
    })

}

function startUpload() {
    createUpload(() => uploadFiles(filesToUpload))
}

function uploadFiles(files) {

    let done = 0;

    for (let i = 0; i < files.length; i++) {

        if (files[i].size > maxSize) {
            // file too large
            q(field, 'file-picker__file-list li:nth-of-type('+(i+1)+') span').innerHTML = 'Par lielu ('+(Math.round(files[i].size / 1024 / 1024)+'Mb')+')';
            continue;
        }

        uploadFile(files[i], (function(index){
            return function() {
                // Change progress to 100%
                q(field, '.file-picker__file-list li:nth-of-type('+(index+1)+') span').innerHTML = '100%'

                done++
            }
        })(i))

    }
}

function createFileList(files) {

    replaceContent(q(field, '.file-picker__file-list'));

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            append(q(field, '.file-picker__file-list'), (
                <li>
                    <a>{files[i].name}</a>
                    <span>0%</span>
                </li>
            ))
        }

        addClass(field, 'file-picker--file-list');
    }
    else {
        removeClass(field, 'file-picker--file-list');
    }
}

export default function(el, config) {

    field = el;

    state.set('uploadsHost', config.uploadUrl);
    state.set('autoUpload', config.autoUpload);

    onSuccess = config.onSuccess;
    clearSuccess = config.clearSuccess;

    metaFields = [];
    if (typeof config.metaFields != 'undefined') {
        metaFields = config.metaFields;
    }

    change(field, '[type=file]', (ev, el) => {
        removeClass(field, 'file-picker--dragover');

        filesToUpload = filesToUpload.concat([...el.files]);
        createFileList(filesToUpload);

        startUpload();
    })
    onp(field, 'dragenter', () => {
        addClass(field, 'file-picker--dragover');
    });
    onp(field, 'dragover');
    onp(field, 'drop', ev => {
        removeClass(field, 'file-picker--dragover');

        filesToUpload = filesToUpload.concat([...ev.dataTransfer.files])
        createFileList(filesToUpload);


        startUpload();
    });

    // Builtin button for finish upload
    onp('click', '.file-picker__buttons button', () => {
        submit();
    })

    // Custom submit button
    if (config.submitButton) {
        onp(config.submitButton, 'click', () => {
            submit();
        })
    }

    return {
        submit() {
            submit();
        }
    }
}