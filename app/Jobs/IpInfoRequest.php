<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Http;

use App\Models\Upload;

class IpInfoRequest implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Upload $upload,
    )
    {

    }

    public function handle()
    {
        if (!$this->upload->ip) {
            return;
        }

        $response = Http::get('http://ipinfo.darbs.xyz:8081/', [
            'ip' => $this->upload->ip,
        ]);

        $this->upload->ip_info = $response->json();

        $this->upload->save();

    }
}
