
//datepicker 호출 yyyy mm dd
function initializeLitepicker(element) {
  // 이미 초기화된 경우 종료
  if (element.dataset.initialized) return;

  new Litepicker({
    lang: 'ko-KR',
    format: 'YYYY-MM-DD',
    element: element,
    buttonText: {
      previousMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
      nextMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24V24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
    },
    dropdowns: {
      minYear: 1980,
      maxYear: 2030,
      months: true,
      years: true,
    },
  });

  element.dataset.initialized = "true";
}

// 페이지 로드 시 기존 datepicker 초기화
document.addEventListener("DOMContentLoaded", function () {

  const periodWrap = document.querySelector('.period_wrap');

  if(periodWrap){
    const periodInput = periodWrap.querySelectorAll('.datepicker-icon');
    new Litepicker({
      lang: 'ko-KR',
      format: 'YYYY-MM-DD',
      element: periodInput[0], // 시작일
      elementEnd: periodInput[1], // 종료일
      buttonText: {
        previousMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
        nextMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24V24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
      },
      dropdowns: {
        minYear: 1980,
        maxYear: 2030,
        months: true,
        years: true,
      },
      allowRepick: true,
      autoApply: true,
      singleMode: false,
      // minDays: 3,
      maxDays: 30 * 6, // 최대 6개월 선택 가능
    });

  }else{
    var datepickerIcons = document.getElementsByClassName('datepicker-icon');

    for (var i = 0; i < datepickerIcons.length; i++) {
      initializeLitepicker(datepickerIcons[i]);
    }

  }

});

// Input mask 초기화
function initializeInputMask(element) {
  IMask(element, {
      mask: '00:00'
  });
}

// 바이트 계산
document.addEventListener('DOMContentLoaded', function () {
    const maxInitial = 90;
    const maxExtended = 2000;
    const maxByteElements = document.querySelectorAll('.max-byte');
    function updateByteLength(element) {
        let textValue = element.value;
        let byteCount = getByteLength(textValue);

        let maxByteDisplay = element.closest('.input-group').querySelector('.max-len strong');
        let lenDisplay = element.closest('.input-group').querySelector('.max-len b');
        if (byteCount > maxInitial) {
            maxByteDisplay.textContent = maxExtended;
        } else {
            maxByteDisplay.textContent = maxInitial;
        }
        if (byteCount > maxExtended) {
            element.value = truncateToByteLength(textValue, maxExtended);
            byteCount = getByteLength(element.value);
        }
        lenDisplay.textContent = byteCount;
    }
    maxByteElements.forEach(function (element) {
        updateByteLength(element);
    });
    document.addEventListener('input', function (event) {
        if (event.target.matches('.max-byte')) {
            updateByteLength(event.target);
        }
    });
});
function getByteLength(str) {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
        byteLength += (str.charCodeAt(i) > 127) ? 3 : 1;
    }
    return byteLength;
}
function truncateToByteLength(str, maxLength) {
    let byteLength = 0;
    let truncatedStr = '';
    for (let i = 0; i < str.length; i++) {
        let charByteLength = (str.charCodeAt(i) > 127) ? 3 : 1;
        if (byteLength + charByteLength > maxLength) {
            break;
        }
        truncatedStr += str[i];
        byteLength += charByteLength;
    }
    return truncatedStr;
}


//input 글자수만 계산
document.addEventListener('input', function (event) {
  if (event.target.matches('.check-text')) {
    let tsVal = event.target.value;
    let numChar = tsVal.length;
    let lenDisplay = event.target.closest('.input-group').querySelector('.check-len b');
    lenDisplay.textContent = numChar;
  }
});

//input 최대값 계산
document.addEventListener('input', function (event) {
  if (event.target.matches('.max-text')) {
    let tsVal = event.target.value;
    let numChar = tsVal.length;
    const maxNum = event.target.getAttribute('maxlength');
    let lenDisplay = event.target.closest('.input-group').querySelector('.max-len b');
    if (numChar > maxNum) {
      event.target.value = tsVal.substr(0, maxNum);
      lenDisplay.textContent = numChar;
    } else {
      lenDisplay.textContent = numChar;
    }
  }
});


//input 가격 콤마처리
function formatAmountWithComma(value) {
  value = value.replace(/[^0-9]/g, '');
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return value;
}
function numberFotmatComma() {
  const telInputs = document.querySelectorAll('input[data-amount-comma]');
  telInputs.forEach(function (telInput) {
      telInput.value = formatAmountWithComma(telInput.value);

      telInput.addEventListener('input', function () {
          this.value = formatAmountWithComma(this.value);
      });
  });
}

