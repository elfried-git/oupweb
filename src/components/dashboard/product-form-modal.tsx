'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import type { Product } from '@/types';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
  product?: Product | null;
  isLoading?: boolean;
}

const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Other'];

const getInitialFormData = (product?: Product | null) => ({
  name: product?.name || '',
  description: product?.description || '',
  price: product?.price?.toString() || '',
  category: product?.category || '',
  stock: product?.stock?.toString() || '',
  sku: product?.sku || '',
  imageUrl: product?.imageUrl || '',
  isActive: product?.isActive ?? true,
});

// Style commun pour tous les inputs
const inputStyle = { 
  backgroundColor: '#334155', 
  color: '#F8FAFC', 
  borderColor: '#475569',
  opacity: 1 
};

export function ProductFormModal({ 
  open, 
  onClose, 
  onSubmit, 
  product,
  isLoading 
}: ProductFormModalProps) {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState(() => getInitialFormData(product));

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    } else {
      setFormData(getInitialFormData(product));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (open && product) {
    const currentData = getInitialFormData(product);
    if (JSON.stringify(formData) !== JSON.stringify(currentData)) {
      setFormData(currentData);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="product-form-modal">
        <DialogHeader>
          <DialogTitle className="gradient-text">
            {product ? t.product.edit : t.product.create}
          </DialogTitle>
          <DialogDescription>
            {product 
              ? t.product.edit + ' - ' + product.name
              : t.product.create}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t.product.nameRequired}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                style={inputStyle}
                required
                data-testid="product-name-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right">
                {t.product.skuRequired}
              </Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="col-span-3"
                style={inputStyle}
                required
                data-testid="product-sku-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                {t.product.categoryRequired}
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger 
                  className="col-span-3" 
                  data-testid="product-category-select"
                  style={inputStyle}
                >
                  <SelectValue placeholder={t.product.category} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                {t.product.priceRequired}
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="col-span-3"
                style={inputStyle}
                required
                data-testid="product-price-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                {t.product.stockRequired}
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="col-span-3"
                style={inputStyle}
                required
                data-testid="product-stock-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                {t.product.description}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                style={inputStyle}
                rows={3}
                data-testid="product-description-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                {t.product.imageUrl}
              </Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="col-span-3"
                style={inputStyle}
                data-testid="product-image-input"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                {t.product.active}
              </Label>
              <div className="flex items-center gap-2 col-span-3">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  data-testid="product-active-switch"
                />
                <span className="text-sm text-muted-foreground">
                  {formData.isActive ? t.product.isActive : t.product.isInactive}
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
              data-testid="cancel-product-button"
            >
              {t.common.cancel}
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="fun-button"
              data-testid="submit-product-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                product ? t.common.update : t.common.create
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
