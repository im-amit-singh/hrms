from django.utils import timezone

from django.db.models import Count, Q
from django.utils.dateparse import parse_date
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Attendance
from employees.models import Employee
from .serializers import AttendanceListSerializer,AttendanceCreateSerializer


class AttendanceCreateAPIView(APIView):

    def post(self, request):
        serializer = AttendanceCreateSerializer(data=request.data)

        if serializer.is_valid():
            attendance = serializer.save()
            return Response(
                {
                    "message": "Attendance marked successfully",
                    "data": AttendanceListSerializer(attendance).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class AttendanceListAPIView(APIView):

    def get(self, request):
        employee_id = request.query_params.get('employee_id')
        date_str = request.query_params.get('date')

        qs = Attendance.objects.select_related('employee')

        if employee_id:
            qs = qs.filter(employee__employee_id=employee_id)

        if date_str:
            date_parsed = parse_date(date_str)
            if not date_parsed:
                return Response(
                    {"error": "Invalid date format. Use YYYY-MM-DD"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            qs = qs.filter(date=date_parsed)

        serializer = AttendanceListSerializer(qs, many=True)
        return Response(serializer.data)


class EmployeeAttendanceSummaryAPIView(APIView):
    def get(self, request):
        summary = Employee.objects.all().annotate(
            total_present=Count('attendances', filter=Q(attendances__status='PRESENT')),
            total_absent=Count('attendances', filter=Q(attendances__status='ABSENT'))
        ).values(
            'id', 'employee_id', 'full_name', 'total_present', 'total_absent'
        )

        return Response(list(summary), status=status.HTTP_200_OK)


class DashboardSummaryAPIView(APIView):
    def get(self, request):
        today = timezone.now().date()

        total_employees = Employee.objects.count()
        total_present = Attendance.objects.filter(date=today, status='PRESENT').count()
        total_absent = Attendance.objects.filter(date=today, status='ABSENT').count()

        data = {
            "total_employees": total_employees,
            "present_today": total_present,
            "absent_today": total_absent,
            "date": today
        }

        return Response(data, status=status.HTTP_200_OK)