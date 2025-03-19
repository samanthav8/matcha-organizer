# Matcha Organizer
Matcha Organizer is a full-stack web application that allows users to add, manage, store, and organize their matcha collection. The project uses Flask for the backend and React for the frontend.

## Features

-User Authentication using Flask-Login (Login, Logout, and Signup)
-Add, Edit, and Delete Matchas
-View Matchas Organized by Brand
-View Matcha Organized by Grade
-View Matcha Details


---

## Installation

Backend Setup
1. Clone the repository: git clone git@github.com:samanthav8/matcha-organizer.git
2. In your terminal, navigate to the server directory and run
```bash
pipenv install && pipenv shell
```
3.Start the Flask server by running
```bash
python app.py
```

The backend will be available at http://localhost:5555.

Frontend Setup
1.In a new terminal, navigate to the client directory
2. Install dependencies by running
```bash
npm install
```
3.Start the React development server by running
```bash
npm start
```
The frontend will be available at http://localhost:3000.

 Both servers should now be running and the front end will make API requests to the backend.

##Usage
1.Initalize the database. Navigate to the server directory and run
```bash
flask db init
```
This will create the migration folders. 
2. Run migrations
Run the following to apply the migrations and set up the database
```bash
flask db upgrade head
```
3. Seed the data base by adding some initial data. 
```bash
python seed.py
```
##API Routes
-Authentication
POST `/login` - Log in a user
DELETE `/logout` - Log out a user
GET `/check_session` - Check if a user is logged in
-Users
POST `/users` - Register a new user

-Matchas
POST `/matchas` - Add a new matcha entry
GET `/matchas/<id>` - Get a specific matcha entry
PATCH `/matchas/<id>` - Update a matcha entry
DELETE `/matchas/<id>` - Delete a matcha entry

-Brands
GET `/brands` - Get all brands
POST `/brands` - Add a new brand

-Grades
GET `/grades` - Get all grades
POST `/grades` - Add a new grade

##Technologies Used
-Backend:
Python
Flask
Flask-Login
SQLAlchemy

-Frontend:
React
Context 
React Router

##Resources
https://flask-login.readthedocs.io/en/latest/
FlatIron School Coursework
