import { Component, OnInit } from '@angular/core'
import { ThreadService } from '../../services/thread.service'
import { ReplyService } from '../../services/reply.service'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators"

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  state$: Observable<object>;
  board_id: String = ''
  board_title: String = ''
  threads: Object[] = []
  replies: Object[] = []
  isModalActive: Boolean = false
  isModalActiveStyle: {}
  isCreateButtonActiveStyle: {}
  newThread: Object[] = []
  newThreadTitle: String = ''
  newThreadPassword: String = ''
  newReplyTitle: String = ''

  constructor(
    private threadService: ThreadService, 
    private route: ActivatedRoute, 
    private replyService: ReplyService,
  ){}

  async ngOnInit() {
    this.board_id = this.route.snapshot.paramMap.get('id')
    this.getThreads(this.board_id)
    this.getReplies(this.board_id)
    this.state$ = await this.route.paramMap
      .pipe(map(() => window.history.state))
    console.log(this.state$)
  }

  handleNewThreadTitle(event){
    this.newThreadTitle = event.target.value
  }
  handleNewThreadPassword(event){
    this.newThreadPassword = event.target.value
  }

  async createThread(){
    try{
      await this.threadService.createThread({ 
        text: this.newThreadTitle,
        board_id: this.board_id,
        delete_password: this.newThreadPassword 
      }).subscribe(thread => {
        this.threads.unshift(thread)
        this.toggleCreationModal()
        this.newThreadTitle = ''
        this.newThreadPassword = ''
      })
    }
    catch(error){
      console.error(error)
    }
  }

  async getThreads(board_id){
    try{
      await this.threadService.getThreads(board_id).subscribe(threads => {
        this.threads = threads
      })
    }
    catch(error){
      console.error(error)
    }
  }

  async getReplies(board_id){
    try{
      await this.replyService.getReplies(board_id).subscribe(replies => {
        this.replies = replies
      })
    }
    catch(error){
      console.error(error)
    }
  }

  async createReply(thread_id, text, delete_password){
    try{
      await this.replyService.createThread({ 
        text,
        board_id: this.board_id,
        thread_id,
        delete_password,
      }).subscribe(reply => {
        this.replies.unshift(reply)
        this.toggleCreationModal()
        this.newThreadTitle = ''
        this.newThreadPassword = ''
      })
    }
    catch(error){
      console.error(error)
    }
  }

  toggleCreationModal(){
    this.isModalActive = !this.isModalActive
    this.isModalActiveStyle = this.isModalActive ? {'display': 'block'} : {'display': 'none',}
    this.isCreateButtonActiveStyle = this.isModalActive ? {'transform': 'rotate(45deg)'} : {'transform': 'rotate(0)'}
  }
}
