import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Post } from './post/post.component';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  private onDestroy$: Subject<void> = new Subject<void>();

  postList$: Observable<Post[]> = this.apiService.getData().pipe(
    takeUntil(this.onDestroy$),
    map((res) => res.data)
  );

  constructor(private apiService: ApiService) {}
}
