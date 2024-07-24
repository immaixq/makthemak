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
          className="mr-2 mb-2 text-xs border-solid border-2 border-sky-500 rounded-md px-2 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
