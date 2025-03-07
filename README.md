# barcelonatips

## Introduction
Barcelonatips is a Single Page Application built with React and using integrations from Google Maps and Places API.

This SPA has been built as a final project at [IronHack WebDev Bootcamp](https://lp.ironhack.com/en/web-development/spain).

The backend used is buils in node.js using MongoDB. [Read more about the backend here.](https://github.com/sven-andersson-es/bcntips-server)  

## Function
[Barcelonatips](https://barcelonatips.netlify.app/) can be tried out on the hosted test version on Netlify. The basic idea is to provide a simple interface for sharing personal tips for Food, Coffee and Cafés suited for work plus some nice spots to visit as in "Things to do". 

The admin interface for logged in admins uses Google Places API for a quick start filling out the location data and Google Links. Then the personal touch is added with a description and the fact that the tips is selected.

## Technologies
Barcelonatips is built using React, Axios, Google Maps API and Google Places API. The backend is built in Node.js and uses MongoDB as a Database. The backend provides all the neccesary CRUD endpoints to make the Frontend application work. The backend also includes an image upload endpoint using Cloudinary image storage service.

## Development process
The development has been undertaken as a single person project. The steps to finish the work are presented below. For the task management and planning of features in the application, GitHubs issues project tool has been used.

1. Hi fidelity UI designs in Figma.
1. Planning of needed DB Schemas for the MongoDB database.
1. Development of the Backend in Node and needed API Routes.
1. Development of the Frontend application in React
1. In parallell with the Frontend development the Backend has been slightly modified to adapt to new requirements.

## Backlog
- Filtering function for the Barcelona districts (Barrios)
- Improve error handling for all CRUD operations, includes improving backend.
- Dynamically adapting the map boundaries based on the filtering.
- Favourites filter.