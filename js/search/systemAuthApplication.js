// 요청 시스템 선택 그리드
let systemRequestApi;

const gridOptions = {
    columnDefs: [
        {
            headerName: '사용여부',
            field: "f01",
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: '시스템 명',
            field: "f02",
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: '시스템 설명',
            field: "f03",
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: 'DBMS 명',
            field: "f04",
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: '담당부서',
            field: "f05",
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: '담당자',
            field: "f06",
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: '비고',
            field: "f07",
            cellStyle: { textAlign: 'center' }
        },
    ],
    defaultColDef: { 
        flex: 1,
    },
    selection: {
        mode: 'multiRow',
        isRowSelectable: (rowNode) => {
            // "신청중" 상태의 행은 선택 불가
            return rowNode.data?.f07 !== '신청중'
        }
    },
    rowData: getData_01(),
    suppressDragLeaveHidesColumns: true,
};

function getData_01() {
    const rowData = [
        {
            f01: 'Y',
            f02: '발권',
            f03: '발권시스템',
            f04: 'POST',
            f05: '발권부',
            f06: '홍길동',
            f07: '신청중',
        },
        {
            f01: 'Y',
            f02: '발권',
            f03: '발권시스템',
            f04: 'POST',
            f05: '발권부',
            f06: '홍길동',
            f07: '신청',
        },
    ];
    return rowData;
}
  
// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#system_grid");
    systemRequestApi = agGrid.createGrid(gridDiv, gridOptions);
});

// ------------------------------------------------

// 결재선 설정 그리드
let gridApi_02;
let gridApi_03;

// 결재선 삭제 버튼
class deleteButtonRenderer {
    init(params) {
        // HTML 요소 생성
        this.eGui = document.createElement('div');
        this.eGui.classList.add('approval_btn');

        const link = document.createElement('a');
        link.innerHTML = '<span class="sr_only">삭제</span>';

        // 클릭 시 해당 로우 삭제
        link.addEventListener('click', (e) => {
            if (confirm('결재자를 삭제하시겠습니까?')) {
                // 해당 행 데이터
                const dataToRemove = params.node.data;

                params.api.applyTransaction({ remove: [dataToRemove] });
                params.api.refreshCells({ force: true }); // 행 삭제 후 그리드 업데이트
            }
        });

        this.eGui.appendChild(link);
    }

    getGui() {
        return this.eGui;
    }
}

const columnDefs = [
    {
        headerName: "사용 요청 시스템",
        children: [
            { 
                headerName: "시스템명", 
                field: "f01", 
                minWidth: 100, 
                cellStyle: { textAlign: 'center' },
                rowSpan: rowSpan,
                cellRenderer: params => {
                    // 병합된 첫 번째 셀에만 텍스트 표시
                    if (params.node.rowIndex === 0) {
                        return params.value; // 병합된 셀 텍스트
                    }
                    return ''; // 나머지 셀은 텍스트 비움
                },
                cellClass: 'cell_span', // 병합된 셀 스타일
            },
            { 
                headerName: "담당부서", 
                field: "f02", 
                minWidth: 85,
                cellStyle: { textAlign: 'center' },
                rowSpan: rowSpan,
                cellRenderer: params => {
                    // 병합된 첫 번째 셀에만 텍스트 표시
                    if (params.node.rowIndex === 0) {
                        return params.value; // 병합된 셀 텍스트
                    }
                    return ''; // 나머지 셀은 텍스트 비움
                },
                cellClass: 'cell_span' // 병합된 셀 스타일
            },
        ],
        headerClass: 'header_group_center',
    },
    { 
        headerName: "결재정보",
        cellStyle: { textAlign: 'center' },
        children: [
            { headerName: "", field: "", width: 40, cellRenderer: deleteButtonRenderer }, // 삭제 버튼
            { headerName: "번호", field: "f03", minWidth: 85, cellStyle: { textAlign: 'right' } },
            { headerName: "성명", field: "f04", minWidth: 85, cellStyle: { textAlign: 'center' }} ,
            { headerName: "성명", field: "f05", cellStyle: { textAlign: 'center' } },
            { headerName: "소속부서", field: "f06", cellStyle: { textAlign: 'center' } },
        ],
        headerClass: 'header_group_center'
    }
];

function rowSpan(params) {
    return params.api.getDisplayedRowCount(); // 행 전체 병합
}

const gridOptions_02 = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
        sortable: false, // 모든 열에 대해 정렬 비활성화
    },
    suppressRowTransform: true,
    rowData: getData_02(),
    domLayout: "autoHeight",
};

function getData_02() { 
    const rowData = [
        { 
            f01: '여객시스템',
            f02: '여객부',
            f03: '1',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
        {
            f01: '여객시스템',
            f02: '여객부',
            f03: '2',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
        {
            f01: '여객시스템',
            f02: '여객부',
            f03: '3',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
        {
            f01: '여객시스템',
            f02: '여객부',
            f03: '최종결재자',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
    ];
    return rowData;
}

const gridOptions_03 = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
        sortable: false, // 모든 열에 대해 정렬 비활성화
    },
    suppressRowTransform: true,
    rowData: getData_03(),
    domLayout: "autoHeight",
};

function getData_03() { 
    const rowData = [
        {
            f01: '발권시스템',
            f02: '발권부',
            f03: '1',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
        {
            f01: '발권시스템',
            f02: '발권부',
            f03: '2',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
        {
            f01: '발권시스템',
            f02: '발권부',
            f03: '3',
            f04: '사용자1',
            f05: '대리',
            f06: '부서1',
        },
    ];
    return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#myGrid_02");
    gridApi_02 = agGrid.createGrid(gridDiv, gridOptions_02);

    var gridDiv = document.querySelector("#myGrid_03");
    gridApi_03 = agGrid.createGrid(gridDiv, gridOptions_03);
});