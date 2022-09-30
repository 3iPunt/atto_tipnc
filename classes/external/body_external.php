<?php
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
 * @package     atto_tipnc
 * @copyright   2022 Tresipunt - Antonio Manzano <contacte@tresipunt.com>
 * @copyright   3iPunt <https://www.tresipunt.com/>
 */

namespace atto_tipnc\external;

use dml_exception;
use external_api;
use external_function_parameters;
use external_single_structure;
use external_value;

defined('MOODLE_INTERNAL') || die();

global $CFG;
require_once($CFG->libdir . '/externallib.php');
require_once($CFG->dirroot . '/webservice/lib.php');
require_once($CFG->dirroot . '/group/lib.php');

class body_external extends external_api {

    /**
     * @return external_function_parameters
     */
    public static function get_body_parameters(): external_function_parameters {
        return new external_function_parameters([]);
    }

    /**
     *
     * @return array
     * @throws dml_exception
     */
    public static function get_body(): array {
        return [
            'success' => true,
            'error' => '',
            'url' => get_config('atto_tipnc', 'host_nextcloud')
        ];
    }

    /**
     * @return external_single_structure
     */
    public static function get_body_returns(): external_single_structure {
        return new external_single_structure(
            array(
                'success' => new external_value(PARAM_BOOL, 'Was it a success?'),
                'error' => new external_value(PARAM_TEXT, 'Error message'),
                'url' => new external_value(PARAM_TEXT, 'URL NextCloud'),
            )
        );
    }

}
