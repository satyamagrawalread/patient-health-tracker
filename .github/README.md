# Patient Health Tracker
- A web application to track patient's information and create Prior Authorization Requests for selected patients.
- Additional Features: Search and filter any data by text. Highlight searched text.

### Try Now: 
```
https://patient-health-tracker.vercel.app/
```
# Steps to run locally:
- Setup Backend:
```
cd tracker-backend
Add Environment Variables
npm install
npm start

Alternative:
Since a Dockerfile is created for the backend too inside the root folder. You can build a docker and run docker.
Command:
docker build -t <dockername> .
docker run -p <Port>:<Port> <dockername>

Sample Environment Variables:
MONGODB_URI = "mongodb+srv://<username>:<password>@cluster1.6qr2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3"
SECRET_KEY = patientpemake1234dsauiytrasdfg2h
PORT = 8080
```
- Setup Frontend:
```
cd tracker-frontend
Add Environment Variables
npm install
pnpm install
npm run dev

Sample EnvironmentVariables:
VITE_APP_BACKEND_URL="http://localhost:7860"
```

