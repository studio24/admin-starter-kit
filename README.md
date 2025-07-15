# Admin Starter Kit

A starter kit for the front-end of admin interfaces.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### In this document

* [Site URLs](#site-urls)
* [Installing](#installing)
* [Making changes](#making-changes)
* [Built with](#built-with)
* [Credits](#credits)

## Site URLs

### Development
* https://admin-starter-kit.ddev.site/

## Installing

### Requirements

- PHP 8.4
- [DDEV](https://ddev.com) v1.24+
- Node (see .nvmrc file for LTS version)
- [NPM](https://www.npmjs.com/)
- [NVM](https://github.com/creationix/nvm)

### Installing locally

A step-by-step set of instructions that tell you how to get your local dev environment running.

Clone repo:

````bash
git clone git@github.com:studio24/admin-starter-kit.git
````

Setup DDEV:

```bash
# may take a while to run for the first time
ddev start

# launch the site in the browser
ddev launch
```

Install project dependencies:

````bash
# Switch your version of Node to the correct version for this project (see `.nvmrc`)
ddev nvm use

ddev npm install
````

Build front-end assets:

````bash
ddev npm run build
````

Watch for changes:

````bash
ddev npm run watch
````

## Making changes

To make changes to code first work on a branch and create a Pull Request to merge changes into the `main` branch.

## Built with

- [Amplify](https://amplify.studio24.net/amplify/) - Front-end starter kit

## Credits

- **Nicola Saunders** - *Front End Lead Developer* - Studio 24