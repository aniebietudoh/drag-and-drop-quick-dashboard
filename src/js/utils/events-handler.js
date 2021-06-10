import { folders } from "../data";
import { clearSelected, getMultiple, getSelected } from "../state/state-manager";

class EventsHandler {
    constructor() {}

    handleDropEvents(e) {
        e.preventDefault();
        e.target.classList.remove("is-highlighted");

        const folderId = e.target.id;
        let data = e.dataTransfer.getData("text/html");

        for (let valueKey of folders) {
            if (e.target.id === 'all-projects') {
                return false;
            }
            if (valueKey.shortName === folderId) {
                if (getMultiple() === true) {
                    getSelected().forEach(item => valueKey.content.push(parseInt(item)))
                } else {
                    valueKey.content.push(parseInt(data))
                }
            }
        }
        clearSelected();
    }


    handleDragEvents(e) {
        e.preventDefault();
        if (e.type === 'dragleave') {
            e.target.classList.remove("is-highlighted");
        }

        return e.type === 'dragover'
            ? e.target.classList.add("is-highlighted")
            : e.type === 'drop' ? eventHl.handleDropEvents(e) : console.log('')
    };


    addEventsToNav() {
        const elementDrop = document.querySelectorAll('.drop-space');
        ['drop', 'dragover', 'dragenter', 'dragleave']
            .forEach( function(evt) {
                for (const element of elementDrop) {
                        element.addEventListener(evt, eventHl.handleDragEvents, false);
                    }
                });
    }


    handleCardEvents(e) {
        return e.type === 'dragstart' ? eventHl.handleDragSelected(e) : eventHl.handleClickSelected(e);
    }


    handleDragSelected(e) {
        e.dataTransfer.effectAllowed='copy';
        const image = document.getElementById("dragImage");
        document.getElementById("copy-no").innerText = `1`;

        if (getMultiple()) {
            document.getElementById("copy-no").innerText = `${getSelected().length}`;
        }
        e.dataTransfer.setDragImage(image, 10, 40);
        e.dataTransfer.setData("text/html", e.target.dataset.index);
        return true;
    }


    handleClickSelected(e) {
        const elements = document.querySelectorAll('.card');
        for (const item of elements) {
            item.classList.remove("is-selected")
        }

        e.target.classList.contains("is-selected")
            ? e.target.classList.remove("is-selected")
            : e.target.classList.add("is-selected");
    }
}


const eventHl = new EventsHandler()
export { eventHl }
