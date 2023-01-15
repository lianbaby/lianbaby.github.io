$(function() {
/**
     * 初始化作品集
     */
    async function initCollection() {
        const collections = [...Config.collections].filter(({ type }) => type === 'ART');

        const $spinner = Utils.getSpinnerTemplate();

        $('#collection').find('.spinner').remove();

        $('#collection').append($spinner);
        
        $('#collection').find('.content').empty();
        
        await Utils.sleep(2000);

        collections.sort((a, b) => {
            if (b.is_top === true) {
                return 1;
            }

            if (a.is_top === true) {
                return -1;
            }

            return 1;
        });
        
        for (let { icon, title } of collections) {
            const $template = Utils.getTemplate('template#collection-card');
            $template.find('img').attr('src', `../img/${icon}`);
            $template.find('img').attr('alt', title);
            $template.find('.card-title').text(title);

            $('#collection').find('.content').append($template);
        }

        $spinner.remove();
    }
    
    initCollection();
});