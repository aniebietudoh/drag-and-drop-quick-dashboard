import './styles/main.scss';

import { eventHl } from "./js/utils/events-handler";
import { allProject } from "./js/components/project";
import { navigation } from "./js/components/navigation";


window.addEventListener('DOMContentLoaded', (event) => {
    navigation.generateNav();
    allProject.showAllProjects();
    eventHl.addEventsToNav();
});

