import post from 'dom-helpers/src/http/post';

import state from '../state';

function createUpload(cb) {
    // Ja upload izveidots, tad turpinām
    if (state.get('uploadId')) {
        cb()
    }
    else {
        post(state.get('uploadsHost')+'/new').then(r => {

            state.set('uploadId', r.hash);

            cb()
        })
    }
}

export default createUpload