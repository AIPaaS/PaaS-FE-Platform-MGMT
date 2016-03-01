/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.Portlet = Ext.extend(Ext.Panel, {
    anchor: '100%',
    frame:true,
    collapsible:true,
    draggable:true,
    cls:'x-portlet',
    
    onRender : function(ct, position) {
        Ext.ux.Portlet.superclass.onRender.call(this, ct, position);
        this.resizer = new Ext.Resizable(this.el, {
            animate: true,
            duration: .6,
            easing: 'backIn',
            handles: 's',
            minHeight: this.minHeight || 100,
            pinned: false
        });
        this.resizer.on("resize", this.onResizer, this);  
    },
    
    onResizer : function(oResizable, iWidth, iHeight, e) {
        this.setHeight(iHeight);
    },
    
    onCollapse : function(doAnim, animArg) {
        this.el.setHeight("");  // remove height set by resizer
        Ext.ux.Portlet.superclass.onCollapse.call(this, doAnim, animArg);
    }
});

Ext.reg('portlet', Ext.ux.Portlet);

