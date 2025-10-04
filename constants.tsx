import React from 'react';
import type { Story, TimelineEvent } from './types';
import HeartIcon from './components/icons/HeartIcon';
import CalendarIcon from './components/icons/CalendarIcon';
import GiftIcon from './components/icons/GiftIcon';

// To edit the page content, change the values below.

// -- STORIES SECTION --
// Replace image URLs, captions, and dates for the stories carousel.
// For better performance on different devices, provide multiple image sizes in `imageSrcSet`.
// e.g., imageSrcSet: 'https://path/to/image-400w.jpg 400w, https://path/to/image-800w.jpg 800w'
export const stories: Story[] = [
  {
    id: 1,
    imageUrl: 'https://i.ibb.co/v6LmWDbc/Messenger-creation-5-B373-FEE-4-BF1-48-CE-9910-3-B80891-E331-C.jpg',
    // imageSrcSet: '...',
    caption: 'My favourite picture',
    date: '',
  },
  {
    id: 2,
    imageUrl: 'https://i.ibb.co/CKj9SV34/Messenger-creation-5-B60-AFC2-F209-4-AD9-878-F-665693-A693-CC.jpg',
    caption: 'The day I made you mine forever',
    date: '',
  },
  {
    id: 3,
    imageUrl: 'https://i.ibb.co/gMZCH22G/Messenger-creation-8095-CB82-E5-AC-4-CDD-8876-FB20-C94-FF68-B.jpg',
    caption: 'Even silence speaks when you are with me',
    date: '',
  },
  {
    id: 4,
    imageUrl: 'https://i.ibb.co/0yV7r9QD/Messenger-creation-9-BAA67-F7-D688-491-C-ACA6-C59-E38210373.jpg',
    caption: 'In your eyes, I see my home forever.',
    date: '',
  },
  // Add more stories here if you like
];

// -- TIMELINE SECTION --
// Replace dates, titles, and descriptions for the timeline highlights.
export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    icon: <HeartIcon className="w-8 h-8" />,
    date: 'June 16, 2024',
    title: 'Our First Text',
    description: 'The simple “hello” that became the beginning of forever.',
  },
  {
    id: 2,
    icon: <CalendarIcon className="w-8 h-8" />,
    date: 'August 2, 2024',
    title: 'First Meet',
    description: 'The moment our eyes met and everything felt meant to be.',
  },
  {
    id: 3,
    icon: <GiftIcon className="w-8 h-8" />,
    date: 'October 5, 2024',
    title: 'Our Journey Began',
    description: 'The day it all started. A simple hello turned into a beautiful story.',
  },
];