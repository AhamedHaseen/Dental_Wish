@echo off
title Pushing Dental Wish to GitHub...
cd /d "%~dp0"
echo ========================================================
echo   Pushing Dr. Sidheek Fathima Hima's Website to GitHub
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] All code has been pushed to:
    echo https://github.com/AhamedHaseen/Dental_Wish
) else (
    echo.
    echo If a browser window opened, click 'Authorize' to grant GitHub access.
)
echo.
pause
