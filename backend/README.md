# SmartMine Backend

Quick start (Windows PowerShell):

1. Create and activate a virtual environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies

```powershell
pip install -r ..\requirements.txt
```

3. Run the backend

```powershell
python app.py
```

4. Seed sample data (only if DB is empty)

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:5000/api/seed
```

Notes:
- The server will create the SQLite database and tables on first run.
- Frontend pages under `frontend/` expect the backend at `http://127.0.0.1:5000`.


####################################################################################################
####################################################################################################


# SmartMine Backend

Quick start (Windows PowerShell):

1. Create and activate a virtual environment
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1