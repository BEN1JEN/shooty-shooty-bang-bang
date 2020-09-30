"use strict";

import Input from "./Input.js";
const input = new Input();

const keyLocations = {}
keyLocations["A".charCodeAt()] = {"type": "left",   "player": 0};
keyLocations["S".charCodeAt()] = {"type": "down",   "player": 0};
keyLocations["D".charCodeAt()] = {"type": "right",  "player": 0};
keyLocations["W".charCodeAt()] = {"type": "up",     "player": 0};
keyLocations["Q".charCodeAt()] = {"type": "pistol", "player": 0};
keyLocations["E".charCodeAt()] = {"type": "super",  "player": 0};

keyLocations["J".charCodeAt()] = {"type": "left",   "player": 1};
keyLocations["K".charCodeAt()] = {"type": "down",   "player": 1};
keyLocations["L".charCodeAt()] = {"type": "right",  "player": 1};
keyLocations["I".charCodeAt()] = {"type": "up",     "player": 1};
keyLocations["U".charCodeAt()] = {"type": "pistol", "player": 1};
keyLocations["O".charCodeAt()] = {"type": "super",  "player": 1};

keyLocations["F".charCodeAt()] = {"type": "left",   "player": 2};
keyLocations["G".charCodeAt()] = {"type": "down",   "player": 2};
keyLocations["H".charCodeAt()] = {"type": "right",  "player": 2};
keyLocations["T".charCodeAt()] = {"type": "up",     "player": 2};
keyLocations["R".charCodeAt()] = {"type": "pistol", "player": 2};
keyLocations["Y".charCodeAt()] = {"type": "super",  "player": 2};

keyLocations[37]  = {"type": "left",   "player": 3};
keyLocations[40]  = {"type": "down",   "player": 3};
keyLocations[39]  = {"type": "right",  "player": 3};
keyLocations[38]  = {"type": "up",     "player": 3};
keyLocations[190] = {"type": "pistol", "player": 3};
keyLocations[191] = {"type": "super",  "player": 3};

keyLocations["4".charCodeAt()] = {"type": "left",   "player": 4};
keyLocations["5".charCodeAt()] = {"type": "down",   "player": 4};
keyLocations["6".charCodeAt()] = {"type": "right",  "player": 4};
keyLocations["8".charCodeAt()] = {"type": "up",     "player": 4};
keyLocations["7".charCodeAt()] = {"type": "pistol", "player": 4};
keyLocations["9".charCodeAt()] = {"type": "super",  "player": 4};

export default function getInput() {
	input.update();
	const held = {0: {}, 1: {}, 2: {}, 3: {}, 4: {}, "menu": input.down[13]};
	for (const key of Object.keys(keyLocations)) {
		if (input.held[key]) {
			held[keyLocations[key].player][keyLocations[key].type] = true;
		}
	}
	return held;
}
