import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionItem from "./QuestionItem";


function App() {
  const [page, setPage] = useState("List");
  const [questionItems, setQuestionItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => { 
      const questionItemsArray = data.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleSelect={handleSelect}/> )
      setQuestionItems(questionItemsArray)
  })},
  [])

  function updateQuestionList(lastQuestion) {
    const updatedQuestionList = [ ...questionItems,  <QuestionItem key={lastQuestion.id} question={lastQuestion} handleDelete={handleDelete} handleSelect={handleSelect} /> ]
      // console.log(updatedQuestionList)
      setQuestionItems(updatedQuestionList)
  }

    function handleDelete(e) {
    const questionNumber = e.target.parentElement.firstChild.textContent.split(" ")[1];

  const configurationObj = {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json"
    }
  }
    fetch(`http://localhost:4000/questions/${questionNumber}`, configurationObj ) 
    fetch("http://localhost:4000/questions")   
    .then(r => r.json())
    .then(data =>{
      const questionItemsArray = data.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleSelect={handleSelect}/> )
      setQuestionItems(questionItemsArray)
    } )
   
    }

    // const [correctIndex, setCorrectIndex] = useState("")


    function handleSelect(e){

  const question = e.target.parentElement.parentElement.firstChild.textContent.split(" ")
  const questionNumber = question[1]
  const newCorrectIndex = e.target.value

  
  const configurationObj ={
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      correctIndex: newCorrectIndex,

    })
  }

  fetch(`http://localhost:4000/questions/${questionNumber}`, configurationObj ) 
  fetch(`http://localhost:4000/questions`)
  .then(r => r.json())
  .then(data => {
    const questionItemsArray = data.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleSelect={handleSelect}/> )
      setQuestionItems(questionItemsArray)
  })



      

    }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQuestionList={updateQuestionList} /> : <QuestionList questionItems={questionItems}/>}
    </main>
  );
}

export default App;
