import m from 'mithril';

import {
    panelOpen,
    togglePanelOpen,
    menuColor,
    borderColor,
    heightHeader,
    heightFooter,
    panelMargin,
    canvasScroll,
    scrollbarWidth,
    setPanelOcclusion,
    mergeAttributes
} from "../common";

// ```
// m(Panel, {
//     side: 'left' || 'right',
//     label: 'text at top of header',
//     hover: Bool
//     width: css string width,
//     attrsAll: { apply attributes to the outer div }
//     }, contents)
// ```

// If hover is true, then the canvas is occluded by the panels.
// If hover is false, then the canvas is resized to maintain a margin as panels are opened/closed or canvas contents overflow.

const dot = [m.trust('&#9679;'), m('br')];
export default class Panel {

    view(vnode) {
        let {side, hover, label, width, attrsAll} = vnode.attrs;

        let scroll = side === 'right' && canvasScroll['vertical'] ? scrollbarWidth : 0;
        if (hover)
            setPanelOcclusion(side, `calc(${panelMargin} + 16px + ${panelMargin} + ${scroll}px)`);
        else
            setPanelOcclusion(side, `calc(${panelMargin} + ${panelOpen[side] ? width : '16px'} + ${panelMargin} + ${scroll}px)`);

        return m(`#${side}panel.card.sidepanel`, mergeAttributes({
            style: {
                padding: '0',
                ['padding-' + (side === 'left' ? 'right' : 'left')]: '16px',
                background: menuColor,
                width: panelOpen[side] ? width : 0,
                height: `calc(100% - 2*${panelMargin} - ${heightHeader} - ${heightFooter} - ${canvasScroll['horizontal'] ? scrollbarWidth : 0}px)`,
                position: 'fixed',
                top: `calc(${heightHeader} + ${panelMargin})`,
                [side]: `calc(${(side === 'right' && canvasScroll['vertical'] ? scrollbarWidth : 0)}px + ${panelMargin})`,
                'z-index': 100
            }
        }, attrsAll), [
            // Panel handle
            m(`#toggle${side === 'left' ? 'L' : 'R'}panelicon.panelbar`, {
                    style: {height: '100%', [side]: 'calc(100% - 16px)'}
                },
                m('span', {onclick: () => togglePanelOpen(side)}, dot, dot, dot, dot)),

            // Panel contents
            m(`div${panelOpen[side] ? '' : '.closepanel'}`, {
                    style: {
                        width: 'calc(100% - 8px)', height: '100%',
                        display: panelOpen[side] ? 'contents' : 'none'
                    }
                },
                [
                    m(`#${side}paneltitle.text-center`, {style: {'margin-top': '.5em'}}, m("h4.card-title", label)),
                    vnode.children
                ])
        ])
    }
}
