import $ from 'jquery';
import waypoint from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader{
    constructor(){
        this.siteHeader=$(".site-header");
        this.headerTriggerElement=$(".large-hero_title");
        this.createHeaderWaypoint();
        this.pageSection=$(".page-section");
        this.headerLinks=$(".site-header_nav a");
        this.createPageSectionWaypoints();
    }
    createHeaderWaypoint(){
        var that=this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function (direction) {
                if (direction=="down") {
                    that.siteHeader.addClass("site-header-fixed-bar");
                }else{
                    that.siteHeader.removeClass("site-header-fixed-bar");
                }
            }
        });
    }

    createPageSectionWaypoints(){
        var that=this;
        this.pageSection.each(function(){
            var currentItem=this;
            new Waypoint({
                element: currentItem,
                handler: function (direction) {
                   if (direction=="down") {
                    var matchingHeaderLink=currentItem.getAttribute("data-matching-link");
                    that.headerLinks.removeClass("is-current-link");
                    $(matchingHeaderLink).addClass("is-current-link");
                   } 
                },
                offset: "20%"
            });

            new Waypoint({
                element: currentItem,
                handler: function (direction) {
                   if (direction=="up") {
                    var matchingHeaderLink=currentItem.getAttribute("data-matching-link");
                    that.headerLinks.removeClass("is-current-link");
                    $(matchingHeaderLink).addClass("is-current-link");
                   } 
                },
                offset: "-50%"
            });
        });

    }
}
export default StickyHeader;