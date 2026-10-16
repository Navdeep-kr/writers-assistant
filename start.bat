@echo off
echo =======================================================
echo          AI Writing Assistant Suite Launcher
echo =======================================================

echo.
echo [1/3] Checking dependencies...
call npm install
if %errorlevel% neq 0 (
  echo Failed to install root dependencies.
  pause
  exit /b %errorlevel%
)

echo.
echo [2/3] Installing sub-project dependencies (might take a while on first run)...
call npm run install:all
if %errorlevel% neq 0 (
  echo Failed to install sub-project dependencies.
  pause
  exit /b %errorlevel%
)

echo.
echo [3/3] Starting all services (Backend, Web App, Mobile App, Extension)...
echo Note: The extension will be built to /extension/build/chrome-mv3-dev
echo.
call npm run dev

pause
