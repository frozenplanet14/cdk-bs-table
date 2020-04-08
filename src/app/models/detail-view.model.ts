export interface NameModel {
  firstName: string;
  lastName: string;
  findName: string;
  jobTitle: string;
  prefix: string;
  suffix: string;
  title: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
}

export interface AddressModel extends GeoModel {
  streetName: string;
  streetAddress: string;
  streetSuffix: string;
  streetPrefix: string;
  city: string;
  cityPrefix: string;
  citySuffix: string;
  county: string;
  state: string;
  stateAbbr: string;
  country: string;
  countryCode: string;
  zipCode: string;
  secondaryAddress: string;
}

export interface CommerceModel {
  color: string;
  department: string;
  productName: string;
}

export interface GeoModel {
  lat: string;
  lng: string;
}

export interface Address2Model {
  streetA: string;
  streetB: string;
  streetC: string;
  streetD: string;
  city: string;
  state: string;
  country?: string;
  zipcode: string;
  geo: GeoModel;
}

export interface CompanyModel {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Post {
  words: string;
  sentence: string;
  sentences: string;
  paragraph: string;
}

export interface AccountHistoryModel {
  amount: string;
  date: Date;
  business: string;
  name: string;
  type: string;
  account: string;
}

export interface UserCardModel {
  name: string;
  username: string;
  email: string;
  address: Address2Model;
  phone: string;
  website: string;
  company: CompanyModel;
  posts: Post[];
  accountHistory: AccountHistoryModel[];
}

export interface SuiteAddressModel {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoModel;
}

export interface ContextualModel {
  name: string;
  username: string;
  avatar: string;
  email: string;
  dob: Date;
  phone: string;
  address: SuiteAddressModel;
  website: string;
  company: CompanyModel;
}

export interface UserInfoModel {
  name: string;
  username: string;
  email: string;
  address: SuiteAddressModel;
  phone: string;
  website: string;
  company: CompanyModel;
}

export interface TransactionModel {
  amount: string;
  date: Date;
  business: string;
  name: string;
  type: string;
  account: string;
}

export interface FinanceModel {
  account: string;
  accountName: string;
  mask: string;
  amount: string;
  transactionType: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  bitcoinAddress: string;
  iban: string;
  bic: string;
}

export interface MainCompanyModel {
  suffixes: string[];
  companyName: string;
  companySuffix: string;
  catchPhrase: string;
  bs: string;
  catchPhraseAdjective: string;
  catchPhraseDescriptor: string;
  catchPhraseNoun: string;
  bsAdjective: string;
  bsBuzz: string;
  bsNoun: string;
}

export interface DateModel {
  past: Date;
  future: Date;
  recent: Date;
  month: string;
  weekday: string;
}

export interface DetailViewModel {
  name: NameModel;
  address: AddressModel;
  commerce: CommerceModel;
  card: UserCardModel;
  contextual: ContextualModel;
  userInfo: UserInfoModel;
  transaction: TransactionModel;
  finance: FinanceModel;
  company: MainCompanyModel;
  date: DateModel;
}
