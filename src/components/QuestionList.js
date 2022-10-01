import React from "react";


function QuestionList({questionItems}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionItems}
      </ul> 
    </section>
  );
}

export default QuestionList;
