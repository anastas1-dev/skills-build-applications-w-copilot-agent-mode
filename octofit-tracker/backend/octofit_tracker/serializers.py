from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Team, Activity, Workout, Leaderboard

User = get_user_model()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), allow_null=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'team', 'is_active', 'is_staff']

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'user', 'type', 'duration', 'distance', 'timestamp']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'points']
