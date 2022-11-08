import { getLocation } from "./utils/utils";

import { v4 as uuidv4 } from 'uuid';
import * as fs from "fs"

async function generate_geo_code() {
    const data = await fetch('https://data.sfgov.org/resource/yitu-d5am.json');
    let films = await data.json();
    const promises = [];
    
    const locations = await Promise.all(films.slice(0, 10).map(async (f: any) => {
        if (f.locations !== undefined) {
            try {
                const uuid = uuidv4();
                await getLocation(`https://nominatim.openstreetmap.org/search?q=${f.locations}&format=json&addressdetails=1&limit=1`, uuid)
                const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
                await delay(10000)
                if (!fs.existsSync(`./src/public/json/${uuid}.json`)) { 
                    console.log('file not found');
                    return undefined;
                }
                const data = await fs.readFileSync(`./src/public/json/${uuid}.json`, { encoding: 'utf8' });
                const json = JSON.parse(data);
                fs.unlinkSync(`./src/public/json/${uuid}.json`);
                if (!json.length) {
                    return undefined;
                }
                
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            +json[0]['lon'],
                            +json[0]['lat'],
                        ]
                    },
                    properties: {
                        ...f
                    }
                    
                }
            } catch (e) {
                console.error(e, 'asdasdasd');
                return null
              }
        }
    }));
    await writeCache(locations);
}

async function writeCache(locations: any) {
    if (fs.existsSync(`./src/public/data/locations.geojson`)) { 
        fs.unlinkSync(`./src/public/data/locations.geojson`);
    }

    let json = {
        type: "FeatureCollection",
        features: [...locations.filter((l: any) => l)]
    }

    fs.writeFile(`./src/public/data/locations.geojson`, JSON.stringify(json), (err: any) => {
        if (err) {
          console.error(err);
        }
      });
}

generate_geo_code();