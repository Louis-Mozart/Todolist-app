// Todo List App - Main JavaScript File

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.notificationPermission = Notification.permission;
        this.checkInterval = null;
        this.notifiedTasks = new Set();
        
        // Initialize notifications state based on browser permission
        if (Notification.permission === 'granted' && !localStorage.getItem('notificationsEnabled')) {
            localStorage.setItem('notificationsEnabled', 'true');
        } else if (Notification.permission !== 'granted') {
            // If permission not granted, ensure localStorage reflects this
            localStorage.setItem('notificationsEnabled', 'false');
        }
        
        this.initElements();
        this.attachEventListeners();
        this.render();
        this.updateNotificationStatus(); // Initialize notification status on load
        this.startNotificationChecker();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.todoDate = document.getElementById('todoDate');
        this.todoTime = document.getElementById('todoTime');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettings');
        this.toggleNotifBtn = document.getElementById('toggleNotifications');
        this.notificationStatus = document.getElementById('notificationStatus');
    }

    attachEventListeners() {
        // Add todo
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter todos
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.filter;
                this.updateFilterButtons();
                this.render();
            });
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Settings modal
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.toggleNotifBtn.addEventListener('click', () => this.toggleNotifications());
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.closeSettings();
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text === '') {
            this.shakeInput();
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: this.todoDate.value || null,
            dueTime: this.todoTime.value || null
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.todoInput.value = '';
        this.todoDate.value = '';
        this.todoTime.value = '';
        this.render();
        this.todoInput.focus();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) return;
        
        if (confirm(`Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed && !this.isOverdue(t));
            case 'past-due':
                return this.todos.filter(t => !t.completed && this.isOverdue(t));
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    isOverdue(todo) {
        if (!todo.dueDate) return false;
        
        const now = new Date();
        const dueDateTime = new Date(todo.dueDate);
        
        if (todo.dueTime) {
            const [hours, minutes] = todo.dueTime.split(':');
            dueDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        } else {
            dueDateTime.setHours(23, 59, 59, 999);
        }
        
        return dueDateTime < now;
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.renderEmptyState();
        } else {
            this.renderTodos(filteredTodos);
        }
        
        this.updateStats();
    }

    renderTodos(todos) {
        this.todoList.innerHTML = todos.map(todo => {
            const statusClass = this.getTaskStatusClass(todo);
            const dateTimeHtml = this.renderDateTime(todo);
            
            return `
                <li class="todo-item ${todo.completed ? 'completed' : ''} ${statusClass}" data-id="${todo.id}">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="app.toggleTodo(${todo.id})"
                    />
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    ${dateTimeHtml}
                    <button class="todo-delete" onclick="app.deleteTodo(${todo.id})">Delete</button>
                </li>
            `;
        }).join('');
    }

    renderDateTime(todo) {
        if (!todo.dueDate && !todo.dueTime) return '';
        
        let html = '<div class="todo-datetime">';
        
        if (todo.dueDate) {
            const date = new Date(todo.dueDate);
            const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
            html += `<span class="todo-date">${formattedDate}</span>`;
        }
        
        if (todo.dueTime) {
            const [hours, minutes] = todo.dueTime.split(':');
            const time = new Date();
            time.setHours(parseInt(hours), parseInt(minutes));
            const formattedTime = time.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            html += `<span class="todo-time">${formattedTime}</span>`;
        }
        
        html += '</div>';
        return html;
    }

    getTaskStatusClass(todo) {
        if (todo.completed || !todo.dueDate) return '';
        
        const now = new Date();
        const dueDateTime = new Date(todo.dueDate);
        
        if (todo.dueTime) {
            const [hours, minutes] = todo.dueTime.split(':');
            dueDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        } else {
            dueDateTime.setHours(23, 59, 59, 999);
        }
        
        const timeDiff = dueDateTime - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (timeDiff < 0) return 'overdue';
        if (hoursDiff <= 1) return 'due-soon';
        
        return '';
    }

    // Settings Modal Methods
    openSettings() {
        this.settingsModal.classList.remove('hidden');
        this.updateNotificationStatus();
    }

    closeSettings() {
        this.settingsModal.classList.add('hidden');
    }

    updateNotificationStatus() {
        console.log('Updating notification status...');
        
        if (!this.notificationStatus || !this.toggleNotifBtn) {
            console.error('Notification elements not found');
            return;
        }

        const permission = Notification.permission;
        const localEnabled = localStorage.getItem('notificationsEnabled') === 'true';
        console.log('Permission:', permission, 'Local enabled:', localEnabled);
        
        if (permission === 'granted' && localEnabled) {
            console.log('Setting status to: Enabled and active');
            this.notificationStatus.textContent = '✅ Enabled and active';
            this.notificationStatus.style.color = '#10b981'; // success-color
            this.toggleNotifBtn.textContent = 'Disable';
            this.toggleNotifBtn.classList.add('enabled');
            this.toggleNotifBtn.classList.remove('disabled');
            this.toggleNotifBtn.disabled = false;
            console.log('Button text set to:', this.toggleNotifBtn.textContent);
        } else if (permission === 'granted' && !localEnabled) {
            console.log('Setting status to: Paused');
            this.notificationStatus.textContent = '⏸️ Paused';
            this.notificationStatus.style.color = '#f59e0b'; // warning color
            this.toggleNotifBtn.textContent = 'Enable';
            this.toggleNotifBtn.classList.remove('enabled', 'disabled');
            this.toggleNotifBtn.disabled = false;
        } else if (permission === 'denied') {
            console.log('Setting status to: Blocked');
            this.notificationStatus.textContent = '❌ Blocked - Click lock icon in address bar to allow';
            this.notificationStatus.style.color = '#ef4444'; // danger-color
            this.toggleNotifBtn.textContent = 'How to Fix';
            this.toggleNotifBtn.classList.add('disabled');
            this.toggleNotifBtn.classList.remove('enabled');
            this.toggleNotifBtn.disabled = false;
        } else {
            console.log('Setting status to: Not enabled');
            this.notificationStatus.textContent = '⚠️ Not enabled';
            this.notificationStatus.style.color = '#6b7280'; // text-secondary
            this.toggleNotifBtn.textContent = 'Enable';
            this.toggleNotifBtn.classList.remove('enabled', 'disabled');
            this.toggleNotifBtn.disabled = false;
            console.log('Button text set to:', this.toggleNotifBtn.textContent);
        }
    }

    async toggleNotifications() {
        console.log('toggleNotifications clicked');
        const localEnabled = localStorage.getItem('notificationsEnabled') === 'true';
        console.log('Current state - Permission:', Notification.permission, 'Local:', localEnabled);
        
        // If permission is denied, show instructions
        if (Notification.permission === 'denied') {
            alert('Notifications are blocked!\n\nTo enable:\n\n1. Click the lock icon (🔒) in your address bar\n2. Find "Notifications" and change to "Allow"\n3. Refresh this page\n\nOr open browser settings and allow notifications for this site.');
            return;
        }
        
        // If already enabled, disable them
        if (Notification.permission === 'granted' && localEnabled) {
            console.log('Disabling notifications');
            localStorage.setItem('notificationsEnabled', 'false');
            this.notificationPermission = 'default'; // Set to default to stop notifications
            this.updateNotificationStatus();
            return;
        }
        
        // If permission not granted, request it
        if (Notification.permission !== 'granted') {
            console.log('Requesting permission...');
            try {
                const permission = await Notification.requestPermission();
                console.log('Permission result:', permission);
                this.notificationPermission = permission;
                
                if (permission === 'granted') {
                    console.log('Permission granted! Enabling notifications');
                    localStorage.setItem('notificationsEnabled', 'true');
                    this.updateNotificationStatus();
                    this.showNotification('Notifications Enabled!', {
                        body: 'You will now receive reminders for your tasks.',
                        icon: '✅'
                    });
                } else {
                    console.log('Permission denied');
                    this.updateNotificationStatus();
                }
            } catch (error) {
                console.error('Error requesting notification permission:', error);
                alert('Error enabling notifications. Please try again.');
            }
        } else {
            // Permission already granted, just enable locally
            console.log('Permission already granted, enabling locally');
            localStorage.setItem('notificationsEnabled', 'true');
            this.notificationPermission = 'granted';
            this.updateNotificationStatus();
            this.showNotification('Notifications Enabled!', {
                body: 'You will now receive reminders for your tasks.',
                icon: '✅'
            });
        }
    }

    // Notification Methods

    showNotification(title, options = {}) {
        const localEnabled = localStorage.getItem('notificationsEnabled') === 'true';
        
        if (this.notificationPermission === 'granted' && localEnabled) {
            const notification = new Notification(title, {
                icon: '📋',
                badge: '📋',
                ...options
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            // Play notification sound
            this.playNotificationSound();
        }
    }

    playNotificationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Could not play notification sound:', error);
        }
    }

    startNotificationChecker() {
        // Check every 30 seconds
        this.checkInterval = setInterval(() => {
            this.checkDueTasks();
        }, 30000);

        // Check immediately
        this.checkDueTasks();
    }

    checkDueTasks() {
        const localEnabled = localStorage.getItem('notificationsEnabled') === 'true';
        if (this.notificationPermission !== 'granted' || !localEnabled) return;

        const now = new Date();

        this.todos.forEach(todo => {
            if (todo.completed || !todo.dueDate || this.notifiedTasks.has(todo.id)) {
                return;
            }

            const dueDateTime = new Date(todo.dueDate);
            
            if (todo.dueTime) {
                const [hours, minutes] = todo.dueTime.split(':');
                dueDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            } else {
                dueDateTime.setHours(23, 59, 59, 999);
            }

            const timeDiff = dueDateTime - now;
            const minutesDiff = timeDiff / (1000 * 60);

            // Notify when task is due (within 1 minute window)
            if (minutesDiff <= 1 && minutesDiff >= -1) {
                this.notifyDueTask(todo);
                this.notifiedTasks.add(todo.id);
            }
            // 5-minute warning
            else if (minutesDiff <= 5 && minutesDiff > 4) {
                this.notifyUpcomingTask(todo, 5);
            }
            // 30-minute warning
            else if (minutesDiff <= 30 && minutesDiff > 29) {
                this.notifyUpcomingTask(todo, 30);
            }
        });
    }

    notifyDueTask(todo) {
        this.showNotification('⏰ Task Due Now!', {
            body: `"${todo.text}" is due now!`,
            tag: `todo-due-${todo.id}`,
            requireInteraction: true
        });
    }

    notifyUpcomingTask(todo, minutes) {
        this.showNotification('📢 Upcoming Task', {
            body: `"${todo.text}" is due in ${minutes} minutes`,
            tag: `todo-upcoming-${todo.id}-${minutes}`
        });
    }

    // Local Storage Methods
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            return [];
        }
    }

    renderEmptyState() {
        const messages = {
            all: 'No tasks yet. Add one above to get started!',
            active: 'No active tasks. Great job!',
            'past-due': 'No overdue tasks. You\'re on top of things!',
            completed: 'No completed tasks yet.'
        };

        this.todoList.innerHTML = `
            <div class="empty-state">
                <p>${messages[this.currentFilter]}</p>
                <span>✨</span>
            </div>
        `;
    }

    updateStats() {
        const activeTodos = this.todos.filter(t => !t.completed && !this.isOverdue(t)).length;
        const pastDueTodos = this.todos.filter(t => !t.completed && this.isOverdue(t)).length;
        
        let statsText = `${activeTodos} active task${activeTodos !== 1 ? 's' : ''}`;
        if (pastDueTodos > 0) {
            statsText += ` | ${pastDueTodos} past due`;
        }
        this.todoCount.textContent = statsText;
        
        const completedTodos = this.todos.filter(t => t.completed).length;
        // Only show Clear Completed button when viewing completed tasks
        this.clearCompletedBtn.style.display = (completedTodos > 0 && this.currentFilter === 'completed') ? 'block' : 'none';
    }

    updateFilterButtons() {
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }

    shakeInput() {
        this.todoInput.style.animation = 'none';
        setTimeout(() => {
            this.todoInput.style.animation = 'shake 0.5s';
        }, 10);
        this.todoInput.focus();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});
