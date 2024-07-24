// ./src/components/Tags.tsx
import React from 'react';

interface TagsProps {
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap mt-2">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="inline-block rounded-full px-3 py-1 text-sm font-semibold border-solid border-2 border-sky-500 mr-2 mb-2"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
