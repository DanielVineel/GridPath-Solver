# GridPath Solver – Interactive Grid Pathfinding Tool

A Flask-based web application and desktop software that finds the optimal path
between a start point and an end point in a grid with obstacles (walls).

Users can:
- Select grid size
- Choose start and end points
- Mark walls by clicking grid cells
- Send the grid data to backend
- Receive and visualize the optimal path

The same codebase works as:
- 🌐 A deployed website
- 🖥️ A desktop application (.exe)

---

## 🔧 Tech Stack

- Backend: Python, Flask
- Frontend: HTML, CSS, JavaScript
- Algorithm: BFS (current)
- Packaging: PyInstaller
- Deployment: Gunicorn + Render 
---

## 📁 Project Structure
mage_solver/
│
├── mage_solver/
│ ├── app.py # Flask app factory
│ ├── routes.py # Page routes and API endpoints
│ ├── solver.py # Path-finding logic (BFS)
│ ├── utils.py # Helper / reusable functions
│ ├── config.py # App configuration
│ ├── templates/ # HTML files
│ └── static/ # CSS, JS, images
│
├── run.py # Application entry point
├── requirements.txt
├── Procfile
└── README.md


---

## ▶️ Run Locally

```bash
pip install -r requirements.txt
python run.py


Open - http://127.0.0.1:5000
```
##  Author
-- G Daniel Vineel