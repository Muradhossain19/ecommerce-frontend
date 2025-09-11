"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./MediaUpload.module.css";
import sharedStyles from "../shared/Shared.module.css";
import { ProductData } from "./AddProductView";

// ইন্টারফেস (অপরিবর্তিত)
interface UploadedFile {
  id: string;
  file: File | { url: string }; // edit mode এ file.url থাকতে পারে
  preview: string;
  altText: string;
}

// প্রতিটি সর্টেবল আইটেমের জন্য আলাদা কম্পোনেন্ট (সংশোধিত)
const SortableItem: React.FC<{
  file: UploadedFile;
  isMain: boolean;
  onRemove: (id: string) => void;
  onSetMain: (id: string) => void;
  onAltTextChange: (id: string, text: string) => void;
}> = ({ file, isMain, onRemove, onSetMain, onAltTextChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.previewItem} ${isDragging ? styles.dragging : ""} ${
        isMain ? styles.mainImage : ""
      }`}
    >
      <div className={styles.thumb}>
        <img
          className={styles.img}
          src={file.preview}
          alt={file.altText || "Preview"}
        />
      </div>

      <div className={styles.altTextInputWrapper}>
        <input
          type="text"
          placeholder="Alt Text"
          value={file.altText}
          onChange={(e) => onAltTextChange(file.id, e.target.value)}
          className={styles.altTextInput}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>

      {!isMain && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSetMain(file.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className={styles.setMainButton}
        >
          Set as Main
        </button>
      )}

      {isMain && <div className={styles.mainImageBadge}>Main</div>}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={styles.removeButton}
      >
        &times;
      </button>
    </div>
  );
};

// MediaUpload কম্পোনেন্ট (এখন edit mode সাপোর্ট করে)
interface MediaUploadProps {
  isEditMode?: boolean;
  initialData?: ProductData | null;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  isEditMode = false,
  initialData = null,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [mainImageId, setMainImageId] = useState<string | null>(null);

  // Edit mode: initialData থেকে ছবি লোড
  useEffect(() => {
    if (isEditMode && initialData?.images && initialData.images.length > 0) {
      const loadedFiles: UploadedFile[] = initialData.images.map(
        (url, idx) => ({
          id: `existing-${idx}`,
          file: { url },
          preview: url,
          altText: "",
        })
      );
      setFiles(loadedFiles);
      setMainImageId(loadedFiles[0]?.id || null);
    }
  }, [isEditMode, initialData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        altText: "",
      }));

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        if (!mainImageId && updatedFiles.length > 0) {
          setMainImageId(updatedFiles[0].id);
        }
        return updatedFiles;
      });
    },
    [mainImageId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = files.find((f) => f.id === id);
    if (fileToRemove && fileToRemove.file instanceof File) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    setFiles((prevFiles) => {
      const remainingFiles = prevFiles.filter((file) => file.id !== id);
      if (mainImageId === id) {
        setMainImageId(remainingFiles.length > 0 ? remainingFiles[0].id : null);
      }
      return remainingFiles;
    });
  };

  const handleAltTextChange = (id: string, altText: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { ...file, altText } : file))
    );
  };

  useEffect(() => {
    return () =>
      files.forEach((file) => {
        if (file.file instanceof File) URL.revokeObjectURL(file.preview);
      });
  }, []);

  return (
    <div className={sharedStyles.formSection}>
      <h3 className={sharedStyles.sectionTitle}>Product Media</h3>

      <div
        {...getRootProps({
          className: `${styles.dropzone} ${isDragActive ? styles.active : ""}`,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop product images here, or click to browse</p>
        <em>(Recommended size: 1080x1080px)</em>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map((f) => f.id)}
          strategy={rectSortingStrategy}
        >
          <aside className={styles.previewContainer}>
            {files.map((file) => (
              <SortableItem
                key={file.id}
                file={file}
                isMain={mainImageId === file.id}
                onRemove={removeFile}
                onSetMain={setMainImageId}
                onAltTextChange={handleAltTextChange}
              />
            ))}
          </aside>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default MediaUpload;
