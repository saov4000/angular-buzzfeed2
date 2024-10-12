import { Component, NgModule, OnInit } from '@angular/core'
import quiz_questions from "../../../assets/data/quizz_questions.json"
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit{
  title:string=""
  questions:any
  questionSelected:any
  answers:string[]=[]
  answerSelected:string = ""
  questionIndex:number = 0
  questioMaxIndex:number = 0
  finished:boolean = false

  constructor(){}

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title
      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questioMaxIndex = this.questions.length
    }
  }
  public playerChoose(v:string){
    this.answers.push(v)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex +=1

    if(this.questioMaxIndex>this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected  = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(arr.filter(item=>item===previous).length>arr.filter(item=>item===current).length){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
  
