<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function getProjectsOfUser()
    {
        $user_id = Auth::id();
        return Project::where('user_id', $user_id)->get();
    }

    public function show($project_id, Request $r)
    {
        $user_id = Auth::id();
        $project = Project::findOrFail($project_id);

        if ($project->user_id !== $user_id) {
            return [
                'status' => 'error',
                'message' => 'request is not authenticated'
            ];
        }
        if (!$project) {
            return [
                'status' => 'error',
                'message' => 'project does not exist'
            ];
        }

        return $project;
    }

    public function store(Request $request, $project_id = null)
    {
        $project_id ? $project = Project::findOrFail($project_id) : $project = new Project();

        $request->validate([
            'title' => 'required|max:255',
            'user_id' => 'required|max:255',
        ]);

        $project->title = $request->post('title');
        $project->user_id = $request->post('user_id');
        $project->data = $request?->post('data');

        $project->save();

        return [
            'status' => "success",
            'message' => 'project has been updated',
            'project_id' => $project->id
        ];
    }

    public function delete($project_id)
    {
        $project = Project::findOrFail($project_id);
        if ($project) {
            $project->delete();
        }
    }
}
