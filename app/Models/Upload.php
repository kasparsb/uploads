<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    use HasFactory;

    protected $fillable = ['hash', 'meta',];

    public $casts = [
        'meta' => 'object',
    ];

    public $dates = [
        'finished_at',
    ];

    public function files() {
        return $this->hasMany(File::class)->orderBy('id', 'asc');
    }
}
