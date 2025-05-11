// 메타제품이동버튼 
class metaButtonCellRenderer {
    init(params) {
        // HTML 요소 생성
        this.eGui = document.createElement('div');
        this.eGui.classList.add('btn_txt_inn');
        
        const link = document.createElement('a');
        link.innerHTML = '메타';
        link.classList.add('meta','prd');
        link.addEventListener('click', function(){
            alert('메타 이동버튼 클릭 됨');
        });

        const span = document.createElement('span');
        span.classList.add('underline');
        span.innerHTML = params.value; // 텍스트 추가

        this.eGui.appendChild(span);
        this.eGui.appendChild(link);
    }

    getGui() {
        return this.eGui;
    }
}

// 품질제품이동버튼 
class qualityButtonCellRenderer {
    init(params) {
        // HTML 요소 생성
        this.eGui = document.createElement('div');
        this.eGui.classList.add('btn_txt_inn');
        
        const link = document.createElement('a');
        link.innerHTML = '품질';
        link.classList.add('quality','prd');
        link.addEventListener('click', function(){
            alert('품질 이동버튼 클릭 됨');
        });

        const span = document.createElement('span');
        span.classList.add('underline');
        span.innerHTML = params.value; // 텍스트 추가

        this.eGui.appendChild(span);
        this.eGui.appendChild(link);
    }

    getGui() {
        return this.eGui;
    }
}

// 상세조회팝업 > 메타(탭) 그리드
let gridApi;

const gridOptions = {
    columnDefs: [
        { headerName: '번호', cellRenderer: (params) => params.node.rowIndex + 1, maxWidth: 65, cellStyle: { textAlign: 'center' }},
        { headerName: "컬럼아이디", field: "f01", cellRenderer: metaButtonCellRenderer},
        { headerName: "컬럼명", field: "f02"},
        { headerName: "데이터 타입", field: "f03",cellStyle: { textAlign: 'center' } },
        { headerName: "PK여부", field: "f04", cellStyle: { textAlign: 'center' }},
        { headerName: "개인정보여부", field: "f05", cellStyle: { textAlign: 'center' }},
        { headerName: "표준 용어", field: "f06", editable: true, cellRenderer: metaButtonCellRenderer },
        { headerName: "표준 도메인", field: "f07", editable: true, cellStyle: { textAlign: 'center' }, cellRenderer: metaButtonCellRenderer},
    ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData(),
};
 
function getData() {
    const rowData = [
        {
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: 'Y',
            f05: '2024-12-25',
            f06: '담당부서',
             f07: 'ID_NN_10',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#meta_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions);
});

// 상세조회팝업 > 표준사전(탭) > 연관시스템명 그리드
const gridOptions_01 = {
    columnDefs: [
        { headerName: "연관 시스템 명", field: "f01"},
    ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData_01(),
};
 
function getData_01(){
    const rowData = [
        {
            f01: '철도 시스템',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#dic_system_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_01);
});

// 상세조회팝업 > 표준사전(탭) > 테이블명 그리드
const gridOptions_02 = {
    columnDefs: [
        { headerName: "테이블 명", field: "f01", cellStyle: {textAlign: 'center'}, minWidth: 150, cellRenderer: metaButtonCellRenderer},
        { headerName: "테이블 논리 명", field: "f02"},
    ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData_02(),
};

function getData_02(){
    const rowData = [
        {
            f01: 'TAB_NAME',
            f02: '테이블 논리명',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#dic_table_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_02);
});

// 상세조회팝업 > 표준사전(탭) > 컬럼명 그리드
const gridOptions_03 = {
    columnDefs: [
        { headerName: "컬럼명", field: "f01", cellStyle: {textAlign: 'center'}, minWidth: 110, cellRenderer: metaButtonCellRenderer},
        { headerName: "컬럼 논리 명", field: "f02", cellStyle: {textAlign: 'center'}},
        { headerName: "도메인", field: "f03", cellStyle: {textAlign: 'center'}, minWidth: 145, cellRenderer: metaButtonCellRenderer},
        { headerName: "자료형", field: "f04", cellStyle: {textAlign: 'center'}},
    ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData_03(),
};
 
function getData_03(){
    const rowData = [
        {
            f01: 'COL1',
            f02: 'COL_NM',
            f03: 'NM_VC50',
            f04: 'VARCHAR(50)',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#dic_column_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_03);
});

// 상세조회팝업 > 품질(탭) > 그리드
const gridOptions_04 = {
    columnDefs: [
        { headerName: '번호', cellRenderer: (params) => params.node.rowIndex + 1, maxWidth: 65, cellStyle: { textAlign: 'center' }},
        {
            headerName: "컬럼아이디",
            field: "f01",
            cellRenderer: qualityButtonCellRenderer,
            minWidth: 150
        },
        { headerName: "컬럼명", field: "f02"},
        { headerName: "설정여부", field: "f03", cellStyle: {textAlign: 'center'}},
        {
            headerName: "프로파일링",
            headerClass: 'header_group_center',
            children: [
                { headerName: "컬럼", field: "f04", cellStyle: {textAlign: 'center'}, minWidth: 100, cellRenderer: qualityButtonCellRenderer}, 
                { headerName: "날짜", field: "f05", cellStyle: {textAlign: 'center'}},
                { headerName: "패턴", field: "f06", cellStyle: {textAlign: 'center'}, minWidth: 100, cellRenderer: qualityButtonCellRenderer}, 
                { headerName: "코드", field: "f07",cellStyle: {textAlign: 'center'}, minWidth: 100, cellRenderer: qualityButtonCellRenderer},
                { headerName: "중복", field: "f08", cellStyle: {textAlign: 'center'}}, 
                { headerName: "관계", field: "f09", cellStyle: {textAlign: 'center'}},
            ],
        },
        {
            headerName: "품질지표",
            headerClass: 'header_group_center',
            children: [
                { headerName: "건수", field: "f10", cellStyle: {textAlign: 'center'}}, 
                { headerName: "오류건수", field: "f11", cellStyle: {textAlign: 'center'}}, 
                { headerName: "오류일(%)", field: "f12", cellStyle: {textAlign: 'center'}}
            ],
        },
      ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData_04(),
};
 
function getData_04(){
    const rowData = [
        {
            f01: 'CLNT_ID',
            f02: '의뢰인ID',
            f03: 'Y',
            f04: '1',
            f05: '1',
            f06: '1',
            f07: '1',
            f08: '1',
            f09: '1',
            f10: '9,999',
            f11: '999',
            f12: '90,99',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#quality_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_04);
});

// 상세조회팝업 > 데이터 미리 보기(탭) 그리드 
const gridOptions_05 = {
    columnDefs: [
        { 
            headerName: "COL1_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f01"}]
        },
        { 
            headerName: "COL2_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f02"}]
        },
        { 
            headerName: "COL3_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f03"}]
        },
        { 
            headerName: "COL4_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f04"}]
        },
        { 
            headerName: "COL5_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f05"}]
        },
        { 
            headerName: "COL6_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f06"}]
        },
        { 
            headerName: "COL7_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f07"}]
        },
        { 
            headerName: "COL8_NM", 
            headerClass: 'header_group_center',
            children: [{ headerName: "컬럼1논리명", field: "f08"}]
        },
      ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData_05(),
};
 
