import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  children?: DropdownItem[];
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  align?: 'left' | 'right';
  onItemClick?: (item: DropdownItem) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  className = '',
  align = 'left',
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenSubmenus(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    if (item.children?.length) {
      setOpenSubmenus(prev => {
        const newSet = new Set(prev);
        if (newSet.has(item.id)) {
          newSet.delete(item.id);
        } else {
          newSet.add(item.id);
        }
        return newSet;
      });
      return;
    }

    if (item.onClick) {
      item.onClick();
    }

    if (onItemClick) {
      onItemClick(item);
    }

    setIsOpen(false);
    setOpenSubmenus(new Set());
  };

  const renderItems = (items: DropdownItem[], level = 0) => {
    return items.map((item, index) => {
      if (item.divider) {
        return <div key={`divider-${index}`} className="h-px bg-gray-200 my-1" />;
      }

      const isSubmenuOpen = openSubmenus.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-left text-sm
              transition-colors duration-200 rounded-md
              ${item.disabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
              ${level > 0 ? 'ml-4' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
            {hasChildren && (
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSubmenuOpen ? 'rotate-90' : ''
                }`}
              />
            )}
          </button>

          {hasChildren && isSubmenuOpen && (
            <div className="mt-1 space-y-1">
              {renderItems(item.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          <div className="p-1 max-h-96 overflow-y-auto">
            {renderItems(items)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
