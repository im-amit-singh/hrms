# HRMS Backend Service

The heart of the Human Resource Management System, powered by **Django 6** and **Django REST Framework (DRF)**.

## 🛠 Features

- **🛡 JWT Authentication:** Secure login and session management.
- **📁 Employee Records:** Centralized management of employee profiles and details.
- **🕒 Attendance:** Logic for marking, calculating, and reporting staff attendance.
- **🚀 Scalability:** Modular app design with `employees` and `attendance` as decoupled services.

## 📦 Requirements

- **Python 3.10+**
- **pip** and **venv**
- **PostgreSQL**

## 🚦 Local Development Setup

### 1. Environment Setup

Create and activate your virtual environment:

```powershell
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/MacOS:
source venv/bin/activate
```

### 2. Install Dependencies

Install the comprehensive set of backend packages:

```bash
pip install -r requirements.txt
```

### 3. Configure Database & Secrets

Create a `.env` file in the root of the `/backend` directory based on the following template:

```env
DEBUG=True
DJANGO_SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/hrms_db
```

### 4. Database Migrations

Apply existing migrations to set up your PostgreSQL schema:

```bash
python manage.py migrate
```

### 5. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

### 6. Start the API Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`. Access the Django Admin at `http://localhost:8000/admin`.

---

## 📖 API Documentation (Interactive)

The project now includes automated OpenAPI 3.0 documentation via `drf-spectacular`.

| Feature | URL |
| :--- | :--- |
| **Swagger UI** | `http://localhost:8000/api/docs/` |
| **Redoc** | `http://localhost:8000/api/redoc/` |
| **OpenAPI Schema (JSON)** | `http://localhost:8000/api/schema/` |

---

## 📡 API Endpoints (Core)

| Path | Method | Description |
| :--- | :--- | :--- |
| `/api/employees/` | GET/POST | Manage employee list |
| `/api/attendance/` | GET/POST | Manage attendance records |
| `/api/token/` | POST | Obtain JWT tokens |
| `/api/token/refresh/` | POST | Refresh JWT tokens |

---

## 🚀 Advanced Configurations

- **Static Files:** Managed via `WhiteNoise`. Use `python manage.py collectstatic` for production.
- **CORS:** Currently configured to allow all origins in development; restrict this in `settings.py` for staging/production.

> [!IMPORTANT]
> Make sure to never commit your `.env` file to version control. Always use `.env.example` as a template for team members.
