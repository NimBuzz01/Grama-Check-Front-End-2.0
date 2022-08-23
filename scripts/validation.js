// nic validation
function validation(nic) {
    var result = false;
    if (nic.length === 10 && !isNaN(nic.substr(0, 9)) && isNaN(nic.substr(9, 1).toLowerCase()) && ['x', 'v'].includes(nic.substr(9, 1).toLowerCase())) {
        result = true;
    } else if (nicNumber.length === 12 && !isNaN(nicNumber)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}