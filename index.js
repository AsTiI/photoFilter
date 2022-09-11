const filters = [
    {
        blur: {
            name: 'blur',
            value: '5px'
        }
    },
    {
        brightness: {
            name: 'brightness',
            value: '0.4'
        }
    },
    {
        contrast: {
            name: 'contrast',
            value: '200%'
        }
    },
    {
        dropShadow: {
            name: 'drop-shadow',
            value: '16px 16px 20px blue'
        }
    },
    {
        grayscale: {
            name: 'grayscale',
            value: '50%'
        }
    },
    {
        hueRotate: {
            name: 'hue-rotate',
            value: '90deg'
        }
    },
    {
        invert: {
            name: 'invert',
            value: '75%'
        }
    },
    {
        opacity: {
            name: 'opacity',
            value: '25%'
        }
    },
    {
        saturate: {
            name: 'saturate',
            value: '30%'
        }
    },
    {
        sepia: {
            name: 'sepia',
            value: '60%'
        }
    }
];

class Filter{
    constructor(item, parent){
        let filterId = '';
        let filterName = '';
        let filterValue = '';
        for (let key in item) {
            filterId = key.toString();
            filterName = item[key].name;
            filterValue = item[key].value;
        }
        const filterDiv = document.createElement('div');
        filterDiv.className = filterId;
        this.node = filterDiv;

        const input = this.createInputControl(filterId, 'range', filterName, '0', '200',filterValue);
        const label = this.createLabel(filterId, filterId);
        filterDiv.append(label);
        filterDiv.append(input);
        parent.append(filterDiv);

    }
    createInputControl(id, type, name, min, max, value){
        const input = document.createElement('input');
        input.setAttribute('id', id);
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('min', min);
        input.setAttribute('max', max);
        input.setAttribute('value', value);
        return input;
    }
    createLabel(name, text){
        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = text;
        return label;
    }
}
function createElements(parent){

    filters.forEach((item, i, arr)=>{
        new Filter(item, parent)
    })
}
createElements(document.body)

