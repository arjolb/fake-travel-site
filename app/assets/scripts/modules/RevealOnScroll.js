import $ from 'jquery';
import waypoint from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class RevealOnScroll{
    constructor(element,offset){
        this.itemsToReveal=element;
        this.offsetPercentage=offset;
        this.lazyImages=$(".lazyload");
        this.hideInitially();
        this.createWayPoints();
        this.refreshWayPoints();
    }

    refreshWayPoints(){
        this.lazyImages.on('load',function(){
            Waypoint.refreshAll();
        });
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