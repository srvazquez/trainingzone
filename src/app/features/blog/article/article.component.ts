import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article',
  standalone: false,
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  post$!: Observable<any>;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.post$ = this.apiService.getArticleById(id).pipe(
      takeUntil(this.onDestroy$),
      map((res: any) => res.data)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
