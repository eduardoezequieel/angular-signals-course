import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  #courses = signal<Course[]>([]);
  coursesService = inject(CoursesService);

  beginnerCourses = computed(() =>
    this.#courses().filter((course) => course.category === 'BEGINNER')
  );

  advancedCourses = computed(() =>
    this.#courses().filter((course) => course.category === 'ADVANCED')
  );

  constructor() {
    this.loadCourses().then(() => {
      console.log('Courses loaded', this.#courses());
    });

    effect(() => {
      console.log(this.beginnerCourses());
      console.log(this.advancedCourses());
    });
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (error) {
      alert('Failed to load courses');
      console.log(error);
    }
  }
}
