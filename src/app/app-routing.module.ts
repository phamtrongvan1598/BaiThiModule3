import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';

const routes: Routes = [{
  path: 'blog',
  component: BlogComponent
}, {
  path: 'blog/:id',
  component: BlogListComponent
}, {
  path: 'blog/:id/edit',
  component: BlogEditComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
