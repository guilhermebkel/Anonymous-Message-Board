import { Component, OnInit } from '@angular/core'
import { ThreadService } from '../../services/thread.service'
import { BoardService } from '../../services/board.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board_id: String = ''
  threads: Object[] = []
  replies: Object[] = []
  state: Object[] = []
  isModalActive: Boolean = false
  isModalActiveStyle: {}
  isCreateButtonActiveStyle: {}
  newThread: Object[] = []
  newThreadTitle: String = ''

  constructor(
    private threadService: ThreadService, 
    private route: ActivatedRoute, 
    private boardService: BoardService
  ){}

  ngOnInit() {
    this.board_id = this.route.snapshot.paramMap.get('id')
  }

  handleNewThreadTitle(event){
    this.newThreadTitle = event.target.value
  }

  async createThread(){
    try{
      await this.threadService.createThread(
        { title: this.newThreadTitle }
      ).subscribe(board => {
        this.newThread = board
        this.state.unshift(this.newThread)
    
        this.toggleCreationModal()
        this.newThreadTitle = ''
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
