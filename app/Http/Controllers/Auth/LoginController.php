<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Auth;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        //$this->validateLogin($request);

        if ($this->attemptLogin($request)) {
            $request->session()->regenerate();

            return redirect(data_get(Auth::guard()->user(), 'homeRoute'));

            // return $this->authenticated($request, $this->guard()->user())
            //     ?: redirect()->intended($this->redirectPath());
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        //$this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    public function logout(Request $request)
    {
        Auth::guard()->logout();

        $request->session()->invalidate();

        return redirect('/');
    }

    protected function attemptLogin(Request $req)
    {
        return Auth::guard()->attempt(
            $req->only('email', 'password'), true
        );
    }
}
