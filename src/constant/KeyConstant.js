export const DATA_USER = "data_user";
export const USER_ID = "user_id";
export const LANGUAGE = "language";
export const FIRST_INSTALL = "first_install";

//Default value
export const DEFAULT_LANGUGE = {
  RowNum: 2,
  LangID: 129,
  Code: "vi-VN",
  Name: "Vietnamese - Vietnam ",
  Status: 1,
  TotalRow: 4
};

//state of gender
export const GENDER_STATE = {
  WOMEN: 0,
  MAN: 1,
  OTHER: 2
};

//state of account
export const TYPE_ACCOUNT = {
  PERSONAL: 2, //cá nhân
  BUSINESS: 3, //doanh nghiệp
  TEMP: 4 //vãng lai
};

export const STATUS_ACCOUNT = {
  ACTIVE: 1,
  INACTIVE: 0
};

//search type of post
export const TYPE_POST = {
  ADMIN: 1, //post cua BQL
  PERSONAL: 2, //post ca nhan
  BUSINESS: 3, //doanh nghiep
  ALL: 255 //toan bo
};

//pin type of post
export const TYPE_POST_PIN = {
  MARK: 1, //post da ghim
  NON_MARK: 0, //post khong ghim
  ALL: 255 //toan bo
};
