$(function() {

    async function initSkill() {
        const skills = [...Config.skills];

        for (const skill of skills) {
            $('#skill').append(`
                <li class="list-group-item bg-transparent d-flex">
                    <div style="width: 120px;"><b>${skill.name}</b></div>
                    <div class="progress align-self-center flex-fill">
                        <div class="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="${skill.value}" aria-valuemin="${skill.min}" aria-valuemax="${skill.max}"></div>
                    </div>
                    <div class="text-end" style="width: 30px">${skill.value}</div>
                </li>`
            );
        }

        $('#skill .progress-bar').css('width', function() {
            const min = +($(this).attr('aria-valuemin') || 0);
            const max = +($(this).attr('aria-valuemax') || 0);
            const value = +($(this).attr('aria-valuenow') || 0);

            let percentage = 0;
            if (max - min > 0) {
                percentage = Math.min(((value / (max - min)) * 100), 100);
            }


            if (percentage >= 75) {
                $(this).addClass('bg-success');
            } else if (percentage >= 50) {
                $(this).addClass('bg-info');
            } else if (percentage >= 25) {
                $(this).addClass('bg-warning');
            } else {
                $(this).addClass('bg-danger');
            }

            return percentage + '%';
        });
    }

    initSkill();
});