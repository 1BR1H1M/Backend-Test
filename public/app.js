const apiUrl = 'http://localhost:3000/tasks';

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
let editingTaskId = null;

async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function addTask(task) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

async function updateTask(id, updatedTask) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    const task = await response.json();
    return task;
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = `${task.title}: ${task.description}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      deleteTask(task.id).then(() => fetchTasks());
    };
    taskItem.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
      document.querySelector('input[name="title"]').value = task.title;
      document.querySelector('input[name="description"]').value = task.description;
      editingTaskId = task.id;
    };
    taskItem.appendChild(editButton);

    taskList.appendChild(taskItem);
  });
}

taskForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
  };

  if (editingTaskId) {
    updateTask(editingTaskId, task).then(() => {
      fetchTasks();
      taskForm.reset();
      editingTaskId = null;
    });
  } else {
    addTask(task).then(() => {
      fetchTasks();
      taskForm.reset();
    });
  }
};

fetchTasks();
