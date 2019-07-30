import { Component, OnInit } from '@angular/core'
import { ThreadService } from '../../services/thread.service'
import { ReplyService } from '../../services/reply.service'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board_id: String = ''
  board_title: String = ''
  threads: Object[] = []
  replies: Object[] = []
  isModalActive: Boolean = false
  isDeleteModalActive: Boolean = false
  isModalActiveStyle: {}
  isDeleteModalActiveStyle: {}
  isCreateButtonActiveStyle: {}
  deleteOptions: {
    type: String,
    thread_id: Number,
    reply_id: Number,
    delete_password: String,
  }
  newThreadTitle: String = ''
  newThreadPassword: String = ''

  constructor(
    private threadService: ThreadService, 
    private route: ActivatedRoute, 
    private replyService: ReplyService,
  ){}

  ngOnInit() {
    this.board_id = this.route.snapshot.paramMap.get('id')
    this.board_title = this.route.snapshot.queryParamMap.get('title')
    this.getThreads(this.board_id)
    this.getReplies(this.board_id)
  }

  handleNewThreadTitle(event){
    this.newThreadTitle = event.target.value
  }
  handleNewThreadPassword(event){
    this.newThreadPassword = event.target.value
  }
  handleDeletePassword(event){
    this.deleteOptions.delete_password = event.target.value
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

  async reportThread(thread_id){
    try{
      await this.threadService.reportThread({
        thread_id,
        observe: 'response'
      }).subscribe()
      setTimeout(() => { this.getThreads(this.board_id) }, 500)
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

  async createReply(form, thread_id){
    try{
      await this.replyService.createReply({ 
        text: form.value.text,
        board_id: this.board_id,
        thread_id,
        delete_password: form.value.delete_password,
      }).subscribe(reply => {
        this.replies.push(reply)
        form.reset()
      })
    }
    catch(error){
      console.error(error)
    }
  }

  async reportReply(reply, thread_id){
    try{
      await this.replyService.reportReply({
        reply_id: reply.id,
        thread_id
      }).subscribe()
      setTimeout(() => { this.getReplies(this.board_id) }, 500)
    }
    catch(error){
      console.error(error)
    }
  }

  async delete(){
    try{
      if(this.deleteOptions.type === 'thread'){
        await this.threadService.deleteThread({ 
          thread_id: this.deleteOptions.thread_id,
          delete_password: this.deleteOptions.delete_password,  
        }).subscribe()
        await setTimeout(() => { this.getThreads(this.board_id) }, 500)
        this.toggleDeleteModal()
      }
      else if(this.deleteOptions.type === 'reply'){
        await this.replyService.deleteReply({
          thread_id: this.deleteOptions.thread_id,
          delete_password: this.deleteOptions.delete_password,
          reply_id: this.deleteOptions.reply_id,
        }).subscribe()
        await setTimeout(() => { this.getReplies(this.board_id) }, 500)
        this.toggleDeleteModal()
      }
    }
    catch(error){
      console.error(error)
    }
  }

  toggleCreationModal(){
    if(this.isDeleteModalActive){
      this.isDeleteModalActive = !this.isDeleteModalActive
      this.isDeleteModalActiveStyle = this.isDeleteModalActive ? {'display': 'block'} : {'display': 'none'}
      this.isCreateButtonActiveStyle = this.isModalActive ? {'transform': 'rotate(45deg)'} : {'transform': 'rotate(0)'}
    }
    else{
      this.isModalActive = !this.isModalActive
      this.isModalActiveStyle = this.isModalActive ? {'display': 'block'} : {'display': 'none'}
      this.isCreateButtonActiveStyle = this.isModalActive ? {'transform': 'rotate(45deg)'} : {'transform': 'rotate(0)'}
    }
  }

  toggleDeleteModal(type='', thread_id=0, reply_id=0){
    this.deleteOptions = {
      type,
      thread_id,
      reply_id,
      delete_password: ''
    }
    this.isDeleteModalActive = !this.isDeleteModalActive
    this.isDeleteModalActiveStyle = this.isDeleteModalActive ? {'display': 'block'} : {'display': 'none'}
    this.isCreateButtonActiveStyle = this.isDeleteModalActive ? {'transform': 'rotate(45deg)'} : {'transform': 'rotate(0)'}
  }
}
