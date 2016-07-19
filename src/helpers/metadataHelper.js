export function getDisplayName(displayName, name) {
    if(displayName == null) return null;
    else if(displayName == undefined || displayName == '') return name;
    return displayName;
}