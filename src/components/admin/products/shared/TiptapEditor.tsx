"use client";

import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";
import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Heading from "@tiptap/extension-heading";
import styles from "./Shared.module.css";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code2,
  Redo2,
  Undo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Table2,
  ChevronDown,
  Type as SpanIcon,
} from "lucide-react";

// --- Toolbar Component ---
const EditorToolbar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [headingOpen, setHeadingOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#222222");
  const pickerRef = useRef<HTMLDivElement>(null);

  // Dropdown blur/close handler
  useEffect(() => {
    if (!headingOpen) return;
    const close = () => setHeadingOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [headingOpen]);

  // Close picker on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    }
    if (showColorPicker) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showColorPicker]);

  if (!editor) return null;

  return (
    <div className={styles.editorToolbar}>
      {/* Heading Dropdown */}
      <div className={styles.toolbarGroup} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setHeadingOpen((v) => !v);
          }}
          className={styles.dropdownButton}
          title="Headings"
        >
          H <ChevronDown size={16} style={{ marginLeft: 2 }} />
        </button>
        {headingOpen && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              zIndex: 10,
              minWidth: 90,
              padding: "0.3rem 0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                type="button"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.4rem 1rem",
                  background: editor?.isActive("heading", { level })
                    ? "var(--color-primary)"
                    : undefined,
                  color: editor?.isActive("heading", { level })
                    ? "#fff"
                    : "#222",
                  border: "none",
                  textAlign: "left",
                  fontWeight: 500,
                  fontSize: `${15 - level * 0.5}px`,
                  cursor: "pointer",
                }}
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                    .run();
                  setHeadingOpen(false);
                }}
              >
                {`Heading ${level}`}
              </button>
            ))}
            <button
              type="button"
              style={{
                display: "block",
                width: "100%",
                padding: "0.4rem 1rem",
                background: editor?.isActive("paragraph")
                  ? "var(--color-primary)"
                  : undefined,
                color: editor?.isActive("paragraph") ? "#fff" : "#222",
                border: "none",
                textAlign: "left",
                fontWeight: 500,
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={() => {
                editor?.chain().focus().setParagraph().run();
                setHeadingOpen(false);
              }}
            >
              Paragraph
            </button>
          </div>
        )}
      </div>
      {/* Formatting */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? styles.active : ""}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? styles.active : ""}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive("underline") ? styles.active : ""}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={editor?.isActive("strike") ? styles.active : ""}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>
        {/* Span (inline style) */}
        <button
          type="button"
          onClick={() => {
            const style = prompt(
              "Enter CSS style (e.g. font-size:20px; color:#e03131;)"
            );
            if (style) {
              editor?.chain().focus().setMark("textStyle", { style }).run();
            }
          }}
          title="Span (Inline Style)"
        >
          <SpanIcon size={18} />
        </button>
      </div>
      {/* Color & Highlight */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setColor("#e03131").run()}
          title="Red"
        >
          <Palette size={18} style={{ color: "#e03131" }} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setColor("#1971c2").run()}
          title="Blue"
        >
          <Palette size={18} style={{ color: "#1971c2" }} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setColor("#2f9e44").run()}
          title="Green"
        >
          <Palette size={18} style={{ color: "#2f9e44" }} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().unsetColor().run()}
          title="Remove Color"
        >
          <Palette size={18} style={{ color: "#222" }} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
          className={editor?.isActive("highlight") ? styles.active : ""}
          title="Highlight"
        >
          <Palette size={18} style={{ background: "#ffe066", color: "#222" }} />
        </button>
      </div>
      {/* Lists */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletList") ? styles.active : ""}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive("orderedList") ? styles.active : ""}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>
      {/* Block, Code, Link, Image */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={editor?.isActive("blockquote") ? styles.active : ""}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={editor?.isActive("code") ? styles.active : ""}
          title="Inline Code"
        >
          <Code2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={editor?.isActive("codeBlock") ? styles.active : ""}
          title="Code Block"
        >
          <Code2 size={18} style={{ opacity: 0.7 }} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor?.chain().focus().setLink({ href: url }).run();
          }}
          className={editor?.isActive("link") ? styles.active : ""}
          title="Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Image URL");
            if (url) editor?.chain().focus().setImage({ src: url }).run();
          }}
          title="Image"
        >
          <ImageIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          title="Insert Table"
        >
          <Table2 size={18} />
        </button>
      </div>
      {/* Alignment & Undo/Redo */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={
            editor?.isActive({ textAlign: "left" }) ? styles.active : ""
          }
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={
            editor?.isActive({ textAlign: "center" }) ? styles.active : ""
          }
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={
            editor?.isActive({ textAlign: "right" }) ? styles.active : ""
          }
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          title="Redo"
        >
          <Redo2 size={18} />
        </button>
      </div>
      {/* Text Color Picker */}
      <div className={styles.toolbarGroup} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setShowColorPicker((v) => !v)}
          title="Text Color"
          style={{
            border: "1px solid #eee",
            background: "#fff",
            borderRadius: "50%",
            width: 28,
            height: 28,
            marginLeft: 4,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Palette size={18} style={{ color }} />
        </button>
        {showColorPicker && (
          <div
            ref={pickerRef}
            style={{
              position: "absolute",
              zIndex: 30,
              top: 36,
              left: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <ChromePicker
              color={color}
              onChange={(c: ColorResult) => setColor(c.hex)}
              onChangeComplete={(c: ColorResult) => {
                setColor(c.hex);
                editor?.chain().focus().setColor(c.hex).run();
              }}
              disableAlpha
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => editor?.chain().focus().unsetColor().run()}
          title="Remove Color"
          style={{
            border: "1px solid #eee",
            background: "#fff",
            borderRadius: "50%",
            width: 28,
            height: 28,
            marginLeft: 4,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Palette size={18} style={{ color: "#222" }} />
        </button>
      </div>
    </div>
  );
};

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Blockquote,
      Code,
      CodeBlock,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      TextStyle,
      Highlight,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    ],
    editorProps: {
      attributes: {
        class: styles.tiptapEditor,
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!isClient) return null;

  return (
    <div className={styles.tiptapWrapper}>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
};
