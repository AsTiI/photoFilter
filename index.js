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
    input.onclick = () => {

    }
    return input;

}
class Controls{
    constructor(parent){
        const controls = document.createElement('div');
        controls.className = 'controls';

        controls.append(createLabel('blur', 'blur'));
        controls.append(createInputControl('blur', 'range', 'blur', '10', '200'));
        controls.append(createLabel('hue', 'hue'));
        controls.append(createInputControl('hue', 'range', 'hue', '10', '200'));
        controls.append(createLabel('contrast', 'contrast'));
        controls.append(createInputControl('contrast', 'range', 'contrast', '10', '200'));

        parent.append(controls)
    }
}



function createButton(className, type, name, value){
    const button = document.createElement('button');
    button.className = className;
    button.setAttribute('type', type);
    button.textContent = name
    button.setAttribute('value', value);
    return button;
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
        btns.append(input);

        const form = document.createElement('form');
        form.setAttribute('method', 'get');


        const downloadResBtn = createButton('downloadResBtn', 'submit', 'download Img', 'download');

        form.append(downloadResBtn);
        btns.append(form);

        const img = document.createElement('img');
        img.src = '1.jpg';
        img.setAttribute('alt', 'broken')
        file.append(btns)
        file.append(img);
        parent.append(file);
    }

}
function photoFilter(parent){
    new Controls(parent);
    new File(parent);
}

photoFilter(document.body)


