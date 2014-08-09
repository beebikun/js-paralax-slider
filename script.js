var paralaxSlider =function(element) {
    this._init(element)
}

paralaxSlider.prototype._init = function(element) {
    this.settings = {
        arrowLeft: 'fa-chevron-circle-left',
        arrowRight: 'fa-chevron-circle-right',
        paralaxStep: 25,
    }
    this.element = element
    this.body = element.querySelector('.sp-content-body');
    this.content = element.querySelector('.sp-content');
    this.slider = this.content.querySelector('.sp-slider');
    this.images = this.slider.querySelectorAll('li[data-nav="none"]');
    this.bg = this.content.querySelector('.sp-parallax-bg');
    this._init_navs()
    this._init_arrow()
};

paralaxSlider.prototype._init_navs = function(first_argument) {
    this.navs = new Array;
    var count = this.images.length;
    var imagesWidth =  100/count + '%';
    var self = this;
    this.slider.style.width = count * 100 + '%';
    for (var i = 0; i < count; i++) {
        var label = document.createElement('label');
        label.onclick = function(){self.slideTo(true, this.i)}
        label.className = 'sp-button-label'
        self.body.appendChild(label)
        this.navs[i] = label
        this.images[i].style.width = imagesWidth;
        this.images[i].setAttribute("data-nav", "create")
    };
    this.slideTo()
};

paralaxSlider.prototype._init_arrow = function() {
    var self = this;

    function create(classname, isNext, arrowClass){
        var arrow = document.createElement( 'label' );
        arrow.className = 'sp-arrow ' + classname;
        arrow.innerHTML = '<i class="fa fa-3x ' + self.settings[arrowClass] + '"></i>'
        self.element.insertBefore(arrow, self.body)
        arrow.onclick = function(){
            self.slideTo(isNext)
        }
    }

    create('sp-arrow-left', false, 'arrowLeft')
    create('sp-arrow-right', true, 'arrowRight')
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
            this.active.removeAttribute('data-active')
            var indx = getNextIndx();
        } else{
            var indx = 0
        }
    }
    for (var i = this.images.length - 1; i >= 0; i--) {
        this.images[i].style.opacity = 0.4
    };
    this.slider.style.left = -100 * indx + '%'
    this.bg.style.backgroundPositionX = this.settings.paralaxStep*-1*indx + 'px'
    this.active = this.navs[indx]
    this.active.setAttribute('data-active', 'active')
    this.images[indx].style.opacity = 1
};
