// 頁面載入完成
$(function() {
    $('#profile .profile').hover(profileHover());

    function initMessage() {
        const { sentence } = Config;
        const [ chinese, english ] = sentence[Date.now() % sentence.length]; 
        $('.message .chinese').text(chinese);
        $('.message .english').text(english);
    }

    /**
     * 自我介紹滑鼠移入以及移出事件處理
     * 為了移除時，需要等過場動畫完全消時，才能進行其他動畫的處理。
     */
    function profileHover() {
        const hovers = [];

        return async function(event) {
            if ('mouseenter' === event.type) {
                $(this).addClass('stop');
                hovers.push(true);
                return;
            }

            await Utils.sleep(800);
            hovers.splice(0, 1);
            if (hovers.length) {
                return;
            }

            $(this).removeClass('stop');
        }
    }
    
    initMessage();

    function initMarquee() {
        const speed = 150;
        const $marquee = $('.text[data-content]');
        let text = $marquee.attr('data-content');
        
        function write(text, idx) {
            $marquee.find('.content').append(text[idx]);

            if (text.length <= idx) {
                setTimeout(() => {
                    $marquee.find('.content').empty();
                    write(text, 0);
                }, speed * 10);
                return;
            }

            setTimeout(() => write(text, idx + 1), speed);
        }

        write(text, 0);
    }

    initMarquee();
});