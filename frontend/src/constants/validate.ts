const VALIDATION_SIZE = {
  MIN_LENGTH: 1,
  SCHEDULE_MEMO_MAX_LENGTH: 255,
  SCHEDULE_TITLE_MAX_LENGTH: 50,
  CATEGORY_NAME_MAX_LENGTH: 20,
  DISPLAY_NAME_MAX_LENGTH: 100,
};

const VALIDATION_STRING = {
  CATEGORY: '내 일정',
  WITHDRAWAL: '달록 탈퇴',
};

const VALIDATION_MESSAGE = {
  STRING_LENGTH: (min: number, max: number) => `${min}자 ~ ${max}자로 입력해주세요.`,
  INVALID_CATEGORY_NAME: `"${VALIDATION_STRING.CATEGORY}"을 카테고리 이름으로 지정할 수 없습니다.`,
};

export { VALIDATION_MESSAGE, VALIDATION_STRING, VALIDATION_SIZE };
