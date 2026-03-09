# 8-Puzzle Solver App

This project is a simple 8-puzzle game built mainly to **study and implement the A\* algorithm**.

The app lets the user play the puzzle manually, while the hint system uses **A\*** to determine the next optimal move toward the goal state.

## Goal

The main purpose of this project was to understand:

- state-space search
- heuristic search
- the A\* algorithm
- how A\* can be applied to the 8-puzzle problem

## Features

- 8-puzzle game
- A\*-based hint system
- move counter
- timer
- hints used counter
- difficulty selection
- best game tracking
- Android app build using Capacitor

## Tech Stack

- React
- JavaScript
- Tailwind CSS
- Capacitor

## A\* in this project

The A\* algorithm is used to solve the puzzle state optimally.

### Idea
Each puzzle state is treated as a node.

A\* evaluates states using:

```text
f(n) = g(n) + h(n)
