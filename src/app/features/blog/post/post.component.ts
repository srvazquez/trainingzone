import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface Post {
  ID: number;
  post_title: string;
  post_content: string;
}

@Component({
  selector: 'app-post',
  standalone: false,
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input({ required: true }) post!: Post;

  faPlus = faPlus;

  constructor(private router: Router, private route: ActivatedRoute) {}

  openArticle(ID: number): void {
    this.router.navigate([`article/${ID}`], {relativeTo: this.route})
  }
}
