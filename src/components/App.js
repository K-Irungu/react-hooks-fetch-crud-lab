import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionItem from "./QuestionItem";


function App() {
  const [page, setPage] = useState("List");
  const [questionItems, setQuestionItems] = useState([])

  // Deliverable 1
  // A get request(sideEffect) whose response data is used to set the state of 'questionItems'
  useEffect(() => {
    fetch("http://localhost:4000/questions").then(r => r.json())
    .then(data => { 
      const questionItemsArray = data.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleSelect={handleSelect}/> )
      setQuestionItems(questionItemsArray)
  })},[handleSelect, handleDelete])

  // Deliverable 2.2 
  // When new question is posted on server,
  // the most recent question on that server is converted to a <QuestionItem />
  // and the questionItems state is updated to include it.
  function updateQuestionList(lastQuestion) {
    const updatedQuestionList = [ ...questionItems,  <QuestionItem key={lastQuestion.id} question={lastQuestion} handleDelete={handleDelete} handleSelect={handleSelect} /> ]
      setQuestionItems(updatedQuestionList)
  }

  // Deliverable 3
  // Every <QuestionItem /> has a prop of handleDelete which references the below function.
  // When the delete button is clicked, question is deleted on the server.
  // A GET request is also made to get the updated data from the server
  // This data is used to update the state of questionItems.
  function handleDelete(e) {
    const questionNumber = e.target.parentElement.firstChild.textContent.split(" ")[1]; 

    const configurationObj = {
      method: "DELETE",
      headers:{ "Content-Type": "application/json" }
    }
    fetch(`http://localhost:4000/questions/${questionNumber}`, configurationObj ) 
    .then( fetch("http://localhost:4000/questions")   
          .then(r => r.json())
          .then(data =>{
            const questionItemsArray = data.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleSelect={handleSelect}/> )
            setQuestionItems(questionItemsArray)
          })
        )
  }

  // Deliverable 4
  // Every <QuestionItem /> has a <select /> element in it.
  // When the value of that changes, a PATCH request updates the server using the new value.
  // A get request is used to get the updated data from that server, and this is used to set the state of 
  // questionItems
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

    .then(fetch(`http://localhost:4000/questions`)
          .then(r => r.json())
          .then(data => {
            const questionItemsArray = data.map( question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleSelect={handleSelect}/> )
              setQuestionItems(questionItemsArray)
            }
          )
    )
  }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQuestionList={updateQuestionList} /> : <QuestionList questionItems={questionItems}/>}
    </main>
  );
}

export default App;
