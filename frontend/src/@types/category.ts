import { CATEGORY_TYPE } from '@/constants/category';

import { UTCStringType } from './date';
import { ProfileType } from './profile';

interface CategoryType {
  id: number;
  name: string;
  creator: ProfileType;
  createdAt: UTCStringType;
  categoryType: typeof CATEGORY_TYPE[keyof typeof CATEGORY_TYPE];
}

interface CategoriesGetResponseType {
  page: number;
  categories: CategoryType[];
}

export { CategoryType, CategoriesGetResponseType };
