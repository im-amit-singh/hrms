from rest_framework import serializers
from .models import Attendance
from employees.models import Employee


class AttendanceListSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(
        source='employee.employee_id',
        read_only=True
    )
    employee_name = serializers.CharField(
        source='employee.full_name',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = [
            'id',
            'employee_id',
            'employee_name',
            'date',
            'status',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'employee_name']

    def validate(self, data):
        employee_id = data.get('employee_id')
        date = data.get('date')

        # check employee exists
        try:
            employee = Employee.objects.get(id=employee_id)
        except Employee.DoesNotExist:
            raise serializers.ValidationError(
                {"employee_id": "Employee not found."}
            )

        # check duplicate attendance
        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date."
            )

        data['employee'] = employee
        return data

    def create(self, validated_data):
        validated_data.pop('employee_id')
        return Attendance.objects.create(**validated_data)


class AttendanceCreateSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all()
    )

    class Meta:
        model = Attendance
        fields = [
            'employee',
            'date',
            'status'
        ]

    def validate(self, data):
        employee = data['employee']
        date = data['date']

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date."
            )

        return data
