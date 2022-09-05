<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Storage;

class File extends Model
{
    use HasFactory;

    protected $fillable = ['real_file_name', 'file_name', 'upload_id'];

    public function getSizeHumanAttribute() {
        $size = Storage::disk('files')->size($this->real_file_name);
        if ($size < 1024) {
            return $size.'B';
        }
        else if ($size < (1024 * 1024)) {
            return round(($size/1024), 2).'KB';
        }
        else if ($size < (1024 * 1024 * 1024)) {
            return round(($size/1024/1024), 2).'MB';
        }
        else {
            return round(($size/1024/1024/1024), 2).'GB';
        }
    }

    public function getUrlAttribute() {
        return route('file-download', $this);
    }

    public function getPathAttribute() {
        return Storage::disk('files')->path($this->real_file_name);
    }
}
