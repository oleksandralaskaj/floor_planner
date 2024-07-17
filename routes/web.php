<?php

use Illuminate\Support\Facades\Route;

Route::view('/login', 'main')->name('login');
Route::view('/{path?}', 'main')->where('path', '^((?!admin).)*$');
