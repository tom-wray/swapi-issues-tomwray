# Jira SWAPI Character Issue Creator

This project contains a Forge app written in Javascript for a job interview. The briefing provided was summarised with the below:

> This task involves building a small Forge (React) app that can fetch character data from the Star Wars API (SWAPI) and should allow the user to create a JIRA ticket containing character details.

[SWAPI](https://swapi.dev) is the Star Wars API, which provides data about the Star Wars universe.

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

- Install [Node.js](https://nodejs.org/en/)
- See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

-   Clone the repository

-   Install top-level dependencies:

```
npm install
```

-   Install dependencies inside of the `static/character-panel` directory:

```
cd static/character-panel
npm install
```

-   Modify the app by editing the files in `static/character-panel/src/`.

-   Build the app (inside of the `static/character-panel` directory):

```
npm run build
```

-   Deploy the app by running:

```
forge deploy
```

-   Install the app in an Atlassian site by running:

```
forge install
```

### Testing

To run the tests for the components, use the following command inside the `static/character-panel` directory:

```
npm run test
```

### Notes

-   Use the `forge deploy` command when you want to persist code changes.
-   Use the `forge install` command when you want to install the app on a new site.
-   Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.
