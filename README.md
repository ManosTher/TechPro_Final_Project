## Deployment

Before running the Docker command, you need to install the dependencies for Node.js in the frontend folder.

### 1. Frontend Setup:

- Navigate to the `/Tech_Pro_Final_Project/frontend` directory.
- Run the following command to install the dependencies:

npm install

markdown


### 2. Backend Setup:

- The backend already contains the `project-0.0.1-SNAPSHOT.jar` file, so there is no need to build the app.

### 3. Building and Initiating Docker Containers:

You have two options to build and initiate the Docker containers:

#### Option 1: Using Docker Compose

- In the `/Tech_Pro_Final_Project` directory, run the following command:

docker-compose up -d --build

bash


#### Option 2: Using the `boot_system.sh` Script

- In the `/Tech_Pro_Final_Project` directory, run the following command:

./boot_system.sh

arduino

- If you encounter an error running the `boot_system.sh` script, run the following command first:

chmod +x boot_system.sh

sql


**Important Note:**
If you are running the application in a virtual machine, make sure to port forward the following ports:
- Port 3000 for the frontend.
- Port 8080 for the backend.
