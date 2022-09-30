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

/**
 *
 * @author 2022 3iPunt <https://www.tresipunt.com/>
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

define([
        'jquery',
        'core/str',
        'core/ajax',
        'core/templates'
    ], function ($, Str, Ajax, Templates) {
        "use strict";

        /**
         *
         */
        let SERVICES = {
            BODY: 'atto_tipnc_get_body',
        };

        /**
         *
         */
        let TEMPLATES = {
            BODY: 'atto_tipnc/body_component'
        };

        /**
         * @constructor
         */
        function Body() {

            let identifier = $('#atto_tipnc_desc');

            let modeldialogue = $('.moodle-dialogue');

            modeldialogue.css('top', '70px');
            modeldialogue.css('position', 'fixed');

            let request = {
                methodname: SERVICES.BODY,
                args: {}
            };

            Ajax.call([request])[0].done(function(response) {
                var template = TEMPLATES.BODY;
                Templates.render(template, response).done(function(html) {
                    identifier.append(html);
                });
            }).fail(Notification.exception);

            var stringsPromise = Str.get_strings([
                {
                    key:        'dialogtitle',
                    component:  'atto_tipnc'
                },
                {
                    key:        'enterurl',
                    component:  'atto_tipnc'
                },
                {
                    key:        'entersize',
                    component:  'atto_tipnc'
                },
                {
                    key:        'insert',
                    component:  'atto_tipnc'
                }
            ]);

            $.when(stringsPromise).then(function(strings) {
                let title = $('.moodle-dialogue-hd');
                title.text(strings[0]);

                $('form.atto_form label').each(function(){
                    let $label = $(this);
                    if ($label.text() === '[[enterurl,atto_tipnc]]') {
                        $label.text(strings[1]);
                    }
                    if ($label.text() === '[[entersize,atto_tipnc]]') {
                        $label.text(strings[2]);
                    }
                });

                let insert = $('.atto_media_urlentrysubmit');
                insert.text(strings[3]);

                let content = $('#atto_tipnc_content');
                content.show();
                content.css('display', 'flex');

            }).fail(Notification.exception);

        }

        /** @type {jQuery} The jQuery node for the region. */
        Body.prototype.node = null;

        return {
            /**
             *
             * @return {Body}
             */
            initBody: function () {
                return new Body();
            }
        };
    }
);