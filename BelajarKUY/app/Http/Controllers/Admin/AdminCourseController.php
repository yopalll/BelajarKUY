<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCourseController extends Controller
{
    /**
     * Display a listing of courses for admin review/management.
     */
    public function index()
    {
        $courses = Course::with(['instructor', 'category'])
            ->latest()
            ->paginate(15);
            
        return Inertia::render('Admin/Courses/Index', compact('courses'));
    }

    /**
     * Display the specified course details.
     */
    public function show(Course $course)
    {
        $course->load(['instructor', 'category', 'subCategory']);
        
        return Inertia::render('Admin/Courses/Show', compact('course'));
    }

    /**
     * Update the course status.
     */
    public function updateStatus(Request $request, Course $course)
    {
        $request->validate([
            'status' => ['required', 'string', 'in:active,inactive'],
        ]);

        $course->update([
            'status' => $request->status
        ]);

        return redirect()->back()->with('success', 'Course status updated successfully to ' . ucfirst($request->status) . '.');
    }
}
