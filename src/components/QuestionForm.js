import React, { useState } from "react";

function QuestionForm({updateQuestionList}) {

  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  //Deliverable 2.1:
  //Basically, handleSubmit posts the form Data onto the server
    //and then sends a get request for the updated questions.
    //The last item in the response from the get request is then passed as a parameter into
    //the updateQuestionList function. This function is declared in the App component.
    //It adds the last question to the list on the DOM.

  function handleSubmit(event) {
    event.preventDefault();

    const answersArray = [
      formData.answer1,
      formData.answer2,
      formData.answer3,
      formData.answer4
    ];

    const bodyObj = {
      prompt: formData.prompt,
      answers: answersArray,
      correctIndex: formData.correctIndex
    };

    const configurationObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    };
 
    fetch("http://localhost:4000/questions", configurationObj)
    
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => {
      const lastQuestion = data[data.length - 1]
      updateQuestionList(lastQuestion)} )
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