//input tel 숫자만 입력
function allowOnlyNumbersForTelInputs() {
  const telInputs = document.querySelectorAll('input[type="tel"]');
  telInputs.forEach(function (telInput) {
    telInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  allowOnlyNumbersForTelInputs();
  numberFotmatComma();
});

document.addEventListener("DOMContentLoaded", function () {

  //input 최대값 계산 - 페이지 로드 시 최대값 계산해서 출력
  const maxLenSpans = document.querySelectorAll('.max-len');
  maxLenSpans.forEach(function (maxLenSpan) {
      const inputGroup = maxLenSpan.closest('.input-group');
      const maxText = inputGroup.querySelector('.max-text');
      
      if (maxText) {
          let numChar = maxText.value.length;
          maxLenSpan.querySelector('b').textContent = numChar;
      }
  });

  //글수자 계산 - 페이지 로드 시 계산해서 출력
  const checkLenSpans = document.querySelectorAll('.check-len');
  checkLenSpans.forEach(function (checkLenSpan) {
      const inputGroup = checkLenSpan.closest('.input-group');
      const checkText = inputGroup.querySelector('.check-text');
      
      if (checkText) {
          let numChar = checkText.value.length;
          checkLenSpan.querySelector('b').textContent = numChar;
      }
  });

  //input 특수문자 입력불가
  function restrictSpecialCharacters() {
    const inputs = document.querySelectorAll('input[data-input-texts]');
    const specialCharsRegex = /[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g; // 특수 문자 제외 정규 표현식

    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.value = this.value.replace(specialCharsRegex, '');
        });
    });
  }
  restrictSpecialCharacters();
});

//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.label-control input[type="checkbox"]').forEach(function (check) {
    check.addEventListener('change', function (event) {
      function isVisible(element) {
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
      }
      const target = event.target;
      const labelControlParent = check.closest('.label-control-parent');
      const checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check-all-parent') : null;
      if (target.matches('input[type="checkbox"]') && target.classList.contains('check-all-second')) {
        // check-all-second 클릭 시 (같은 테이블에서 두번째로 위치한 전체 클릭 checkbox)
        const isChecked = target.checked;
        const checkboxes = check.closest('.label-control').querySelectorAll('input[type="checkbox"].check-second');
        checkboxes.forEach(function (checkbox) {
          if (isVisible(checkbox) && !checkbox.disabled) {
            checkbox.checked = isChecked;
          }
        });
        if (!isChecked) {
          target.checked = false; // check-all-second 비활성화
          if (checkAllParentCheckbox) {
            checkAllParentCheckbox.checked = false; // check-all-second 비활성화
          }
        }
      } else if (target.matches('input[type="checkbox"]') && target.classList.contains('check-all')) {
        // 일반 check-all 클릭 시
        const isChecked = target.checked;
        const checkboxes = check.closest('.label-control').querySelectorAll('input[type="checkbox"]:not(.check-all-second):not(.check-second)');
        checkboxes.forEach(function (checkbox) {
          if (isVisible(checkbox) && !checkbox.disabled) {
            checkbox.checked = isChecked;
          }
        });
        if (!isChecked) {
          target.checked = false; // check-all 비활성화
          if (checkAllParentCheckbox) {
            checkAllParentCheckbox.checked = false; // check-all 비활성화
          }
        }
      } else if (target.matches('input[type="checkbox"]:not(.check-all):not(.check-all-second):not(.check-second)') && !target.checked) {
        const checkAllCheckbox = check.closest('.label-control').querySelector('.check-all');
        if (checkAllCheckbox) {
          checkAllCheckbox.checked = false; // check-all 비활성화
        }
        if (checkAllParentCheckbox) {
          checkAllParentCheckbox.checked = false; // check-all 비활성화
        }
      }else if (target.matches('input[type="checkbox"].check-second') && !target.checked) {
        const checkAllCheckbox = check.closest('.label-control').querySelector('.check-all-second');
        if (checkAllCheckbox) {
          checkAllCheckbox.checked = false; // check-all 비활성화
        }
        // if (checkAllParentCheckbox) {
        //   checkAllParentCheckbox.checked = false; // check-all 비활성화
        // }
      }
    });
  });
});
/*
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.label-control').forEach(function (labelControl) {
    labelControl.addEventListener('change', function (event) {
      const target = event.target;
      if (target.matches('input[type="checkbox"]') && target.classList.contains('check-all')) {
        const isChecked = target.checked;
        const checkboxes = labelControl.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = isChecked;
        });
        if (!isChecked) {
          target.checked = false; // check-all 비활성화
        }
      } else if (target.matches('input[type="checkbox"]:not(.check-all)') && !target.checked) {
        const checkAllCheckbox = labelControl.querySelector('.check-all');
        if (checkAllCheckbox) {
          checkAllCheckbox.checked = false; // check-all 비활성화
        }
      }
    });
  });
});*/

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 파일 추가 및 미리보기 이벤트 등록
function fileSizeInMB(fileSize) {
  return fileSize / (1024 * 1024);
}

window.onload = function() {

  const inputGroups = document.querySelectorAll('.input-group');

  inputGroups.forEach(inputGroup => {
    const inputFile = inputGroup.querySelector('.file-add');
    const deleteButton = inputGroup.querySelector('button');
    const photoImages = inputGroup.querySelector('.photo_images');

    if (inputFile && deleteButton) {
      deleteButton.addEventListener('click', () => {
        inputFile.value = '';
        photoImages.innerHTML = '';
      });

      inputFile.addEventListener('change', () => {
        const files = inputFile.files;
        const allowedTypes = inputFile.getAttribute('file-type').split(' ');
        const maxSize = parseInt(inputFile.getAttribute('file-max-size'), 10);

        if (inputFile.classList.contains('photo_thum')) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!allowedTypes.includes(file.type.split('/')[1]) || fileSizeInMB(file.size) > maxSize) {
              alert('업로드 불가능한 파일입니다. 파일 확장자 및 용량을 확인하세요.');
              inputFile.value = '';
              photoImages.innerHTML = '';
              break;
            }

            const imagePreview = document.createElement('div');
            imagePreview.classList.add('item');
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.alt = '';
            imagePreview.appendChild(image);
            photoImages.innerHTML = '';
            photoImages.appendChild(imagePreview);
          }
        }
      });
    }
  });
  document.querySelectorAll('.photo_images').forEach(photoImages => {
    photoImages.addEventListener('mouseover', function() {
      let imgSrc = this.querySelector('img').getAttribute('src');
      let ipGroup = this.closest('.input-group ');
      let thumOver = document.createElement('div');
      thumOver.classList.add('thum_over');
      let thumImage = document.createElement('img');
      thumImage.src = imgSrc;
      thumImage.alt = '';
      thumOver.appendChild(thumImage);
      ipGroup.appendChild(thumOver);
    });
  });

  document.querySelectorAll('.photo_images').forEach(photoImages => {
    photoImages.addEventListener('mouseout', function() {
      let ipGroup = this.closest('.input-group ');
      let thumOver = ipGroup.querySelector('.thum_over');
      if (thumOver) {
        thumOver.remove();
      }
    });
  });

}


