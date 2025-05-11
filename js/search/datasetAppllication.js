// 컬럼 그리드
let gridApi;

function getData() {
    return [
        {
            f00: { value: "컬럼영문명", checked: true },
            f01: { value: "col_nm_00", checked: true },
            f02: { value: "col_nm_01", checked: true },
            f03: { value: "col_nm_02", checked: true }, 
            f04: { value: "col_nm_03", checked: true }, 
            f05: { value: "col_nm_04", checked: true }, 
        },
        {
            f00: { value: "컬럼명"}, 
            f01: { value: "컬럼명_00"}, 
            f02: { value: "컬럼명_01"}, 
            f03: { value: "컬럼명_02"}, 
            f04: { value: "컬럼명_03"}, 
            f05: { value: "컬럼명_03"}, 
        },
        { 
            f00: { value: "자료 형" , }, 
            f01: { value: "TIMESTAMP", }, 
            f02: { value: "NUMERIC", },
            f03: { value: "BOOLEAN", },
            f04: { value: "TIME" },
            f05: { value: "INTEGER" },
        },
        {
            f00: { value: "크기", }, 
            f01: { value: "10", }, 
            f02: { value: "40", },
            f03: { value: "8", },
            f04: { value: "10" },
            f05: { value: "10" },
        },
        {
            f00: { value: "민감정보여부(대응방법)"}, 
            f01: { value: "Y(암호화)"}, 
            f02: { value: "Y"},
            f03: { value: "N" },
            f04: { value: "N" },
            f05: { value: "N" },
        },
        {
            f00: { value: "공백 여부"}, 
            f01: { value: "Y"}, 
            f02: { value: "Y"},
            f03: { value: "N"},
            f04: { value: "N"},
            f05: { value: "N"},
        },
        {
            f00: { value: "최소값"}, 
            f01: { value: "10"}, 
            f02: { value: "10"}, 
            f03: { value: "500"}, 
            f04: { value: "20"}, 
            f05: { value: "20"}, 
        },
        {
            f00: { value: "최대값"}, 
            f01: { value: "1000"}, 
            f02: { value: "1000"}, 
            f03: { value: "500"}, 
            f04: { value: "2000"}, 
            f05: { value: "2000"},  
        }
    ];
};

// 기본 열 정의 생성 함수
function createColumnDefs(rowData) {
    const numFields = Object.keys(rowData[0]).length;
    return Array.from({ length: numFields }, (_, i) => ({
        headerName: "",
        field: `f${i.toString().padStart(2, '0')}`,
        cellClass: i === 0 ? 'row_title' : '', // 첫번째 열 클래스명 추가 시 스타일 적용
        pinned: i === 0, // 첫번째 열 고정
        maxWidth: i === 0 ? 160 : null,
        valueGetter: (params) => {
            const cellData = params.data[params.colDef.field];
            return cellData ? cellData.value : ''; // `value` 속성 반환
        },
        cellRenderer: (params) => {
            const cellData = params.value;
            if (typeof cellData === 'string') {
                return cellData; // 단순 문자열 렌더링
            }
            // DOM 요소가 필요한 경우 추가 처리
            if (params.node.rowIndex === 0) {
                // 체크박스 예외 처리
                return renderCheckbox(params);
            }
            return cellData || '';
        },
        editable: (params) => {
            const cellData = params.data[`f${i.toString().padStart(2, '0')}`];
            // 첫 번째 열(f00)은 편집 불가능, 나머지 셀은 cellData의 editable 속성에 따라 편집 가능 여부
            return i !== 0 && cellData ? cellData.editable : false;
        },
        rowSpan: (params) => {
            // f00 열에서만 rowSpan 적용
            const colId = params.column.getColId();
            if (colId === "f00" && params.data.f00 && params.data.f00.value === "조건설정") {
                return 2; // 두 행을 차지
            }
            return 1; // 나머지 셀은 기본적으로 1
        },
        valueSetter: (params) => {
            const cellData = params.data[params.colDef.field];
            if (cellData && params.newValue !== undefined) {
                cellData.value = params.newValue; // 새 값 설정
                return true;
            }
            return false;
        },
    }));
}

