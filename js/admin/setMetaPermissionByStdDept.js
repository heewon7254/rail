let gridApi_01;

const gridOptions_01 = {
    columnDefs: [
        {
            headerName: '번호', 
            valueGetter: (params) => params.node.rowIndex + 1, 
            maxWidth: 65, 
            cellStyle: { textAlign: 'center' }
        },
        { 
            headerName: "목록1",
            field: "f01",
            cellStyle: { textAlign: 'center' },
        },
        { 
            headerName: "목록2",
            field: "f02",
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
    rowData: getData_01(),
};

function getData_01() {
    const rowData = [
        {
            f01: '더미데이터',
            f02: '더미데이터',
        },
    ];
    return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#myGrid_01");
    gridApi_01 = agGrid.createGrid(gridDiv, gridOptions_01);
});

// 그리드 헤더 체크박스 커스텀
class CustomHeader {
    init(params) {
        this.params = params;
        this.eGui = document.createElement('div');
		this.eGui.classList.add('h_cell','ag_header_check');
        this.eGui.innerHTML = `
   			<label class="chk_s">
				<input type="checkbox" class="select_all">
				<span class="chk_img" aria-hidden="true"></span>
			</label>${params.innerHTML}`;
        
        this.selectAllCheckbox = this.eGui.querySelector('.select_all');
        this.selectAllCheckbox.addEventListener('change', this.onCheckboxChange.bind(this));

        // 최초에 모든 셀이 체크되었는지 검사해서 헤더 상태 업데이트
        this.updateSelectAllCheckboxState();
        
        // 셀 값이 변경될 때마다 헤더 체크박스 상태 업데이트
        this.params.api.addEventListener('cellValueChanged', this.updateSelectAllCheckboxState.bind(this));
		// 처음 로딩이 완료된 후 헤더 체크박스 상태 업데이트
        this.params.api.addEventListener('firstDataRendered', this.updateSelectAllCheckboxState.bind(this));
    }

    onCheckboxChange(event) {
        const checked = event.target.checked;
        this.params.api.forEachNode(function (node) {
            node.setDataValue('f01', checked);  // 모든 행의 f01 필드를 체크/체크 해체
        });
    }

    // 모든 셀 체크 상태를 확인해서 헤더 체크박스 상태 업데이트
    updateSelectAllCheckboxState() {
        let allChecked = true;
        this.params.api.forEachNode(function (node) {
            if (!node.data.f01) {
                allChecked = false;
            }
        });
        this.selectAllCheckbox.checked = allChecked;  // 모든 셀이 체크된 경우에만 체크
    }

    getGui() {
        return this.eGui;
    }
}

const gridOptions_02 = {
    columnDefs: [
        {
            headerName: '번호', 
            valueGetter: (params) => params.node.rowIndex + 1, 
            maxWidth: 65, 
            cellStyle: { textAlign: 'center' }
        },
        { 
            headerComponent: CustomHeader,
            headerComponentParams: { innerHTML: "여부" },
            cellRenderer: "agCheckboxCellRenderer",  // 렌더러를 체크박스로 설정            
            field: "f01",
            cellStyle: { textAlign: 'center' },
            editable: true,
            headerClass: ['editable','header_group_center'] // editable: 편집가능 header_group_center: 헤더 텍스트 중간 정렬 
        },
        { 
            headerName: "목록1",
            field: "f02",
        },
        { 
            headerName: "목록2", 
            field: "f03",
            cellStyle: { textAlign: 'center' },
        },
        { 
            headerName: "목록3", 
            field: "f04",
            cellStyle: { textAlign: 'center' },
        },
    ],
    defaultColDef: {
        flex: 1,
    },
    // pagination: true,
    // paginationPageSize: 10,
    // paginationPageSizeSelector: [10, 20, 50, 100],
    rowData: getData_02(),
};

let gridApi_02;

function getData_02() {
    const rowData = [
        {
            f01: true,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
        {
            f01: false,
            f02: '더미데이터',
            f03: '더미데이터',
            f04: '더미데이터',
        },
    ];
    return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
    var gridDiv = document.querySelector("#myGrid_02");
    gridApi_02 = agGrid.createGrid(gridDiv, gridOptions_02);
});