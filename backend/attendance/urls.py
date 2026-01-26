from django.urls import path
from .views import AttendanceCreateAPIView, AttendanceListAPIView, EmployeeAttendanceSummaryAPIView, DashboardSummaryAPIView

urlpatterns = [
    path('attendance/', AttendanceCreateAPIView.as_view()),
    path('attendance/list/', AttendanceListAPIView.as_view()),
    path('attendance/summary/', EmployeeAttendanceSummaryAPIView.as_view()),
    path('dashboard/summary/', DashboardSummaryAPIView.as_view()),
]