//공통 쿠키 셋 겟
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 페이지 기록을 page-history에 표시함
// 페이지 기록 사용 비사용
function historyStatusCookie() {
  const historyUse = document.getElementById('historyUse');
  const pageHistory = document.querySelector('.page-history');
  if(!pageHistory){
    return false;
  }

  var historyUseValue = getCookie('historyUse');
  if (historyUseValue === 'false') {
    historyUse.checked = false;
    pageHistory.classList.remove('active');
  } else {
    historyUse.checked = true;
    pageHistory.classList.add('active');
  }
  historyUse.addEventListener('change', function() {
    setCookie('historyUse', historyUse.checked ? 'true' : 'false');
    if (historyUse.checked) {
        pageHistory.classList.add('active');
    } else {
        pageHistory.classList.remove('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  historyStatusCookie();
});

// 쿠키에 페이지 기록
function addPageToCookie(url, title) {
  const existingPages = getPagesFromCookie();
  if (existingPages.find(page => page.title === title)) {
    return;
  }

  existingPages.push({ url, title });
  document.cookie = `page_history=${JSON.stringify(existingPages)};path=/`;
}

// 쿠키에서 페이지 삭제
function removePageFromCookie(index) {
  const existingPages = getPagesFromCookie();
  if(index === -1){ //-1이면 모두 삭제
    existingPages.splice(0, existingPages.length);
  }else{
    existingPages.splice(index, 1);
  }
  document.cookie = `page_history=${JSON.stringify(existingPages)};path=/`;
}

// 쿠키에서 페이지 가져오기
function getPagesFromCookie() {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('page_history='));

  if (cookie) {
    return JSON.parse(cookie.split('=')[1]);
  } else {
    return [];
  }
}

//히스토리 모두 삭제
function historyRemoveAll() {
  removePageFromCookie(-1);
  var elements = document.querySelectorAll('.page-history .item');
  elements.forEach(function(element) {
    element.remove();
  });
}

// 페이지 기록을 화면에 표시
function displayPageHistory() {
  const pageHistory = document.querySelector('.page-history');
  const pages = getPagesFromCookie();
  const pageTitleElement = document.querySelector('.page-title');

  const currentTitle = pageTitleElement ? pageTitleElement.textContent : document.title;
  if(!pageHistory){
    return false;
  }

  pages.forEach((page, index) => {
    const item = document.createElement('div');
    item.className = 'item';

    if (page.title === currentTitle) {
      item.classList.add('active');
    }

    const link = document.createElement('a');
    link.href = page.url;
    link.className = 'name';
    //상품상세에서만  : 상품등록 상품상세(상품코드) 삭제상품상세(상품코드) 로 사용됨 하위 화면에서 화면명을 셋팅
    if(page.url.toString().includes('productDetail')){
      link.textContent = '상품등록하기';
    }else{
      link.textContent = page.title;
    }
    item.appendChild(link);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      removePageFromCookie(index);
      item.remove();
    });
    item.appendChild(deleteButton);

    pageHistory.appendChild(item);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const pageTitleElement = document.querySelector('.page-title');

  const nav = document.getElementById('nav');
  const cate3List = nav?.querySelectorAll('li ul li ul li a'); // 3차 카테고리 항목

  if(pageTitleElement){
    const pageTitle = pageTitleElement.innerHTML;

    let found = false;
    cate3List?.forEach((element) => {
      if (element.innerHTML === pageTitle.trim()) {
        found = true;
      }
    });

    if (found) {
      addPageToCookie(window.location.href, pageTitle);
    }
  }
  displayPageHistory();
});

//마우스 오버 생략된 내용 표시
document.querySelectorAll('.hover_cnt').forEach(tr => {
  const shortCut = tr.querySelector('.short_cut');
  const hoverLayer = document.createElement('div');
  hoverLayer.className = 'hover_layer';

  tr.appendChild(hoverLayer);
      const content = shortCut.innerHTML;
      hoverLayer.innerHTML = content;
});

window.onload = function() {
  //헤더 디스플레이
  var aside = document.querySelector('aside');
  if(aside){
    var headerDisplayButtons = aside.querySelectorAll('aside .display_type button');
    headerDisplayButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var placement = this.classList.contains('top') ? 'top' :
                            this.classList.contains('left') ? 'left' :
                            this.classList.contains('right') ? 'right' :
                            this.classList.contains('bottom') ? 'bottom' : '';

            if (placement) {
                setActiveButton(button, headerDisplayButtons);
                setPlacementClass(placement, aside);
                setCookie('headerPlacement', placement);
            }
        });
    });
    var headerPlacement = getCookie('headerPlacement');
    if (headerPlacement) {
        var button = aside.querySelector('aside .display_type button.' + headerPlacement);
        if (button) {
            setActiveButton(button, headerDisplayButtons);
            setPlacementClass(headerPlacement, aside);
        }
    }
  }

  //검색 디스플레이
  var pageBody = document.querySelector('.page-body');
  var asideSearch = document.querySelector('.aside-search');
  if(asideSearch){
    var searchDisplayButtons = pageBody.querySelectorAll('.aside-search .display_type button');
    searchDisplayButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var placement = this.classList.contains('top') ? 'top' :
                            this.classList.contains('left') ? 'left' :
                            this.classList.contains('right') ? 'right' :
                            this.classList.contains('bottom') ? 'bottom' : '';

            if (placement) {
                setActiveButton(button, searchDisplayButtons);
                setPlacementClass(placement, pageBody);
                setCookie('searchPlacement', placement);
            }
        });
    });
    var searchPlacement = getCookie('searchPlacement');
    if (searchPlacement) {
        var button = pageBody.querySelector('.aside-search .display_type button.' + searchPlacement);
        if (button) {
            setActiveButton(button, searchDisplayButtons);
            setPlacementClass(searchPlacement, pageBody);
        }
    }
  }

  //폼 디스플레이   
  var formBody = document.querySelector('.form-container');
  if(formBody){
    var formDisplayButtons = formBody.querySelectorAll('.form-container .display_type button');
    formDisplayButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          var placement = this.classList.contains('grid4') ? 'grid4' :
                          this.classList.contains('grid3') ? 'grid3' :
                          this.classList.contains('grid2') ? 'grid2' : '';

          if (placement) {
              setActiveButton(button, formDisplayButtons);
              setPlacementClass(placement, formBody);
              setCookie('formPlacement', placement);
          }
      });
    });
    var formPlacement = getCookie('formPlacement');
    if (formPlacement) {
        var button = formBody.querySelector('.display_type button.' + formPlacement);
        if (button) {
            setActiveButton(button, formDisplayButtons);
            setPlacementClass(formPlacement, formBody);
        }
    }
  }

  function setActiveButton(activeButton, buttons) {
      buttons.forEach(function(button) {
          button.classList.remove('active');
      });
      activeButton.classList.add('active');
  }

  function setPlacementClass(placement, elm) {
    elm.classList.remove('search_top', 'search_left', 'search_right', 'search_bottom', 'header_left', 'header_top', 'grid_grid4', 'grid_grid3', 'grid_grid2');
    if(elm === aside){
      elm.classList.add('header_' + placement);
    }else if(elm === pageBody){
      elm.classList.add('search_' + placement);
    }else if(elm === formBody){
      elm.classList.add('grid_' + placement);
    }
  }

  function setCookie(name, value) {
      document.cookie = name + '=' + value + '; path=/';
  }

  function getCookie(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
  }
};

