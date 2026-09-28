'use client';

import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle, FontFamily, FontSize } from '@tiptap/extension-text-style';
import ImageResize from 'tiptap-extension-resize-image';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  ImageIcon,
  Type,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const FONT_FAMILIES = [
  { label: 'Default Font', value: '' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  {
    label: 'Lucida Sans',
    value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
  },
  { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
];

export const FONT_SIZES = [
  { label: 'Default Size', value: '' },
  { label: '12px (Small)', value: '12px' },
  { label: '14px (Normal)', value: '14px' },
  { label: '16px (Medium)', value: '16px' },
  { label: '18px (Large)', value: '18px' },
  { label: '20px (XL)', value: '20px' },
  { label: '24px (2XL)', value: '24px' },
  { label: '28px (3XL)', value: '28px' },
  { label: '32px (4XL)', value: '32px' },
  { label: '36px (5XL)', value: '36px' },
  { label: '48px (Huge)', value: '48px' },
];

export interface TiptapProps {
  content?: string;
  onChange?: (html: string) => void;
  className?: string;
  editable?: boolean;
}

export default function Tiptap({
  content = '',
  onChange,
  className,
  editable = true,
}: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      ImageResize.configure({ inline: true, allowBase64: true }),
    ],
    content,
    editable,
    // Prevents React hydration mismatch errors in Next.js SSR
    immediatelyRender: false,
    // Re-render when selection or transaction updates to keep toolbar states active/synced
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class:
          'h-[320px] overflow-y-auto p-3 text-sm focus:outline-none focus-visible:outline-none [&_p]:my-1.5 [&_p]:leading-relaxed',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (content === undefined) return;
    if (content === '' && editor.isEmpty) return;
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return (
      <div
        className={cn(
          'w-full rounded-md border border-input bg-background text-foreground shadow-xs',
          className,
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/40 p-2">
          <div className="h-8 w-8 rounded-md border border-input bg-muted animate-pulse" />
          <div className="h-8 w-8 rounded-md border border-input bg-muted animate-pulse" />
          <div className="h-8 w-8 rounded-md border border-input bg-muted animate-pulse" />
          <div className="h-4 w-px bg-border mx-1" />
          <div className="h-8 w-38 rounded-md border border-input bg-muted animate-pulse" />
          <div className="h-4 w-px bg-border mx-1" />
          <div className="h-8 w-32 rounded-md border border-input bg-muted animate-pulse" />
        </div>
        <div className="h-[320px] p-3" />
      </div>
    );
  }

  const isBold = editor.isActive('bold');
  const isItalic = editor.isActive('italic');

  const currentFontFamily = editor.getAttributes('textStyle').fontFamily || '';
  const activeFontFamily = FONT_FAMILIES.some(
    (f) => f.value === currentFontFamily,
  )
    ? currentFontFamily
    : '';

  const currentFontSize = editor.getAttributes('textStyle').fontSize || '';
  const activeFontSize = FONT_SIZES.some((s) => s.value === currentFontSize)
    ? currentFontSize
    : '';

  const handleImageInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      editor.chain().focus().setImage({ src: dataUrl }).run();
    };
    reader.readAsDataURL(file);

    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(value).run();
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-md border border-input bg-background text-foreground shadow-xs transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40',
        className,
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/40 p-2">
        {/* Bold Button */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          aria-pressed={isBold}
          title="Bold (Ctrl+B)"
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors cursor-pointer',
            isBold
              ? 'border-primary bg-primary text-primary-foreground shadow-xs'
              : 'border-input bg-background text-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          <BoldIcon className="size-4" />
        </button>

        {/* Italic Button */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          aria-pressed={isItalic}
          title="Italic (Ctrl+I)"
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors cursor-pointer',
            isItalic
              ? 'border-primary bg-primary text-primary-foreground shadow-xs'
              : 'border-input bg-background text-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          <ItalicIcon className="size-4" />
        </button>

        {/* Image Insert Button */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => imageInputRef.current?.click()}
          aria-label="Insert image"
          title="Insert image"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-muted hover:text-foreground text-sm font-medium transition-colors cursor-pointer"
        >
          <ImageIcon className="size-4" />
        </button>

        {/* Hidden file input for image upload */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageInsert}
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Divider */}
        <div className="h-4 w-px bg-border mx-1" aria-hidden="true" />

        {/* Font Family Selector */}
        <div className="flex items-center gap-1">
          <Type
            className="size-3.5 text-muted-foreground shrink-0 ml-1"
            aria-hidden="true"
          />
          <select
            value={activeFontFamily}
            onChange={handleFontChange}
            aria-label="Font family"
            title="Font family"
            className="h-8 w-38 rounded-md border border-input bg-background px-2 py-1 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer"
          >
            {FONT_FAMILIES.map((font) => (
              <option
                key={font.value || 'default'}
                value={font.value}
                style={{ fontFamily: font.value || undefined }}
              >
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border mx-1" aria-hidden="true" />

        {/* Font Size Selector */}
        <div className="flex items-center gap-1">
          <span
            className="text-xs font-semibold text-muted-foreground shrink-0 ml-1"
            aria-hidden="true"
          >
            Size
          </span>
          <select
            value={activeFontSize}
            onChange={handleSizeChange}
            aria-label="Font size"
            title="Font size"
            className="h-8 w-32 rounded-md border border-input bg-background px-2 py-1 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer"
          >
            {FONT_SIZES.map((size) => (
              <option key={size.value || 'default'} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
