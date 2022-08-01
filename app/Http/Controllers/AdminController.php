<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

use App\Models\File;
use App\Models\Upload;

class AdminController extends Controller
{

    public function index() {
        return view('admin', [
            'uploads' => Upload::with('files')->paginate(50),
        ]);
    }
}
