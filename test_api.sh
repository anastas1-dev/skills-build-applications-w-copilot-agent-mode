#!/bin/bash

# Test OctoFit Tracker API Endpoints
# This script tests the API endpoints with both localhost and codespace URLs

echo "==================================="
echo "OctoFit Tracker API Test Script"
echo "==================================="
echo ""

# Determine the base URL
if [ -z "$CODESPACE_NAME" ]; then
    BASE_URL="http://localhost:8000"
    echo "Testing with localhost URL: $BASE_URL"
else
    BASE_URL="https://$CODESPACE_NAME-8000.app.github.dev"
    echo "Testing with Codespace URL: $BASE_URL"
fi

echo ""
echo "Testing API Endpoints..."
echo "================================"
echo ""

# Test API endpoints
echo "1. Testing /api/ root endpoint..."
curl -s -X GET "$BASE_URL/api/" | python -m json.tool
echo ""
echo ""

echo "2. Testing /api/activities/ endpoint..."
curl -s -X GET "$BASE_URL/api/activities/" | python -m json.tool
echo ""
echo ""

echo "3. Testing /api/teams/ endpoint..."
curl -s -X GET "$BASE_URL/api/teams/" | python -m json.tool
echo ""
echo ""

echo "4. Testing /api/users/ endpoint..."
curl -s -X GET "$BASE_URL/api/users/" | python -m json.tool
echo ""
echo ""

echo "5. Testing /api/workouts/ endpoint..."
curl -s -X GET "$BASE_URL/api/workouts/" | python -m json.tool
echo ""
echo ""

echo "6. Testing /api/leaderboard/ endpoint..."
curl -s -X GET "$BASE_URL/api/leaderboard/" | python -m json.tool
echo ""
echo ""

echo "================================"
echo "API Tests Complete!"
echo "================================"
