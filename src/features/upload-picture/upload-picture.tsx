"use client";

import { filesClient } from "@marketplace/data-access/files/files.client";
import { Button } from "@marketplace/ui/button";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import { CameraIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import "./upload-picture.scss";

export type XMLHttpRequestUploadPictureProps = {
  onChange?: (url: string) => void;
  value?: string;
};

const classes = getComponentClassNames("upload-picture", {
  upload: "upload",
  input: "input",
  loaderContainer: "loader-container",
  imageContainer: "image-container",
  loader: "loader",
  error: "error",
  hint: "hint",
});

export const UploadPicture = ({
  onChange,
  value = "",
}: XMLHttpRequestUploadPictureProps) => {
  const [preview, setPreview] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > filesClient.maxFileSize) {
      setError({
        type: "maxSize",
        message: `Sube una imagen de hasta ${filesClient.maxFileSizeInMB} mb`,
      });
      return;
    }

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      setError({
        type: "fileType",
        message: `Sube una imagen en formato jpeg, jpg o png`,
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const uploaded = await filesClient.upload(file);

      if (uploaded) {
        setPreview(uploaded);
        onChange?.(uploaded);
      }
    } catch (error) {
      console.error(error);
      setError({
        type: "default",
        message: "Algo salió mal, reintenta más tarde",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.namespace}>
      <div className={classes.loaderContainer}>
        <div
          className={classNames(classes.imageContainer, {
            [`${classes.imageContainer}--loading`]: isLoading,
          })}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Imagen de perfil"
              height={160}
              width={160}
            />
          ) : (
            <CameraIcon size={120} />
          )}
        </div>
        {isLoading ? <Loader2Icon className={classes.loader} /> : null}
      </div>
      <div className={classes.error}>{error?.message || ""}</div>
      <Button disabled={isLoading} variant="text" className={classes.upload}>
        Subir foto
        <input
          disabled={isLoading}
          className={classes.input}
          type="file"
          onChange={handleChange}
        />
      </Button>
      <span className={classes.hint}>
        Archivos jpeg, jpg o png de hasta 5 mb
      </span>
    </div>
  );
};
