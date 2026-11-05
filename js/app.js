// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(function() {
let count=0;
const thisCounter = document.getElementById('counter');
const thisForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-msg');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterDone = document.getElementById('filter-done');
thisForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();
    if (todoText !== '') {
        const newElement = document.createElement('li');
        const text=document.createElement('span');
        const deleteButton=document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent='Delete';
        newElement.appendChild(deleteButton);
        text.classList.add('item-text');
        text.textContent=todoText;
        newElement.appendChild(text);
        todoList.appendChild(newElement);
        count++;
        thisCounter.textContent = `${count} items left`;
    }
    else if (todoText === '') {
        errorMessage.classList.remove('hidden');
        return;
    }
    errorMessage.classList.add('hidden');
    
});
todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('item-text')){
            e.target.parentElement.classList.toggle('completed');
            count = Array.from(todoList.children).filter(item => !item.classList.contains('completed')).length;
            thisCounter.textContent = `${count} items left`;
        }
    
        if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        if (!e.target.parentElement.classList.contains('completed'))
        count--;
        thisCounter.textContent = `${count} items left`;
        }
});
filterActive.addEventListener('click', function() {
    const activeItems= Array.from(todoList.children).filter(item => !item.classList.contains('completed'));
      for (const item of todoList.children) {
        if (!activeItems.includes(item)) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
     }
    });

filterDone.addEventListener('click', function() {
    const doneItems= Array.from(todoList.children).filter(item => item.classList.contains('completed'));
    for (const item of todoList.children) {
        if (!doneItems.includes(item)) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    }
});
filterAll.addEventListener('click', function() {
    Array.from(todoList.children).forEach(item => item.style.display='');
    for (const item of todoList.children) {
        item.style.display = '';
    }

});
})();
