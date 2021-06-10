import { getSelected, setMultiple, setSelected } from "../state/state-manager";
import { eventHl } from "./events-handler";

class ToggleState {
    constructor() {}


    removeClass(e, items) {
        for (const sideNavItem of items) {
            sideNavItem.classList.remove("is-active")
        }
        e.target.classList.contains("is-active")
            ? e.target.classList.remove("is-active")
            : e.target.classList.add("is-active");
    }


    dragAndSelectCard() {
        const elements = document.querySelectorAll('.card');
        ['dragstart', 'click', 'dragend'].forEach( function(evt) {
            for (const element of elements) {
                element.addEventListener(evt, eventHl.handleCardEvents, false);
            }
        });
    }


    toggleCheckBox() {
        const checkBoxElements = document.querySelectorAll('.checkbox-select');
        for (const check of checkBoxElements) {
            check.addEventListener('click', (e) => {
                if (e.target.nodeName === "LABEL") {
                    setMultiple(true);
                    if (getSelected().includes(check.parentNode.dataset.index)) {
                        let itemIndex = getSelected().indexOf(check.parentNode.dataset.index)
                        getSelected().splice(itemIndex, 1)
                    } else {
                        setSelected(check.parentNode.dataset.index)
                    }

                    check.parentNode.classList.contains("is-card-selected")
                        ? check.parentNode.classList.remove("is-card-selected")
                        : check.parentNode.classList.add("is-card-selected");
                }
            }, false)
        }
    }
}


const toggle = new ToggleState()
export { toggle }
