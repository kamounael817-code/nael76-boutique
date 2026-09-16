// TODO List App - Local Storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentEditId = null;
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const prioritySelect = document.getElementById('prioritySelect');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const editPriority = document.getElementById('editPriority');
const editForm = document.getElementById('editForm');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

closeModal.addEventListener('click', closeEditModal);
cancelBtn.addEventListener('click', closeEditModal);
editForm.addEventListener('submit', saveTodo);

// Add Todo
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: Date.now(),
    text,
    priority: prioritySelect.value,
    completed: false,
    createdAt: new Date().toLocaleDateString('fr-FR')
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
  prioritySelect.value = 'medium';
  todoInput.focus();
}

// Delete Todo
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

// Toggle Todo
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Open Edit Modal
function openEditModal(id) {
  currentEditId = id;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    editInput.value = todo.text;
    editPriority.value = todo.priority;
    editModal.classList.add('active');
  }
}

// Close Edit Modal
function closeEditModal() {
  editModal.classList.remove('active');
  currentEditId = null;
}

// Save Todo
function saveTodo(e) {
  e.preventDefault();
  const todo = todos.find(t => t.id === currentEditId);
  if (todo) {
    todo.text = editInput.value.trim();
    todo.priority = editPriority.value;
    saveTodos();
    renderTodos();
    closeEditModal();
  }
}

// Save to LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render Todos
function renderTodos() {
  const filtered = filterTodos();
  updateStats();

  if (filtered.length === 0) {
    todoList.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  todoList.innerHTML = filtered.map(todo => `
    <div class="todo-item ${todo.priority}-priority ${todo.completed ? 'completed' : ''}">
      <div class="checkbox-wrapper">
        <input type="checkbox" class="todo-checkbox" 
          ${todo.completed ? 'checked' : ''}
          onchange="toggleTodo(${todo.id})">
      </div>
      <div class="todo-content">
        <div class="todo-text">${escapeHtml(todo.text)}</div>
        <div class="todo-meta">
          <span class="todo-date">📅 ${todo.createdAt}</span>
          <span class="priority-badge ${todo.priority}">${getPriorityLabel(todo.priority)}</span>
        </div>
      </div>
      <div class="todo-actions">
        <button class="btn-action btn-edit" onclick="openEditModal(${todo.id})">Modifier</button>
        <button class="btn-action btn-delete" onclick="deleteTodo(${todo.id})">Supprimer</button>
      </div>
    </div>
  `).join('');
}

// Filter Todos
function filterTodos() {
  switch(currentFilter) {
    case 'active':
      return todos.filter(t => !t.completed);
    case 'completed':
      return todos.filter(t => t.completed);
    case 'high':
      return todos.filter(t => t.priority === 'high');
    default:
      return todos;
  }
}

// Update Stats
function updateStats() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = todos.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById('totalCount').textContent = total;
  document.getElementById('activeCount').textContent = active;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('completionPercent').textContent = percent + '%';
}

// Get Priority Label
function getPriorityLabel(priority) {
  const labels = {
    high: '🔴 Haute',
    medium: '🟡 Normale',
    low: '🟢 Basse'
  };
  return labels[priority] || priority;
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
renderTodos();