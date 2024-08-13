export interface CategoryProps {
  title: string;
  url: string;
}

export interface CategoryViewProps {
  categories: CategoryProps[];
  selectedCategory: string | null;
  hoveredCategory: string | null;
  setSelectedCategory: (category: string) => void;
  setHoveredCategory: (category: string | null) => void;
  handleCategoryClick: (category: CategoryProps) => void;
}
