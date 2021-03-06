// Global configuration

import m from "mithril";

export let panelMargin = '10px';
export let heightHeader = '88px';
export let heightFooter = '50px';

export let menuColor = '#f9f9f9';
export let borderColor = '1px solid #bfbfbf';

export let gr1Color = '#14bdcc';  // initially was #24a4c9', but that is dvColor, and we track some properties by color assuming them unique
export let gr2Color = '#79af4f';

export let grayColor = '#c0c0c0';

export let nomColor = '#ff6600';
export let csColor = '#419641';
export let boundaryColor = '#3cc394';
export let locationColor = '#d23e3e';
export let timeColor = '#2d6ca2';
export let weightColor = '#bf4d66';
export let indexColor = '#797478';
export let matchedColor = '#330b0b';
export let privilegedColor = '#9a55c0';
export let exogenousColor = '#C03D3E';

export let taggedColor = '#f5f5f5'; // d3.rgb("whitesmoke");
export let varColor = '#f0f8ff'; // d3.rgb("aliceblue");

export let d3Color = '#1f77b4'; // d3's default blue
export let selVarColor = '#fa8072'; // d3.rgb("salmon");

export let warnColor = '#ffd442';
export let errorColor = '#fa8072';

export let colorPalette = [
    "#3cb44b",
    "#4363d8",
    "#f58231",
    "#e6194B",
    "#911eb4",
    "#42d4f4",
    "#9A6324",
    "#ffe119",
    "#f032e6",
    "#469990",
    "#fabebe",
    "#bfef45"
];

// Global features

export let panelOpen = {
    'left': true,
    'right': true
};

// If you invoke from outside a mithril context, run m.redraw() to trigger the visual update
export function setPanelOpen(side, state=true) {
    panelOpen[side] = state;
    panelCallback[side](state);
}

export function togglePanelOpen(side) {
    panelOpen[side] = !panelOpen[side];
    panelCallback[side](panelOpen[side])
}

// Optionally trigger callback after setting panel state (but before redraw)
export let panelCallback = {
    'left': Function,
    'right': Function
};
export function setPanelCallback(side, callback) {panelCallback[side] = callback}

// Number of pixels occluded by the panels. Left at zero if panels are hovering
export let panelOcclusion = {
    'left': '0px',
    'right': '0px'
};
export function setPanelOcclusion(side, state) {panelOcclusion[side] = state}

export const scrollbarWidth = getScrollbarWidth();
export let canvasScroll = {
    vertical: false,
    horizontal: false
};

// If scroll bar has been added or removed from canvas, update state and return true.
export function scrollBarChanged() {
    let canvas = document.getElementById('canvas');
    if (canvas === null) return false;

    let newState = {
        vertical: canvas.scrollHeight > canvas.clientHeight,
        horizontal: canvas.scrollWidth > canvas.clientWidth
    };

    if (newState['vertical'] !== canvasScroll['vertical'] || newState['horizontal'] !== canvasScroll['horizontal']) {
        canvasScroll = newState;
        return true;
    } else return false;
}

// Merge arrays and objects up to one layer deep
export function mergeAttributes(target, ...sources) {
    if ('class' in target && Array.isArray(target['class'])) target['class'] = target['class'].join(' ');
    if (!sources.length) return target;
    const source = sources.shift();

    for (const key in source) {
        // special case to collapse class lists into a space-delimited string
        if (key === 'class') {
            if (Array.isArray(source[key])) source[key] = source[key].join(' ');
            target[key] += ` ${source[key]}`;
        }
        else if (Array.isArray(source[key]) && Array.isArray(target[key]))
            target[key].concat(source[key]);

        else if (typeof target[key] === 'object' && typeof source[key] === 'object')
            Object.assign(target[key], source[key]);

        else target[key] = source[key];
    }
    return mergeAttributes(target, ...sources);
}

// https://stackoverflow.com/a/13382873
function getScrollbarWidth() {
    let outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    let inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}


export let deepCopy = value => {
    if (['undefined', 'number', 'string', 'boolean'].includes(typeof value))
        return value;

    if (value instanceof Set) return new Set([...value].map(deepCopy));
    if (Array.isArray(value)) return value.map(deepCopy);
    if (typeof value === 'object') return Object.keys(value)
        .reduce((out, key) => Object.assign(out, {[key]: deepCopy(value[key])}), {});
};

export let loader = id => m('div', {
        style: {height: '120px', margin: 'auto calc(50% - 60px)'}
    },
    m(`#loading${id}.loader`, {
        style: {position: 'relative', transform: 'translateY(-50%)'}
    }));

export let loaderSmall = id => m(`#loading${id}.loader-small`, {
    style: {
        display: 'inline-block',
        margin: 'auto',
        position: 'relative',
        top: '40%',
        transform: 'translateY(-50%)'
    }
});