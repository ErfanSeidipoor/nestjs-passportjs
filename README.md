# nestjs-passwordjs-google-discord-jwt-local

This project is designed to demonstrate the implementation of OAuth2 authentication with Google and Discord in a web application. It consists of two parts: a backend built with NestJS and a frontend developed using React. The backend uses various libraries, including TypeORM, PassportJS, and JWT for authentication, while the frontend communicates with the backend using Axios.

## Getting Started
### Prerequisites

Before you begin, ensure you have the following software and tools installed:
-   Node.js and npm or yarn
-   PostgreSQL
 
### Obtaining Google and Discord Credentials

To enable OAuth2 authentication with Google and Discord, you 
need to obtain API credentials for each service.

#### Google Credentials
1- Go to the Google Developers Console.<br />
2- Create a new project or select an existing one.<br />
3- In the project dashboard, navigate to "APIs & Services" > "Credentials."<br />
4- Click on "Create Credentials" and choose "OAuth client ID."<br />
5- Select "Web application" as the application type.<br />
6- Enter a name for your OAuth client.<br />
7- Add authorized redirect URIs (e.g.,http://localhost:5000/auth/google/callback).
8-Note the Client ID and Client Secret.


#### Discord Credentials
1- Visit the Discord Developer Portal.<br />
2- Click on "New Application" and give your application a name.<br />
3- Go to the "OAuth2" section.<br />
4- Under "Redirects," add a redirect URL (e.g., http://localhost:5000/auth/discord/callback).<br />
5- Save the changes, and in the "OAuth2" section, you'll find your Client ID and Client Secret.<br />

## Configuration
In the project's root directory, create a `/back/.env` file and add the following environment variables with the credentials you obtained:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
TYPEORM_HOST=your-database-host
TYPEORM_USERNAME=your-database-username
TYPEORM_PASSWORD=your-database-password
TYPEORM_DATABASE=your-database-name
TYPEORM_PORT=your-database-port
JWT_SECRET=your-jwt-secret
SERVER_URL=your-server-url
DISCORD_CLIENT_SECRET=your-discord-client-secret
DISCORD_CLIENT_ID=your-discord-client-id
```
