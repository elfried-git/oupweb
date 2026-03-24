'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MoreHorizontal, 
  Search, 
  ArrowUpDown,
  Filter,
  Edit3,
  Trash2,
} from 'lucide-react';
import { PackageIcon } from '@/components/icons/custom-icons';
import { useTranslation } from '@/hooks/use-translation';
import { translateProduct } from '@/locales/translations';
import { ProductsTableSkeleton } from '@/components/skeletons/loading-skeletons';
import type { Product } from '@/types';

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  isLoading?: boolean;
}

export const ProductsTable = memo(function ProductsTable({ 
  products, 
  onEdit, 
  onDelete, 
  onAdd, 
  isLoading 
}: ProductsTableProps) {
  const { t } = useTranslation();
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categories = useMemo(() => 
    [...new Set(products.map(p => p.category))], 
    [products]
  );

  const getTranslatedProduct = useCallback((product: Product) => {
    return translateProduct(product);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const translated = getTranslatedProduct(p);
        const matchesSearch = translated.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const translatedA = getTranslatedProduct(a);
        const translatedB = getTranslatedProduct(b);
        let comparison = 0;
        if (sortBy === 'name') comparison = translatedA.name.localeCompare(translatedB.name);
        else if (sortBy === 'price') comparison = a.price - b.price;
        else if (sortBy === 'stock') comparison = a.stock - b.stock;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [products, search, categoryFilter, sortBy, sortOrder, getTranslatedProduct]);

  const handleSort = useCallback((column: string) => {
    setSortBy(prev => {
      if (prev === column) {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
        return prev;
      }
      setSortOrder('asc');
      return column;
    });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategoryFilter(value);
  }, []);

  const handleEditClick = useCallback((product: Product) => {
    onEdit(product);
  }, [onEdit]);

  const handleDeleteClick = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  if (isLoading) {
    return <ProductsTableSkeleton />;
  }

  return (
    <Card className="fun-card" data-testid="products-table-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-3">
            <PackageIcon size={28} />
            {t.product.title}
          </CardTitle>
          <Button 
            onClick={onAdd} 
            size="sm"
            data-testid="add-product-button"
            data-action="add-product"
            className="fun-button rounded-xl"
          >
            + {t.product.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div data-testid="products-filters" className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.product.search}
              value={search}
              onChange={handleSearchChange}
              className="pl-9 h-10 rounded-xl"
              data-testid="product-search-input"
              data-filter-type="search"
              type="search"
              aria-label="Search products"
            />
          </div>
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger 
              className="w-full sm:w-[180px] h-10 rounded-xl" 
              data-testid="category-filter-select"
              data-filter-type="category"
              aria-label="Filter by category"
            >
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-testid="category-filter-options">
              <SelectItem 
                value="all" 
                data-testid="category-option-all"
                data-category="all"
              >
                {t.product.allCategories}
              </SelectItem>
              {categories.map(cat => {
                const translatedCategory = translateProduct({ name: '', description: '', category: cat }).category;
                return (
                  <SelectItem 
                    key={cat} 
                    value={cat}
                    data-testid={`category-option-${cat.toLowerCase()}`}
                    data-category={cat}
                  >
                    {translatedCategory}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div data-testid="products-table-wrapper" className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <Table data-testid="products-table" aria-label="Products table">
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 -ml-3 font-medium"
                      onClick={() => handleSort('name')}
                      data-testid="sort-by-name-button"
                      data-sort-column="name"
                      data-sort-order={sortBy === 'name' ? sortOrder : 'none'}
                      aria-label="Sort by name"
                    >
                      {t.product.name}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">{t.product.sku}</TableHead>
                  <TableHead className="hidden md:table-cell">{t.product.category}</TableHead>
                  <TableHead className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 -ml-3 font-medium"
                      onClick={() => handleSort('price')}
                      data-testid="sort-by-price-button"
                      data-sort-column="price"
                      data-sort-order={sortBy === 'price' ? sortOrder : 'none'}
                      aria-label="Sort by price"
                    >
                      {t.product.price}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-center hidden sm:table-cell">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 -ml-3 font-medium"
                      onClick={() => handleSort('stock')}
                      data-testid="sort-by-stock-button"
                      data-sort-column="stock"
                      data-sort-order={sortBy === 'stock' ? sortOrder : 'none'}
                      aria-label="Sort by stock"
                    >
                      {t.product.stock}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">{t.product.status}</TableHead>
                  <TableHead className="w-[50px]">{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-testid="products-table-body">
                {filteredProducts.length === 0 ? (
                  <TableRow data-testid="products-empty-state">
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      {t.product.noProducts}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product, index) => {
                    const translated = getTranslatedProduct(product);
                    return (
                      <TableRow 
                        key={product.id} 
                        data-testid={`product-row-${product.id}`}
                        data-product-id={product.id}
                        data-product-name={translated.name}
                        data-row-index={index}
                        className="group"
                      >
                        <TableCell className="font-medium">
                          <span data-testid={`product-name-${product.id}`}>{translated.name}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span data-testid={`product-sku-${product.id}`} className="font-mono text-sm text-muted-foreground">
                            {product.sku}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge 
                            variant="secondary" 
                            className="rounded-lg"
                            data-testid={`product-category-${product.id}`}
                            data-category={product.category}
                          >
                            {translated.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span data-testid={`product-price-${product.id}`} className="font-mono font-semibold">
                            ${product.price.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <span 
                            data-testid={`product-stock-${product.id}`}
                            data-stock={product.stock}
                            className={`font-bold ${
                              product.stock < 20 ? 'text-red-500' : 
                              product.stock < 50 ? 'text-amber-500' : 'text-emerald-500'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge 
                            className={`rounded-lg ${
                              product.isActive 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                            data-testid={`product-status-${product.id}`}
                            data-is-active={product.isActive}
                          >
                            {product.isActive ? t.product.active : t.product.inactive}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                data-testid={`product-actions-button-${product.id}`}
                                data-product-id={product.id}
                                aria-label={`Actions for ${translated.name}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              align="end"
                              data-testid={`product-actions-menu-${product.id}`}
                            >
                              <DropdownMenuItem 
                                onClick={() => handleEditClick(product)}
                                data-testid={`edit-product-button-${product.id}`}
                                data-action="edit"
                                data-product-id={product.id}
                                className="cursor-pointer"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                {t.common.edit}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive cursor-pointer"
                                onClick={() => handleDeleteClick(product.id)}
                                data-testid={`delete-product-button-${product.id}`}
                                data-action="delete"
                                data-product-id={product.id}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t.common.delete}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div data-testid="products-count" className="mt-4 text-sm text-muted-foreground">
          {t.product.showingOf
            .replace('{count}', filteredProducts.length.toString())
            .replace('{total}', products.length.toString())}
        </div>
      </CardContent>
    </Card>
  );
});
