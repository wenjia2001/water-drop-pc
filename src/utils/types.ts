export interface IPropChild {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  tel: string;
  name: string;
  desc: string;
  avatar: string;
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
