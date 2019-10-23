// Client Side jQuery logic
// const { $ } = require("../vendor/jquery-3.0.0");

// get tasks from database

// render multiple tasks
// tasks = [ {task, category_id} ]
const renderTasks = (tasks) => {
  // initialize empty array to store rendered tasks
  const renderedTasks_movies = [];
  const renderedTasks_books = [];
  const renderedTasks_restaurants = [];
  const renderedTasks_products = [];
  // initialize taskContainers
  const $taskContainer_movies = $('#movies');
  const $taskContainer_books = $('#books');
  const $taskContainer_restaurants = $('#restaurants');
  const $taskContainer_products = $('#products');

  // wrap each task in html and add to corresponding array
  for (task of tasks) {
    // check which category container to append the task to
    switch (task.category_id) {
      case 1:
        renderedTasks_movies.shift(createTaskElement(task.task).outerHTML);
        break;
      case 2:
        renderedTasks_books.shift(createTaskElement(task.task).outerHTML);
        break;
      case 3:
        renderedTasks_restaurants.shift(createTaskElement(task.task).outerHTML);
        break;
      default:
        renderedTasks_products.shift(createTaskElement(task.task).outerHTML);
    }
  }

  $taskContainer_movies.prepend(renderedTasks_movies.join(''));
  $taskContainer_books.prepend(renderedTasks_books.join(''));
  $taskContainer_restaurants.prepend(renderedTasks_restaurants.join(''));
  $taskContainer_products.prepend(renderedTasks_products.join(''));
}

// genereate markup for a single task
// task = task
const createTaskElement = (task) => {
  const $taskCard = $('<ul>').addClass('task');
  const markup = `
    <li>${task}</li>
  `;
  return $taskCard.append(markup);
}



//  TEST
const data = {
  task: 'Harry Potter',
  category_id: 1
}
const test = createTaskElement(data);
console.log(test);
