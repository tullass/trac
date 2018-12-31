

Ext.define('Traccar.view.State', {
    extend: 'Traccar.view.GridPanel',
    xtype: 'stateView',

    requires: [
        'Traccar.view.StateController'
    ],

    controller: 'state',
    store: 'Attributes',

    stateful: true,
    stateId: 'state-grid',

    tbar: {
        componentCls: 'toolbar-header-stylee',  bodyStyle: 'background: transparent; padding: ',

        items: [{
            xtype: 'tbtext',
            html: "",
            baseCls: 'x-panel-header-title-default'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            disabled: true,
			hidden: true,
            handler: 'onComputedAttributesClick',
            reference: 'computedAttributesButton',
            glyph: 'xf0ae@FontAwesome',
            tooltip: Strings.sharedComputedAttributes,
            tooltipType: 'title'
        }]
    },

    columns: {
        defaults: {
            minWidth: Traccar.Style.columnWidthNormal,
            flex: 1
        },
        items: [{
            text: Strings.stateName,
            dataIndex: 'name'
        }, {
            text: Strings.stateValue,
            dataIndex: 'value',
            cellWrap: true,
            renderer: function (value, metaData, record) {
                var position, device;
                if (record.get('attribute') === 'alarm') {
                    metaData.tdCls = 'view-color-red';
                } else if (record.get('name') === Strings.positionAddress && !value) {
                    return '<a href="#" onclick="Ext.fireEvent(\'stategeocode\')" >' +
                        Strings.sharedShowAddress + '</a>';
               
				} 
                else if (record.get('name') === Strings.positionImage || record.get('name') === Strings.positionAudio) {
                    position = this.getController().position;
                    if (position) {
                        device = Ext.getStore('Devices').getById(position.get('deviceId'));
                        if (device) {
                            return '<a target="_blank" href="/api/media/' + device.get('uniqueId') + '/' + value + '" >' +
                                value + '</a>';
                        }
                    }
                }
                return value;
            }
        }]
    }
});
