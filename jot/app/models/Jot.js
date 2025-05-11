import { generateId } from "../utils/GenerateId.js"

/**
 * @param {{
 * id: string;
 * title: string;
 * color: string;
 * body: string;
 * createdAt: Date;
 * updatedAt: Date;
 * }} data
 */
export class Jot {
    constructor(data) {
        this.id = generateId();
        this.title = data.title || '';
        this.color = data.color;
        this.body = data.body || "Start typing in your Jot...";
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : this.createdAt; //If there's an updated Date, use it, otherwise use the created date.
    }

    /* Getting the list of Jot on the left side of the screen */
    get listJotTemplate() {
        return /*html*/`
        <div onclick="app.JotController.setActiveJot('${this.id}')" style="border-left: 5px solid ${this.color};" class="jot-card">
            <div class="d-flex justify-content-between">
                <h3>${this.title}</h3>
                <p>${this.createdDateFormatted}</p>
            </div>
            <div>
                <p class="text-data"> ${this.listBodyFormatted}</p>
            </div>
        </div>
        `;
    }

    get activeJotTemplate() {
        return /* html */`
        <form onsubmit="app.JotController.saveActiveJot()" class="bg-card" >
            <div class="d-flex justify-content-between">
              <div style="border-left: 5px solid ${this.color};"></div>
              <div>
                <div>
                  <h2 class="text-white">${this.title}</h2>
                  <p class="text-data">Created on: ${this.createdDateFormatted}</p>
                  <p class="text-data">Last updated: ${this.updateDateFormatted}</p>
                </div>
              </div>
              <div>
                <button class="btn btn-danger" onclick="app.JotController.deleteActiveJot()">Delete</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
            <div>
              <textarea name="body" id="jot-body" class="text-white form-control "> ${this.body} </textarea>
            </div>
          </form>
        `;
    }

    // This function will make sure the body's test is not more than 50 characters in the jot list
    get listBodyFormatted() 
    {
        const charLimit = 50; // Set your character limit here
        if (this.body.length > charLimit) {
            return this.body.substring(0, charLimit) + '...';
        }
        return this.body;
    }


    // Setting the format of the date to be YYYY-MM-DD
    // get dateFormatted() {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     return this.createdAt.toLocaleDateString('en-US', options);
    // }

    get createdDateFormatted() {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return this.createdAt.toLocaleDateString('en-US', options); // 'en-GB' ensures DD/MM/YYYY format
    }

    get updateDateFormatted() {
        return this.updatedAt.toLocaleTimeString('en-US', { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })
    }

    get jotHTMLTemplate() {
        return /*html*/`
        <div class="jot-content" style="background-color: ${this.color};">
            <h3>${this.title}</h3>
            <p>${this.body}</p>
            <p class="text-data">${this.createdDateFormatted}</p>
        </div>
        `;
    }

    static get placeHolderActiveJotTemplate() {
        return /*html*/`
        <div class="d-flex justify-content-center align-items-center flex-column bg-card rounded" style="height: 100%;">
            <i class="jot-icon-large mdi mdi-notebook-outline"></i>
            <h3 class="text-white">Select a jot to view its content.</h3>
        </div>
        `;
    }   



    /* use this for character limit in the text for the list
    if (originalText.length > charLimit) {
    textElement.textContent = originalText.substring(0, charLimit) + '...';
  }
    */
}