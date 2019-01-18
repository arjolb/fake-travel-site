import $ from 'jquery';
class MobileMenu{
    constructor(){
        this.siteHeader=$(".site-header");
        this.menuIcon=$(".site-header_menu-icon");
        this.menuContent=$(".site-header_menu-content");
        this.events();
    }
    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }
    toggleTheMenu(){
        this.menuContent.toggleClass("site-header_menu-content-is-visible");
        this.siteHeader.toggleClass("site-header_is-expanded");
        this.menuIcon.toggleClass("site-header_menu-icon-close-x");
    }
}

export default MobileMenu;