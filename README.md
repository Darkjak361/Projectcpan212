Canada Weather App
Description

This is a simple weather app that shows the current weather for Canadian cities. Once you log in or sign up, you can search for the weather of any city, and the app will show the current weather, including temperature, description, and icons. You can also save your favorite city as a preferred location.
Features

    View current weather for Canadian cities.
    Log in or sign up to search for weather in any city.
    Displays hourly and weekly weather forecasts.

Installation



git clone  https://github.com/Darkjak361/Projectcpan212.git

Navigate into the project folder:

Install the required dependencies for both frontend and backend.

For the backend (in the backend folder):

cd backend
npm install

For the frontend (in the frontend folder):

    cd frontend
    npm install

Running the App

    Start the backend server:

    Go to the backend folder and run:
cd backend
node server.js

This will start the backend server on http://localhost:5000.

Start the frontend server:

Go to the frontend folder and run:
cd frontend
    npm start

    This will start the frontend on http://localhost:3000.

    Open http://localhost:3000 in your web browser, and you should be able to see the weather dashboard.

How it works

    When you first open the app, it shows the weather for several cities in Canada.
    Once you log in or sign up, you can use the search bar to search for weather in any city.

Things Used

    Frontend: React, React Router, Axios
    Backend: Node.js, Express.js, MongoDB, JWT for user authentication
