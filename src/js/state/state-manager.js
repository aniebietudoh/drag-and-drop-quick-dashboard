let multiple = false;
let multipleSelected = [];


const getMultiple = () => {
    return multiple;
}

const setMultiple = (value) => {
    return multiple = value;
}

const getSelected = () => {
    return multipleSelected;
}

const setSelected = (item) => {
    multipleSelected.push(item)
}

const clearSelected = () => {
    multipleSelected = [];
}

export { getMultiple, setMultiple, getSelected, setSelected, clearSelected }