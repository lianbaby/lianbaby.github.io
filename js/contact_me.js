$(function() {

    const $spinner = Utils.getSpinnerTemplate();

    $('.map').append($spinner);
});

function onMapLoaded() {
    $('.map').find('.spinner').remove();
}