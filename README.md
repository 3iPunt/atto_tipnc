# ATTO Plugin for inserting iFrame of NextCloud

### EN
This plugin allows inserting an iFrame with the NextCloud URL in an Atto editor.

### ES
Este plugin permite insertar un iFrame con la URL de NextCloud en un editor Atto.

### CA
Aquest connector permet inserir un iFrame amb la URL de NextCloud en un editor Atto.

## Compatibility

This plugin version is tested for:

* Moodle 3.11.8+ (Build: 20220805) - 2022092000


## Installing via uploaded ZIP file ##

1. Log in to your Moodle's site as an admin and go to _Site administration >
   Plugins > Install plugins_.
2. Upload the ZIP file with the plugin code. You should only be prompted to add
   extra details if your plugin type is not automatically detected.
3. Check the plugin validation report and finish the installation.

## Installing manually ##

The plugin can be also installed by putting the contents of this directory to

    {your/moodle/dirroot}/lib/editor/atto/plugin/tipnc

Afterwards, log in to your Moodle's site as an admin and go to _Site administration >
Notifications_ to complete the installation.

Alternatively, you can run

    $ php admin/cli/upgrade.php

to complete the installation from the command line.

## Configuration

Go to the URL:

    {your/moodle/dirroot}/admin/settings.php?section=xxxx
