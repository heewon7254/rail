// 상단 그리드
let gridApi;

const gridOptions = {
    columnDefs: [
        { 
            headerName: '번호', 
            valueGetter: (params) => params.node.rowIndex + 1, 
            maxWidth: 80, 
            cellStyle: { textAlign: 'center' } 
        },
        { 
            headerName: "제목", 
            field: "title", 
            minWidth: 900,  
            cellClass: 'cell_text_overflow', 
            cellRenderer: (params) => {
            console.log(params);
             let {commentCnt = 0} = params.data;
             let commentCntContent = "";
            //  if(commentCnt != 0){
                commentCntContent = "<span class='comment-cnt'>60</span>"
            //  }
             return "<span class='title'>"+params.value +"</span>" + commentCntContent
         }},
        { 
            headerName: "목록1", 
            field: "name", 
            cellStyle: { textAlign: 'center' }
        },
        { 
            headerName: "목록2", 
            field: "date", 
            cellStyle: { textAlign: 'center' }
        },
        { 
            headerName: "목록3", 
            field: "cnt", 
            cellStyle: { textAlign: 'center' }
        }, //cellRenderer: CustomButtonComponent
        { 
            headerName: "목록4", 
            field: "file" ,
            cellRenderer: (params) => {
                if (params.value && params.value.length > 0) {
                    // value가 배열인 경우, 각 링크를 <a> 태그로 변환
                    // file type 에 따라 class명 변경 시 아이콘 변경됨
                    // ppt | doc | pdf | xls | zip | clip
                    return params.value.map((file, index) => {
                        return `<a href="${file.url}" class="ppt" target="_blank"></a>`;
                    }).join(' '); // 링크들을 ' | '로 구분
                } else {
                    return '';
                }
            },
         },
    ],
    defaultColDef: {
        flex: 1,
    },
    // pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    rowData: getData(),
};

function getData() {
    const rowData = [
        {
            name: '데이터',
            title: '제목입니다 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트 말줄임 테스트',
            date: '데이터',
            cnt: '데이터',
            file: [
                { url: "https://example.com/file1.pdf" },
                { url: "https://example.com/file2.pdf" }
            ] // 여러 개의 파일 링크
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
        {
            name: '데이터',
            title: '제목입니다',
            date: '데이터',
            cnt: '데이터',
            file: ''
        },
    ];
    return rowData;
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#myGrid_01");
    gridApi = agGrid.createGrid(gridDiv, gridOptions);
});