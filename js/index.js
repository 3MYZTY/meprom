

	

	function updateSearchTerm() {
    var searchTerm = document.getElementById('search-input').value;
    const html = [
		["js","/html/js.html","用于网站的javascript"],
		["html","/html/html.html","一般的网站所采取的代码--前端"],
		["css","/html/css.html"],
		["c++","/html/c++.html"],
		["c","/html/c.html"],
    // 可以继续添加其他项
	];
	matchText(searchTerm.toLowerCase(),html)
	
}



function matchText(inputText, list) {
    const matchedItems = [];
	
    if (!inputText.length == 0) {
        for (let i = 0; i < list.length; i++) {
            // 检查字段是否存在，然后再使用 includes 方法
            if (list[i][0] && list[i][0].includes(inputText) ||
                list[i][2] && list[i][2].includes(inputText)) {
                matchedItems.push({
                    name: list[i][0],          // 名字
                    website: list[i][1],       // 对应网站
                    description: list[i][2]    // 描述
                });
            }
        }
    }
	console.log()
	updateDropdown(matchedItems)
    return matchedItems;
}




function updateDropdown(filteredItems) {
    searchDropdown.innerHTML = '';

    if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
            const option = document.createElement('a');
            option.innerHTML = `<strong>${item.name}</strong> - ${item.description} <br>`; // 显示名字和描述
            option.href = item.website;    // 设置链接为对应网站
            option.addEventListener('click', function () {
                searchInput.value = item.name;
                searchDropdown.style.display = 'none';
            });
            searchDropdown.appendChild(option);
        });

        searchDropdown.style.display = 'block';
    } else {
        searchDropdown.style.display = 'none';
    }
}
// ... Your existing code ...

// Declare the searchContainer variable
const searchContainer = document.getElementById('searchcontainer');

document.addEventListener('click', function (event) {
    if (!searchContainer.contains(event.target)) {
        searchDropdown.style.display = 'none';
    }
});



im()