//스크립트로 모달창 띄움
function showModal(elm) {
  var modal = new bootstrap.Modal(document.getElementById(elm));
  modal.show();
}
function hideModal(elm) {
  var modal = bootstrap.Modal.getInstance(document.getElementById(elm));
  modal.hide();
}

//토글 탭 nav, 탭 content
document.querySelectorAll('.toggle_tap_wrap').forEach(function(wrapper) {
  wrapper.querySelector('.toggle_tap_btn').addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
          event.preventDefault();
          var clickedLink = event.target;
          var targetId = clickedLink.getAttribute('href').substring(1);
          var wrapper = clickedLink.closest('.toggle_tap_wrap');
          var allLinks = wrapper.querySelectorAll('.toggle_tap_btn a');
          var allContents = wrapper.querySelectorAll('.toggle_tap_content');

          allLinks.forEach(function(link) {
              link.classList.remove('on');
          });

          clickedLink.classList.add('on');

          allContents.forEach(function(content) {
              content.style.display = "none";
          });

          document.getElementById(targetId).style.display = "block";
        }
  });
});


//로딩바 생성
document.addEventListener("DOMContentLoaded", function() {
  var loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");
  document.body.appendChild(loadingDiv);
  var loadingInnerDiv = document.createElement("div");
  loadingInnerDiv.classList.add("loading_inner");
  loadingDiv.appendChild(loadingInnerDiv);
})
function loading(action) {
  const loadingDiv = document.querySelector('.loading');
  if (action === 'show') {
    loadingDiv.classList.add('active');
  } else if (action === 'hide') {
    loadingDiv.classList.remove('active');
  }
}

// 라디오 변경에 따른 display
function handleRadioChange() {
  var groupName = this.getAttribute("name");
  var sameRadios = document.querySelectorAll('input[name="'+ groupName +'"]');
  sameRadios.forEach(function(target) {
      var displayTargets = target.getAttribute("radio-display").split(" ");
      displayTargets.forEach(function(target) {
          var elements = document.getElementsByClassName(target);
          for (var i = 0; i < elements.length; i++) {
              elements[i].style.display = "none";
          }
      });
      if(target.getAttribute("radio-display-hide")){
        var displayHideTargets = target.getAttribute("radio-display-hide").split(" ");
        displayHideTargets.forEach(function(target) {
            var elements = document.getElementsByClassName(target);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        });
      }
  });
  var selectedTargets = this.getAttribute("radio-display").split(" ");
  selectedTargets.forEach(function(target) {
      var selectedElements = document.getElementsByClassName(target);
      for (var i = 0; i < selectedElements.length; i++) {
          selectedElements[i].style.display = "";
      }
  });
}

