function updateSearchTerm() {
    var searchTerm = document.getElementById('search-input').value;
    const html = [
		["搜索框","#searchContainer","114514"],
		["标题","#logoPlaceholder","114514"],
		["css","/html/css.html","114514"],
		["c++","/html/c++.html","114514"],
		["c","/html/c.html","114514"],
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

const searchContainer = document.getElementById('searchcontainer');

document.addEventListener('click', function (event) {
    if (!searchContainer.contains(event.target)) {
        searchDropdown.style.display = 'none';
    }
});

function jscolor(code, codeInput) {
    // 匹配标识符的正则表达式
    const identifierList = ['function', 'let', 'var', 'const', 'if', 'else', 'for', 'while'];
    const identifierList1 = ['//.*?(\\n|$)', '\\/\\*.*?\\*\\/', '`', '\\[.*?\\]|\\b\\d+\\b', '$']; // 修改这一行

    const identifierRegex = new RegExp('\\b(' + identifierList.join('|') + ')\\b', 'g');
    const identifierRegex1 = new RegExp('(' + identifierList1.join('|') + ')', 'g'); // 修改这一行

    // 使用正则表达式替换文本框中的标识符并添加对应的类
    const jsCode = code.replace(identifierRegex, '<span class="identifier">$1</span>')
        .replace(identifierRegex1, match => {
            // 如果是注释，添加 comment 类
            if (match.startsWith('//') || match.startsWith('/*') ) {
                return '<span class="comment">' + match + '</span>';
            }
			if (match.startsWith('[') || /^\d+$/.test(match) ) {
                return '<span class="number">' + match + '</span>';
            }
            return match;
        });

    console.log(jsCode);

    // 获取元素时，使用 document.getElementById
    const x = document.getElementById(codeInput);
    x.innerHTML = jsCode;
}



function htmlcolor(code, codeInput) {
    const html = ['function', 'let', 'var', 'const', 'if', 'else', 'for', 'while'];
    const html1 = ['//', '\\/\\*', '\\*\\\\', '`']; // 修改这一行
    const html2 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const html3 = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br',
    'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn',
    'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
    'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
    'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
    'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea',
    'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', '/<' ,'/>'
];

    // 匹配标识符的正则表达式
    const htmlRegex = new RegExp('\\b(' + html.join('|') + ')\\b', 'g');
    const htmlRegex1 = new RegExp('(' + html1.join('|') + ')', 'g'); // 修改这一行
    const htmlRegex2 = new RegExp('\\b(' + html2.join('|') + ')\\b', 'g');
    const htmlRegex3 = new RegExp('\\b(' + html3.join('|') + ')\\b', 'g');

    // 使用正则表达式替换文本框中的标识符并添加对应的类
    const htmlCode = code.replace(htmlRegex, '<span class="identifier">$1</span>')
                                .replace(htmlRegex1, '<span class="comment">$1</span>')
                                .replace(htmlRegex2, '<span class="number">$1</span>')
                                .replace(htmlRegex3, '<span class="identifier">$1</span>');

    console.log(htmlCode);

    // 获取元素时，使用 document.getElementById
    const x = document.getElementById(codeInput);
    x.innerHTML = htmlCode;
}



/*网站使用依赖*/
