# HRMS Frontend (Angular)

The user interface for the Human Resource Management System, built with **Angular 15** and **Angular Material**.

## 🎨 Features

- **🏢 Dashboard:** Interactive charts and summaries of employee data.
- **🕒 Attendance Management:** Intuitive interface for marking attendance and viewing logs.
- **📄 Employee Management:** Forms for adding, editing, and listing employees.
- **🧩 Component-Based Architecture:** Modular design for layout, components, and services.
- **💅 Modern Styling:** Integrated with Angular Material and custom SCSS.

## 📦 Requirements

- **Node.js 18.x+**
- **npm 9.x+**
- **Angular CLI v15.x**

## 🚦 Local Development Setup

### 1. Install Dependencies

In the `/frontend` directory, run:

```bash
npm install
```

### 2. Environment Configuration

Check `/src/environments/environment.ts` and `/src/environments/environment.prod.ts` to configure your API URL. Example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

### 3. Start Development Server

```bash
npm start
```

Access the application at `http://localhost:4200`.

---

## 🏗 Project Layout

```text
src/
├── app/
│   ├── layout/       # Admin Layout & Navigation
│   ├── pages/        # Dashboard, Employee, Attendance views
│   ├── services/     # API Services (EmployeeService, AttendanceService)
│   └── models/       # Data Models & Interfaces
├── assets/           # Icons, images, and static assets
└── styles.scss       # Global CSS/SCSS
```

---

## 🛠 Available Scripts

- `npm start`: Runs the development server.
- `npm run build`: Builds the production-ready bundle.
- `npm test`: Runs unit tests via Karma.
- `npm run ng -- lint`: Lints the source code.

---

## 🚀 Deployment

The project is configured for deployment with **WhiteNoise** in the backend, meaning it can be built and served as static files.

To build:
```bash
npm run build --prod
```
The output will be in the `/dist` folder, which should be served by your backend or static hosting provider.

> [!TIP]
> Use **Angular Material** components whenever possible to maintain design consistency and accessibility.
