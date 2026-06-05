<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\CourseSection;
use Illuminate\Database\Seeder;

class BulkCurriculumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = __DIR__ . '/data/curriculum_bulk_import_sample.json';
        
        if (!file_exists($filePath)) {
            $this->command->warn("Bulk curriculum JSON file not found at: {$filePath}");
            return;
        }

        $json = file_get_contents($filePath);
        $curriculumData = json_decode($json, true);

        if (empty($curriculumData)) {
            $this->command->warn("Bulk curriculum JSON file is empty or invalid.");
            return;
        }

        $course = Course::first();
        if (!$course) {
            $this->command->warn("No course found to seed bulk curriculum.");
            return;
        }

        $this->command->info("Seeding " . count($curriculumData) . " lectures into sections...");

        // Unique section titles to create
        $sectionTitles = array_unique(array_column($curriculumData, 'section_title'));
        $sections = [];
        $order = 1;

        foreach ($sectionTitles as $title) {
            $sections[$title] = CourseSection::firstOrCreate(
                [
                    'course_id' => $course->id,
                    'section_title' => $title,
                ],
                [
                    'sort_order' => $order++,
                    'status' => true,
                ]
            );
        }

        // Group lectures by section
        $lecturesBySection = [];
        foreach ($curriculumData as $data) {
            $lecturesBySection[$data['section_title']][] = $data;
        }

        foreach ($lecturesBySection as $sectionTitle => $lectures) {
            $section = $sections[$sectionTitle];
            $lectureOrder = 1;
            $insertData = [];

            foreach ($lectures as $lData) {
                $insertData[] = [
                    'section_id' => $section->id,
                    'lecture_title' => $lData['lecture_title'],
                    'video_url' => $lData['video_url'],
                    'duration' => $lData['duration'],
                    'is_preview' => $lData['is_preview'],
                    'description' => $lData['description'],
                    'sort_order' => $lectureOrder++,
                    'status' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // Batch insert lectures for performance
            CourseLecture::insert($insertData);
        }

        $this->command->info("Bulk curriculum seeded successfully!");
    }
}
