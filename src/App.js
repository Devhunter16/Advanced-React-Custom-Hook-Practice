import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
     const loadedTasks = [];

     for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
     }

     setTasks(loadedTasks);
  };

  // Pulling out all of the things returned within the object httpData
  const {isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks(
      // We have the option to pass headers or a body to useHttp but we're just sending a
      // GET request here so we don't need them.
      { url: 'https://test-project-2-1a6c2-default-rtdb.firebaseio.com/tasks.json' },
      // This function will be called by the custom hook whenever we get a response
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };


  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
