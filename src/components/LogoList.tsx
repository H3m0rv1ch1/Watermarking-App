import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Position, positions, readFileAsDataURL } from '../lib/utils';

interface Logo {
  id: string;
  file?: File; // include file so we can update it
  dataUrl: string;
  position: Position;
  size: number;
  opacity: number;
  x: number;
  y: number;
  patternSize: number;
  patternRotation: number;
  patternOffsetX: number;
  patternOffsetY: number;
}

interface LogoItemProps {
  logo: Logo;
  patternMode: boolean;  // Add this prop
  onUpdate: (updates: Partial<Logo>) => void;
  onRemove: () => void;
}

function LogoItem({ logo, patternMode, onUpdate, onRemove }: LogoItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const fileInputId = `logo-file-${logo.id}`;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: logo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChangeLogoFile = async (file?: File) => {
    if (!file) return;
    setIsChangingImage(true);
    try {
      const dataUrl = await readFileAsDataURL(file);
      onUpdate({ dataUrl, file });
    } finally {
      setIsChangingImage(false);
    }
  };

  const handleSizeChange = (value: number) => {
    // Ensure size is between 1 and 100
    const size = Math.max(1, Math.min(100, value));
    onUpdate({ size });
  };

  const handleOpacityChange = (value: number) => {
    // Ensure opacity is between 0 and 1
    const opacity = Math.max(0, Math.min(1, value));
    onUpdate({ opacity });
  };

  const handlePositionChange = (position: Position) => {
    onUpdate({
      position,
      x: positions[position].x,
      y: positions[position].y
    });
  };

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          className="cursor-grab active:cursor-grabbing p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>

        <div className="w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 group">
          <button
            type="button"
            title="Click to change logo image"
            aria-label="Change logo image"
            className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onClick={() => {
              const input = document.getElementById(fileInputId) as HTMLInputElement | null;
              input?.click();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                const input = document.getElementById(fileInputId) as HTMLInputElement | null;
                input?.click();
              }
            }}
          >
            <img
              src={logo.dataUrl}
              alt="Logo preview"
              className={`max-w-full max-h-full object-contain p-2 ${isChangingImage ? 'opacity-50' : ''}`}
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 sm:w-5 sm:h-5">
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </button>
          <input
            id={fileInputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleChangeLogoFile(e.target.files?.[0])}
          />
        </div>
        
        <button
          onClick={onRemove}
          className="ml-auto sm:hidden p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Remove logo"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 w-full space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2 relative">
          <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-2 sm:p-2.5 border-2 rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium shadow-sm hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer flex items-center justify-between"
            >
              <span className="text-xs sm:text-sm">{logo.position.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
              <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-1.5">
                  {Object.entries(positions).map(([key]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        handlePositionChange(key as Position);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 text-left font-medium transition-colors rounded-md ${
                        logo.position === key
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {!patternMode && (
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
              <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">{logo.size}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={logo.size}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="w-full accent-blue-500 h-2"
            />
          </div>
        )}

        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</label>
            <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">{Math.round(logo.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={logo.opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className="w-full accent-blue-500 h-2"
          />
        </div>

        {patternMode && (
          <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Pattern Settings</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Pattern Size</label>
                  <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">{logo.patternSize || 100}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={logo.patternSize || 100}
                  onChange={(e) => onUpdate({ patternSize: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-2"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Rotation</label>
                  <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">{logo.patternRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={logo.patternRotation}
                  onChange={(e) => onUpdate({ patternRotation: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Offset X</label>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{logo.patternOffsetX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={logo.patternOffsetX}
                    onChange={(e) => onUpdate({ patternOffsetX: Number(e.target.value) })}
                    className="w-full accent-blue-500 h-2"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Offset Y</label>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{logo.patternOffsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={logo.patternOffsetY}
                    onChange={(e) => onUpdate({ patternOffsetY: Number(e.target.value) })}
                    className="w-full accent-blue-500 h-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onRemove}
        className="hidden sm:block p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        title="Remove logo"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

interface LogoListProps {
  logos: Logo[];
  patternMode: boolean;  // Add this prop
  onLogoUpdate: (id: string, updates: Partial<Logo>) => void;
  onLogoRemove: (id: string) => void;
  onReorder: (logos: Logo[]) => void;
}

export function LogoList({
  logos,
  patternMode,
  onLogoUpdate,
  onLogoRemove,
  onReorder,
}: LogoListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = logos.findIndex((logo) => logo.id === active.id);
      const newIndex = logos.findIndex((logo) => logo.id === over.id);
      onReorder(arrayMove(logos, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={logos}>
        <div className="space-y-4">
          {logos.map((logo) => (
            <LogoItem
              key={logo.id}
              logo={logo}
              patternMode={patternMode}
              onUpdate={(updates) => onLogoUpdate(logo.id, updates)}
              onRemove={() => onLogoRemove(logo.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}