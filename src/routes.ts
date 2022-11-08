import * as express from "express";
export const register = (app: express.Application) => {
    // home page    
    app.get("/", async (req: any, res) => { 
        res.render("index");    
    });

    app.get("/locations", async (req: any, res) => { 
        const data = await fetch('https://data.sfgov.org/resource/yitu-d5am.json');
        const films = await data.json();
        const locations = films.map((f: any) => {
            if (f.locations !== undefined) {
                return f.locations;
            }
        });
        console.log(locations)
        res.send(locations.filter((l: any) => l));    
    });
};