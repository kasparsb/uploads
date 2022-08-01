<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

use App\Models\File;
use App\Models\Upload;

use function App\Helpers\createUniqueModel;

class UploadsController extends Controller
{

    /**
     * Create new upload session
     */
    public function create() {
        return createUniqueModel(Upload::class, 'hash')->only('hash');
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
}