function getData_05(){
    const rowData = [
        {
            f01: 'DATA1',
            f02: 'DATA2',
            f03: 'DATA3',
            f04: 'DATA4',
            f05: 'DATA5',
            f06: 'DATA6',
            f07: 'DATA7',
            f08: 'DATA8',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#data_preview");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_05);
});

// 상세조회팝업 > 댓글 남기기(탭) 그리드
// 삭제/저장 버튼 
class setCustomButton {
    eGui;
    eButton;
    eventListener;

    init(params) {
        this.eGui = document.createElement("div");
        this.eGui.classList.add("button_wrapper");

        const buttons = [
            { text: "삭제", action: () => alert("데이터셋 요청 버튼 클릭됨")},
            { text: "저장", action: () => alert("시스템 사용 요청 버튼 클릭됨")},
        ];

        buttons.forEach(button => {
            let eButton = document.createElement("button");
            eButton.className = "gray_line";
            eButton.innerText = button.text;
            eButton.addEventListener("click", button.action);
            this.eGui.appendChild(eButton);
        });
    }

    getGui() {
        return this.eGui;
    }
}

const gridOptions_06 = {
    columnDefs: [
        { 
            headerName: "사용자명", 
            field: "f01",
            cellStyle: {textAlign: 'center'},
        },
        { 
            headerName: "소속부서", 
            field: "f02",
        },
        { 
            headerName: "입력날짜", 
            field: "f03",
            cellStyle: {textAlign: 'center'},
        },
        {
            headerName: "내용", 
            field: "f04",
            editable: true,
            headerClass: "editable",
            minWidth: 350,
        },
        {
            headerName: "", 
            field: "f05",
            cellRenderer: setCustomButton
        },
      ],
    defaultColDef: {
        flex: 1,
    },
    rowData: getData_06(),
};
 
function getData_06(){
    const rowData = [
        {
            f01: '홍길동',
            f02: '소속부서명',
            f03: '2024-12-25 12:00:00',
            f04: '메타에 대한 의견 및 댓글을 남길 수 있습니다',
            f05: '',
        },
    ];
    return rowData;
};

document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#comment_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_06);
});

// 상세조회팝업 및 부서/사용자 선택 팝업
$(document).ready(function(){
    // 상세조회 팝업 탭 클릭 시 해당 내용 보임
    $('.detail_popup .popup_tab_area a').click(function(){
        let idx = $(this).index();
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
        $('.popup_tab_con_area .tab_con').removeClass('on');
        $('.popup_tab_con_area .tab_con').eq(idx).addClass('on');
        dataErrorBtn();
    });

    // 상세조회팝업 - 데이터 오류 접수 탭 일 때만 오류접수등록 버튼 보임
    const dataErrorBtn = ()=>{
        if($('.data_error_tab').hasClass('on')){
            $('.data_error_btn').addClass('on');
        }else{
            $('.data_error_btn').removeClass('on');
        }
    }
    dataErrorBtn();
    
    // 상세조회팝업 - 즐겨찾기, 좋아요 버튼 클릭 시 활성화
    $('.detail_popup .title_btn_area button').click((e)=>{
        $(e.currentTarget).toggleClass('on');
    });

    // jquery-ui - select -  https://jqueryui.com/selectmenu/ 
    // 부서/사용자 선택 팝업 select
    $(".select_custom select").each(function() {
        $(this).selectmenu({
            appendTo: $(this).closest(".select_custom")
        });
    });

    // 부서 사용자 선택 팝업
    $('.user_popup .user_select_area .list a').each(function() {
        const $this = $(this);
        
        if ($this.hasClass('on')) {
            $this.siblings('.sub_list').slideDown('fast');
        }
        
        $this.on('click', function() {
            $this.toggleClass('on').siblings('.sub_list').stop().slideToggle('fast');
        });
    });
});
