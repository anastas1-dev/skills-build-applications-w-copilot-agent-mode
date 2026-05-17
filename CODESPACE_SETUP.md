# OctoFit Tracker - Codespace Setup Guide

## Configuration Updates Completed ✅

### 1. **settings.py** - ALLOWED_HOSTS Configuration
Updated to support both localhost and codespace URLs:
```python
import os

ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if os.environ.get('CODESPACE_NAME'):
    ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
```

### 2. **urls.py** - Codespace URL Support
Added environment variable setup for dynamic URL configuration:
```python
import os

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"
```

### 3. **.vscode/launch.json** - Django Backend Configuration
Added `CODESPACE_NAME` environment variable to launch config:
```json
"env": {
  "PYTHONPATH": "${workspaceFolder}/octofit-tracker/backend/venv/bin/python",
  "VIRTUAL_ENV": "${workspaceFolder}/octofit-tracker/backend/venv",
  "PATH": "${workspaceFolder}/octofit-tracker/backend/venv/bin:${env:PATH}",
  "CODESPACE_NAME": "${env:CODESPACE_NAME}"
}
```

## How to Start the Server

### Option 1: Using VS Code Launch Configuration
1. Open the VS Code **Run and Debug** panel (Ctrl+Shift+D)
2. Select **"Launch Django Backend"** from the dropdown
3. Click the green play button to start the server
4. Server will run on `0.0.0.0:8000`

### Option 2: Manual Command
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## REST API Endpoints

Once the server is running, you can access the following endpoints:

### **Localhost (Local Development)**
- `http://localhost:8000/api/activities/`
- `http://localhost:8000/api/teams/`
- `http://localhost:8000/api/users/`
- `http://localhost:8000/api/workouts/`
- `http://localhost:8000/api/leaderboard/`

### **Codespace URL** (Replace `$CODESPACE_NAME` with your actual codespace name)
- `https://$CODESPACE_NAME-8000.app.github.dev/api/activities/`
- `https://$CODESPACE_NAME-8000.app.github.dev/api/teams/`
- `https://$CODESPACE_NAME-8000.app.github.dev/api/users/`
- `https://$CODESPACE_NAME-8000.app.github.dev/api/workouts/`
- `https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard/`

## Testing the API

### Using the Automated Test Script
Run the provided test script to test all endpoints:
```bash
./test_api.sh
```

The script automatically detects whether you're running on localhost or codespace and tests accordingly.

### Using curl Manually

**For Localhost:**
```bash
curl -s http://localhost:8000/api/activities/ | python -m json.tool
curl -s http://localhost:8000/api/teams/ | python -m json.tool
curl -s http://localhost:8000/api/users/ | python -m json.tool
curl -s http://localhost:8000/api/workouts/ | python -m json.tool
curl -s http://localhost:8000/api/leaderboard/ | python -m json.tool
```

**For Codespace:**
```bash
# First, check your codespace name
echo $CODESPACE_NAME

# Then test with your codespace URL
curl -s https://$CODESPACE_NAME-8000.app.github.dev/api/activities/ | python -m json.tool
curl -s https://$CODESPACE_NAME-8000.app.github.dev/api/teams/ | python -m json.tool
curl -s https://$CODESPACE_NAME-8000.app.github.dev/api/users/ | python -m json.tool
curl -s https://$CODESPACE_NAME-8000.app.github.dev/api/workouts/ | python -m json.tool
curl -s https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard/ | python -m json.tool
```

## Port Forwarding

The following ports are already configured and public:
- **Port 8000**: Django Backend (public)
- **Port 3000**: React Frontend (public)
- **Port 27017**: MongoDB (private)

## Troubleshooting

### MongoDB Not Running
Check if MongoDB is running:
```bash
ps aux | grep mongod
```

If not running, it will be started automatically on codespace startup.

### HTTPS Certificate Issues
The codespace URL uses GitHub's certificate, so HTTPS should work automatically. If you encounter certificate issues, you can test with HTTP by modifying the `base_url` temporarily in `urls.py`.

### Server Not Responding
1. Verify the Django backend is running in VS Code's Debug Terminal
2. Check that port 8000 is not blocked
3. Ensure MongoDB is running (`ps aux | grep mongod`)
4. Try accessing the admin panel: `http://localhost:8000/admin/`

## Key Environment Variables

- `CODESPACE_NAME`: Automatically set in GitHub Codespaces - used to generate the codespace URL
- `PYTHONPATH`: Points to the Python executable in the virtual environment
- `VIRTUAL_ENV`: Points to the virtual environment directory
- `PATH`: Includes the virtual environment bin directory
