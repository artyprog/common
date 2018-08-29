import './common.css'

// Global configuration

export const ABOUT = 'TwoRavens for Event Data v1.0 "Back Bay" -- Event data contains information for descriptive, predictive and inferential statistical analysis of political and social actions. TwoRavens for Event Data (v1.0) allows researchers to access event data collections, visualize the data, and construct subsets and aggregations. Newly constructed datasets may be curated and saved for reuse.';

export let panelMargin = '10px';
export let heightHeader = '72px';
export let heightFooter = '40px';

export let menuColor = '#f9f9f9';
export let borderColor = '1px solid #adadad';

export let csColor = '#419641';
export let dvColor = '#28a4c9';
export let gr1Color = '#14bdcc';  // initially was #24a4c9', but that is dvColor, and we track some properties by color assuming them unique
export let gr2Color = '#ffcccc';

export let grayColor = '#c0c0c0';
export let nomColor = '#ff6600';
export let varColor = '#f0f8ff'; // d3.rgb("aliceblue");
export let taggedColor = '#f5f5f5'; // d3.rgb("whitesmoke");
export let timeColor = '#2d6ca2';

export let d3Color = '#1f77b4'; // d3's default blue
export let selVarColor = '#fa8072'; // d3.rgb("salmon");

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
    if (!sources.length) return target;
    const source = sources.shift();

    for (const key in source) {
        if (Array.isArray(source[key]) && Array.isArray(target[key]))
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
