const filters = [
    {
        blur: {
            name: 'blur',
            value: {
                default: '5px',
                min: '0px',
                max: '25px'
            }
        }
    },
    {
        brightness: {
            name: 'brightness',
            value: {
                default: '0.4',
                min: '0',
                max: '1'
            }
        }
    },
    {
        contrast: {
            name: 'contrast',
            value: {
                default: '100%',
                min: '10%',
                max: '200%'
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
                default: '0deg',
                min: '0deg',
                max: '360deg'
            }
        }
    },
    // {
    //     invert: {
    //         name: 'invert',
    //         value: '75%'
    //     }
    // },
    {
        opacity: {
            name: 'opacity',
            value: {
                default: '0%',
                min: '0%',
                max: '100%'
            }
        }
    },
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
        for (let key in item) {
            filterId = key.toString();
            filterName = item[key].name;
            for (let keyValue in item[key]){
                filterValueDefault = item[key][keyValue].default;
                filterValueMin = item[key][keyValue].min;
                filterValueMax = item[key][keyValue].max;
            }

        }
        const filterDiv = document.createElement('div');
        this.node = filterDiv;

        filterDiv.className = filterId + ' filterItem';

        const input = this.createInputControl(filterId, 'range', filterName, filterValueMin, filterValueMax, filterValueDefault);
        input.onchange = () => {

        }
        const label = this.createLabel(filterId, filterId);
        filterDiv.append(label);
        filterDiv.append(input);
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
    constructor(src) {
        this.src = src;
        const divImg = document.createElement('div');
        this.node = divImg;

        divImg.className = 'imgBlock'
        this.img = this.createImg(this.src);
        divImg.append(this.img);

        const divBtn = document.createElement('div');
        divBtn.className = 'imageBtns';
        divImg.prepend(divBtn);

        const inputUploadImg = this.createInput('file', 'file', 'file');
        inputUploadImg.onchange = () => {
            let preview = this.img;
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
     * @returns {HTMLImageElement}
     */
    createImg(src){
        const newImg = document.createElement('img');
        newImg.src = src;
        newImg.setAttribute('alt', 'broken');
        newImg.className = 'myImg';
        newImg.style.filter = 'blur(0px) hue-rotate(0deg) contrast(100%)';

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
    filters.forEach((item, i, arr)=>{

        div.append(new Filter(item, parent).node);
    })
    parent.append(new Image('https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg').node);
}
createElements(document.body)

