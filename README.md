
> **Please pay attention:** All changes related to the current task are in the `table-feature` branch and are awaiting review and merging in **Pull Request #1**.

# User Management App

## Overview

This project is a simple User Management application built with Angular 16+, Akita (for state management), and RxJS. The application allows users to manage a list of entities representing users, including toggling their active status, adding new users, and validating unique usernames using RxJS streams. The application also features SCSS for styling.

## Stack

- **Angular**: 16+ for front-end framework
- **Akita**: Lightweight state management library for handling application state
- **RxJS**: Reactive programming library for handling asynchronous data streams and complex UI interactions
- **SCSS**: CSS pre-processor for modular and scalable styling

## Code Quality and Automation Tools

This project includes several tools for maintaining code quality and enforcing best practices:

- **ESLint**: Configured for Angular to ensure consistent code quality with linting rules.
- **Prettier**: Used for code formatting, ensuring code style remains consistent across the project.
- **Husky**: Configured to run pre-commit hooks that automatically execute unit tests and linting before commits.

### Testing

- **Karma**: The project uses Karma as the test runner for unit tests, which are automatically triggered by Husky before commits. This ensures code correctness and minimizes issues in production.

With these tools, the project benefits from automated code formatting, linting, and testing, all of which help maintain high code standards and reliability.

## State Management with Akita

This project uses **Akita** for state management, which provides a flexible and efficient way to manage application state. For better debugging and state tracking, the project also supports **Akita DevTools**.

### Akita DevTools

- **Akita DevTools**: Integrates with the Redux DevTools Extension for Chrome and Firefox, allowing you to monitor and inspect the Akita store in real-time.
- **Setup**: Akita DevTools will automatically connect to the Redux DevTools if installed in your browser. This makes it easier to view the application's state history, revert changes, and gain insights into how state transitions occur.

## Features

1. **User Table**

   - Displays a table of users with columns for `id`, `name`, and `active` status.
   - Each row has a toggle button in the `active` column to enable or disable the user’s active status.
   - The initial set of users is preloaded in the Akita store.

2. **Add User**

   - A button to open a modal for adding a new user with fields for `name` and `active` (defaulted to `false`).
   - Unique name validation with RxJS: the `name` field uses an async validator with a debounce timer (3 sec) to simulate a backend check for uniqueness.
   - The "Create" button in the modal is enabled only if:
     - The form is valid.
     - The async validator has verified that the name is unique.

3. **Conditional Add User Button**
   - The "Add User" button is only enabled if:
     - All users are marked as `active`.
     - The total user count is less than 5.
   - The enablement of the button is managed with RxJS to ensure smooth reactivity.

## Project Structure

The project structure is organized into the following main components:

- **User Store**: Uses Akita for state management, storing users and their states.
- **User Modal**: A form-driven modal component with async validation for adding new users.
- **User Table**: Displays the list of users and allows toggling of the active status.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd user-management-app
   ```

## Installation and Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the application::**

    ```bash
    ng serve
    ```

The application will be available at http://localhost:4200.

## Usage

1. Open the app in the browser.
2. Use the **Add User** button to open a modal for creating a new user.
3. Enter a unique name and set the active status if desired.
4. Click **Create** when the form is valid.
5. Use the toggle button in the **active** column to activate or deactivate users.
6. Note that the **Add User** button is only enabled when all users are active and the user count is less than 5.
