/*
Author: Keith S Messina

$(window).load(function() {
    $('#element').infinitePics({
        userId: 'google+_userid',
        albumId: 'albumid',
        maxImages: 10,
        random: 'yes',
        maxHeight: 150,
        speed: 10
     });
});
	
*/

(function ($) {
    $.fn.infinitePics = function (options) {
        options = $.extend({
            'url': "http://picasaweb.google.com/data/feed/api/user/" + options.userId + "/albumid/" + options.albumId + "?alt=json"
        }, options);
        return this.each(function () {
            var cont = $(this);
            $.getJSON(options.url + '&max-results=' + options.maxImages, function (data) {
                var items = [];
                $.each(data.feed.entry, function (i, item) {
                    url = item.media$group.media$content[0].url;
                    title = item.media$group.media$title.$t;
                    items.push('<a href="' + url + '"><img src="' + url + '" alt="' + title + '" style="max-height:' + options.maxHeight + 'px;"/></a>');
                });

                //Randomize function  
                if (options.random == "yes") {
                    var counter = items.length,
                        temp, index;
                    // While there are elements in the array
                    while (counter > 0) {
                        // Pick a random index
                        index = Math.floor(Math.random() * counter);
                        // Decrease counter by 1
                        counter--;
                        // And swap the last element with it
                        temp = items[counter];
                        items[counter] = items[index];
                        items[index] = temp;
                    };
                };

                $('<div/>', {
                    id: 'infinitepics_container',
                    html: items
                }).appendTo(cont);
                if (options.speed) {
                    //Animate picture elements
                    $(cont).css('overflow', 'hidden');
                    var $pic = $(cont).children().children().first();
                   
                    var $width = 0;
                    $(cont).children().children().each(function () {
                        $width += $(this).outerWidth(true);
                    });
                    $(cont).children().css({'margin-right':'-' + $width - $(cont).children().width() + 'px','max-height':options.maxHeight+'px','overflow':'hidden'});

                    function animatePics() {
                        $pic.animate({
                            'margin-left': '-=' + $pic.width() + 'px'
                        }, $pic.width() * (options.speed / 10), 'linear', function () {
                            $pic.parent().append($pic);
                            $pic.css('margin-left', '0px');
                            $pic = $pic.parent().children().first();
                            animatePics();
                        });
                    }(animatePics());
                };
            });
        });
    };
})(jQuery);
