'use strict';

const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.input-container input');
const buttonAdd = document.querySelector('.button-add');
const readOnlyContainer = document.querySelector('.readonly-container');

let tags = [];

tagContainer.style.visibility = 'hidden';

function createTag(label) {
    tagContainer.style.visibility = 'visible';

    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    /* Material Icons = closeIcon */
    const closeIcon = document.createElement('i');
    closeIcon.innerHTML = 'cancel';
    closeIcon.setAttribute('class', 'material-icons');
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
}

function clearTags() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });
    if (!tagContainer.hasChildNodes()) {
        tagContainer.style.visibility = 'hidden';
    }
}

function addTags() {
    clearTags();
    tags.slice().reverse().forEach(tag => {   /* prepend() = вставляет элементы в начало другого элемента */
        tagContainer.prepend(createTag(tag));
    });

    tags = JSON.parse(localStorage.getItem('tags'));
}

function readOnlyMode(value) {
    if (value) {
        input.setAttribute('readonly', 'readonly');
        readOnlyContainer.style.pointerEvents = 'none';
    }
    else {
        input.removeAttribute('readonly', 'readonly');
        readOnlyContainer.style.pointerEvents = 'auto';
    }
}

const checkboxReadOnly = document.getElementById('readonly');
checkboxReadOnly.addEventListener('change', () => {
    if (checkboxReadOnly.checked) {
        readOnlyMode(true);
    }
    else {
        readOnlyMode(false);
    }
});

if (localStorage.getItem('tags')) {
    tags = JSON.parse(localStorage.getItem('tags'));
    addTags();
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.target.value.split(',').forEach(tag => {
            if (input.value.trim() === '' || input.value.trim() === ',') {
                return '';
            }
            tags.push(tag);
            localStorage.setItem('tags', JSON.stringify(tags));
        });
        addTags();
        input.value = '';

    }
});

buttonAdd.addEventListener('click', () => {
    input.value.split(',').forEach(tag => {
        if (input.value.trim() === '' || input.value.trim() === ',') {
            return '';
        }
        tags.push(tag);
        localStorage.setItem('tags', JSON.stringify(tags));
    });
    addTags();
    input.value = '';
});

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') { /* В XML возвращаемое значение будет в нижнем регистре, а в HTML - в верхнем.*/
        const tagLabel = e.target.getAttribute('data-item');
        const index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        localStorage.setItem('tags', JSON.stringify(tags));
        addTags();
    }
});

input.focus();





