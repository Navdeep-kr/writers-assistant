@echo off
setlocal enabledelayedexpansion
title AI Writers Assistant Studio

echo =======================================================
echo          AI Writers Assistant Suite Launcher
echo =======================================================
echo.

:: 1. Check if ports 3000 and 4000 are already active
netstat -ano | findstr ":3000 " >nul
set PORT3000_BUSY=%errorlevel%

netstat -ano | findstr ":4000 " >nul
set PORT4000_BUSY=%errorlevel%

if %PORT3000_BUSY%==0 (
  if %PORT4000_BUSY%==0 (
    echo [OK] Both Backend and Web App are ALREADY running!
    echo.
    echo   - Web Application: http://localhost:3000
    echo   - Backend & WS:    http://localhost:4000
    echo.
    echo Opening application in your browser...
    start http://localhost:3000
    goto :end
  )
)

:: 2. If node_modules does not exist, install root concurrently
if not exist "node_modules\concurrently" (
  echo [1/2] Installing runner dependencies...
  call npm install --no-package-lock
)

:: 3. Delete any accidental root lockfile to prevent Turbopack monorepo misdetection
if exist "package-lock.json" del /f /q "package-lock.json" >nul 2>&1

:: 4. Start Backend and Web App
echo [2/2] Starting Writers Assistant (Backend on :4000, Web on :3000)...
echo.
echo Application will be available at: http://localhost:3000
echo.

:: Open browser after a brief delay
start /b cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:3000"

:: Start the servers
call npm run dev

:end
echo.
pause
