# Planning-Poker

## Why

Planning-Poker is a web app to facilitate User Story estimation meetings.
All team members can connect to a planning poker session and vote on the complexity of each ticket. No logging is required and the votes are anonymous. All session state is stored between clients, nothing is persisted to the server.
Build to work on mobile and desktop.

## How

Overview over the techniques \ technologies behind the application.

### Client

-   Single Page application build with [Angular](https://angular.io/)
-   Styling is done with the CSS framework [Bulma](https://bulma.io/)
-   [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_applications) which uses a service worker for caching and can be installed to the home screen on mobile
-   Uses "naive" server side rendering to decrease perceived load time. The index.html file contains the same markup as the loaded SPA will produce. Once it is loaded the static version is hidden and replaced by the dynamic one.

### Server

-   Deployed on [Heroku](https://www.heroku.com/)
-   Not a REST Api, instead uses websockets ([socket.io](https://socket.io/)) for real time communication. Acts as a relay between all clients of the same session
-   Stateless except the connection state of the sockets, all application state is shared between the clients
-   No user data is persisted, there is no database involved
-   Servers the static assets of the single page application **only** over https
-   The assets are compressed with gzip
