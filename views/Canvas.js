import m from 'mithril';
import {mergeAttributes, panelOcclusion, heightFooter, heightHeader, scrollBarChanged} from "../common";

// Interface specification

// ```
// m(Canvas, {
//     attrsAll: { additional attributes to apply to the outer div }
//     }, contents)
// ```

// Purpose:
// 1. if a left or right panel is not permitted to occlude the content on the canvas,
//      this class resizes the contents to maintain a margin away from the panels
// 2. if the contents of the canvas overflow and cause a scroll bar,
//      the left and right panel are shifted to maintain a margin

export default class Canvas {
    oncreate() {
        // Redraw if scroll bar status has changed
        window.addEventListener('resize', () => {if (scrollBarChanged()) m.redraw()});
    }

    view(vnode) {
        let {attrsAll} = vnode.attrs;
        return m('div', mergeAttributes({
            style: {
                id: 'canvas',
                width: '100%',
                height: `calc(100% - ${heightHeader} - ${heightFooter})`,
                'padding-left': panelOcclusion['left'],
                'padding-right': panelOcclusion['right'],
                position: 'fixed',
                overflow: 'auto',
                top: heightHeader
            }
        }, attrsAll), vnode.children)
    }
}
