from django.contrib import admin
from .models import Attendance

# Register your models here.
@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = (
        'employee',
        'date',
        'status',
        'created_at'
    )

    list_filter = (
        'status',
        'date',
    )

    search_fields = (
        'employee__full_name',
        'employee__employee_id'
    )