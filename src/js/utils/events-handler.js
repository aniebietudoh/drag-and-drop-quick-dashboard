import { folders } from "../data";
import { clearSelected, getMultiple, getSelected } from "../store/state-manager";
import { pixiPhotoSetup } from "./photo3d";

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
    };


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
    };

    addEventsToProjects() {
        const projectsCard = document.querySelectorAll('.card');
        ['drop', 'dragover'].forEach( function(evt) {
            for (const card of projectsCard) {
                card.addEventListener(evt, eventHl.handleCardDropEvents, false);
            }
        });
    };


    handleCardDropEvents(e) {
        e.preventDefault();
        return e.type === 'dragover'
            ? console.log("DragOver")
            : eventHl.handleFileDrop(e);
    };

    handleFileDrop(e) {
        if (e.dataTransfer.items) {
            let imageArray = [];
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.files[i];
                    imageArray.push(URL.createObjectURL(file));
                    const img = document.createElement("img");
                    img.file = file;
                }
            }
            console.log(imageArray)
            e.target.classList.add("is-bg-white")
            pixiPhotoSetup(e.target.childNodes[3], imageArray[0], imageArray[1]);
        }
    };




    handleCardEvents(e) {
        return e.type === 'dragstart' ? eventHl.handleDragSelected(e) : eventHl.handleClickSelected(e);
    };


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
    };


    handleClickSelected(e) {
        const elements = document.querySelectorAll('.card');
        for (const item of elements) {
            item.classList.remove("is-selected")
        }
        e.target.classList.contains("is-selected")
            ? e.target.classList.remove("is-selected")
            : e.target.classList.add("is-selected");
    };
};


const eventHl = new EventsHandler();
export { eventHl }

