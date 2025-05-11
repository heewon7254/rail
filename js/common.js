if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded.');
} else {
    console.log('jQuery is loaded.');
}


document.addEventListener('DOMContentLoaded', function() {
    // 상위요소 찾기
    function findParent(element,className){
        while(element && !element.classList.contains(className)){
            element = element.parentElement
        }
        return element
    }

    // 팝업 닫기 공통 함수
    const closePopup = (element) => {
        if(!element) return;
        element.classList.remove('on');
        // 팝업 열기 버튼에 저장된 data-focus 값으로 포커스 이동
        const focusedButton = document.querySelector('[data-focus="true"]');
        if(focusedButton) {
            focusedButton.focus();
            focusedButton.removeAttribute('data-focus');
        }
    }

    // ESC 버튼 클릭시 가장위에 열린 팝업 닫기
    window.addEventListener('keyup', e => {
        if(e.keyCode == 27) {
            const openPopups = $('.layer_popup.on, .alarm_layer_popup.on, alert_layer_popup.on');
            if(openPopups.length) closePopup(openPopups.last().get(0));
        }
    });

    // 공통 레이어 팝업 닫기
    const popupClose = document.querySelectorAll('.pop_close');
    
    popupClose.forEach(el => {
        el.addEventListener('click',(e)=>{     
            closePopup(findParent(e.target,'on'));
        });
    });
    
    // 레이어 팝업 열기
    const openPopupButton = document.querySelectorAll('.open_popup');
    const layerPopupContent = document.querySelector('.layer_popup .pop_con');
    
    openPopupButton.forEach(el=>{
        el.addEventListener('click',(e)=>{
            if(e.target.dataset.popup){ 
                let popElement = document.getElementById(e.target.dataset.popup)
                popElement.classList.add('on');
                // 클릭된 버튼에 data-focus 속성 추가
                e.target.setAttribute('data-focus', 'true');
                layerPopupContent.focus();
            }
        });
    });
    
    // 가로 스크롤에 따른 헤더 위치 수정
    window.addEventListener('scroll', function() {
        const scrollLeft = window.scrollX;
        const header = document.querySelector('header');
    
        header.style.left = `${0 - scrollLeft}px`;
    });
    
    // 상단메뉴
    const gnbItems = document.querySelectorAll('header nav .gnb > li'),
        header = document.querySelector('header'),
        lnbWraps = document.querySelectorAll('header nav .lnb_wrap'),
        headerHeight = header.offsetHeight;
    
    // 서브메뉴의 최대 높이 계산
    const targetHeight = Math.max(...Array.from(lnbWraps, el => el.offsetHeight));
    
    // 서브메뉴 열기
    function showSubMenu() {
        header.style.height = `${headerHeight + targetHeight}px`;
        header.classList.add('active');
    }
    
    // 서브메뉴 닫기
    function hideSubMenu() {
        header.style.height = `${headerHeight}px`;
        header.classList.remove('active');
    }
    
    // 마우스 오버 또는 포커스로 서브메뉴 열기
    gnbItems.forEach(el => {
        el.addEventListener('mouseover', showSubMenu);
        el.addEventListener('mouseleave', hideSubMenu);
    });
    
    // 상단 메뉴 포커스 이벤트
    const menuLinkTags = document.querySelectorAll('header nav a');
    
    menuLinkTags.forEach((el)=>{
        el.addEventListener('focus',showSubMenu)
        // 마우스 아웃 시 서브메뉴 닫기
        el.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget || !e.relatedTarget.closest('header nav')) {
                hideSubMenu();
            }
        });
        // 포커스가 벗어났을 때 서브메뉴 닫기
        el.addEventListener('blur', (e) => {
            if (!e.relatedTarget || !e.relatedTarget.closest('header nav')) {
                hideSubMenu();
            }
        });
    })
    
    // 외부영역 클릭 시 레이어 닫기 및 레이어 팝업 활성화
    const layerBoxWrapper = document.querySelectorAll('.layer_area');
    const layerActiveTarget = document.querySelectorAll('.layer_target');

    // 외부 클릭 시 모든 레이어 닫기
    $(document).mouseup(function (e) {
        layerBoxWrapper.forEach((el) => {
            if (!el.contains(e.target)) {
                document.querySelectorAll('.layer_box').forEach((box) => {
                    box.classList.remove('show');
                });
            }
        });
    });

    // layer_target에 포커스 시 해당하는 layer_box 열기
    layerActiveTarget.forEach(el => {
        el.addEventListener('focus', (e) => {
            // 모든 레이어 닫기
            document.querySelectorAll('.layer_box').forEach((box) => {
                box.classList.remove('show');
            });

            // 부모 영역(layer_area)을 찾음
            let parentLayerArea = findParent(e.target, 'layer_area');
            let targetLayer = e.target.getAttribute('data-layer');
            
            // 해당 layer_area에 타겟과 내용이 하나만 있을 경우
            let targetsInParent = parentLayerArea.querySelectorAll('.layer_target').length;
            let layersInParent = parentLayerArea.querySelectorAll('.layer_box').length;

            if (targetsInParent === 1 && layersInParent === 1) {
                // 타겟과 내용이 한 쌍일 경우, 비교 없이 해당 내용 열기
                parentLayerArea.querySelector('.layer_box').classList.add('show');
            } else {
                // 여러 개 있을 경우, data-id를 비교해 해당 내용 열기
                let targetLayerBox = parentLayerArea.querySelector(`.layer_box[data-layer="${targetLayer}"]`);
                if (targetLayerBox) {
                    targetLayerBox.classList.add('show');
                }
            }
        });
    });
    
    // 최근 검색어 클릭 시 검색값 넣기
    const mainRecentSearchLink = document.querySelectorAll('.main_util_wrap .search_area .recent_box .txt');
    const mainSearchInput = document.querySelector('.main_util_wrap .search_area .layer_target')
    
    mainRecentSearchLink.forEach(el=>{
        el.addEventListener('click',(e)=>{
            mainSearchInput.value = el.firstElementChild.textContent;
        });
    });
    
    // 서브 페이지 헤더
    const subPageClassName = document.querySelectorAll('.sub');
    const subPageLinks = document.querySelectorAll('header nav a');
    
    subPageClassName.forEach(el=>{
        if(el.attributes.length > 0){
            for(let subPageLink of subPageLinks){
                subPageLink.classList.add('blur');
            }
        }
    });
     
    // 왼쪽 메뉴
    const asideMenuList = document.querySelectorAll('.wrap aside:not(.search_menu) nav .gnb > li');
    
    asideMenuList.forEach(el => {
        const lnbWrap = el.querySelector('.lnb_wrap');
        if(!lnbWrap) return ;
        const gnbTag = el.querySelector('a');

        const toggleMenu = () => {
            const isOn = el.classList.contains('on');
            lnbWrap.style.height = isOn ? `${el.querySelector('.lnb').offsetHeight}px` : '0px';
            lnbWrap.style.overflow = isOn ? 'inherit' : 'hidden';
        };
    
        toggleMenu(); // 초기 상태 설정
        gnbTag.addEventListener('click', (e)=>{
            let contentsWrap = findParent(e.target, 'wrap');
            if(!contentsWrap.classList.contains('menu_hidden')){ // 왼쪽 메뉴 레이어가 숨김 상태가 아닐 때
                el.classList.toggle('on');
                toggleMenu();
            }
        });
    });
    
    // 알람 레이어
    const alarmPopClose = document.querySelector('.alarm_close');
    const alarmLayerPop = document.querySelector('.alarm_layer_popup');
    const alarmButton = document.querySelector('header .header_alarm button');
    
    alarmButton.addEventListener('click',()=>{
        alarmLayerPop.classList.add('on');
    });
    
    alarmPopClose.addEventListener('click',()=>{
        alarmLayerPop.classList.remove('on');
    });

    alarmLayerPop.addEventListener('click', e => {
        if(e.target === alarmLayerPop) alarmLayerPop.classList.remove('on');
    });

    // 파일 선택
    const fileBtn = document.querySelector('.file_choice label input');
    const fileList = document.querySelector('.file_choice .file_name');
    
    // 파일 선택 시 파일 추가 및 초기화
    if(fileBtn){
        fileBtn.addEventListener('change', function() {
            let fileName = this.files[0].name;
            let listItem = document.createElement('li');
            listItem.innerHTML = `<a href="javascript:void(0)">${fileName}</a><a href="javascript:void(0)" class="delete"></a>`;
            fileList.appendChild(listItem);
            
            // 삭제 버튼 이벤트 추가
            listItem.querySelector('.delete').addEventListener('click', () => listItem.remove());
        
            // 파일 선택 후 input 값 초기화
            this.value = '';
        });
    }
    
    // 기존 삭제 버튼에 이벤트 추가
    document.querySelectorAll('.file_choice .file_name a.delete').forEach(el =>
        el.addEventListener('click', e => e.target.parentElement.remove())
    );

    // 왼쪽 메뉴 숨길 시, 그리드 컨데이너 너비 조정 에니메이션
    const gridContainer = document.querySelector('.wrap');
    const toggleBtn = document.querySelector('.aside_hide_btn');

    let isSmall = false;

    // 애니메이션 함수 정의
    function toggleGridSize() {
        let startSize = isSmall ? 65 : 243;  // 시작 크기
        let endSize = isSmall ? 243 : 65;    // 끝나는 크기
        let currentSize = startSize;         // 현재 크기
        let increment = (endSize - startSize) / 27; // 변화 속도
        let animation = setInterval(() => {
            currentSize += increment;
            gridContainer.style.gridTemplateColumns = `repeat(auto-fit, minmax(${currentSize}px, 1fr))`;
            
            // 애니메이션 종료 조건
            if ((increment > 0 && currentSize >= endSize) || (increment < 0 && currentSize <= endSize)) {
                clearInterval(animation);
            }
        }, 5);

        gridContainer.classList.toggle('menu_hidden');
        isSmall = !isSmall; // 상태 반전

        // menu_hidden 클래스가 있을 때만 클릭 이벤트 추가, 없으면 제거
        const menuHideIcons = document.querySelectorAll('.wrap aside nav .gnb > li > a');

        menuHideIcons.forEach((icon) => {
            icon[gridContainer.classList.contains('menu_hidden') ? 'addEventListener' : 'removeEventListener']('click', toggleGridSize);
        });
    }
    
    // 버튼 클릭 시 애니메이션 실행
    toggleBtn?.addEventListener('click', () => {
        toggleGridSize();
    });
});



