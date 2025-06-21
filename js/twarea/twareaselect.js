let cityData = [];

let citySelect = document.getElementById('citySelect');
let townSelect = document.getElementById('townSelect');

// 載入本機我放的json
fetch('./js/twarea/twarea.json')
    .then(response => response.json())  // 這裡是 response 不是 reponse
    .then(data => {
        cityData = data;
        // console.log(cityData);

        cityOptionAdd();
    })
    .catch(error => {
        console.error('抓取資料出錯:', error);
    });

// 把所有縣市放放進下拉citySelect

function cityOptionAdd() {

    cityData.forEach(city => {
        let option = document.createElement('option');
        option.value = city.cityName;
        option.textContent = city.cityName;

        citySelect.appendChild(option);

    });

}

// 縣市改變時，也讓鄉鎮區的內容顯示改變


citySelect.addEventListener('change', function () {
    let selectedCity = this.value;

    // 清空舊鄉鎮
    townSelect.innerHTML = '<option value="">選擇鄉鎮區</option>';

    // 找到對應的縣市整包資料

    let city = cityData.find(item => item.cityName === selectedCity);

    if (city) {
        city.areaList.forEach(area => {
            let option = document.createElement('option');
            option.value = area.areaName;
            option.textContent = area.areaName;
            townSelect.appendChild(option);

        })
    }

})

