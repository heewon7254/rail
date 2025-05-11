// 모델
let gridApi;

// 즐겨찾기 버튼
class markCustomButton {
    eGui;
    eButton;
    eventListener;

    init() {
        this.eGui = document.createElement("div");
        this.eGui.classList.add("button_wrapper");
        let eButton = document.createElement("button");
        eButton.className = "mark_btn";
        this.eventListener = (e)=>{e.currentTarget.classList.toggle('on')};
        eButton.addEventListener("click", this.eventListener);
        this.eGui.appendChild(eButton);
    }

    getGui() {
        return this.eGui;
    }

    refresh() {
        return true;
    }

    destroy() {
        if (this.eButton) {
            this.eButton.removeEventListener("click", this.eventListener);
        }
    }
}

// 기능 셀 버튼 
class setCustomButton {
    eGui;
    eButton;
    eventListener;

    init(params) {
        this.eGui = document.createElement("div");
        this.eGui.classList.add("button_wrapper");

        // 표준사전의 경우 "상세보기" 버튼만 표시
        if (params.data.f01 === '표준사전') {
            let eButton = document.createElement("button");
            eButton.className = "gray_line";
            eButton.innerText = "상세보기";
            eButton.addEventListener("click", function() {
                alert("상세보기 버튼 클릭됨");
            });
            this.eGui.appendChild(eButton);
        } else {
            // 표준사전이 아닌 경우, 세 개의 버튼을 모두 표시
            const buttons = [
                { text: "데이터셋 요청", action: () => alert("데이터셋 요청 버튼 클릭됨") },
                { text: "시스템 사용 요청", action: () => alert("시스템 사용 요청 버튼 클릭됨") },
                { text: "상세보기", action: () => alert("상세보기 버튼 클릭됨") }
            ];

            buttons.forEach(button => {
                let eButton = document.createElement("button");
                eButton.className = "gray_line";
                eButton.innerText = button.text;
                eButton.addEventListener("click", button.action);
                this.eGui.appendChild(eButton);
            });
        } 
    }

    getGui() {
        return this.eGui;
    }

    refresh() {
        return true;
    }

    destroy() {
        if (this.eButton) {
            this.eButton.removeEventListener("click", this.eventListener);
        }
    }
}

const gridOptions = {
    columnDefs: [
        // { headerName: '번호', cellRenderer: (params) => params.node.rowIndex + 1, maxWidth: 65, cellStyle: { textAlign: 'center' }},
        { headerName: "", field: "f00", cellStyle: { textAlign: 'center' }, cellRenderer: markCustomButton, maxWidth: 50},
        { headerName: "메타유형", field: "f01",cellStyle: { textAlign: 'center' }},
        { headerName: "메타상세", field: "f02",cellStyle: { textAlign: 'center' } },
        { headerName: "메타 명", field: "f03",cellStyle: { textAlign: 'center' } },
        { headerName: "기능", field: "f04", cellStyle: { textAlign: 'center' }, minWidth: 330, cellRenderer: setCustomButton}, //cellRenderer: CustomButtonComponent
        { headerName: "최근 갱신일", field: "f05", editable: true, cellStyle: { textAlign: 'center' } },
        { headerName: "추가 정보 구분", field: "f06", editable: true, cellStyle: { textAlign: 'center' }, minWidth: 104},
        { headerName: "추가정보", field: "f07", editable: true, cellStyle: { textAlign: 'center'}, minWidth: 132},
    ],
    defaultColDef: {
        flex: 1,
    },
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    rowData: getData(),
};
 
function getData() {
    const rowData = [
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '모델',
            f02: '여객시스템',
            f03: '여객열차',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
    ];
    return rowData;
};
 

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#model_list");
    gridApi = agGrid.createGrid(gridDiv, gridOptions);
});

//표준사전
let gridApi_02;

const gridOptions_02 = {
    columnDefs: [
        // { headerName: '번호', cellRenderer: (params) => params.node.rowIndex + 1, maxWidth: 65, cellStyle: { textAlign: 'center' }},
        { headerName: "", field: "f00", cellStyle: { textAlign: 'center' }, cellRenderer: markCustomButton, maxWidth: 50}, // 즐겨찾기 버튼 추가
        { headerName: "메타유형", field: "f01",cellStyle: { textAlign: 'center' }, maxWidth: 120},
        { headerName: "메타상세", field: "f02",cellStyle: { textAlign: 'center' }},
        { headerName: "메타 명", field: "f03",cellStyle: { textAlign: 'center' } },
        { headerName: "기능", field: "f04", cellStyle: { textAlign: 'center' }, maxWidth: 95, cellRenderer: setCustomButton}, //cellRenderer: CustomButtonComponent
        { headerName: "최근 갱신일", field: "f05", cellStyle: { textAlign: 'center' } },
        { headerName: "추가 정보 구분", field: "f06", cellStyle: { textAlign: 'center' }, minWidth: 104},
        { headerName: "추가정보", field: "f07", cellStyle: { textAlign: 'center'}, minWidth: 132},
    ],
    defaultColDef: {
        flex: 1,
    },
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    rowData: getData_02(),
};

function getData_02() {
    const rowData = [
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
        {
            f01: '',
            f01: '표준사전',
            f02: '단어',
            f03: '단어',
            f04: '',
            f05: '2024-12-25',  
            f06: '담당부서',
            f07: '여객부서',
        },
    ];
    return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#dic_list");
    gridApi = agGrid.createGrid(gridDiv, gridOptions_02);
});