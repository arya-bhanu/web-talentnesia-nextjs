import React, { useState, useEffect } from 'react';
import { cmsApi } from '@/backoffice/modules/cms/Api/cmsApi';
import { Tag } from '@/backoffice/modules/cms/form-blog/formBlog.type';

interface TagInputProps {
  tags: string[];
  onTagChange: (newTags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await cmsApi.getTags();
      if (response && response.data) {
        setAllTags(response.data);
      }
    };
    fetchTags();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = allTags.filter(tag => 
        tag.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const existingTag = allTags.find(tag => tag.name.toLowerCase() === inputValue.toLowerCase());
      if (existingTag) {
        if (!tags.includes(existingTag.id)) {
          onTagChange([...tags, existingTag.id]);
        }
      } else {
        const newTag = await cmsApi.addTag({ name: inputValue });
        if (newTag && newTag.data) {
          setAllTags([...allTags, newTag.data]);
          onTagChange([...tags, newTag.data.id]);
        }
      }
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (tag: Tag) => {
    if (!tags.includes(tag.id)) {
      onTagChange([...tags, tag.id]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveTag = (tagId: string) => {
    const updatedTags = tags.filter(id => id !== tagId);
    onTagChange(updatedTags);
  };

  return (
    <div className="bg-gray-50  text-gray-900 text-sm rounded-l block w-full mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Tambahkan tag"
        className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-white focus:border-gray-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tagId) => {
          const tag = allTags.find(t => t.id === tagId);
          return tag ? (
            <div key={tag.id} className="flex items-center bg-[#4ABDF0] text-white font-semibold px-2 py-1 rounded-lg mb-2 mt-2">
              <span>{tag.name}</span>
              <button
                type="button"
                className="ml-2 text-[#667085]"
                onClick={() => handleRemoveTag(tag.id)}
              >
                &times;
              </button>
            </div>
          ) : null;
        })}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          {suggestions.map(tag => (
            <li
              key={tag.id}
              onClick={() => handleSuggestionClick(tag)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
