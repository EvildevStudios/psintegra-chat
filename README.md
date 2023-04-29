# Psintegra Psychological Clinic

This git repository contains the code for a web application developed for Psintegra Psychological Clinic. The application has two main components:

- A React-based client-side application located in the `/Client` folder.
- An Express-based server-side application located in the `/Server` folder.

The client and server communicate through RESTful APIs, allowing the client to interact with the server to manage the clinic's data and provide a personalized chat feature for patients.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies for the client and server. From the root directory of the project, run the following commands:

   ```
   cd client
   npm install
   
   cd ../Server
   npm install
   ```

3. Set up the necessary environment variables. Copy the `.env.example` files in both the `client` and `server` directories, rename them to `.env`, and fill in the required values. 

   ```
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```
   
4. Start the development server. From the root directory of the project, run the following command:

   ```
   npm start
   ```

   This will start both the client-side and server-side applications in development mode.

## Client

The client-side application is built using React and Redux, and is located in the `/Client` folder. The application allows patients to schedule appointments, view their medical history, and communicate with their assigned therapist through a personalized chat feature.

The main components of the client-side application are:

- `App.jsx`: The main application component that sets up the routes and renders the layout of the application.
- `firebase.jsx`: A file that sets up the Firebase connection and exports the Firebase context.
- `pages`: A folder containing the main pages of the application, such as the home page, appointments page, and chat page.
- `components`: A folder containing the reusable components used throughout the application, such as the navigation bar, appointment form, and chat message list.
- `context`: A folder containing the React contexts used throughout the application, such as the Firebase context and the user context.
- `assets`: A folder containing the static assets used throughout the application, such as the logo and the favicon.

## Server

The server-side application is built using Express and MongoDB, and is located in the `/Server` folder. The server provides RESTful APIs to manage the clinic's data, such as patients, appointments, and therapists.

The main components of the server-side application are:

- `app.js`: The main server application file that sets up the routes, middleware, and database connection.
- `routes`: A folder containing the RESTful API routes for managing the clinic's data, such as `/engines`, and `/chat`.
- `controllers`: A folder containing the controller functions that handle the logic for each API route, such as `getEngines`, and `postChatRequest`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Clone the repository to your local machine.
3. Create a new branch for your changes.
4. Make your changes and commit them.
5. Push your changes to your forked repository.
6. Open a pull request from your forked repository to this repository.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.