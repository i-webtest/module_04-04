'use strict';

export const todo = () => {
  const todoForm = document.querySelector('#form-todo');
  const author = document.getElementById('author');
  const post = document.getElementById('post');
  const list = document.querySelector('.todo__list');
  let count = document.querySelector('.todo__count');

  const base = {
    init() {
      this.todo = this.getTodoLS();
      count.textContent = this.totalCount();
    },
    employee: 'Петров Сергей Иванович',
    todo: [],
    check(id) {
      for (let i = 0; i < this.todo.length; i++) {
        if (this.todo[i].id === id) {
          this.todo[i].ready = true;
        }
      }
      this.setTodoLS();
    },
    addTodo(author, post) {
      const todo = {
        id: 'td' + Math.round(Math.random() * 10000000000000),
        author,
        post,
        ready: false,
      };

      this.todo.push(todo);
      this.setTodoLS();
      return todo;
    },
    totalCount() {
      return this.todo.length;
    },
    getTodoLS() {
      if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'));
      }

      return [];
    },
    setTodoLS() {
      localStorage.setItem('todo', JSON.stringify(this.todo));
    },
  };

  const addTodo = (event) => {
    event.preventDefault();

    const authorText = author.value;
    const postText = post.value;

    const objTodo = base.addTodo(authorText, postText);
    const todoLi = createTodo(objTodo);

    list.append(todoLi);
    todoForm.reset();
    count.textContent = base.totalCount();
  };

  const createTodo = ({ ready, author, post, id }) => {
    const todoItem = `
    <article class="post ${ready ? 'post_complete' : ''}">
      <h3 class="post__author">${author}</h3>
      <p class="post__todo">${post}</p>
      ${
        !ready
          ? `<button 
          class="post__ready" 
          type="button" 
          data-id="${id}"
          >✔</button>`
          : ''
      }
      
    </article>
  `;

    const li = document.createElement('li');
    li.classList.add('todo__list-item');
    li.innerHTML = todoItem;

    return li;
  };

  const renderTodo = () => {
    base.init();
    for (let i = 0; i < base.todo.length; i++) {
      const todoLi = createTodo(base.todo[i]);
      list.append(todoLi);
    }
  };

  const checkTodo = (event) => {
    const btn = event.target.closest('.post__ready');

    if (btn) {
      const post = btn.closest('.post');
      btn.remove();
      post.classList.add('post_complete');
      const id = btn.dataset.id;
      base.check(id);
    }
  };

  todoForm.addEventListener('submit', addTodo);
  list.addEventListener('click', checkTodo);

  // totalCount();
  renderTodo();
};
