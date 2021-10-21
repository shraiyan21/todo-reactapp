import { useState, useEffect } from "react";
import "./firebase"; // All Firebase Credentials
import { getDatabase, ref, set, get, child } from "firebase/database"; // Firebase DB Package

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [TaskList, setTaskList] = useState({});
  const taskStatus = "not done";

  const today = new Date();
  const datevalue =
    "Task-" +
    today.getFullYear() +
    today.getMonth() +
    today.getDate() +
    today.getHours() +
    today.getMinutes() +
    today.getSeconds();

  // console.log(taskName,taskPriority);

  const db = getDatabase();

  // // After Pressing  Submit Button
  function handleSubmit(e) {
    e.preventDefault();
    const postData = {
      taskName,
      taskPriority,
      datevalue,
      taskStatus,
    };

    console.log(postData);

    // // Connect With Firebase Database and Send All the Data in Firebase
    set(ref(db, "TaskList/" + datevalue), postData);
  }

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `TaskList/`))
      .then((TaskLists) => {
        if (TaskLists.exists()) {
          console.log(TaskLists.val());

          setTaskList(TaskLists.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [db]);

  function handleComplete(id) {
    const dbRef = ref(db);

    get(child(dbRef, `TaskList/` + id))
      .then((theTask) => {
        if (theTask.exists()) {
          console.log(theTask.val());

          const taskName = theTask.val().taskName;
          const taskPriority = theTask.val().taskPriority;
          const taskStatus = "done";

          const postData = {
            taskName,
            taskPriority,
            datevalue,
            taskStatus,
          };

          console.log(postData);

          set(ref(db, "TaskList/"+id), postData)
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  // const listItem = TaskList.map((tasks) =>

  //   <>{tasks.taskName}</>

  // );

  // console.log(listItem);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <br />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          required
        >
          <option value="">Priority</option>
          <option value="Low" key="1">
            Low
          </option>
          <option value="Mid" key="2">
            Mid
          </option>
          <option value="High" key="3">
            High
          </option>
        </select>
        <br />

        <button className="submit" type="submit">
          Add Task
        </button>
      </form>

      <br />
      <br />

      <table>
        <tr>
          <th style={{ width: "10%" }}>#</th>
          <th style={{ width: "60%" }}>Task Name</th>
          <th style={{ width: "30%" }}>Task Priority</th>
          <th style={{ width: "10%" }}>Done </th>
        </tr>

        {Object.keys(TaskList).map((id, index) => {
          if (TaskList[id].taskStatus === "not done") {
            return (
              <tr key={id}>
                <td style={{ width: "10%" }}> {index + 1} </td>

                <td style={{ width: "55%" }}>{TaskList[id].taskName}</td>

                <td style={{ width: "25%" }}>{TaskList[id].taskPriority}</td>

                <td style={{ width: "10%" }}>
                  <button
                    className="done"
                    onClick={() => handleComplete(TaskList[id].datevalue)}
                  >
                    <b>√</b>
                  </button>
                </td>
              </tr>
            );
          }
        })}
      </table>
    </div>
  );
}

export default App;
