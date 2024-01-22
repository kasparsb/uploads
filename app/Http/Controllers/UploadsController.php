<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

use App\Models\File;
use App\Models\Upload;
use App\Jobs\IpInfoRequest;

use function App\Helpers\getIp;
use function App\Helpers\getUserAgent;
use function App\Helpers\createUniqueModel;

class UploadsController extends Controller
{

    /**
     * Create new upload session
     */
    public function create(Request $request) {
        $upload = createUniqueModel(Upload::class, 'hash');

        $upload->ip = getIp();
        $upload->user_agent = getUserAgent();

        $upload->save();

        IpInfoRequest::dispatch($upload);

        return $upload->only('hash');
    }

    public function upload(Request $request) {

        $upload = Upload::where('hash', $request->upload)->first();

        if (!$upload) {
            abort(500);
        }

        $file = $request->file('file');

        $r = File::create([
            'upload_id' => $upload->id,
            'real_file_name' => Storage::disk('files')->putFile('', $file),
            'file_name' => $file->getClientOriginalName(),
        ]);

        return $r->only('file_name');
    }

    /**
     * Finish upload
     */
    public function finish(Request $request) {
        $upload = Upload::where('hash', $request->upload)->first();

        if (!$upload) {
            abort(500);
        }

        $upload->meta = $request->meta;
        $upload->finished_at = now();

        $upload->save();
    }
}
