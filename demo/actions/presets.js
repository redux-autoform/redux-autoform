if (process.env.APP_ENV !== 'browser') {
    require.extensions['.txt'] = function (module, filename) {
        var fs = require('fs');
        module.exports = fs.readFileSync(filename, 'utf8');
    };
}

import _ from 'underscore';
import base from './presets/default.txt';
export const DEFAULT_PRESET_NAME = 'default';
export const PRESETS = [
    {
        name: 'default',
        displayName: 'Default',
        formTitle: 'Edit contact',
        entityName: 'contact',
        layoutName: 'edit',
        schema: base
    }
];

// action names
export const LOAD_PRESETS = 'LOAD_PRESETS';
export const SET_PRESET = 'SET_PRESET';

/**
 * Loads all available presets
 * @returns {{type: string, presets: *[]}}
 */
export function loadPresets() {
    return {
        type: LOAD_PRESETS,
        presets: PRESETS
    }
}

/**
 * Sets the selected preset
 * @param preset
 * @returns {{type: string, preset: *}}
 */
export function setPreset(presetName) {
    return {
        type: SET_PRESET,
        preset: _.find(PRESETS, p => p.name == presetName)
    }
}