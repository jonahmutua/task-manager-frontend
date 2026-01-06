# TaskManager

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## Introduction 
This project tracks a list of tasks. Also Project demonstrates two clean aproaches for managing application state in angular based projects. 
The project make it easier to switch between the two approaches.

## Simple State Management 
TaskService class manages the Global Task State and exposes its state slices as readonly angular signals. This ensures application remain reactive as well 
as maintaining a single source of truth for application state. To use Simple State Management Inject TaskService in target component.

## Ngrx Store State Managemnt 
This uses Ngrx store  state management. To use this approache Inject TaskNgrxService class in the target component.

## Demo 
For testing  purposes, the application is configured to communicate with Angular In-Memory Web Api. This simulates application interaction with external 
world.

## Prerequisites 
Run these commands to install required dependencies 
ng add @ngrx/store@20
ng add @ngrx/effects@20
npm install angular-in-memory-web-api@0.20

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

```

