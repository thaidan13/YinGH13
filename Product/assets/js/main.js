const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


// SortProduct cũng đang lỗi

(function () {

    let field = document.querySelector('.pro-container');
    let li = Array.from(field.children);

    function SortProduct() {
        let select = document.getElementById('select');
        let ar = [];
        for (let i of li) {
            const last = i.lastElementChild;
            const x = last.textContent.trim();
            const y = Number(x.substring(1));
            i.setAttribute("data-price", y);
            ar.push(i);
        }
        this.run = () => {
            addevent();
        }
        function addevent() {
            select.onchange = sortingValue;
        }
        function sortingValue() {

            if (this.value === 'Default') {
                while (field.firstChild) { field.removeChild(field.firstChild); }
                field.append(...ar);
            }
            if (this.value === 'LowToHigh') {
                SortElem(field, li, true)
            }
            if (this.value === 'HighToLow') {
                SortElem(field, li, false)
            }
        }
        function SortElem(field, li, asc) {
            let dm, sortli;
            dm = asc ? 1 : -1;
            sortli = li.sort((a, b) => {
                const ax = a.getAttribute('data-price');
                const bx = b.getAttribute('data-price');
                return ax > bx ? (1 * dm) : (-1 * dm);
            });
            while (field.firstChild) { field.removeChild(field.firstChild); }
            field.append(...sortli);
        }
    }
    new SortProduct().run();
})();

// Pagination

function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
    var numberOfItems = $(".pro-container .pro").length;
    var limitPerPage = 8;
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    var paginationSize = 7;
    var currentPage;

    function showPage(whichPage) {
        if (whichPage < 1 || whichPage > totalPages) return false;
        currentPage = whichPage;

        $(".pro-container .pro").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

        $("#pagination li").slice(1, -1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("ac", item === currentPage).append($("<a>").addClass("page-link")
                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
        });

        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
    }

    $("#pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("«")),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("»"))
    );

    $(".pro-container").show();
    showPage(1);

    $(document).on("click", "#pagination li.current-page:not(.ac)", function () {
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function () {
        return showPage(currentPage + 1)
    });

    $(".previous-page").on("click", function () {
        return showPage(currentPage - 1)
    });
});

// Search 

const search = () => {
    const searchBox = document.getElementById("search-item").value.toUpperCase();
    const proItem = document.getElementById("product-list");
    const product = document.querySelectorAll(".pro");
    const proName = proItem.getElementsByTagName("h5");

    for (var i = 0; i < proName.length; i++) {
        let match = product[i].getElementsByTagName('h5')[0];

        if (match) {
            let textValue = match.textContent || match.innerHTML

            if (textValue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = "";
            } else {
                product[i].style.display = "none";
            }
        }
    }
}

// Voice Search đang lỗi hihi 
record
let mic;
mic = document.getElementById("voice-search");

// Voice Search

mic.onclick = () => {
    mic.classList.add('record');
    let recognition = new webkitSpeechRecognition;
    recognition.lang = 'vi-VN';
    // recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (e) => {
        const m = search.value = e.results[0][0].transcript;
        // const m = search.value = e.results[0][0].transcript.replace(/\.$/, '');
        showItem(m);
        mic.classList.remove('record');
    }
}
