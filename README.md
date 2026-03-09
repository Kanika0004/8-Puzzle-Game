# 🧩 8 Puzzle Game

A simple and interactive **8-Puzzle sliding tile game** built with **React + TailwindCSS** and deployed as a **mobile Android app using Capacitor**.

The objective of the game is to arrange the tiles in numerical order by sliding them into the empty space.

---

## 🎮 Features

* 🧩 Classic **3×3 sliding puzzle**
* 🎚 **Difficulty levels** (Easy / Medium / Hard)
* ⏱ **Timer starts on first move**
* 🔢 **Move counter**
* 💡 **Hint system**
* 🏆 **Best game tracking (stored locally)**
* 🎉 **Confetti animation when puzzle is solved**
* 🐰 **Victory popup with image**
* 📱 **Android mobile app support**

---

## 📱 App Screens

Main gameplay includes:

* Puzzle board
* Moves counter
* Timer
* Hints used
* Hint and Reset buttons
* Best game stats
* Guidelines popup

---

## 🛠 Tech Stack

* **React**
* **Tailwind CSS**
* **Capacitor (Android wrapper)**
* **JavaScript**
* **HTML / CSS**

---

## 📂 Project Structure

```
8-puzzle-app
│
├── android/              # Android native project
├── public/               # Images and static assets
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

## ▶️ Running the Project (Web)

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📱 Running the Android App

Build the web app:

```
npm run build
```

Copy the build to Android:

```
npx cap copy android
```

Open Android Studio:

```
npx cap open android
```

Then press **Run ▶** to install on emulator or phone.

---

## 📦 Generate APK

In Android Studio:

```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

APK location:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎯 How to Play

1. Tap a tile next to the empty space to move it.
2. Arrange the numbers in order:

```
1 2 3
4 5 6
7 8 _
```

3. Try to solve it in **minimum moves and time**.

---

## 💡 Future Improvements

* Leaderboard system
* More puzzle sizes (4×4, 5×5)
* Sound effects and animations
* Online score tracking
* PWA support

---

## 👩‍💻 Author

**Kanika S**

Computer Science Student

---

## ⭐ Acknowledgements

Inspired by the classic **8-Puzzle sliding tile problem**, a well-known problem in artificial intelligence and search algorithms.
