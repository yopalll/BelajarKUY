<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Toggle wishlist — add jika belum ada, remove jika sudah ada.
     * Route: POST /wishlist/{course}  name: wishlist.add
     *
     * Mengembalikan redirect back() dengan flash message supaya
     * FlashToast.jsx di AppLayout bisa menampilkan notifikasi.
     */
    public function toggle(Request $request, Course $course): RedirectResponse
    {
        $userId = auth()->id();

        $existing = Wishlist::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            $existing->delete();

            return back()->with('success', "«{$course->title}» telah dihapus dari daftar keinginan Anda.");
        }

        Wishlist::create([
            'user_id'   => $userId,
            'course_id' => $course->id,
        ]);

        return back()->with('success', "«{$course->title}» telah ditambahkan ke daftar keinginan Anda.");
    }

    /**
     * Remove wishlist item by Wishlist ID.
     * Route: DELETE /student/wishlist/{id}  name: student.wishlist.remove
     *
     * Dipakai dari halaman Student Wishlist (student.wishlist).
     */
    public function remove(Request $request, $id): RedirectResponse
    {
        $wishlist = Wishlist::where('user_id', auth()->id())
            ->where('id', $id)
            ->firstOrFail();

        $title = $wishlist->course->title ?? 'Kursus';
        $wishlist->delete();

        return back()->with('success', "«{$title}» berhasil dihapus dari daftar keinginan Anda.");
    }
}
