# Psintegra Chat - React Client

This git repository contains the code for the React-based client-side application developed for Psintegra Psychological Clinic. The application has three main routes:

- `/home`: The home page of the application.
- `/login`: The login page of the application.
- `/register`: The registration page of the application.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies. From the `/client` directory of the project, run the following command:

   ```
   npm install
   ```
   
3. Set up the necessary environment variables. Copy the `.env.example` file and rename it to `.env`, and fill in the required values. 

   ```
   cp .env.example .env
   ```
   
4. Start the development server. From the `/client` directory of the project, run the following command:

   ```
   npm start
   ```

   This will start the client-side application in development mode.

## Routes

The client-side application has three main routes:

### Home

The home page of the application located at `/home`. The main components of the home page are:

- `/src/pages/Home.jsx`: The main component that sets up the layout and renders the content of the home page.
- `/src/components`: A folder containing the reusable components used throughout the home page, such as the navigation bar, hero banner, and feature list.

### Login

The login page of the application located at `/login`. The main components of the login page are:

- `/src/pages/Login.jsx`: The main component that sets up the layout and renders the content of the login page.
- `/src/components`: A folder containing the reusable components used throughout the login page, such as the login form and navigation bar.

### Register

The registration page of the application located at `/register`. The main components of the registration page are:

- `/src/pages/Register.jsx`: The main component that sets up the layout and renders the content of the registration page.
- `/src/components`: A folder containing the reusable components used throughout the registration page, such as the registration form and navigation bar.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Clone the repository to your local machine.
3. Create a new branch for your changes.
4. Make your changes and commit them.
5. Push your changes to your forked repository.
6. Open a pull request from your forked repository to this repository.

## License

Psintegra API is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.