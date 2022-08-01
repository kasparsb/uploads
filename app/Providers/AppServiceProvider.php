<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $p = json_decode(file_get_contents(base_path().'/package.json'));
        view()->share('app_version', $p->version);
        view()->share('app_js', asset('storage/dist/app.min-'.$p->version.'.js'));
        view()->share('app_css', asset('storage/dist/app.min-'.$p->version.'.css'));

        view()->share('filepicker_js', asset('storage/dist/filepicker.min-'.$p->version.'.js'));
    }
}
