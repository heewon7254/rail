var AgGridCommon = (function() {

      // 기본 그리드 설정
      var defaultGridOptions = {
        columnDefs: [],
        rowData: [],
        pagination: true,
        paginationPageSize: 20,
        domLayout: 'autoHeight',
        defaultColDef: {
          sortable: true,
          filter: true,
          resizable: true,
        },
        parseResponse : function(api, response) {
           // 데이터를 트랜잭션 방식으로 그리드에 추가
           api.applyTransaction({ add: response });
        }
      };
    function clearGridData(api) {
        var allRows = [];
        var rowCount = api.getDisplayedRowCount();

        for (var i = 0; i < rowCount; i++) {
            var rowNode = api.getDisplayedRowAtIndex(i);
            if (rowNode) {
                allRows.push(rowNode.data);
            }
        }

        // 기존 데이터를 삭제 트랜잭션으로 처리
        api.applyTransaction({ remove: allRows });
    }

    // 데이터를 가져와서 그리드에 설정하는 함수
    function fetchData(api, apiUrl, searchParams = {}, gridOptions) {
        clearGridData(api);
        $.ajax({
            url: apiUrl,
            method: 'GET',
            data: searchParams, // 검색 파라미터 추가
            success: function(response) {
                gridOptions.parseResponse.call(this, api, response);
            },
            error: function(error) {
                console.error("데이터 로드 중 오류 발생:", error);
            }
        });
    }

      // 기본 API 함수 (필요시 override)
      var defaultAPIs = {
        onFirstDataRendered: function(params) {
          params.api.sizeColumnsToFit();
        },
        onRowClicked: function(event) {
          console.log("Row clicked", event.data);
        }
      };

      // 그리드 초기화 함수
      function initGrid(gridId, customOptions = {}, customAPIs = {}, apiUrl = '', pagination = true, searchParams = {}) {
        // 기본 옵션과 사용자 지정 옵션을 병합
        var gridOptions = $.extend(true, {}, defaultGridOptions, customOptions);

        // 기본 API와 사용자 지정 API를 병합
        gridOptions = $.extend(true, defaultAPIs, gridOptions, customAPIs);
        function onGridReady(params){
            params.api.sizeColumnsToFit();
            fetchData(params.api, apiUrl, {} , gridOptions)
        }
        // 서버로부터 데이터를 불러오는 pagination 및 검색 처리 로직
        if (pagination) {
          gridOptions.rowModelType = 'clientSide';
          gridOptions.cacheBlockSize = gridOptions.paginationPageSize || 20;
        }
        gridOptions.onGridReady = onGridReady;
        // 그리드 렌더링
        var gridDiv = document.getElementById(gridId);
        new agGrid.Grid(gridDiv, gridOptions);
        gridOptions.api.fetchData = function(){
            fetchData(params.api, apiUrl ,{} ,gridOptions)
        }

        // 외부에서도 fetchData 호출 가능하도록 설정
        gridOptions.api.fetchData = function(newSearchParams = {}) {
            // 기존 데이터를 제거하고 새로운 데이터를 추가
            fetchData(gridOptions.api, apiUrl, newSearchParams, gridOptions);
        };


        return gridOptions
      }

      // 외부에서 initGrid 함수를 사용할 수 있도록 공개
      return {
        initGrid: initGrid
      };

    })();
