import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";

class JotService {

    setActiveJot(jotId) {
        const selectJot = AppState.jots.find(j => j.id === jotId);
        console.log('Setting active jot to:', selectJot);
        AppState.activeJot = selectJot;
        console.log('Active Jot:', AppState.activeJot);
    }

    saveJot()
    {
        const jots = AppState.jots;
        const jotsString = JSON.stringify(jots);
        localStorage.setItem('jots', jotsString);
    }

    loadJots()
    {
        console.log('Loading jots from local storage');
        const jotsString = localStorage.getItem('jots');
        if (jotsString) {
            const jots = JSON.parse(jotsString);
            AppState.jots = jots.map(j => new Jot(j));
        }
    }

    createJot(jotData) {
        const newJot = new Jot(jotData);
        AppState.jots.push(newJot);
        this.saveJot();
    }

    saveActiveJot(jotBody) {
        const activeJot = AppState.activeJot;
        activeJot.body = jotBody;
        activeJot.updatedAt = new Date();

        this.saveJot();
        AppState.activeJot = null;
        AppState.emit('jots');
    }

    deleteActiveJot() {
        const activeJot = AppState.activeJot;
        const index = AppState.jots.findIndex(j => j.id === activeJot.id);
        if (index !== -1) {
            AppState.jots.splice(index, 1);
            AppState.activeJot = null;
            this.saveJot();
        } 
        else {
            console.error(`Jot with id ${activeJot.id} not found`);
        }
    }
}

export const jotService = new JotService();