import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Position, positions } from '../lib/utils';

interface Logo {
  id: string;
  dataUrl: string;
  position: Position;
  size: number;
  opacity: number;
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
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700/50 rounded-lg shadow-sm transition-colors border border-gray-100 dark:border-gray-600">
      <button
        className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </button>

      <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
        <img
          src={logo.dataUrl}
          alt="Logo preview"
          className="max-w-full max-h-full object-contain p-2"
        />
      </div>

      <div className="flex-1 space-y-4">
        {/* Regular settings */}
        <select
          value={logo.position}
          onChange={(e) => handlePositionChange(e.target.value as Position)}
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(positions).map(([key, value]) => (
            <option key={key} value={key}>
              {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>

        {!patternMode && (
          <>
            <div className="space-y-2">
              {/* Size control */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Size</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{logo.size}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={logo.size}
                onChange={(e) => handleSizeChange(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </>
        )}

        {/* Opacity control - shown in both modes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Opacity</label>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(logo.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={logo.opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Pattern settings - only show when pattern mode is enabled */}
        {patternMode && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Pattern Settings</h3>
            
            <div className="space-y-4">
              {/* Pattern size control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Pattern Size</label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{logo.patternSize || 100}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={logo.patternSize || 100}
                  onChange={(e) => onUpdate({ patternSize: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Rotation</label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{logo.patternRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={logo.patternRotation}
                  onChange={(e) => onUpdate({ patternRotation: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Offset X</label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{logo.patternOffsetX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={logo.patternOffsetX}
                    onChange={(e) => onUpdate({ patternOffsetX: Number(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Offset Y</label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{logo.patternOffsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={logo.patternOffsetY}
                    onChange={(e) => onUpdate({ patternOffsetY: Number(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onRemove}
        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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