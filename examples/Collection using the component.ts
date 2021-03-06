/*
 * In the following example, we will get posts using Collection component
 * Inputs: 
 * - [endpoint]: `WpHelper.Endpoint.Posts` will be used.
 * - [args]: `QueryArgs({...})` will be used.
 * 
 * Output:
 * - (response): Get the response once received.
 * 
 * functions which can be used from WpCollection Component using ViewChild:
 *  get(args):Observable<any>
 *  more():Observable<any>
 */

import { Component, ViewChild } from '@angular/core';

import {WpCollectionComponent,WpEndpoint,CollectionResponse,WpQueryArgs} from "ng2-wp-api";

@Component({
  selector: 'test-collection',
  template:  `
   <wp-collection [args]="args" [endpoint]="endpoint" (response)="wpResponse($event)">
    <div *ngFor="let post of posts" class="item">
      <h3>
        {{post.title.rendered}}
      </h3>
    </div>
  </wp-collection>
  
  <pre>{{pagination | json}}</pre>
  `
})
export class PartialComponent  {

  endpoint = WpEndpoint.posts;
  args;

  posts;
  pagination;

  wpResponse(event:CollectionResponse){
    if(event.error){
      console.log(event.error);
    }
    else{
      this.pagination = event.pagination;
      this.posts = event.data;
    }
  }

  getCollectionWay1() {
  //WpCollection component gets a new response automatically when the input `[args]` value has set/changed.
  //NOTE: Make sure enableProdMode() is called to avoid onChanges error.
   this.args = new WpQueryArgs({
        per_page: 3,
        page: 3
      });
  }

  
  //OPTIONAL: use ViewChild to get WpCollection reference, so you can call .get and .more
  @ViewChild(WpCollectionComponent) collection: WpCollectionComponent;

  getCollectionWay2() {
    //Get a new collection by setting the bound args the collection using ViewChild
    this.collection.get({
      per_page: 2
    });
  }

  getMore() {
    //you must have the reference of `WpCollection`.
    this.collection.more();
  }

  getNextPage() {
    //you must have the reference of `WpCollection`.
    this.collection.next();
  }

  getPrevPage() {
    //you must have the reference of `WpCollection`.
    this.collection.prev();
  }
}




/** Optional component that uses Post class which wraps the post response making it easy to access.
 *  NOTE: The embed in QueryArgs must be set to true in order to get Post class to work.
 *  */ 

import {WpPost} from 'ng2-wp-api';

@Component({
  selector: 'item',
  template: `
    <div class="post">
      <div class="post-title"> {{response.title()}} </div>
        <div class="post-image">
          <img [src]="response.featuredImageUrl('small')"/>
        </div>
      <div class="post-excerpt" [innerHtml]="response.excerpt()">
    </div>
  `,
})

export class Item {
  post: WpPost;
  @Input()
  set data(data: any) {
     /* Create Post class for the view `. */
    this.post = new WpPost(data);
  }
}

