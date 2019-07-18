import { Component, OnInit } from '@angular/core'
import { BoardService } from '../../services/board.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  boards: String[]
  state: String[]
  isModalActive: Boolean
  isModalActiveStyle: {}
  isCreateButtonActiveStyle: {}

  constructor(private boardService: BoardService) {}

  ngOnInit(){
    this.isModalActive = false
    this.getBoards()
  }

  async search(event) {
    console.log(event)

    const word = (event.target.value || '').toLowerCase()

    this.boards = this.state.filter(filterList)

    function filterList (board) {
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
