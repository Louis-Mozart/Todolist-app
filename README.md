# Todo List Web App

A modern, responsive todo list application built with vanilla HTML, CSS, and JavaScript. Clean design with persistent storage and intuitive user experience.

## ✨ Features

- ✅ **Add & Manage Tasks** - Create, complete, and delete todos
- 📅 **Schedule Tasks** - Set due dates and times for your tasks
- 🔔 **Smart Notifications** - Get browser notifications when tasks are due
- ⏰ **Reminder System** - Automatic alerts at 30 min, 5 min, and when task is due
- 🎯 **Visual Status Indicators** - See overdue and due-soon tasks at a glance
- 🔍 **Filter Views** - View all, active, or completed tasks
- 💾 **Local Storage** - Your todos persist between sessions
- 📱 **Responsive Design** - Works great on desktop and mobile
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⌨️ **Keyboard Support** - Press Enter to add tasks quickly

## 🚀 Getting Started

### Quick Start

1. Clone this repository:
```bash
git clone https://github.com/Louis-Mozart/Todolist-app.git
cd Todolist-app
```

2. Open `index.html` in your browser:
```bash
# On Linux
xdg-open index.html

# On macOS
open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file.

## 🌐 Sharing & Deployment

### Method 1: GitHub Pages (Recommended - Free & Easy)

1. **Push your code to GitHub** (if not already done):
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to your repo: `https://github.com/Louis-Mozart/Todolist-app`
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your app will be live at: `https://louis-mozart.github.io/Todolist-app/`

3. **Share the link** with anyone! It's completely free.

### Method 2: Netlify (Drag & Drop)

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Drag your `Todolist-app` folder onto the Netlify dashboard
4. Get instant URL like: `https://your-app-name.netlify.app`

### Method 3: Vercel (GitHub Integration)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy automatically
5. Get URL like: `https://todolist-app.vercel.app`

### Method 4: Share Locally (Same Network)

1. **Install a simple HTTP server**:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve
```

2. **Find your local IP**:
```bash
# Linux/Mac
hostname -I | awk '{print $1}'

# Or
ip addr show | grep "inet " | grep -v 127.0.0.1
```

3. **Share the URL** with people on your network:
   - Example: `http://192.168.1.100:8000`

### Method 5: Download as ZIP

1. Click the green **Code** button on GitHub
2. Select **Download ZIP**
3. Send the ZIP file to others
4. They can extract and open `index.html` locally

### Using a Local Server (Optional)

For a better development experience, you can use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📖 How to Use

### Basic Operations
1. **Add a Task**: Type your task in the input field and click "Add Task" or press Enter
2. **Schedule a Task**: Optionally set a due date and/or time before adding the task
3. **Complete a Task**: Click the checkbox next to a task to mark it as complete
4. **Delete a Task**: Hover over a task and click the "Delete" button
5. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks
6. **Clear Completed**: Click "Clear Completed" to remove all finished tasks

### Notification System
1. **Enable Notifications**: Click "Enable Notifications" in the banner when prompted
2. **Automatic Reminders**: You'll receive notifications:
   - 30 minutes before a task is due
   - 5 minutes before a task is due
   - When the task is due
3. **Visual Indicators**:
   - 🟡 **Yellow pulsing** = Task due within 1 hour
   - 🔴 **Red text** = Task is overdue
4. **Sound Alerts**: A gentle sound plays with each notification

## 🛠️ Technologies

- **HTML5** - Structure and content
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **JavaScript (ES6+)** - Logic and interactivity
- **LocalStorage API** - Data persistence
- **Notification API** - Browser push notifications
- **Web Audio API** - Notification sounds
- **Date/Time Input** - Native date and time pickers

## 🎯 Features Breakdown

### Task Management
- Create new tasks with validation
- Optional date and time scheduling
- Toggle completion status
- Delete individual tasks
- Bulk delete completed tasks
- Task status tracking (active, overdue, due soon)

### Notification System
- Browser notification API integration
- Multiple reminder intervals (30 min, 5 min, due now)
- Audio notification sounds
- Persistent notification preferences
- Smart notification banner

### Filtering
- **All**: View all tasks
- **Active**: View only incomplete tasks
- **Completed**: View only finished tasks

### UI/UX
- Smooth animations and transitions
- Visual task status indicators
- Color-coded due dates (yellow for due soon, red for overdue)
- Pulsing animation for urgent tasks
- Hover effects for better interactivity
- Input validation with visual feedback
- Empty state messages
- Task counter showing remaining items
- Mobile-responsive layoutsks

### Filtering
- **All**: View all tasks
- **Active**: View only incomplete tasks
- **Completed**: View only finished tasks

### UI/UX
- Smooth animations and transitions
- Hover effects for better interactivity
- Input validation with visual feedback
- Empty state messages
- Task counter showing remaining items
- Mobile-responsive layout

## 🔧 Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... more colors */
}
```

### Gradient Background
Change the body background gradient:

```css
## 🔔 Browser Compatibility

### Notification Support
The notification feature requires:
- Modern browser (Chrome 22+, Firefox 22+, Safari 16+, Edge 14+)
- HTTPS or localhost (for security)
- User permission for notifications

### Best Experience
For optimal notification delivery:
- Keep the browser tab open (can be in background)
- Allow notifications when prompted
- Ensure browser notifications are not blocked in system settings

## 📝 Future Enhancements

Potential features for future versions:
- [ ] Task editing capability
- [ ] Recurring tasks (daily, weekly, monthly)
- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Drag and drop reordering
- [ ] Dark mode toggle
- [ ] Export/import tasks
- [ ] Search functionality
- [ ] Task notes/descriptions
- [ ] Custom notification intervals
- [ ] Snooze functionality
- [ ] Backend integration for cloud sync

Potential features for future versions:
- [ ] Task editing capability
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Drag and drop reordering
- [ ] Dark mode toggle
- [ ] Export/import tasks
- [ ] Search functionality
- [ ] Task notes/descriptions
- [ ] Backend integration for cloud sync

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Louis-Mozart**

- GitHub: [@Louis-Mozart](https://github.com/Louis-Mozart)

## 🙏 Acknowledgments

- Inspired by modern todo applications
- Built with vanilla JavaScript for simplicity and learning

---

**Happy Task Managing! 📝✨**
