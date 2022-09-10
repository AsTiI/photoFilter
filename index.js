"use strict"
function createLabel(name, text){
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = text;
    return label;
}
function createInputControl(id, type, name, min, max){
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('min', min ?? 'none');
    input.setAttribute('max', max ?? 'none');
    return input;

}
class Controls{
    constructor(parent){
        const controls = document.createElement('div');
        controls.className = 'controls';

        controls.append(createLabel('blur', 'blur'));
        const blur = createInputControl('blur', 'range', 'blur', '0', '25')
        blur.onchange = () => {
            const myImg = document.querySelector('.myImg')

            let styles = myImg.style.filter.split(' ');
            for(let i = 0; i < styles.length; i++){
                if (/^blur/.test(styles[i]))
                    styles[i] = `blur(${blur.value}px)`;
            }
            myImg.style.filter = styles.join(' ');
            console.log(myImg)

        }
        controls.append(blur);

        controls.append(createLabel('hue', 'hue'));
        const hue = createInputControl('hue', 'range', 'hue', '0', '200')
        hue.onchange = () => {
            const myImg = document.querySelector('.myImg');
            let styles = myImg.style.filter.split(' ');
            for(let i = 0; i < styles.length; i++){
                if(/^hue-rotate/.test(styles[i]))
                    styles[i] = `hue-rotate(${hue.value}deg)`;
            }
            myImg.style.filter = styles.join(' ');
        }
        controls.append(hue);

        controls.append(createLabel('contrast', 'contrast'));

        const contrast = createInputControl('contrast', 'range', 'contrast', '10', '200')
        contrast.onchange = () => {
            const myImg = document.querySelector('.myImg')
            let styles = myImg.style.filter.split(' ');
            for(let i = 0; i < styles.length; i++){
                if (/^contrast/.test(styles[i]))
                    styles[i] = `contrast(${contrast.value}%)`;
            }
            myImg.style.filter = styles.join(' ');

        }
        controls.append(contrast);

        parent.append(controls)
    }
}

function createInput(id, type, name){
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    return input;

}

class File{
    constructor(parent) {
        const file = document.createElement('div');
        file.className = 'file';

        const btns = document.createElement('div');
        btns.className = 'btns';

        const input = createInput('file', 'file', 'file')
        input.onchange = () => {
            let preview = document.querySelector('img');
            let downloadImg =
            preview.className = 'myImg'

            let file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();

            reader.onloadend =  () => {
                let downloadImg = document.querySelector('.downloadImg')
                preview.src = reader.result;
                downloadImg.href = preview.src;
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = "https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg";
            }
        }
        btns.append(input);

        const downloadImg = document.createElement('a');
        downloadImg.setAttribute('href', 'https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg')
        downloadImg.setAttribute('download', '')
        downloadImg.textContent = 'download img'
        downloadImg.className = 'downloadImg'
        downloadImg.onclick = () => {
            let styles = document.querySelector('.myImg');
        }

        btns.append(downloadImg);

        file.append(btns)
        const img = document.createElement('img')
        img.src = 'https://bipbap.ru/wp-content/uploads/2018/06/3c980dd2e9c909ada7377cc89885231b.jpg';
        img.setAttribute('alt', 'broken');
        img.className = 'myImg';
        img.style.filter = 'blur(0px) hue-rotate(0deg) contrast(100%)'

        file.append(img);
        parent.append(file);
    }

}
function photoFilter(parent){
    new Controls(parent);
    new File(parent);
}

photoFilter(document.body)


