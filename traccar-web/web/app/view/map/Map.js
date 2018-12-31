/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.map.Map', {
    extend: 'Traccar.view.map.BaseMap',
    xtype: 'mapView',

    requires: [
        'Traccar.view.map.MapController',
        'Traccar.view.SettingsMenu'
    ],

    controller: 'map',

    title: Strings.mapTitle,
    tbar: {
        componentCls: 'toolbar-header-style',
        defaults: {
            xtype: 'button',
            tooltipType: 'title',
            stateEvents: ['toggle'],
            enableToggle: true,
            stateful: {
                pressed: true
            }
        },
        items: [{
            xtype: 'image',
            src: 'logoo.gif',
            alt: Strings.loginLogo,
            width: 30,
            height: 30,
            style: {
                display: 'block',
                margin: '10px auto 25px'
            }
        },{
            xtype: 'tbfill'
        }, {
            handler: 'showReports',
            reference: 'showReportsButton',
            glyph: 'xf0f6@FontAwesome',
            stateful: false,
            enableToggle: false,
            tooltip: Strings.reportTitle
        }, {
            handler: 'showEvents',
            reference: 'showEventsButton',
            glyph: 'xf27b@FontAwesome',
            stateful: false,
            enableToggle: false,
            tooltip: Strings.reportEvents
        }, {
            handler: 'updateGeofences',
            reference: 'showGeofencesButton',
			html:'<i style="font-size:15px; color: red" class="fa">&#xf21d;</i><br><b style="font-size:10px; color: red" >cercos</b>',

            pressed: true,
            stateId: 'show-geofences-button',
            tooltip: "Mostrar Geocercas"
        }, {
            handler: 'showLiveRoutes',
            reference: 'showLiveRoutes',
			html:'<i style="font-size:15px; color: red" class="fa">&#xf018;</i><br><b style="font-size:10px; color: red" >tracos</b>',
            stateId: 'show-live-routes-button',
            tooltip: "Mostrar rastros"
        }, {
            reference: 'deviceFollowButton',
			html:'<i style="font-size:15px; color: red" class="fa">&#xf05b;</i><br><b style="font-size:10px; color: red" >seguir</b>',
            tooltip: "Seguir no mapa",
            stateId: 'device-follow-button',
            toggleHandler: 'onFollowClick'
        }, {
            xtype: 'settingsMenu',
            enableToggle: false
        }]
    },

    getMarkersSource: function () {
        return this.markersSource;
    },

    getAccuracySource: function () {
        return this.accuracySource;
    },

    getRouteSource: function () {
        return this.routeSource;
    },

    getGeofencesSource: function () {
        return this.geofencesSource;
    },

    getLiveRouteSource: function () {
        return this.liveRouteSource;
    },

    getLiveRouteLayer: function () {
        return this.liveRouteLayer;
    },

    initMap: function () {
        this.callParent();

        this.geofencesSource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            name: 'geofencesLayer',
            source: this.geofencesSource
        }));

        this.liveRouteSource = new ol.source.Vector({});
        this.liveRouteLayer = new ol.layer.Vector({
            source: this.liveRouteSource,
            visible: this.lookupReference('showLiveRoutes').pressed
        });
        this.map.addLayer(this.liveRouteLayer);

        this.routeSource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            source: this.routeSource
        }));

        this.accuracySource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            name: 'accuracyLayer',
            source: this.accuracySource
        }));

        this.markersSource = new ol.source.Vector({});
        this.map.addLayer(new ol.layer.Vector({
            source: this.markersSource
        }));
    }
});
