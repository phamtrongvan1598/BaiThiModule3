import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPost} from '../pos';
import {PostService} from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  postList: IPost[] = [];
  postBook: FormGroup;

  constructor(private postService: PostService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.postBook = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      author: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(14)]],
    });
    this.postService
      .getPosts()
      .subscribe(next => (this.postList = next), error => (this.postList = []));

  }

  onSubmit() {
    if (this.postBook.valid) {
      const {value} = this.postBook;
      this.postService.createPost(value)
        .subscribe(next => {
          this.postList.unshift(next);
          this.postBook.reset({
            title: '',
            autgor: '',
            description : ''
          });
        }, error => console.log(error));
    }
  }

  deletePost(i) {
    const post = this.postList[i];
    this.postService.deletePost(post.id).subscribe(() => {
      this.postList = this.postList.filter(t => t.id !== post.id);
    });
  }
}