// 검색 셀렉트 박스 변경에 따른 display
function handleSearchSelectChange() {
  var options = this.querySelectorAll('.item a');

  // 모든 대상 요소 숨기기
  options.forEach(function(target) {
      var displayTargets = target.getAttribute("select-display")?.split(" ");
      displayTargets?.forEach(function(targetClass) {
          var elements = document.getElementsByClassName(targetClass);
          for (var i = 0; i < elements.length; i++) {
              elements[i].style.display = "none";
          }
      });
      if(target.getAttribute("select-display-hide")){
        var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
        displayHideTargets.forEach(function(target) {
          var elements = document.getElementsByClassName(target);
          for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
          }
        });
      }
  });

  // active 클래스를 가진 옵션의 인덱스를 찾기
  let activeIndex = -1;
  for (let i = 0; i < options.length; i++) {
      if (options[i].classList.contains('active')) {
          activeIndex = i;
          break;
      }
  }

  // active 클래스를 가진 옵션이 있으면 해당 옵션의 display 설정
  if (activeIndex !== -1) {
      var selectedOption = options[activeIndex];
      var selectedTargets = selectedOption.getAttribute("select-display");
      if (selectedTargets) {
          var targetsArray = selectedTargets.split(" ");
          targetsArray.forEach(function(targetClass) {
              var selectedElements = document.getElementsByClassName(targetClass);
              for (var i = 0; i < selectedElements.length; i++) {
                  selectedElements[i].style.display = "";
              }
          });
      }
  }
}

// 셀렉트박스 변경에 따른 display
function handleSelectChange() {
  var options = this.querySelectorAll('option');

  options.forEach(function(target) {
    var displayTargets = target.getAttribute("select-display").split(" ");
    displayTargets.forEach(function(target) {
        var elements = document.getElementsByClassName(target);
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
    });
    if(target.getAttribute("select-display-hide")){
        var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
        displayHideTargets.forEach(function(target) {
          var elements = document.getElementsByClassName(target);
          for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
          }
        });
      }
  });

  var selectedOption = this.options[this.selectedIndex];
  var selectedTargets = selectedOption.getAttribute("select-display");
  if (selectedTargets) {
      var targetsArray = selectedTargets.split(" ");
      targetsArray.forEach(function(target) {
          var selectedElements = document.getElementsByClassName(target);
          for (var i = 0; i < selectedElements.length; i++) {
              selectedElements[i].style.display = "";
          }
      });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  
  // 라디오 버튼 변경 이벤트 리스너 등록
  var radios = document.querySelectorAll('input[radio-display]');
  radios.forEach(function(radio) {
      radio.addEventListener("change", handleRadioChange);
      // 페이지 로드 시 라디오 버튼의 상태에 따라 초기 화면 설정
      if (radio.checked) {
          handleRadioChange.call(radio); // 선택된 라디오 버튼에 대한 처리 실행
      }
  });


  // 셀렉트 디스플레이 변경 이벤트 리스너 등록
  var selects = document.querySelectorAll('select.select-display');
  selects.forEach(function(select) {
      select.addEventListener("change", handleSelectChange);
      // 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
      if (checkVisibility(select)) {
        if (select.selectedIndex > 0) {
          handleSelectChange.call(select);
        }
      }
  });

  
  // 검색셀렉트 디스플레이 변경 이벤트 리스너 등록
  var searchSelects = document.querySelectorAll('.search_select.select-display');
  searchSelects.forEach(function(select) {
    select.addEventListener("click", handleSearchSelectChange);
      // 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
      if (checkVisibility(select)) {
      handleSearchSelectChange.call(select);
    }
  });
});

