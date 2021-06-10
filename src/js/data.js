let folders;
let folderContent = localStorage.getItem("folderContents");

const projects = [...new Array(9).keys()];

if (folderContent) {
    folders = JSON.parse(folderContent)
} else {
    folders = [
        {
            id: 1,
            name: "All Projects",
            shortName: "all-projects",
            content: projects,
        },
        {
            id: 2,
            name: "Folder 1",
            shortName: "folder-1",
            content: [],
        },
        {
            id: 3,
            name: "Folder 2",
            shortName: "folder-2",
            content: [],
        },
        {
            id: 4,
            name: "Folder 3",
            shortName: "folder-3",
            content: [],
        }
    ]
}


export { folders }

