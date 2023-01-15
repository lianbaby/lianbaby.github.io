$(function() {
/**
     * 初始化作品集
     */
    async function initCollection() {
        const collections = [...Config.collections].filter(({ type }) => type === 'PG');

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
        
        for (let { icon, title, url, desc, tag } of collections) {
            const $template = Utils.getTemplate('template#collection-card');
            $template.find('.card-img-top').attr('src', `../img/${icon}`);
            $template.find('.card-img-top').attr('alt', title);
            $template.find('.card-title').text(title);
            $template.find('.card-text').text(desc);
            $template.find('.card-link').attr('href', url);

            for (let value of tag) {
                $template.find('.tag').append(`<span class="badge text-bg-success ms-1">${value}</span>`);
            }

            $('#collection').find('.content').append($template);
        }

        $spinner.remove();
    }
    
    initCollection();
});