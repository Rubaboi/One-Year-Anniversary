
import type React from 'react';

export interface Story {
  id: number;
  imageUrl: string;
  imageSrcSet?: string; // For responsive images using srcset
  caption: string;
  date: string;
}

export interface TimelineEvent {
  id: number;
  icon: React.ReactNode;
  date: string;
  title: string;
  description: string;
}