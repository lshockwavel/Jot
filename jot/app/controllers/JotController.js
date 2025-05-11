import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { jotService } from "../services/JotService.js";

export class JotController {
    constructor() {
        console.log("JotController initialized");
        jotService.loadJots();
        AppState.on('activeJot', this.drawActiveJot);
        AppState.on('jots', this.drawJots);
        this.drawJots();
        this.drawActiveJot();
    }

    /* Drawing out the list of Jots on the left side. */
    drawJots() {
        const jots = AppState.jots;
        let JotsContent = '';
        jots.forEach(jot => {
            JotsContent += jot.listJotTemplate;
        });

        const jotListElement = document.getElementById('jot-list');
        
        //If not found, log an error.
        if (!jotListElement) {
            console.error('Jot list element not found');
            return;
        }

        jotListElement.innerHTML = JotsContent;

        //Set the number of jots in the list
        const jotCountElement = document.getElementById('jot-count');
        jotCountElement.innerText = `${jots.length} ${jots.length > 1 ? 'Jots' : 'Jot'}`; //Setting the plural form of the word "Jot" based on the number of jots.
    }

    drawActiveJot() {
        const activeJot = AppState.activeJot;
        const jotContentElement = document.getElementById('jot-content');

        //If not found, log an error.
        if (activeJot == null) {
            console.log('Active jot is null');
            jotContentElement.innerHTML = Jot.placeHolderActiveJotTemplate;
        }
        else {
            console.log('Active Jot:', activeJot);
            jotContentElement.innerHTML = activeJot.activeJotTemplate;
        }

        // if (activeJot) {
        //     jotContentElement.innerHTML = activeJot.listJotTemplate;
        // } else {
        //     jotContentElement.innerHTML = '<p>Select a jot to view its content.</p>';
        // }
    }

    createJot(event) {
        event.preventDefault();
        console.log("Creating a new jot");
        const form = event.target;
        const jotData = {
            title: form.title.value,
            color: form.color.value
        };
        jotService.createJot(jotData);
        // this.drawJots();

        //Clear out the form
        form.reset();
    }

    deleteActiveJot() {
        console.log("Deleting active jot");
        const confirmed = confirm("Are you sure you want to delete this jot?");
        if (confirmed) {
            jotService.deleteActiveJot();
        }
    }

    /**
     * @param {string} jotId
     */
    setActiveJot(jotId) {
        console.log('Setting active jot to:', jotId);

        jotService.setActiveJot(jotId);


        // const jot = AppState.jots.find(j => j.id === jotId);
        // if (jot) {
        //     AppState.activeJot = jot;
        //     this.drawActiveJot();
        // } else {
        //     console.error(`Jot with id ${jotId} not found`);
        // }

        // console.log('Active Jot:', AppState.activeJot);
    }

    saveActiveJot() {
        event.preventDefault();
        console.log("saving active jot");
        const form = event.target;
        const jotBody = form.body.value;
        console.log("Jot body:", jotBody);
        jotService.saveActiveJot(jotBody);
    }

}