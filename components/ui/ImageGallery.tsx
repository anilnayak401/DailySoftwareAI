import React from 'react';
import Image from 'next/image';
import { ProductImage } from '@/lib/types';

interface ImageGalleryProps {
  images?: ProductImage[];
}

export function ImageGallery({ images = [] }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold text-white mb-4">Product Screenshots</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-video rounded-xl overflow-hidden border border-gray-800 bg-gray-950 group"
          >
            <Image
              src={img.url}
              alt={img.alt || 'Product screenshot'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
