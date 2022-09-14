import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    todo: "",
    description: "",
    timetostart: "",
    timetoend: "",
    timeconsumed: "",

  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();


    // When a post request is sent to the create url, we'll add a new record to the database.

    const newTodo = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    // Forms to use in database

    setForm({ todo: "", description: "", timetostart: "", timetoend: "", timeconsumed: "" });
    navigate("/");
  }
  
  // This following section will display the form that takes the input from the user.

  return (
    <div>
      <h3>Create New TODO</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="todo">TODO</label>
          <input
            type="text"
            maxLength={64}
            className="form-control"
            id="todo"
            value={form.todo}
            onChange={(e) => updateForm({ todo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            maxLength={64}
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timetostart">Time to start(use this form: 14.9.2022 13.00)</label>
          <input
            type="text"
            maxLength={16}
            className="form-control"
            id="timetostart"
            value={form.timetostart}
            onChange={(e) => updateForm({ timetostart: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timetoend">Time to end</label>
          <input
            type="text"
            maxLength={16}
            className="form-control"
            id="timetoend"
            value={form.timetoend}
            onChange={(e) => updateForm({ timetoend: e.target.value })}
          />
        </div>
       
        <div className="form-group">
          <input
            type="submit"
            value="Create TODO"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
