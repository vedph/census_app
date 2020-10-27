# Census App

Quick Docker image build (after `ng build --prod`): `docker build . -t vedph2020/census-app:1.0.3 -t vedph2020/census-app:latest` (replace with the current version).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Quick Start

1. save `docker-compose.yml` into some folder on your computer. Be careful not to change its name, and be sure to download the file's content rather than the page hosting it in GitHub (you can click on the `Raw` button and then save).

2. open a terminal window in the folder where you downloaded `docker-compose.yml` and run (in Linux prefix this with `sudo`):

```bash
docker-compose up
```

Wait for the system to startup. Once the messages on the terminal window stop, you are ready to go.

3. to restore the database in the system:

   1. launch MySql Workbench;
   2. connect it to <localhost:3306> (user: `root`, password: `mysql`);
   3. create a new `census` database with this command: `CREATE SCHEMA census DEFAULT CHARACTER SET utf8 ;`
   4. download `census-data.sql` and import it into `census` from the Administration tab of MySql Workbench.

4. point your web browser to <http://localhost:4200> for the web app, or to <http://localhost:54753> for the web API.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