// 셀 내용 렌더링 함수
function renderCellContent(params) {
    const { value, checked } = params.value || {};

    // 첫 번째 행: 체크박스 포함
    if (params.node.rowIndex === 0) {
        const container = document.createElement('label');
        container.classList.add('chk_s');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked || false;

        const checkboxImg = document.createElement('span');
        checkboxImg.classList.add('chk_img');

        container.appendChild(checkbox);
        container.appendChild(checkboxImg);
        container.appendChild(document.createTextNode(`${value || ''}`));

        return container;
    } else if (value === "조건설정") {
       // 조건설정 셀에 텍스트와 버튼 렌더링
        const container = document.createElement('div');
        container.classList.add('row_btn_wrap');

        // 텍스트
        const textNode = document.createTextNode("조건설정");
        container.appendChild(textNode);

        // 조건 삭제 버튼
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete_row_btn');
        deleteButton.addEventListener('click', (event) => deleteCondition(event));

        // container.appendChild(addButton);
        container.appendChild(deleteButton);

        return container;
    } else if (typeof value === "string" && value.includes("Option")) {
        // selectRow: 셀렉트 박스 렌더링
        const container = document.createElement('div');
        container.classList.add('set_option');
        container.innerHTML = value;
        return container;
    } else {
        // 기타: 일반 텍스트 렌더링
        return value || '';
    }
}

// 조건 추가
function addCondition() {
    const lastRowIndex = gridApi.getDisplayedRowCount() - 1;  // 마지막 행 인덱스 가져오기
    const selectRow = {
        f00: { value: "조건설정", checked: false },
        f01: { value: createSelectElement(["Option 1", "Option 2", "Option 3"]), editable: false },
        f02: { value: createSelectElement(["Option 1", "Option 2", "Option 3"]), editable: false },
        f03: { value: createSelectElement(["Option 1", "Option 2", "Option 3"]), editable: false },
        f04: { value: createSelectElement(["Option 1", "Option 2", "Option 3"]), editable: false },
        f05: { value: createSelectElement(["Option 1", "Option 2", "Option 3"]), editable: false },
    };

    const editableRow = {
        f00: { value: null, editable: false },
        f01: { value: "1999-09-09", editable: true },
        f02: { value: "123.123", editable: true },
        f03: { value: "0", editable: true },
        f04: { value: "12:23:23", editable: true },
        f05: { value: "123", editable: true },
    };

    // 그리드에 새 조건 행 추가
    gridApi.applyTransaction({ add: [selectRow, editableRow], addIndex: lastRowIndex + 1 });

    // 추가된 마지막 행이 보이도록 스크롤 이동
    setTimeout(() => {
        const newRowCount = gridApi.getDisplayedRowCount();
        gridApi.ensureIndexVisible(newRowCount - 1, 'bottom');
    }, 0);
}

// 조건 삭제
function deleteCondition(event) {
    const target = event.target;
    const rowElement = target.closest('.ag-row');
    if (!rowElement) {
        return;
    }

    const rowIndex = rowElement.getAttribute('row-index');
    if (!rowIndex) {
        return;
    }

    const rowNode = gridApi.getDisplayedRowAtIndex(rowIndex);
    const nextRowIndex = parseInt(rowIndex) + 1;
    const nextRowNode = gridApi.getDisplayedRowAtIndex(nextRowIndex);

    if (!rowNode || !rowNode.data) {
        return;
    }

    // 현재 행을 삭제하고, 다음 행이 존재하면 삭제
    gridApi.applyTransaction({ remove: [rowNode.data] });
    if (nextRowNode && nextRowNode.data) {
        gridApi.applyTransaction({ remove: [nextRowNode.data] });
    }
}

// 그리드 마우스 오버 시 컬럼 강조 함수
function handleCellMouseOver(event) {
    const colId = event.column.getColId();
    document.querySelectorAll(`.ag-cell[col-id="${colId}"]`).forEach(cell => {
        if (!cell.classList.contains('row_title')) {
            cell.classList.add('hover_column');
        }
    });
}

