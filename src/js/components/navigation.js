import {folders} from "../data";
import {toggle} from "../utils/toggle-state";
import {allProject} from "./project";

const dummyProjects = folders[0].content;
let sideNavElements;



class Navigation {
    constructor() {}

    generateNav() {
        const navElement = document.getElementById('navigation')
        for (const folder of folders) {
            const navTemplate = `<li class="drop-space side-nav" id="${folder.shortName}">
                            ${folder.name}
                         </li>`;
            navElement.insertAdjacentHTML("beforeend", navTemplate)
        }

        sideNavElements = document.querySelectorAll('.side-nav');
        for (const sideNav of sideNavElements) {
            sideNav.classList.remove("is-active")
            sideNav.addEventListener('click', navigation.showFolderProjects, false);
        }
    }


    showFolderProjects(e) {
        let filteredProjects;
        const contentCards = document.getElementById('content-cards');

        localStorage.setItem("folderContents", JSON.stringify(folders))

        for (let content of folders) {
            if (content.shortName === e.target.id) {
                filteredProjects = [...new Set(content.content)];
            }
        }

        if (e.target.id === 'all-projects') {
            toggle.removeClass(e, sideNavElements)
            allProject.showAllProjects();

        } else {
            contentCards.innerHTML = '';
            e.preventDefault();
            for (const pro of dummyProjects) {
                for (let folderItem of filteredProjects) {
                    if (folderItem === pro) {
                        const filteredCardTemplate = `<div class="card" draggable="true" data-index="${pro}">
                              <p class="is-v-centered">${pro}</p>
                              <div class="checkboxOverride checkbox-select">
                                 <input type="checkbox" id='${pro}'>
                                 <label for='${pro}'></label>
                               </div>
                          </div> `;
                        contentCards.insertAdjacentHTML("beforeend", filteredCardTemplate);
                    }
                }
            }
            toggle.dragAndSelectCard();
            toggle.toggleCheckBox();

            return e.target.classList.contains("is-active")
                ? e.target.classList.remove("is-active")
                : toggle.removeClass(e, sideNavElements);
        }
    }

}

const navigation = new Navigation()

export { navigation }