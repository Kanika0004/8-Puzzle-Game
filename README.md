# 🧩 8 Puzzle Game

A simple and interactive **8-Puzzle sliding tile game** built using **React + TailwindCSS** and packaged as a **mobile Android app using Capacitor**.

The goal of the game is to arrange the numbered tiles in order by sliding them into the empty space.

---

# 📱 Install the App

You can install the Android APK directly:

**Download APK**

https://drive.google.com/file/d/1XUMxBg-gILkAbANKg0yzm97D19waSmuV/view?usp=sharing

1. Download the APK
2. Allow **Install from unknown sources** on your phone
3. Install and start playing

---

# 🎥 Demo Video

You can add a demo video of the gameplay here.

Example:

```
🎥 Demo Video

https://github.com/user-attachments/assets/144c43c8-d0d0-42a9-9847-5da0f578ecb9

```

Or upload a GIF/video directly to GitHub and paste it here.

---

# 🎮 Features

* 🧩 Classic **3×3 sliding puzzle**
* 🎚 **Difficulty levels** (Easy / Medium / Hard)
* ⏱ **Timer starts after first move**
* 🔢 **Move counter**
* 💡 **Hint system**
* 🏆 **Best game tracking**
* 🎉 **Confetti animation when puzzle is solved**
* 🐰 **Victory popup**
* 📱 **Android mobile support**

---

# 🧠 A* Search Algorithm

The game uses the **A* (A-Star) Search Algorithm** to generate hints for solving the puzzle.

A* is a widely used pathfinding and graph traversal algorithm in **Artificial Intelligence**.

It works by combining:

* **g(n)** → the cost from the start state to the current state
* **h(n)** → a heuristic estimate of the cost to reach the goal

The evaluation function is:

```
f(n) = g(n) + h(n)
```

For the 8-Puzzle, the heuristic used is typically the **Manhattan Distance**, which calculates how far each tile is from its goal position.

This allows the algorithm to efficiently search through possible puzzle states and suggest the **next optimal move**.

---

# 🛠 Tech Stack

* **React**
* **Tailwind CSS**
* **Capacitor**
* **JavaScript**
* **A* Search Algorithm**

---

# 📂 Project Structure

```
8-puzzle-app
│
├── android/              # Android native project
├── public/
│   ├── bg1.jpg
│   ├── win.png
│   └── start-cloud.png
│
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   └── Controls.jsx
│   │
│   ├── hooks/
│   │   └── useTimer.js
│   │
│   ├── utils/
│   │   ├── shuffle.js
│   │   ├── aStar.js
│   │   └── helpers.js
│   │
│   └── App.jsx
│
└── package.json
```

---

# ▶️ Running the Project (Web)

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 📱 Running the Android App

Build the web app:

```
npm run build
```

Copy to Android project:

```
npx cap copy android
```

Open Android Studio:

```
npx cap open android
```

Run the app on emulator or device.

---

# 📦 Generate APK

In Android Studio:

```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

APK location:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

# 🎯 How to Play

Arrange the tiles in order:

```
1 2 3
4 5 6
7 8 _
```

Slide tiles into the empty space until the puzzle is solved.

Try to complete the puzzle in **minimum moves and time**.

---

# 👩‍💻 Author

**Kanika S**

Computer Science Student

---

# ⭐ Acknowledgements

Inspired by the classic **8-Puzzle problem**, commonly used to demonstrate **search algorithms in Artificial Intelligence**.
