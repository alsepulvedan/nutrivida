import { dataService, formatPrice } from '../services/dataService';

export const products = dataService.getProducts();
export { formatPrice };
