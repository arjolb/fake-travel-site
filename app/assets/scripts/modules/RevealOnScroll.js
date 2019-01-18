import $ from 'jquery';
import waypoint from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class RevealOnScroll{
    constructor(element,offset){
        this.itemsToReveal=element;
        this.offsetPercentage=offset;
        this.hideInitially();
        this.createWayPoints();
    }
    hideInitially(){
        this.itemsToReveal.addClass("reveal-item");
    }
    createWayPoints(){
        var that=this;
        this.itemsToReveal.each(function(){
            var currentItem=this;
            new Waypoint({
                element:currentItem,
                handler: function(){
                    $(currentItem).addClass("reveal-item-is-visible");
                },
                offset: that.offsetPercentage
            });
        });
    }
}
export default RevealOnScroll;