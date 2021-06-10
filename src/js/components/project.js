import { folders } from "../data";
import { toggle } from "../utils/toggle-state";

const dummyProjects = folders[0].content;
const contentCards = document.getElementById('content-cards');


class Project {
    constructor() {}


    showAllProjects() {
        const firstNavItem = document.querySelector(".side-nav");

        contentCards.innerHTML = '';
        for (const project of dummyProjects) {
            const cardTemplate = `<div class="card" draggable="true" data-index="${project}">
                              <p class="is-v-centered">${project}</p>
                              <div class="checkboxOverride checkbox-select">
                                 <input type="checkbox" id='${project}'>
                                 <label for='${project}'></label>
                               </div>
                          </div> `;
            contentCards.insertAdjacentHTML("beforeend", cardTemplate);
            firstNavItem.classList.add("is-active");
        }

        toggle.dragAndSelectCard();
        toggle.toggleCheckBox();
    }
}

const allProject = new Project()
export { allProject }

