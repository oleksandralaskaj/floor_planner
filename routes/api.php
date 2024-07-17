<?php

use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

//no need for /api
Route::get('/', function (Request $request) {
    return 'hi this is api being called';
});

Route::middleware('auth')->get('/user', function (Request $r) {
    return $r->user();
});

// get projects of user
Route::get('/projects', [ProjectController::class, 'getProjectsOfUser'])->name('api.user-projects');

//get the project
Route::get('/projects/{project_id}', [ProjectController::class, 'show'])->name('api.project');

//update project
Route::post('/projects/store/{project_id?}', [ProjectController::class, 'store'])->name('api.update-project');
