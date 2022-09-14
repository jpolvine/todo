import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    todo: "",
    description: "",
    timetostart: "",
    timetoend: "",
    timeconsumed: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedField = {
      todo: form.todo,
      description: form.description,
      timetostart: form.timetostart,
      timetoend: form.timetoend,
      timeconsumed: form.timeconsumed,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedField),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.

  return (
    <div>
      <h3>Update TODO</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="todo">TODO: </label>
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
          <label htmlFor="description">Description: </label>
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
          <label htmlFor="timetostart">Time to start(use this form: 14.9.2022 13.00) </label>
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
          <label htmlFor="timetoend">Time to end: </label>
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
            value="Update TODO"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
