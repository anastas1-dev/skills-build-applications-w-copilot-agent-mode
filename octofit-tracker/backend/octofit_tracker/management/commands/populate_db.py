from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Use raw MongoDB cleanup to avoid Djongo delete issues
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]
        for collection_name in [
            'users', 'teams', 'activities', 'leaderboard', 'workouts',
            'octofit_tracker_user', 'octofit_tracker_team', 'octofit_tracker_activity',
            'octofit_tracker_workout', 'octofit_tracker_leaderboard'
        ]:
            if collection_name in db.list_collection_names():
                db.drop_collection(collection_name)

        # Ensure unique index on email for users collection
        db['users'].create_index('email', unique=True)

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (Superheroes)
        User = get_user_model()
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel)
        captain = User.objects.create_user(username='captain', email='captain@marvel.com', password='password', team=marvel)
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc)
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc)

        # Create Activities
        Activity.objects.create(user=ironman, type='Run', duration=30, distance=5)
        Activity.objects.create(user=batman, type='Swim', duration=45, distance=2)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio workout for all')
        Workout.objects.create(name='Strength Training', description='Strength workout for superheroes')

        # Create Leaderboard
        Leaderboard.objects.create(user=ironman, points=100)
        Leaderboard.objects.create(user=batman, points=90)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