// 가시성 체크 함수
function checkVisibility(element) {
  while (element) {
    if (element === document.body) {
      break;
    }
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    element = element.parentElement;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

//라디오, 셀렉트 디스플레이 초기화 셋
function radioSelectdisplaySet(){
  var selects = document.querySelectorAll('select.select-display');
    selects.forEach(function(select) {
        if (checkVisibility(select)) {
          if (select.selectedIndex > -1) {
            handleSelectChange.call(select);
          }
        }
    });
  
  var searchSelects = document.querySelectorAll('.search_select.select-display');
  searchSelects.forEach(function(select) {
    if (checkVisibility(select)) {
      handleSearchSelectChange.call(select);
    }
  });
  
  var radios = document.querySelectorAll('input[radio-display]');
  radios.forEach(function(radio) {
    if (checkVisibility(radio)) {
      if (radio.checked) {
          handleRadioChange.call(radio);
        }
      }
  });
}

/*날짜선택*/
/* 날짜 객체 받아서 문자열로 리턴하는 함수 */
function getDateStr(myDate){
	return (myDate.getFullYear() + '-' + ("0" + (myDate.getMonth() + 1)).slice(-2) + '-' + ("0" + myDate.getDate()).slice(-2))
}
function getDateStr2(myDate){
	return (myDate.getFullYear() + '-' + ("0" + (myDate.getMonth())).slice(-2))
}
/* 오늘 날짜를 문자열로 반환 */
function today() {
  var d = new Date();
  return getDateStr(d)
}
/* 어제*/
function yesterday() {
  var d = new Date()
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 1)
  return getDateStr(d)
}
function month() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
	if(month < 10){ 
		month = '0'+ month;
	}
  return year + '-' + month;
}
/* 일주일전 */
function lastWeek() {
  var d = new Date()
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 7)
  return getDateStr(d)
}
/* 15일 전*/
function halfMonth() {
  var d = new Date()
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 15)
  return getDateStr(d)
}
/* 당월*/
function nowMonth() {
  var d = new Date()
  var dayOfMonth = d.getDate();
  var day = ('0' + d.getDate()).slice(-2);
  d.setDate(dayOfMonth - day + 1)
  return getDateStr(d)
}
/* 전월*/
function prevMonth() {
	var date = new Date();
	//현재 시간 기준으로 1일을 구한 후
	var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
	//현재 시간 기준 1일을 구한 후 하루를 빼주면 전월 말일 이됨
	var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
	//월은 0 - 11까지 이므로 1이적게 나와서 1을 더해준다
	check_month = lastMonth.getMonth()+1;
	if(check_month < 10){
	check_month = "0"+check_month;
	}
	sDate = lastMonth.getFullYear()+"-"+check_month+"-01";
    date.setDate(sDate)
  return (sDate)
}
function prevMonthLast() {
	var date = new Date();
	//현재 시간 기준으로 1일을 구한 후
	var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
	//현재 시간 기준 1일을 구한 후 하루를 빼주면 전월 말일 이됨
	var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
	//월은 0 - 11까지 이므로 1이적게 나와서 1을 더해준다
	check_month = lastMonth.getMonth()+1;
	if(check_month < 10){
	check_month = "0"+check_month;
	}
	eDate = lastMonth.getFullYear() + "-" + check_month+ "-" + lastMonth.getDate();
    date.setDate(eDate)
  return (eDate)
}
/* 오늘로부터 1개월전 날짜 반환 */
function selMonth(selDate) {
  var d = new Date()
  var monthOfYear = d.getMonth()
  d.setMonth(monthOfYear - selDate)
  return getDateStr(d)
}
/* 오늘로부터 선택월 이전 날짜 반환 
function prevMonth(selDate) {
  var d = new Date()
  var monthOfYear = d.getMonth()
  d.setMonth(monthOfYear - selDate)

  return getDateStr2(d)
}*/
$(document).ready(function() {
  $('.date_sel.date_sel1 button').click(function(){//과거-현재
    var selDate = $(this).attr('data-rel');
    if(selDate == 0){
      $(this).closest('.date_cwrap').find('.dc_start').val(today());
    }else if(selDate == "1d"){
      $(this).closest('.date_cwrap').find('.dc_start').val(yesterday());
    }else if(selDate == "7d"){
      $(this).closest('.date_cwrap').find('.dc_start').val(lastWeek());
    }else if(selDate == "15d"){
      $(this).closest('.date_cwrap').find('.dc_start').val(halfMonth());
    }else if(selDate == "nm"){
      $(this).closest('.date_cwrap').find('.dc_start').val(nowMonth());
    }else if(selDate == "pm"){
      $(this).closest('.date_cwrap').find('.dc_start').val(prevMonth());
      $(this).closest('.date_cwrap').find('.dc_end').val(prevMonthLast());
      return false
    }else{
      $(this).closest('.date_cwrap').find('.dc_start').val(selMonth(selDate));
    }
    $(this).closest('.date_cwrap').find('.dc_end').val(today());
  });
})


//글자 복사금지
/*
function preventRclick(){ 
  $('body').on("contextmenu", function(e){ 
    return false; 
  }); $('body').on("selectstart", function(e){ 
    return false; 
  }); $('body').on("dragstart", function(e){ 
    return false; 
  }); $('body').on("keydown",function(e){ 
    var pressedKey = String.fromCharCode(e.keyCode).toLowerCase(); 
    if (e.ctrlKey && pressedKey == "c") { 
      return false; 
    } 
  });
}
preventRclick();

//우클릭 금지
document.oncontextmenu = function(){return false;}
*/

