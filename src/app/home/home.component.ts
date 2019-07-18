import { Component, OnInit } from '@angular/core'
import { BoardService } from '../../services/board.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  boards: Object[] = []
  state: Object[] = []
  isModalActive: Boolean = false
  isModalActiveStyle: {}
  isCreateButtonActiveStyle: {}
  newBoard: Object[] = []
  newBoardTitle: String = ''

  constructor(private boardService: BoardService) {}

  ngOnInit(){
    this.getBoards()
  }

  handleNewBoardTitle(event){
    this.newBoardTitle = event.target.value
  }

  async createBoard(){
    await this.boardService.createBoard(
      { title: this.newBoardTitle }
    ).subscribe(board => {
      this.newBoard = board
      this.state.unshift(this.newBoard)
  
      this.toggleCreationModal()
      this.newBoardTitle = ''
    })
  }

  async handleSearch(event){
    const word = (event.target.value || '').toLowerCase()
    this.boards = this.state.filter(filterList)
    function filterList(board){
      return board.title.toLowerCase().includes(word)
    }
  }

  async getBoards(){
    await this.boardService.getBoards().subscribe(boards => {
      this.state = boards
      this.boards = boards
    })
  }

  toggleCreationModal(){
    this.isModalActive = !this.isModalActive
    this.isModalActiveStyle = this.isModalActive ? {'display': 'block'} : {'display': 'none',}
    this.isCreateButtonActiveStyle = this.isModalActive ? {'transform': 'rotate(45deg)'} : {'transform': 'rotate(0)'}
  }
}
