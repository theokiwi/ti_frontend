function hideMenuItems() {
    // Get all submenu items
    var submenuItems = document.querySelectorAll('.submenuItems');

    submenuItems.forEach(function(submenuItem) {
        if(submenuItem.style.display !== 'none'){
            submenuItem.style.display = 'none';

        }
        else if(submenuItem.style.display == 'none'){
            submenuItem.style.display = 'block';
        };
    });
}