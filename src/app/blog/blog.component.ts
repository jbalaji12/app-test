import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	allPosts: any= {}
	singlePost: any
	pageNumber = 0;
	modalRef

  constructor(
  	private blogService: BlogService,
  	private modalService : NgbModal) { }

  ngOnInit() {
  	this.getAllBlogs()
  }

  getAllBlogs(){
  	this.blogService.getAllBlogs(this.pageNumber)
  	.subscribe(
  	(res: any)=>{
  		let oldPosts = this.allPosts
  		this.allPosts = res;
  		if(oldPosts.hits){
  			this.allPosts.hits = [...res.hits, ...oldPosts.hits]
  		}
  		this.pageNumber = this.pageNumber + 1 ;
  		if(this.pageNumber <= this.allPosts.nbPages	){
  			setTimeout(()=> {
  				this.getAllBlogs();
  			}, 10000)
  		}
  	} ,
  	err=> console.log(err)
  	)
  }

  setSinglePost(post, content){
  	this.singlePost = post;
  	this.openModal(content)
  }

  openModal(content){
  	this.modalRef =  this.modalService.open(content, {size: 'lg'})
  }

  closeModal(){
  	this.modalRef.close()
  }
}
