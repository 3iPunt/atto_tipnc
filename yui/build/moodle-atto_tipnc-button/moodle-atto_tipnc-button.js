YUI.add('moodle-atto_tipnc-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_tipnc
 * @copyright  2022 Tresipunt - Antonio Manzano <contacte@tresipunt.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_tipnc-button
 */

/**
 * Atto text editor tipnc plugin.
 *
 * @namespace M.atto_tipnc
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_tipnc';
var URLCONTROL = 'tipnc_url';
var SIZECONTROL = 'tipnc_size';
var LOGNAME = 'atto_tipnc';

var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        URLCONTROL: 'urlcontrol',
        SIZECONTROL: 'sizecontrol'
    },
    SELECTORS = {
        URLCONTROL: '.urlcontrol',
        SIZECONTROL: '.sizecontrol'
    };

var TEMPLATE_FORM = '' +
    '<form class="atto_form">' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
            '<label for="{{elementid}}_{{URLCONTROL}}">{{get_string "enterurl" component}}</label>: ' +
            '<input class="{{CSS.URLCONTROL}}" id="{{elementid}}_{{URLCONTROL}}" ' +
                ' name="{{elementid}}_{{URLCONTROL}}" value="{{defaulturl}}" />' +
            '</br>' +
            '<label for="{{elementid}}_{{SIZECONTROL}}">{{get_string "entersize" component}}</label>: ' +
            '<input class="{{CSS.SIZECONTROL}}" id="{{elementid}}_{{SIZECONTROL}}" ' +
                ' name="{{elementid}}_{{SIZECONTROL}}" value="{{defaultsize}}" />' +
            '</br>' +
            '<button class="{{CSS.INPUTSUBMIT}} btn btn-primary">{{get_string "insert" component}}</button>' +
        '</div>' +
    '</form>';

Y.namespace('M.atto_tipnc').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {


    /**
     * Initialize the button
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_tipnc',
            buttonName: '',
            callback: this._displayDialogue
        });

    },

    /**
     * Get the id of the url control where we store the ice cream url
     *
     * @method _getUrlControlName
     * @return {String} the name/id of the url form field
     * @private
     */
    _getUrlControlName: function(){
        return(this.get('host').get('elementid') + '_' + URLCONTROL);
    },

    /**
     * Display the tipnc Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon) {
        e.preventDefault();
        var width = 900;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: clickedicon
        });
        //dialog doesn't detect changes in width without this
        //if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //append buttons to iframe
        //var buttonform = this._getFormContent(clickedicon);

        require(['atto_tipnc/body'], function(body) {
            body.initBody();
        });

        var bodycontent =  Y.Node.create('<div id="atto_tipnc_content"></div>');
        var desccontent =  Y.Node.create('<div id="atto_tipnc_desc"></div>');
        bodycontent.append(desccontent);
        //bodycontent.append(buttonform);

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },


    /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function(clickedicon) {
        var template = Y.Handlebars.compile(TEMPLATE_FORM),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                URLCONTROL: URLCONTROL,
                SIZECONTROL: SIZECONTROL,
                component: COMPONENTNAME,
                defaulturl: '',
                defaultsize: 600,
                clickedicon: clickedicon
            }));

        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        return content;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var urlcontrol = this._form.one(SELECTORS.URLCONTROL);
        var sizecontrol = this._form.one(SELECTORS.SIZECONTROL);

        // If no file is there to insert, don't do it.
        if (!urlcontrol.get('value')){
            return;
        }
        var urlinsert = urlcontrol.get('value');

        var sizeinsert = '600';

        // If no file is there to insert, don't do it.
        if (sizecontrol.get('value')){
            sizeinsert = sizecontrol.get('value');
        }

        var iframe = '<iframe id="file_nextcloud_iframe" class="tipnc-iframe" ' +
            'src="' + urlinsert +'" width="100%" height="' + sizeinsert +'px" ' +
            'align="top" frameborder="0"></iframe>';

        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(iframe);
        this.markUpdated();

    }
}, { ATTRS: {
        disabled: {
            value: false
        },

        usercontextid: {
            value: null
        },

        defaulturl: {
            value: ''
        }
    }
});

}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
