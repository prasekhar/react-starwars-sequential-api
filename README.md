# React Sequential API Starwars exercise

We need to call [Starwars People API](https://swapi.dev/api/people) and pick names from API response and display them in a select box. 

Once a name is selected then we need to make sequential API calls for the fields "films", "vehicles" and "starships". 

Display all the data in separate tables. 

We need to show Table columns based on selected properties provided. This should be dynamic.

# Implementation

For Sequential API calls we need to use Promise.all(listPromises). 

Create a custom Hook which handles sequential API calls for the array of list given.