//팝업 실행 (사이즈 입력안하면 기본 600x600)
function windowPopup(url, width, height) {
  width = width === '' ? 600 : (width === '100%' ? window.screen.width : width);
  height = height === '' ? 600 : (height === '100%' ? window.screen.height : height);
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  const features = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`;
  window.open(url, '_blank', features);
}


//포토 업로드 input file
function photoFileInput(){
  const fileInputs = document.querySelectorAll('.photo_input_box input[type="file"]');
  if(fileInputs){
    fileInputs.forEach(fileInput => {
        fileInput.addEventListener('change', function() {
            const file = this.files[0]; // 선택한 파일
            const fileNameSpan = this.parentNode.querySelector('.file_name');
            const previewImageDiv = this.closest('.photo_input_box').querySelector('.preview_image');
            const previewImage = previewImageDiv.querySelector('img');
            let maxSize = null; 

            if (this.hasAttribute('data-max-size')) {
                maxSize = parseFloat(this.getAttribute('data-max-size')) * 1024 * 1024;
            }

            if (file) {
                // 파일 크기 확인
                if (maxSize && file.size > maxSize) {
                  console.log(file.size,0, maxSize)
                    alert('파일 용량을 확인해주세요.');
                    this.value = '';
                    fileNameSpan.textContent = '파일을 선택해주세요.'; 
                    previewImageDiv.style.display = 'none';
                    return;
                }
                // 이미지 파일인지 확인
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result; // 이미지 URL 설정
                        previewImageDiv.style.display = 'block'; // 미리보기 표시
                    };
                    reader.readAsDataURL(file); // 이미지 파일 읽기
                    fileNameSpan.textContent = file.name; // 파일명 표시
                } else {
                    alert('이미지 파일만 선택해주세요.');
                    this.value = ''; // 파일 입력 초기화
                    fileNameSpan.textContent = '파일을 선택해주세요.'; // 파일명 초기화
                    previewImageDiv.style.display = 'none'; // 미리보기 숨기기
                }
            } else {
                fileNameSpan.textContent = '파일을 선택해주세요.'; // 파일명 초기화
                previewImageDiv.style.display = 'none'; // 미리보기 숨기기
            }
        });
    });
  }
}
document.addEventListener('DOMContentLoaded', function() {
  photoFileInput();
});
function removePhotoFile(button){
  const photoInputWrap = button.closest('.photo_input_box');
  photoInputWrap.querySelector('.preview_image').style.display = 'none';
  photoInputWrap.querySelector('.preview_image img').setAttribute('src' , '');
  photoInputWrap.querySelector('input[type="file"]').value = '';
  photoInputWrap.querySelector('.file_name').textContent = '파일을 선택해주세요.';
}

//url복사 - 복사버튼 이전의 엘리먼트의 href를 복사함
function copyUrl(event, elm){
  event.preventDefault();
  const downloadLink = elm.getAttribute('href');
  
  const textarea = document.createElement('textarea');
  textarea.value = downloadLink;
  document.body.appendChild(textarea);
  textarea.select();

  try {
      document.execCommand('copy');
      alert('URL을 복사했습니다'); 
  } catch (err) {
      alert('URL 복사에 실패했습니다.');
  }

  document.body.removeChild(textarea);
}


//searchSelectOpen searchSelectSearch searchSelectSelect
//검색가능한 selectbox
function searchSelectOpen(button) {
  const options = button.nextElementSibling;
  const allOptions = document.querySelectorAll('.search_select_options');
  allOptions.forEach(opt => {
      if (opt !== options) {
          opt.style.display = 'none';
      }
  });
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
  const tableResponsive = button.closest('.table-responsive');
  if(tableResponsive){
    if(options.style.display === 'block'){
      tableResponsive.classList.add('visible');
    }else{
      tableResponsive.classList.remove('visible');
    }
  }
}

function searchSelectSearch(input) {
  const filter = input.value.toLowerCase();
  const items = input.nextElementSibling.querySelectorAll('.item a');
  items.forEach(function(item) {
      const text = item.textContent.toLowerCase();
      item.closest('.item').style.display = text.includes(filter) ? '' : 'none';
  });
}

function searchSelectSelect(anchor) {
  const items = anchor.closest('.items').querySelectorAll('.item a');
  items.forEach(function(item) {
      item.classList.remove('active');
  });
  anchor.classList.add('active');
  const hiddenInput = anchor.closest('.search_select').querySelector('input[type="hidden"]');
  const btnSelect = anchor.closest('.search_select').querySelector('.btn_select');
  hiddenInput.value = anchor.getAttribute('data-id');
  btnSelect.textContent = anchor.textContent;
  anchor.closest('.search_select_options').style.display = 'none';
  $(hiddenInput).valid();
}

document.addEventListener('click', function(event) {
  if (!event.target.closest('.search_select')) {
      document.querySelectorAll('.search_select_options').forEach(function(options) {
          options.style.display = 'none';
      });
  }
});

//검색 셀렉트박스  페이지 로드시 active된 항목  input hidden에 data-id값 넣고. 버튼에 text값 출력
document.addEventListener('DOMContentLoaded', function() {
  const searchSelects = document.querySelectorAll('.search_select');
  if(searchSelects){
    searchSelects.forEach(function(item){
      const seletedOption = item.querySelector('.item a.active');
      const seletedData = seletedOption?.getAttribute('data-id');
      const seletedText = seletedOption?.textContent;
      item.querySelector('input[type="hidden"]').value = seletedData;
      item.querySelector('.btn_select').textContent = seletedText;
    });
  }
});


//고정 fixed tap
document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector(`.fixed_taps`)){
    const sections = document.querySelectorAll('div[id^="section"]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.fixed_taps .col a[href="#${id}"]`);
            if (navLink) {
                if (entry.isIntersecting) {
                    navLink.classList.add('bg-primary');
                    navLink.classList.remove('bg-secondary');
                } else {
                    navLink.classList.remove('bg-primary');
                    navLink.classList.add('bg-secondary');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
  }
});


