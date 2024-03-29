import { runAppleScript } from "@raycast/utils";
import { execSync } from "child_process";


type WifiState = 'on' | 'off';
type bluetoothState = 'on' | 'off'

export function setWifi(state: WifiState) {
    execSync(`/usr/sbin/networksetup -setairportpower airport ${state}`)
}


export function sleep() {
    runAppleScript('tell application "Finder" to sleep')
}

export async function bluetooth(state: bluetoothState) {
    const currentState = execSync('/usr/sbin/system_profiler SPBluetoothDataType | grep State')
    
    if ((currentState.includes("On") && state === "on") || (currentState.includes("Off") && state === "off")) {
      await runAppleScript('tell application "System Settings" \n activate \n end tell \n delay 0.3 \n tell application "System Settings" \n set current pane to pane id "com.apple.BluetoothSettings" \n end tell \n delay 0.3 \n tell application "System Events" \n click checkbox "Bluetooth" of group 1 of scroll area 1 of group 1 of group 2 of splitter group 1 of group 1 of window "Bluetooth" of application process "System Settings" \n end tell \n delay 1 \n tell application "System Settings" \n quit \n end tell'
      );
      } 
}