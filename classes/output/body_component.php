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
 * Class body_component
 *
 * @package     atto_tipnc
 * @copyright   2022 Tresipunt - Antonio Manzano <contacte@tresipunt.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace atto_tipnc\output;

use renderable;
use renderer_base;
use stdClass;
use templatable;

defined('MOODLE_INTERNAL') || die;

/**
 * Class atto_tipnc
 *
 * @package     body_component
 * @copyright   2022 Tresipunt
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class body_component implements renderable, templatable {

    /**
     * board_page constructor.
     *
     */
    public function __construct() {
    }

    /**
     * Export for template
     *
     * @param renderer_base $output
     * @return false|stdClass|string
     */
    public function export_for_template(renderer_base $output) {

        $data = new stdClass();
        $data->url = 'https://nextcloud.dd.3ip.eu/apps/files/';
        return $data;
    }
}
