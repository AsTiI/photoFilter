const filters = [
    {
        blur: {
            name: 'blur',
            value: {
                default: '0',
                min: '0',
                max: '25',
                units: 'px'
            }
        }
    },
    // {
    //     brightness: {
    //         name: 'brightness',
    //         value: {
    //             default: '0.4',
    //             min: '0',
    //             max: '1'
    //         }
    //     }
    // },
    {
        contrast: {
            name: 'contrast',
            value: {
                default: '100',
                min: '10',
                max: '200',
                units: '%'
            }
        }
    },
    // {
    //     dropShadow: {
    //         name: 'drop-shadow',
    //         value: '16px 16px 20px blue'
    //     }
    // },
    // {
    //     grayscale: {
    //         name: 'grayscale',
    //         value: '50%'
    //     }
    // },
    {
        hueRotate: {
            name: 'hue-rotate',
            value: {
                default: '0',
                min: '0',
                max: '360',
                units: 'deg'
            }
        }
    },
    // {
    //     invert: {
    //         name: 'invert',
    //         value: '75%'
    //     }
    // },
    // {
    //     opacity: {
    //         name: 'opacity',
    //         value: {
    //             default: '0%',
    //             min: '0%',
    //             max: '100%'
    //         }
    //     }
    // },
    // {
    //     saturate: {
    //         name: 'saturate',
    //         value: '30%'
    //     }
    // },
    // {
    //     sepia: {
    //         name: 'sepia',
    //         value: '60%'
    //     }
    // }
];

class Filter{
    /**
     *
     * @param {Object} item
     */
    constructor(item){
        let filterId = '';
        let filterName = '';
        let filterValueDefault = '';
        let filterValueMin = '';
        let filterValueMax = '';
        let filterValueUnit = '';
        for (let key in item) {
            filterId = key.toString();
            filterName = item[key].name;
            for (let keyValue in item[key]){

                filterValueDefault = item[key][keyValue].default;
                filterValueMin = item[key][keyValue].min;
                filterValueMax = item[key][keyValue].max;
                filterValueUnit = item[key][keyValue].units;

            }

        }

        this.filterUnit = filterValueUnit;

        const filterDiv = document.createElement('div');

        this.node = filterDiv;

        filterDiv.className = filterId + ' filterItem';

        const input = this.createInputControl(filterId, 'range', filterName, filterValueMin, filterValueMax, filterValueDefault);
        this.newFilter = input;
        const label = this.createLabel(filterId, filterId);
        this.newLabel = label;
        filterDiv.append(label);
        filterDiv.append(input);

    }
    getLabel(){
        return this.newLabel;
    }
    getFilter(){
        return this.newFilter;
    }
    getFilterUnit(){
        return this.filterUnit
    }


    /**
     *
     * @param {String} id
     * @param {String} type
     * @param {String} name
     * @param {String} min
     * @param {String} max
     * @param {String} value
     * @returns {HTMLInputElement}
     */
    createInputControl(id, type, name, min, max, defaultValue){
        const input = document.createElement('input');
        input.setAttribute('id', id);
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('min', min);
        input.setAttribute('max', max);
        input.setAttribute('value', defaultValue);
        return input;
    }

    /**
     *
     * @param {String} name
     * @param {String} text
     * @returns {HTMLLabelElement}
     */
    createLabel(name, text){
        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = text;
        return label;
    }
}

class Image{
    constructor(filters) {

        let imageName = [];
        let imageValueDefault = [];
        let imageValueUnit = [];
        for(let i = 0; i < filters.length; i++){
            for (let key in filters[i]) {
                imageName.push(filters[i][key].name)
                imageValueDefault.push(filters[i][key].value.default)
                imageValueUnit.push(filters[i][key].value.units)
            }
        }

        this.src = 'https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg';
        const divImg = document.createElement('div');
        this.template = divImg;
        divImg.className = 'imgBlock';
        const newImg = this.createImg(this.src, imageName, imageValueDefault, imageValueUnit);
        this.img = newImg;
        divImg.append(newImg);
        const divBtn = document.createElement('div');
        divBtn.className = 'imageBtns';
        divImg.prepend(divBtn);

        const inputUploadImg = this.createInput('file', 'file', 'file');
        inputUploadImg.onchange = () => {
            let preview = newImg;
            let file = inputUploadImg.files[0];
            console.log(file)
            let reader = new FileReader(file);

            reader.onloadend = () => {
                preview.src = reader.result;
                downloadBtn.href = preview.src;
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = "https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg";
            }
        }
        divBtn.append(inputUploadImg);

        const downloadBtn = this.createBtn('https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg');

        divBtn.append(downloadBtn);
    }

    getImg(){
        return this.img;
    }
    getTemplate(){
        return this.template;
    }

    /**
     *
     * @param {String} id
     * @param {String} type
     * @param {String} name
     * @returns {HTMLInputElement}
     */
    createInput(id, type, name){
        const newInput = document.createElement('input');
        newInput.setAttribute('id', id);
        newInput.setAttribute('type', type);
        newInput.setAttribute('name', name);
        return newInput
    }

    /**
     *
     * @param {String} src
     * @param {Array} imageName
     * @param {Array} imageValueDefault
     * @param {Array} imageValueUnit
     * @returns {HTMLImageElement}
     */
    createImg(src, imageName, imageValueDefault, imageValueUnit){
        const newImg = document.createElement('img');
        newImg.src = src;
        newImg.setAttribute('alt', 'broken');
        newImg.className = 'myImg';
        let styles = []
        for(let i = 0; i < imageName.length; i++){
            styles.push(`${imageName[i]}(${imageValueDefault[i]}${imageValueUnit[i]})`);
        }
        newImg.style.filter = styles.join(' ');

        return newImg;
    }

    //-------------------------переделать с ссылки на кнопку---------------------
    /**
     *
     * @param {String} src
     * @returns {HTMLAnchorElement}
     */
    createBtn(src){
        const newBtn = document.createElement('a');
        newBtn.setAttribute('href', src)
        newBtn.setAttribute('download', '')
        newBtn.textContent = 'download img';
        newBtn.className = 'downloadImg';

        return newBtn
    }
    //----------------------------------------------
}

/**
 *
 * @param {HTMLElement} parent
 */

function createElements(parent){
    const div = document.createElement('div');
    parent.append(div);
    div.className = 'filters';

    const filter = [];
    filters.forEach((item, i, arr) => {
        const newFilter = new Filter(item);
        filter.push(newFilter);
        filter.push(newFilter);
    });

    for(let i = 0; i < filter.length; i++){
        div.append(filter[i].getLabel());
        div.append(filter[i].getFilter());
    }
    const img = new Image(filters);
    parent.append(img.getTemplate());
    for (let i = 1; i < filter.length; i+=2) {
        filter[i].getFilter().onchange = () => {

            let imgStyle = img.getImg().style.filter.split(' ');
            for(let j = 0; j < imgStyle.length; j++){
                const regex = new RegExp(`\^${filter[i].getFilter().name}`);
                console.log(filter[i].getFilter().name)

                if (regex.test(imgStyle[j])){
                    imgStyle[j] = `${filter[i].getFilter().name}(${filter[i].getFilter().value}${filter[i].getFilterUnit()})`;
                    console.log(imgStyle[j])
                    console.log('новые стили: ' + imgStyle[j])
                }
            }
            img.getImg().style.filter = imgStyle.join(' ');
        }
    }
}
createElements(document.body)

