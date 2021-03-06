import {Component, Input} from '@angular/core';

import {WpEndpoint} from 'ng2-wp-api';
/**
 * import Model:  **optional** child component to display the post
 * WpHelper: to get post endpoint url 
 * Post: create Post class from post data to get the functions
 */

@Component({
  selector: 'test-model',
  template: `
    <wp-model [id]="id" [endpoint]="endpoint" (response)="wpResponse($event)">
      <h1>{{response?.title?.rendered}}</h1>
    </wp-model>
  `
})
export class TestModel {

  endpoint = WpEndpoint.Pages;
  id;

  response;

  ngOnInit() {
    /** page id */
    this.id = 123;
    /** page args */
    this.args = new WpQueryArgs({
      _embed: true
    });
  }

  /**
   * pageData fires when the data is recieved from Model component
   */
  wpResponse(event) {
    if(event.error){
      console.log(event.error);
    }
    else{
      this.response = event.data;
    }
  }
}





import {WpPost} from 'ng2-wp-api';
/** Optional component that create Post class from the data */ 

@Component({
  selector: 'single',
  template: `
    <div class="post">
      <div class="post-title"> {{response.title()}} </div>
      <div class="post-image">
        <img [src]="response.featuredImageUrl('large')"/>
      </div>
      <div class="post-content" [innerHtml]="response.content()">
      <ul class="post-categories">
        <li *ngFor="let cat of response.categories()"> {{cat.name}} </li>
      </ul>
    </div>
  `,
})
export class Single {
    /**
     *  Create Post class from the input to use its functions.
     *  
     *  Pass the size you want for the featured image 
     *  default images: `small`, `medium`, `large`, `full`
     * 
     *  check Post class file to see the functions list.
    */

  post: WpPost;
  @Input()
  set data(data: any) {
     /* Create Post class for the view `. */
    this.post = new WpPost(data);
  }
}

