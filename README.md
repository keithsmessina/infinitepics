infinitepics
============

A JQuery script to pull in pictures from Google+ albums and display them in an infinite scroller.

All you need to do is:

1) Add a link to the script:

    <script type="text/javascript" src="infinitePics.js"></script>

2) Target an element with the function:

```    $(window).load(function() {
        $('#element').infinitePics({
            userId: 'google+_userid',
            albumId: 'albumid',
            maxImages: 10,
            random: 'yes',            <---optional
            maxHeight: 150,           <---optional
            speed: 10                 <---optional to make it animated.
         });
       });
```
