import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  http = inject(HttpClient);

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = await this.http.get<GetCoursesResponse>(`${environment.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }
}
