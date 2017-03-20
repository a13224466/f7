
var JindouTools = {
    _layer: function (ele) {

        var $layer = $(ele),
            $img = $layer.parent().find('.img'),
            $img_width = $img.width(),
            $img_height = $img.height();

        $layer.each(function (i, e) {
            var $e = $$(e),
                $layer = $e.find('.layer'),
                _data_layer = $layer.data('layer');

            if (_data_layer == 1) {
                console.log('asdf');
                $layer.css({
                    display: 'block',
                    width: $img_width + 'px',
                    height: $img_height + 'px',
                });

                // $layer.find('.description').css({
                //     'line-height': $img_height + 'px',
                // });

            }
        });
    },



}
