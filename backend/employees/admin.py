from django.contrib import admin
from .models import Employee

# Register your models here.
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'employee_id',
        'full_name',
        'email',
        'department',
        'created_at'
    )

    search_fields = (
        'employee_id',
        'full_name',
        'email',
        'department'
    )