'use client';

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Zap, Leaf, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { PremiumCard } from './PremiumCard';

// Types
interface ProductSpecs {
  power?: string;
  capacity?: string;
  warranty?: string;
  efficiency?: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  category: string;
  subcategory?: string;
  targetUsers?: string[];
  specifications?: ProductSpecs;
  applications?: string[];
  tags: string[];
  badge?: string;
  sale?: string;
}

interface EnhancedProductCardProps {
  product: Product;
  className?: string;
}

// Product Image Component with Category Icons
const ProductImagePlaceholder = memo(({ category, className = '' }: { category: string; className?: string }) => {
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'solar':
        return <Sun className="w-16 h-16 text-[#3dd56d]" />;
      case 'cookstoves':
        return <Zap className="w-16 h-16 text-[#3dd56d]" />;
      default:
        return <Leaf className="w-16 h-16 text-[#3dd56d]" />;
    }
  };

  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#3dd56d]/20 to-[#4ade80]/20 rounded-xl ${className}`}>
      {getIcon()}
    </div>
  );
});

ProductImagePlaceholder.displayName = 'ProductImagePlaceholder';

// Badge Component
const ProductBadge = memo(({ badge, sale }: { badge?: string; sale?: string }) => {
  if (!badge && !sale) return null;

  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
      {badge && (
        <motion.div
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#3dd56d] to-[#4ade80] text-white shadow-lg"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {badge}
        </motion.div>
      )}
      {sale && (
        <motion.div
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
          initial={{ scale: 0, rotate: 10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {sale}
        </motion.div>
      )}
    </div>
  );
});

ProductBadge.displayName = 'ProductBadge';

// Main Enhanced Product Card Component
export const EnhancedProductCard = memo<EnhancedProductCardProps>(({
  product,
  className = '',
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isDark } = useTheme();

  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <PremiumCard
      variant="product"
      patternType="energy"
      animationType="energy-burst"
      glowEffect={true}
      size="lg"
      className={className}
    >
      <div className="flex flex-col h-full">
        {/* Product Badge */}
        <ProductBadge badge={product.badge} sale={product.sale} />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm shadow-lg border border-white/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span className="text-white font-semibold text-xs">
              {product.rating}
            </span>
          </motion.div>
        </div>

        {/* Product Image Section */}
        <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3dd56d]/10 to-[#4ade80]/10" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <ProductImagePlaceholder
              category={product.category}
              className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#3dd56d]/20 text-[#3dd56d] backdrop-blur-sm shadow-lg border border-[#3dd56d]/20">
              <Leaf className="w-3 h-3" />
              <span className="hidden sm:inline">
                {product.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Product Title */}
          <h3 className={`text-xl font-bold mb-3 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {product.name}
          </h3>

          {/* Product Description */}
          <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {product.description}
          </p>

          {/* Specifications */}
          {product.specifications && (
            <div className={`rounded-xl p-4 mb-4 ${
              isDark 
                ? 'bg-slate-800/50 border border-slate-700/50' 
                : 'bg-green-50/50 border border-green-200/50'
            }`}>
              <h4 className={`text-sm font-semibold mb-3 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <div className="w-2 h-2 bg-[#3dd56d] rounded-full mr-2"></div>
                Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.specifications.power && (
                  <div className="flex justify-between">
                    <span className="text-[#3dd56d]">Power</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {product.specifications.power}
                    </span>
                  </div>
                )}
                {product.specifications.warranty && (
                  <div className="flex justify-between">
                    <span className="text-[#3dd56d]">Warranty</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {product.specifications.warranty}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Applications */}
          {product.applications && product.applications.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {product.applications.slice(0, 3).map(app => (
                  <span
                    key={app}
                    className="text-xs bg-[#3dd56d]/10 text-[#3dd56d] px-2 py-1 rounded-full border border-[#3dd56d]/20"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Call-to-Action Section */}
          <div className="mt-auto">
            <div className={`rounded-xl p-4 mb-4 border-2 border-dashed transition-all duration-300 hover:border-solid ${
              isDark
                ? 'border-[#3DD56D]/40 bg-[#3DD56D]/5 hover:border-[#3DD56D]/70 hover:bg-[#3DD56D]/10'
                : 'border-[#3DD56D]/40 bg-[#3DD56D]/5 hover:border-[#3DD56D]/70 hover:bg-[#3DD56D]/10'
            }`}>
              <div className="text-center">
                <div className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Get Pricing Information
                </div>
                <a
                  href="tel:+251913330000"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-[#3DD56D]/20 text-[#3DD56D] hover:bg-[#3DD56D]/30'
                      : 'bg-[#3DD56D]/20 text-[#2bb757] hover:bg-[#3DD56D]/30'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (+251) 913 330000
                </a>
                <div className={`text-xs mt-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Call for competitive pricing
                </div>
                {product.rating >= 4.5 && (
                  <div className="flex items-center justify-center gap-1 bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs mt-2">
                    <Award className="w-3 h-3" />
                    <span className="font-semibold">Top Rated</span>
                  </div>
                )}
              </div>


            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2 py-1 rounded bg-[#3dd56d]/20 text-[#3dd56d] border border-[#3dd56d]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
});

EnhancedProductCard.displayName = 'EnhancedProductCard';

export default EnhancedProductCard;
