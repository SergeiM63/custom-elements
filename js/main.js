document.addEventListener('DOMContentLoaded', () => {
  //---------------------------------------------------------------------------
  // ChoicesJS
  //---------------------------------------------------------------------------
  const defaultSelect = () => {
    const element = document.querySelector('.select-default');
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
    });
  }
  defaultSelect();

  //---------------------------------------------------------------------------
  // Yandex-карта
  //---------------------------------------------------------------------------
  const centerPoint = [48.856663, 2.351556];
  const placemarkPoint = [48.872185, 2.354224];

  function init() {
    const myMap = new ymaps.Map("map", {
        center: centerPoint,
        zoom: 12
    });

    let placemark = new ymaps.Placemark(placemarkPoint, {}, {
      iconLayout: 'default#image',
      iconImageHref: "data:image/svg+xml,%3Csvg width='28' height='40' viewBox='0 0 28 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9091 14C10.9091 12.2929 12.2929 10.9091 14 10.9091C15.7071 10.9091 17.0909 12.2929 17.0909 14C17.0909 15.7071 15.7071 17.0909 14 17.0909C12.2929 17.0909 10.9091 15.7071 10.9091 14Z' fill='%23CCB26E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 14C0 6.26 6.26 0 14 0C21.74 0 28 6.26 28 14C28 24.5 14 40 14 40C14 40 0 24.5 0 14ZM15 5C15 4.44771 14.5523 4 14 4C13.4477 4 13 4.44771 13 5V6.63636C13 7.18865 13.4477 7.63636 14 7.63636C14.5523 7.63636 15 7.18865 15 6.63636V5ZM8.34163 6.92744C7.9511 6.53692 7.31794 6.53692 6.92741 6.92744C6.53689 7.31796 6.53689 7.95113 6.92741 8.34165L8.08923 9.50347C8.47976 9.894 9.11292 9.894 9.50345 9.50347C9.89397 9.11295 9.89397 8.47978 9.50345 8.08926L8.34163 6.92744ZM21.0725 8.34165C21.4631 7.95113 21.4631 7.31796 21.0725 6.92744C20.682 6.53692 20.0489 6.53692 19.6583 6.92744L18.4965 8.08926C18.106 8.47978 18.106 9.11295 18.4965 9.50347C18.887 9.894 19.5202 9.894 19.9107 9.50347L21.0725 8.34165ZM14 8.90909C11.1884 8.90909 8.90909 11.1884 8.90909 14C8.90909 16.8116 11.1884 19.0909 14 19.0909C16.8116 19.0909 19.0909 16.8116 19.0909 14C19.0909 11.1884 16.8116 8.90909 14 8.90909ZM5 13C4.44771 13 4 13.4477 4 14C4 14.5523 4.44771 15 5 15H6.63636C7.18865 15 7.63636 14.5523 7.63636 14C7.63636 13.4477 7.18865 13 6.63636 13H5ZM21.3636 13C20.8114 13 20.3636 13.4477 20.3636 14C20.3636 14.5523 20.8114 15 21.3636 15H23C23.5523 15 24 14.5523 24 14C24 13.4477 23.5523 13 23 13H21.3636ZM9.50345 19.9108C9.89397 19.5202 9.89397 18.8871 9.50345 18.4965C9.11292 18.106 8.47976 18.106 8.08923 18.4965L6.92741 19.6584C6.53689 20.0489 6.53689 20.682 6.92741 21.0726C7.31794 21.4631 7.9511 21.4631 8.34163 21.0726L9.50345 19.9108ZM19.9107 18.4965C19.5202 18.106 18.887 18.106 18.4965 18.4965C18.106 18.8871 18.106 19.5202 18.4965 19.9108L19.6583 21.0726C20.0489 21.4631 20.682 21.4631 21.0725 21.0726C21.4631 20.682 21.4631 20.0489 21.0725 19.6584L19.9107 18.4965ZM15 21.3636C15 20.8114 14.5523 20.3636 14 20.3636C13.4477 20.3636 13 20.8114 13 21.3636V23C13 23.5523 13.4477 24 14 24C14.5523 24 15 23.5523 15 23V21.3636Z' fill='%23CCB26E'/%3E%3C/svg%3E%0A",
      iconImageSize: [28, 40],
      iconImageOffset: [0, 0],
    });

    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('rulerControl');
    myMap.controls.remove(['scrollZoom']);

    myMap.geoObjects.add(placemark)
  }

  ymaps.ready(init);

  //---------------------------------------------------------------------------
  // Кастомный Scroll
  //---------------------------------------------------------------------------
  new SimpleBar(document.querySelector('.content'), { autoHide: false });

  //---------------------------------------------------------------------------
  // Валидация Form
  //---------------------------------------------------------------------------
  const selector = document.querySelector("input[type='tel']");

  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  new JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
      },
      email: {
        required: true,
        email: true,
      },
    },

    messages: {
      name: {
        required: 'Как вас зовут?',
        minLength: 'Имя должно содержать больше букв',
      },
      tel: {
        required: 'Укажите ваш телефон',
        function: 'Введите 10 цифр',

      },
      email: 'Укажите ваш email',
    },
  });

  //---------------------------------------------------------------------------
  // TippyJS Tooltip
  //---------------------------------------------------------------------------
  tippy('.marker', {
    content: 'Глава 2, страница 176',
  });
});

