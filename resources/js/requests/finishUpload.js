import post from 'dom-helpers/src/http/post';

import state from '../state';

function finishUpload(meta, cb) {

    post(state.get('uploadsHost')+'/finish', {
        upload: state.get('uploadId'),
        meta: meta
    }).then(r => {

        state.set('uploadId', null)

        cb();
    })
}

export default finishUpload