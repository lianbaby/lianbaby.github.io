(function(window) {
    // 雲朵
    const CLOUDS = ['cloud-1.png', 'cloud-2.png', 'cloud-3.png', 'cloud-4.png'];
    // 船隻
    const BOATS = ['boat.png', 'sailboat.png', 'sailing-boat.png', 'sailing.png'];
    /**
     * 天氣動畫
     * @param {*} options 
     */
    function WeatherAnimation (options) {
        const { container, summer, winter, spring, autumn } = options || {};

        if (typeof container === 'string') {
            this._$container = $(container);
        } else if (container instanceof jQuery) {
            this._$container = container;
        } else if (typeof container === 'function') {
            this._$container = container();
        } else {
            this._$container = $('body');
        }

        this._summer = summer;
        this._winter = winter;
        this._spring = spring;
        this._autumn = autumn;
    }

    /**
     * 夏天動畫
     */
    WeatherAnimation.prototype.summer = function() {
        const summer = this._summer || {};
        const duration = summer.duration || 60;

        for (let idx = 0; idx < BOATS.length; idx++) {
            let boat = BOATS[idx];
            let $span = $('<span class="summer m-animation"></span>');
            
            $span.css('animation-delay', idx * (duration / BOATS.length) + 's');
            $span.css('background-image', `url(./img/${boat})`);
            this._$container.append($span);
        }
    }

    /**
     * 冬天動畫
     */
    WeatherAnimation.prototype.winter = function() {
        const winter = this._winter || {};
        const scaleMax = winter.scaleMax || 1.5;
        const scaleMin = winter.scaleMin || 0.5;
        const delayMax = winter.delayMax || 20;
        const delayMin = winter.delayMin || 0;
        const snowCount = winter.snowCount || 30;
        
        for (let idx = 0; idx < snowCount; idx++) {
            let $span = $('<span class="winter m-animation"></span>');
            let scaleSize = (Math.random() * (scaleMax - scaleMin)) + scaleMin;
    
            $span.css('animation-delay', ((Math.random() * (delayMax - delayMin)) + delayMin) + 's');
            $span.css('transform', `scale(${scaleSize.toFixed(1)})`);
            $span.css('left', Math.random() * $('body').width() - ($('body').width() / 10));
    
            this._$container.append($span);
        }
    }

    /**
     * 春天動畫
     */
    WeatherAnimation.prototype.spring = function() {
        const spring = this._spring || {};
        const cloudCount = spring.cloudCount || 15;
        const scaleMax = spring.scaleMax || 1;
        const scaleMin = spring.scaleMin || 0.5;
        const delayMax = spring.delayMax || 80;
        const delayMin = spring.delayMin || 0;

        for (let idx = 0; idx < cloudCount; idx++) {
            let scaleSize = Math.random() * (scaleMax - scaleMin) + scaleMin;
            let $span = $('<span class="spring m-animation"></span>');

            $span.css('animation-delay', (Math.random() * (idx === 0 ? delayMin : (delayMax - delayMin)) + delayMin) + 's');
            $span.css('background-image', `url(./img/${CLOUDS[parseInt((Math.random() * CLOUDS.length))]})`);
            $span.css('transform', `scale(${scaleSize.toFixed(1)})`);
            $span.css('top', `calc(${20 * Math.random()}% - 50px)`);

            this._$container.append($span);
        }
    }

    /**
     * 秋天動畫
     */
    WeatherAnimation.prototype.autumn = function() {
        const autumn = this._autumn || {};
        const leafCount = autumn.leafCount || 20;
        const scaleMax = autumn.scaleMax || 1.5;
        const scaleMin = autumn.scaleMin || 0.5;
        const delayMax = autumn.delayMax || 20;
        const delayMin = autumn.delayMin || 0;
        const rotateMax = autumn.rotateMax || 360;
        const rotateMin = autumn.rotateMin || 0;

        for (let idx = 0; idx < leafCount; idx++) {
            let $span = $('<span class="autumn m-animation"></span>');
            let scaleSize = (Math.random() * (scaleMax - scaleMin) + scaleMin);
    
            $span.css('animation-delay', (Math.random() * (delayMax - delayMin) + delayMin) + 's');
            $span.css('transform', `rotate(${Math.random() * (rotateMax - rotateMin) + rotateMin}deg) scale(${scaleSize.toFixed(1)})`);
            $span.css('left', Math.random() * $('body').width() - ($('body').width() / 10));
    
            this._$container.append($span);
        }
    }

    window.WeatherAnimation = WeatherAnimation;
})(window);