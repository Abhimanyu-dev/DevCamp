# Inter IIT dev BOOTCAMP SCREENING TASK

## Getting the server started
1. Clone the repository
``` bash
git clone https://github.com/Abhimanyu-dev/DevCamp.git
```
2. Go into the backend directory
```bash
cd DevCamp
cd backend
```
3. Create an env file and paste the following in it
```
MONGOURL = "mongodb+srv://abhi:abhi@cluster0.mojdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT = 5000
```
4. Type the following commands in the terminal
```bash 
npm install
node ./index.js
```
This will start the backend server written in express with mongo db. You can test the routes and websocket using postman. Available routes:
1. localhost:5000/api/stocks/:ticker/:date : This fetches data for a particular stock(ticker) for a particular date
2. localhost:5000/api/stocks/:ticker : This fetches all the for a particular stock.
3. localhost:5000/api/stocks : This fetches all the data from the database

## Getting the frontend running
1. Go into the directory where you cloned the repo and then go into the frontend directory.
```bash 
cd frontend
```
2. Run the following command
```bash 
npm install
npm run dev
```
3. You can visit the page on http://localhost:5173

The frontend is not completed but it is able to connect to the backend server socket and display some data.