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
    {
        brightness: {
            name: 'brightness',
            value: {
                default: '1',
                min: '0.1',
                max: '2',
                units: ''
            }
        }
    },
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
    //         value: '16px 16px 20px blue',
    //     }
    // },
    {
        grayscale: {
            name: 'grayscale',
            value: {
                default: '0',
                min: '0',
                max: '100',
                units: '%'
            }
        }
    },
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
    {
        invert: {
            name: 'invert',
            value: {
                default: '0',
                min: '0',
                max: '100',
                units: '%'
            }
        }
    },
    {
        opacity: {
            name: 'opacity',
            value: {
                default: '100',
                min: '0',
                max: '100',
                units: '%'
            }
        }
    },
    {
        saturate: {
            name: 'saturate',
            value: {
                default: '100',
                min: '0',
                max: '400',
                units: '%'
            }
        }
    },
    {
        sepia: {
            name: 'sepia',
            value: {
                default: '0',
                min: '0',
                max: '100',
                units: '%'
            }
        }
    }
];

class Filter{

    constructor(parent, filterId, filterName, filterValueDefault, filterValueMin ,filterValueMax, filterValueUnit, onChange){
        this.filterId = filterId;
        this.filterName = filterName;
        this.filterValueDefault = filterValueDefault;
        this.filterValueMin = filterValueMin;
        this.filterValueMax = filterValueMax;
        this.filterValueUnit = filterValueUnit;
        this.filterUnit = filterValueUnit;
        this.onChange = onChange;

        const filterDiv = document.createElement('div');

        filterDiv.className = this.filterId + ' filterItem';

        const input = this.createInputControl(this.filterId, 'range', this.filterName, this.filterValueMin, this.filterValueMax, this.filterValueDefault);
        this.newFilter = input;
        this.newFilter.onchange = () => {
            this.onChange(this.newFilter.value, this.filterName, this.filterUnit)
        }
        const label = this.createLabel(this.filterId, this.filterId);
        this.newLabel = label;

        filterDiv.append(this.newLabel);
        filterDiv.append(this.newFilter);
        parent.append(filterDiv)
    }

    // onChange(){
    //
    //
    //     return
    //
    //
    //     // const imgStyle = img.getFilter().split(' ');
    //     // for(let j = 0; j < imgStyle.length; j++){
    //     //     const regex = new RegExp(`\^${filterObjArr[i].getFilter().name}`);
    //     //     if (regex.test(imgStyle[j])){
    //     //         imgStyle[j] = createImgStyle(filterObjArr[i]);
    //     //     }
    //     // }
    //     // return imgStyle.join(' ')
    // }

    getNewFilter(){
        return this.newFilter;
    }
    getFilter(){
        return this.filterValueDefault;
    }

    setFilterValue(newValue){
        this.newFilter.value = newValue;
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
        input.setAttribute('step', 'any');
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
    #_imageName;
    #_imageValueDefault;
    #_imageValueUnit;

    constructor(parent, imageName, imageValueDefault, imageValueUnit) {
        this.#_imageName = imageName;
        this.#_imageValueDefault = imageValueDefault;
        this.#_imageValueUnit = imageValueUnit;

        const divImg = document.createElement('div');
        parent.append(divImg)

        divImg.className = 'imgBlock';

        this.img = this.createImg('https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg', this.#_imageName, this.#_imageValueDefault, this.#_imageValueUnit);
        divImg.append(this.#getImg());

        const divBtn = document.createElement('div');
        divImg.prepend(divBtn);

        divBtn.className = 'imageBtns';

        const inputUploadImg = this.createInput('file', 'file', 'file');
        const downloadBtn = this.createBtn();

        divBtn.append(inputUploadImg);
        divBtn.append(downloadBtn);

        inputUploadImg.onchange = () => {
            let preview = this.#getImg();
            let file = inputUploadImg.files[0];
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
    }

    update(value, name, unit){
        let imgStyle = this.getFilter().split(' ');
        for(let j = 0; j < imgStyle.length; j++){
            const regex = new RegExp(`\^${name}`);
            if (regex.test(imgStyle[j])){
                imgStyle[j] = `${name}(${value}${unit})`;
            }
        }
        this.#getImg().style.filter = imgStyle.join(' ')
    }

    getFilter(){
        return this.#getImg().style.filter
    }
    #getImg(){
        return this.img;
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
    createBtn(){
        const newBtn = document.createElement('a');
        newBtn.setAttribute('href', 'https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg')
        newBtn.setAttribute('download', '')
        newBtn.textContent = 'download img';
        newBtn.className = 'downloadImg';

        return newBtn
    }
    //----------------------------------------------
}

/**
 *
 * @param {Array} filters
 * @returns {*[]}
 */
function getStylesArr(filters){
    const imageId = [];
    const imageName = [];
    const imageValueDefault = [];
    const imageValueMin = [];
    const imageValueMax = [];
    const imageValueUnit = [];
    for(let i = 0; i < filters.length; i++){
        for (let key in filters[i]) {
            imageId.push(key);
            imageName.push(filters[i][key].name)
            imageValueDefault.push(filters[i][key].value.default)
            imageValueMin.push(filters[i][key].value.min)
            imageValueMax.push(filters[i][key].value.max)
            imageValueUnit.push(filters[i][key].value.units)
        }
    }
    return [imageId, imageName, imageValueDefault, imageValueMin ,imageValueMax, imageValueUnit];
}

/**
 *
 * @param {Array} filterObjArr
 * @returns {string}
 */
function createImgStyle(filterObjArr){
    const name = filterObjArr.getFilter().name;
    const value = filterObjArr.getFilter().value;
    const unit = filterObjArr.getFilterUnit();
    const styleStr = `${name}(${value}${unit})`;

    return styleStr;
}

/**
 *
 * @param {HTMLElement} parent
 */
function createElements(parent){
    const filterDiv = document.createElement('div');
    parent.append(filterDiv);
    filterDiv.className = 'filters';

    const [imageId, imageName, imageValueDefault, imageValueMin ,imageValueMax, imageValueUnit] = getStylesArr(filters);

    const filterObjArr = [];
    filters.forEach((item, i, arr) => {
        const newFilter = new Filter(filterDiv, imageId[i], imageName[i], imageValueDefault[i], imageValueMin[i], imageValueMax[i],
            imageValueUnit[i], (value, name, unit) => {
            img.update(value, name, unit);
        });
        filterObjArr.push(newFilter);
    });

    const img = new Image(parent, imageName, imageValueDefault, imageValueUnit);
}
createElements(document.body);