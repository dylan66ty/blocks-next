import { withInstall } from '../../utils/vue-utils';
import _Pagination from './src/pagination';

export const Pagination = withInstall(_Pagination);
export type PaginationInstance = InstanceType<typeof _Pagination>;
export * from './src/types';

export default Pagination;