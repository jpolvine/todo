import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Record = (props) => (
  <tr>
    <td>{props.record.todo}</td>
    <td>{props.record.description}</td>
    <td>{props.record.timetostart} ( {moment(props.record.timetostart, "DD-MM-YYYY HH:mm").fromNow()} )</td>
    <td>{props.record.timetoend} ( {moment(props.record.timetoend, "DD-MM-YYYY HH:mm").fromNow()} )</td>
    <td>{props.record.timeconsumed}  {moment.utc(moment(props.record.timetoend,"DD-MM-YYYY HH:mm").diff(moment(props.record.timetostart, "DD-MM-YYYY HH:mm"))).format("HH [ hours ]mm[ minutes]")} </td>

    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>

);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);


  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 0 }}>
        <thead>
          <tr>
            <th>TODO</th>
            <th>Description</th>
            <th>Time to start</th>
            <th>Time to end</th>
            <th>Time to be consumed</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
