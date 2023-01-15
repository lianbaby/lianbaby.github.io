// 頁面載入完成
$(function() {

    const weatherAnimation = new WeatherAnimation();

    const WEATHER_CONFIG = {
        'SPRING': {
            img: 'spring.jpg',
            animation: () => weatherAnimation.spring(),
        },
        'SUMMER': {
            img: 'summer.jpg',
            animation: () => weatherAnimation.summer(),
        },
        'AUTUMN': {
            img: 'Autumn.jpg',
            animation: () => weatherAnimation.autumn(),
        },
        'WINTER': {
            img: 'winter.jpg',
            animation: () => weatherAnimation.winter(),
        }
    }

    /**
     * 設定天氣背景以及動畫
     */
    function setWeatherBg() {
        let weather = $(this).attr('data-weather-key');
        
        $('.weather').removeClass('active');
        $(`.weather[data-weather-key="${weather}"]`).addClass('active');

        if (!WEATHER_CONFIG[weather]) {
            return;
        }

        const { img, animation } = WEATHER_CONFIG[weather];

        img && $('body').css('background-image', `url(img/${img})`);
        $('.m-animation').remove();
        animation && animation();
    }

    // 初始預設季節 - 春天
    weatherAnimation.spring();

    // 初始化相關事件
    $('.weather').click(setWeatherBg);

    // 初始化提示視窗
    $('[data-bs-toggle="tooltip"]').each((_, element) => new bootstrap.Tooltip(element, { trigger: 'hover' }));

    async function initWeatherMarquee() {
        const $weatherMarquee = $('.weather-marquee');

        try {
            let weather = await Utils.getWeather();

            if (!weather) {
                return;
            }

            let speed = 4;
            
            for (let row of weather) {
                $weatherMarquee.find('.content').append(`
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-auto">${row.city}</div>
                            <div class="col-auto">${row['Wx']['parameterName']}</div>
                        </div>
                        <div class="row">
                            <div class="col-auto">降雨機率：${row['PoP']['parameterName']}%</div>
                            <div class="col-auto">溫度：${row['MinT']['parameterName']}~${row['MaxT']['parameterName']}</div>
                        </div>
                    </div>
                `);
                
            }

            $weatherMarquee.attr('data-bs-interval', speed * 1000);
            $weatherMarquee.find(' .content > :first ').addClass('active');
        } catch (e) {
            console.error(e);
        }
    }

    $('#menu .navbar-nav a[target][href].nav-link').click(function() {
        $('#menu .navbar-nav a[target][href].nav-link.active').removeClass('active');
        $(this).addClass('active');
    });

    $('iframe[name=content]').on('load', function() {
        const src = $(this).attr('src');
        $('#menu .navbar-nav a[target][href].nav-link.active').removeClass('active');
        $(`#menu .navbar-nav a[target][href="${src}"].nav-link`).addClass('active');
    });

    initWeatherMarquee();
});