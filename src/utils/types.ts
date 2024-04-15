export interface IPropChild {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  tel: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
  currentOrg?: string;
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface IMedia {
  id: string;
  url: string;
  remark: string;
}

// 门店
export interface IOrganization {
  id: string;
  businessLicense: string;
  identityCardBackImg: string;
  identityCardFrontImg: string;
  tags: string;
  discription: string;
  name: string;
  logo: '';
  address: string;
  longitude: string;
  latitude: string;
  tel: string;
  orgRoomImg?: IMedia[];
  orgFrontImg?: IMedia[];
  orgOtherImg?: IMedia[];
}

export type TBasePrganization = Partial<IOrganization>;

export type TOrgsQuery = {
  [key: string]: { __typename?: 'Query'; data: IOrganization[]; page: IPage };
};

export type TOrgQuery = {
  [key: string]: { __typename?: 'Query'; data: IOrganization };
};

export type TWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface IOrderTime {
  startTime: string;
  endTime: string;
  key: number;
}

export interface IWeekCourse {
  week: TWeek;
  orderTime: IOrderTime[];
}

export interface ICourse {
  id: string;
  name: string;
  desc: string;
  group: string;
  baseAbility: string;
  limitNumber: number;
  duration: number;
  reserveInfo: string;
  refundInfo: string;
  otherInfo: string;
  reducibleTime: IWeekCourse[];
}

export type TCourseQuery = {
  [key: string]: { __typename?: 'Query'; data: ICourse; page: IPage };
};
export type TCoursesQuery = {
  [key: string]: { __typename?: 'Query'; data: ICourse[]; page: IPage };
};

export type TBaseCourse = Partial<ICourse>;

export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course: ICourse;
}

export type TCardsQuery = {
  [key: string]: { __typename?: 'Query'; data: ICard[]; page: IPage };
};

export interface IProduct {
  id: string;
  name: string;
  desc: string;
  stock: number;
  limitBuyNumber: number;
  coverUrl: string;
  bannerUrl: string;
  originalPrice: number;
  preferentialPrice: number;
  cards: ICard[];
}

export type TProductQuery = {
  [key: string]: { __typename?: 'Query'; data: IProduct };
};

export type TProductsQuery = {
  [key: string]: { __typename?: 'Query'; data: IProduct[]; page: IPage };
};

export type TBaseProduct = Partial<IProduct>;
