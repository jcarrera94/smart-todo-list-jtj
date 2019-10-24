$(() => {

  // const currentCat = $('.list-group-item').on('click', function (e) {
  //   $(e.target)
  //     .parent()
  //     .parent()
  //     .data('category_id');
  //   });

  let task;
  $('.list-group').on('mousedown', function (event) {
    task = $(event.target).text();
  });

  //updates database when task is dragged and dropped
  $('.list-group').on('drop', async function (event) {
    const category = $(event.target)
      .parent()
      .attr('data-category_id');

    try {
      console.log('about to update');
      await $.ajax('/update', {
        method: 'POST',
        data: {
          input: task,
          category_id: category
        }
      })
    } catch (err) {
      console.error(err);
    }
  })

  /* TASK SUBMISSION */
  const $submitForm = $('#submit-form');
  const $input = $('input');
  const $button = $('.add-task');

  // user submits form
  $submitForm.submit((event) => {
    // prevent page refresh
    event.preventDefault();

    $.ajax('/tasks', {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: $('#submit-form').serialize()
    })
      .then(() => {
        loadTasks(true);
      })

    // clear input area
    $input.val('');
  })

  // button click to open input box
  $button.on('click', function (event) {
    // do not refresh if the input area is empty
    if ($input.val().length === 0) {
      event.preventDefault();
    }
    $input.focus();
    $submitForm.toggleClass('active');

  });

  // cursor focus switches to input box (i.e. open input box)
  $input.on('focus', function () {
    $submitForm.addClass('focus');
  });

  // listen blur event (loses focus)
  $input.on('blur', function () {
    $input.val().length !== 0
      ? $submitForm.addClass('focus')
      : $submitForm.removeClass('focus');
  });

  /* LOAD TASKS */
  // get tasks from database
  const loadTasks = (onlyLoadLatest = false) => {
    $.ajax('/tasks/api', { method: 'GET' })
      .then((data) => {

        if (onlyLoadLatest) {
          renderTasks([data[data.length - 1]]);
        } else {
          renderTasks(data);
        }
      });
  };
  loadTasks();

  // render multiple tasks
  // tasks = [ {task, category_id} ]
  const renderTasks = (tasks) => {
    // initialize empty array to store rendered tasks
    const renderedTasks_movies = [];
    const renderedTasks_books = [];
    const renderedTasks_restaurants = [];
    const renderedTasks_products = [];
    // initialize taskContainers
    const $taskContainer_movies = $('#movies ul');
    const $taskContainer_books = $('#books ul');
    const $taskContainer_restaurants = $('#restaurants ul');
    const $taskContainer_products = $('#products ul');

    // wrap each task in html and add to corresponding array
    for (task of tasks) {
      // check which category container to append the task to
      switch (task.category_id) {
        case 1:
          renderedTasks_movies.unshift(createTaskElement(task.input));
          break;
        case 2:
          renderedTasks_books.unshift(createTaskElement(task.input));
          break;
        case 3:
          renderedTasks_restaurants.unshift(createTaskElement(task.input));
          break;
        default:
          renderedTasks_products.unshift(createTaskElement(task.input));
      }
    }
    $taskContainer_movies.prepend(renderedTasks_movies.join(''));
    $taskContainer_books.prepend(renderedTasks_books.join(''));
    $taskContainer_restaurants.prepend(renderedTasks_restaurants.join(''));
    $taskContainer_products.prepend(renderedTasks_products.join(''));
  };

  // genereate markup for a single task
  // task = task (string)
  const createTaskElement = (task) => {
    const markup = `
      <li class='list-group-item'>${task}</li>
    `;
    return markup;
  };

});
