import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { StripHtmlPipe } from '../../shared/pipes/strip-html.pipe';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
    },
    {
      path: 'article/:id',
      component: ArticleComponent
    }
];

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContainerComponent,
    FontAwesomeModule,
    StripHtmlPipe
],
  providers: []
})
export class BlogModule { }