//multiple 사진업로드
const FileUploader = (function() {
  const photoCollections = {};

  function createPhotoCollection(name) {
      if (!photoCollections[name]) {
          photoCollections[name] = [];
      }
  }

  function handleFileUpload(event, collectionName) {
      const files = Array.from(event.target.files);
      const maxSize = parseInt(event.target.getAttribute('max-size'), 10);
      const maxCount = parseInt(event.target.getAttribute('max-count'), 10);
      const RegExtensions = /(\.jpg|\.jpeg|\.png)$/i; // 허용 확장자
      const formItem = event.target.closest('.form_item');
      const preview = formItem.querySelector('.multiple_preview');
      const countElement = formItem.querySelector('.multiple_count');
      const sizeElement = formItem.querySelector('.multiple_size');

      const currentFiles = photoCollections[collectionName];

      files.forEach(file => {
          const fileSizeMB = file.size / (1024 * 1024);
          const totalSizeMB = currentFiles.reduce((sum, f) => sum + f.size / (1024 * 1024), 0);
          const isAccept = RegExtensions.exec(file.name);

          if(!isAccept){
            alert('jpg(jpeg), png 파일만 등록 하실 수 있습니다.');
            return false;
          }

          if (currentFiles.length < maxCount && totalSizeMB + fileSizeMB <= maxSize) {
              currentFiles.push(file);
              addFilePreview(file, preview, currentFiles, countElement, sizeElement, maxSize, maxCount);
          } else {
              alert(`최대 ${maxCount}장, ${maxSize}MB까지 업로드할 수 있습니다.`);
          }
      });

      updateCountAndSize(currentFiles, countElement, sizeElement, maxSize, maxCount, preview);
  }

  function addFilePreview(file, preview, currentFiles, countElement, sizeElement, maxSize, maxCount) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const div = document.createElement('div');
          div.className = 'item';

          const thumDiv = document.createElement('div');
          thumDiv.className = 'thum';
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'preview image';
          thumDiv.appendChild(img);

          const removeBtn = document.createElement('button');
          removeBtn.className = 'remove_btn';
          removeBtn.innerText = '파일삭제';
          removeBtn.onclick = () => removeFile(file, div, currentFiles, countElement, sizeElement, maxSize, maxCount, preview);

          div.appendChild(thumDiv);
          div.appendChild(removeBtn);
          preview.appendChild(div);
      };
      reader.readAsDataURL(file);
  }

  function removeFile(file, div, currentFiles, countElement, sizeElement, maxSize, maxCount, preview) {
      const index = currentFiles.indexOf(file);
      if (index > -1) {
          currentFiles.splice(index, 1);
          div.remove();
          updateCountAndSize(currentFiles, countElement, sizeElement, maxSize, maxCount, preview);
      }
  }

  function updateCountAndSize(files, countElement, sizeElement, maxSize, maxCount, preview) {
      const totalSizeMB = files.reduce((sum, f) => sum + f.size / (1024 * 1024), 0);
      countElement.innerText = files.length;
      sizeElement.innerText = `${totalSizeMB.toFixed(1)}MB`;
      preview.classList.toggle('active', files.length > 0);
  }

  return {
      initPhotoCollection: createPhotoCollection,
      handleFileUpload: handleFileUpload,
      getPhotoCollection: (name) => photoCollections[name]
  };
})();




// input 파일
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.file_single').forEach(function(fileDiv) {
      const fileInput = fileDiv.querySelector('input[type="file"]');
      const fileNameInput = fileDiv.querySelector('.file_name');
      const deleteBtn = fileDiv.querySelector('.remove_btn');

      // file-type 속성이 없으면 모든 파일 타입 허용
      const allowedTypes = fileNameInput.getAttribute('file-type') ? 
          fileNameInput.getAttribute('file-type').split(', ') : 
          null;
      const maxSizeMB = parseInt(fileNameInput.getAttribute('max-size') || '5');

      fileInput.addEventListener('change', function() {
          fileNameInput.classList.remove('error');
          
          if(this.files.length > 0) {
              const file = this.files[0];
              
              const fileExtension = file.name.split('.').pop().toLowerCase();
              const isValidType = allowedTypes === null || allowedTypes.includes(fileExtension);
              
              const maxSizeBytes = maxSizeMB * 1024 * 1024;
              const isValidSize = file.size <= maxSizeBytes;

              if (!isValidType || !isValidSize) {
                  fileInput.value = '';
                  fileNameInput.value = '';
                  deleteBtn.style.display = 'none';

                  let errorMessage = '';
                  if (!isValidType) {
                      errorMessage += `허용된 파일 형식은 ${allowedTypes.join(', ')} 입니다. `;
                  }
                  if (!isValidSize) {
                      errorMessage += `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`;
                  }
                  
                  alert(errorMessage);
                  return;
              }

              fileNameInput.value = file.name;
              deleteBtn.style.display = 'block';
          } else {
              fileNameInput.value = '';
              deleteBtn.style.display = 'none';
          }
      });

      deleteBtn.addEventListener('click', function() {
          fileInput.value = '';
          fileNameInput.value = '';
          this.style.display = 'none';
      });
  });
});


//이미지 상세보기
function imageDetail(src) {
  const previewLayer = document.getElementById('image_detail').querySelector('.layer_content ');
  const previewImg = document.getElementById('preview_image');
  if (previewImg) {
      previewImg.onerror = () => {
          box_alert('이미지를 불러올 수 없습니다.', 'info');
          closeLayer('', 'image_detail');
      };
      previewImg.onload = () => {
          const adjustment = window.innerWidth >= 1260 ? 80 : 40;
          previewLayer.style.width = (previewImg.naturalWidth + adjustment) + 'px';
          console.log(adjustment)
      };
      previewImg.src = src;
  }
}