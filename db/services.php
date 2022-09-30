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
 * @package    atto_tipnc
 * @copyright  2022 Tresipunt - Antonio Manzano <contacte@tresipunt.com>
 */


use atto_tipnc\external\body_external;

defined('MOODLE_INTERNAL') || die();

$functions = [
    'atto_tipnc_get_body' => [
        'classname' => body_external::class,
        'methodname' => 'get_body',
        'description' => 'Get template body for modal in Atto Editor',
        'type' => 'read',
        'ajax' => true,
        'loginrequired' => true
    ],
];
$services = [
    'atto_tipnc' => [
        'functions' => [
            'atto_tipnc_get_body',
        ],
        'restrictedusers' => 0,
        'enabled' => 1
    ]
];