// 그리드 마우스 아웃 시
function handleCellMouseOut(event) {
    const colId = event.column.getColId();
    document.querySelectorAll(`.ag-cell[col-id="${colId}"]`).forEach(cell => {
        if (!cell.classList.contains('row_title')) {
            cell.classList.remove('hover_column');
        }
    });
}

// select 생성하는 함수
function createSelectElement(options) {
    const select = document.createElement('select');
    select.classList.add('grid_select');
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
    });
    return select.outerHTML;
}

const rowData = getData();
const columnDefs = createColumnDefs(rowData);

// 그리드 옵션 설정
const gridOptions = {
    defaultColDef: { width: 200 },
    columnDefs: columnDefs,
    rowData: rowData,
    suppressRowHoverHighlight: true, // 마우스 오버 시 행 강조 옵션
    onCellMouseOver: handleCellMouseOver,
    onCellMouseOut: handleCellMouseOut
};

// 그리드 초기화
document.addEventListener("DOMContentLoaded", function () {
    const gridDiv = document.querySelector("#rawdata_column_grid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions);

    // 첫 로드 시 실행
    addCondition();

    // 추가 버튼 클릭 시 조건 추가
    document.querySelector('.add_row_btn').addEventListener('click', addCondition);
});

// -------------------------------------------------------------------------------------------------------------------

// 결재선 설정 그리드
let gridApi_02;

// 결재선 삭제 버튼
class deleteButtonRenderer {
    init(params) {
        // HTML 요소 생성
        this.eGui = document.createElement('div');
        this.eGui.classList.add('approval_btn');

        const link = document.createElement('a');
        link.innerHTML = '<span class="sr_only">삭제</span>';

        // 클릭 시 해당 로우 삭제
        link.addEventListener('click', (e) => { // 삭제 팝업 활성화 추가 
            alert('결재자를 삭제하시겠습니까?')
            // 해당 행 데이터 
            const dataToRemove = params.node.data; 
            // 현재 그리드 데이터 
            const rowCount = params.api.getDisplayedRowCount(); 
            // 최종결재자가 아니고, 그리드에 최소 두 행 이상 남아있을 때만 삭제 
            if (rowCount > 1) { 
                params.api.applyTransaction({ remove: [dataToRemove] }); 
            }
            else { 
                alert('결재자는 최소 한 명 이상 선택해야 합니다'); 
            }
        });

        this.eGui.appendChild(link);
    }

    getGui() {
        return this.eGui;
    }
}

const gridOptions_02 = {
    columnDefs: [ 
        { 
            headerName: "",
            maxWidth: 60,
            cellStyle: { textAlign: 'center' },
            cellRenderer: deleteButtonRenderer,       
        },
        { 
            headerName: "결재번호",
            field: "f01",
            maxWidth: 90,
            cellStyle: { textAlign: 'right' }
        },
        { 
            headerName: "결재자명",
            field: "f02",
            cellStyle: { textAlign: 'center' },
        },
        {
            headerName: "직급",
            field: "f03",
            cellStyle: { textAlign: 'center' },
        },
        { 
            headerName: "소속부서",
            field: "f04",
            cellStyle: { textAlign: 'center' },
        },
    ],
    defaultColDef: {
        flex: 1,
    },
    rowSelection: 'single',
    // pagination: true,
    // paginationPageSize: 10,
    // paginationPageSizeSelector: [10, 20, 50, 100],
    rowData: getData_02(),
};

function getData_02() {
    const rowData = [
        {
            f01: '1',
            f02: '사용자1',
            f03: '대리',
            f04: '부서1',
        },
        {
            f01: '2',
            f02: '사용자1',
            f03: '대리',
            f04: '부서1',
        },
        {
            f01: '3',
            f02: '사용자1',
            f03: '대리',
            f04: '부서1',
        },
        {
            f01: '최종결재자',
            f02: '사용자1',
            f03: '대리',
            f04: '부서1',
        },
    ];
    return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#myGrid_02");
    gridApi_02 = agGrid.createGrid(gridDiv, gridOptions_02);
});