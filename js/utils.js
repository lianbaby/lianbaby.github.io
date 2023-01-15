(function (window) {
    function Utils() {}

    Utils.sleep = function (time) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), time);
        });
    };

    Utils.getTemplate = function (target) {
        const template = $(target).get(0);
        return $(template.content.cloneNode(true)).find(" > * ");
    };

    Utils.getSpinnerTemplate = function() {
        return $(`
            <div class="spinner spinner-container">
                <div
                    class="spinner-grow me-1 text-secondary"
                    style="width: 3rem; height: 3rem"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow me-1 text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div
                    class="spinner-grow spinner-grow-sm text-secondary"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
    }

    Utils.getSpinnerModalTemplate = function() {
        return $(`
            <div class="spinner-container bg-black">
                <div
                    class="spinner-grow me-1 text-light"
                    style="width: 3rem; height: 3rem"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow me-1 text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div
                    class="spinner-grow spinner-grow-sm text-light"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
    }
    
    /**
     * Wx 天氣現象
     * MaxT 最高溫度
     * MinT 最低溫度
     * CI 舒適度
     * PoP 降雨機率
     * @param {*} city 
     * @returns 
     */
    Utils.getWeather = async function (city) {
        let url =
            "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314";
        return new Promise((resolve, reject) => {
            $.get(url)
                .done(function (res) {
                    if (city) {
                        let weather = res.records.location.find(row => row.locationName === city);
                        
                        if (!weather) {
                            return resolve(null);
                        }

                        const data = { city: weather.locationName };
                        for (let row of weather.weatherElement) {
                            data[row.elementName] = row.time[0].parameter;
                        }

                        resolve([data]);
                    } else {
                        const array = [];
                        for (let location of res.records.location) {
                            const data = { city: location.locationName };
                            for (let row of location.weatherElement) {
                                data[row.elementName] = row.time[0].parameter;
                            }
                            array.push(data);
                        }

                        resolve(array);
                    }
                })
                .fail(function (e) {
                    reject(e);
                });
        });
    };

    window.Utils = Utils;
})(window);
