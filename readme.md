## SF Movies ##

### DEVELOPMENT TOOLS ###

- Nodejs v18.3.0
- Heroku

### DOMAIN ###

- https://sfmovie-1.herokuapp.com/

### HOW TO USE ###

- RUN `npm install`
- RUN `npm run dev` and open `http://localhost:3000`
- To re-generate locations.geojson, RUN `npm run generate-geo-code`


### PROPLEM ###

- Display all films locations on map
- Filter the view using autocompletion search

### SOLUTION ###

- Having a cronjob to generate all locations from API https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am
    - This data will be saved in the src/public/data/locations.geojson
    - The cronjob will run `npm run generate-geo-code` daily
- Using OpenLayer to display all films locations on mapb based on locations.geojson file
- Using OpenLayer extension: Search feature control http://viglino.github.io/ol-ext/examples/search/map.control.searchfeature.html to filter locations on map


### REASON ###

- In this solution, The client can see and filter all locations quickly

### UNFINISHED ###

- Can not generate geo code on herokuapp