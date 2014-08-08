var paralaxSlider =function(element) {
    this._init(element)
}

paralaxSlider.prototype._init = function(element) {
    this.body = element;
    this.content = document.querySelector('.sp-content')
    this.slider = this.content.querySelector('.sp-slider')
    this.images = this.slider.querySelectorAll('li')
    this.bg = this.content.querySelector('.sp-parallax-bg')
    this._init_navs()
    this._init_arrow()
};

paralaxSlider.prototype._init_navs = function(first_argument) {
    this.navs = new Array;
    var count = this.images.length;
    var half = Math.floor(count/2)
    var step = 18;
    var self = this;
    for (var i = count - 1; i >= 0; i--) {
        var margin = (count % 2) ? (i != half) ? step*(i - half) : 0
                                 : (step*(i-half) + step*0.5)
        var input = document.createElement('input');
        var label = document.createElement('label');
        var id = 'sp-slider-button-' + i;
        input.classname = 'sp-selector'
        input.setAttribute('id', id)
        input.setAttribute('type', 'radio')
        input.setAttribute('name', 'sp-slider-radio-set')
        input.style.marginLeft = margin + 'px';
        input.i = i
        input.onclick = function(){self.slideTo(true, this.i)}
        this.navs[i] = input

        label.setAttribute('for', id)
        label.classname = 'button-label'
        label.style.marginLeft = margin + 'px';

        self.body.insertBefore(input, self.content)
        self.body.insertBefore(label, self.content)
    };
    this.slideTo(true);
};

paralaxSlider.prototype._init_arrow = function() {
    var self = this;

    function create(classname, isNext){
        var arrow = document.createElement( 'label' );
        arrow.className = 'sp-arrow ' + classname;
        self.body.insertBefore(arrow, self.content)
        arrow.onclick = function(){
            self.slideTo(isNext)
        }
    }

    create('sp-arrow-left', false)
    create('sp-arrow-right', true)
};


paralaxSlider.prototype._sameNode = function(n1, n2) {
    var fn = n1.isSameNode ? 'isSameNode' : 'isEqualNode';
    return n1[fn](n2)
};

paralaxSlider.prototype.slideTo = function(isNext, indx) {
    var self = this;
    function getNextIndx(){
        for (var i = self.navs.length - 1; i >= 0; i--) {
            if( self._sameNode(self.navs[i], self.active) ){
                if(isNext){
                    if((i + 1) == self.navs.length) return 0
                    return i + 1
                }

                if(i == 0) return self.navs.length-1
                return i-1
            }
        };
    }
    if(indx === undefined){
        if(this.active){
            this.active.removeAttribute('checked')
            var indx = getNextIndx();
        } else{
            var indx = 0
        }
    }
    for (var i = this.images.length - 1; i >= 0; i--) {
        this.images[i].style.opacity = 0.4
    };
    this.slider.style.left = -100 * indx + '%'
    this.bg.style.backgroundPositionX = -100*indx + 'px'
    this.active = this.navs[indx]
    this.active.setAttribute('checked', 'checked')
    this.images[indx].style.opacity = 1
};