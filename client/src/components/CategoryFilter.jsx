const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Electronics', 'Clothing', 'Footwear', 'Accessories', 'Home & Kitchen'];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category === 'All' ? '' : category)}
          className={`px-4 py-2 rounded-full text-sm border ${
            selectedCategory === (category === 'All' ? '' : category)
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;