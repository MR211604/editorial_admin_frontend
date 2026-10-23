import { env } from "../config/env";

const CONTENT_IMAGE_DIRECTORY = "imagescontent/";

export const getMdxImageFilename = (imageUrl) => {
  if (typeof imageUrl !== "string" || /^(data:|blob:)/i.test(imageUrl)) {
    return null;
  }

  let path = imageUrl;
  const isAbsoluteUrl = /^(https?:)?\/\//i.test(imageUrl);

  if (isAbsoluteUrl) {
    try {
      path = new URL(
        imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl,
      ).pathname;
    } catch {
      return null;
    }
  }

  const cleanPath = path.replace(/^\/+/, "").split(/[?#]/, 1)[0];
  const directoryIndex = cleanPath.lastIndexOf(CONTENT_IMAGE_DIRECTORY);

  if (directoryIndex >= 0) {
    return cleanPath.slice(directoryIndex + CONTENT_IMAGE_DIRECTORY.length);
  }

  return !isAbsoluteUrl && !cleanPath.includes("/") ? cleanPath : null;
};

const mapMdxImageUrls = (content, mapImageUrl) => {
  if (typeof content !== "string") return content || "";

  const mapSource = (source) => {
    const match = source.match(/^(\s*<?)([^>\s]+)(>?)([\s\S]*)$/);
    if (!match) return source;

    return `${match[1]}${mapImageUrl(match[2])}${match[3]}${match[4]}`;
  };

  return content
    .replace(/(!\[[^\]]*\]\()([^)]*)(\))/g, (_, before, source, after) =>
      `${before}${mapSource(source)}${after}`,
    )
    .replace(
      /(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi,
      (_, before, source, after) => `${before}${mapImageUrl(source)}${after}`,
    );
};

export const normalizeMdxImageUrls = (content) =>
  mapMdxImageUrls(content, (imageUrl) => {
    const filename = getMdxImageFilename(imageUrl);
    return filename && /imagescontent\//i.test(imageUrl)
      ? filename
      : imageUrl;
  });

export const resolveMdxImageUrls = (content) =>
  mapMdxImageUrls(content, (imageUrl) => {
    const filename = getMdxImageFilename(imageUrl);
    if (filename) {
      const imagesUrl = env.CONTENT_IMAGES_URL.replace(/\/+$/, "");
      return `${imagesUrl}/${filename}`;
    }

    if (/^(https?:)?\/\//i.test(imageUrl) || /^(data:|blob:)/i.test(imageUrl)) {
      return imageUrl;
    }

    return `${env.BASE_URL}${imageUrl.replace(/^\/+/, "")}`;
  });

export const uploadPendingMdxImages = async (pendingImages, uploadImage) =>
  Promise.all(
    Object.entries(pendingImages).map(async ([localUrl, file]) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.[^/.]+$/, ""));

      const { data } = await uploadImage(formData);
      const filename = getMdxImageFilename(
        data.filename || data.path || data.url,
      );

      if (!filename) {
        throw new Error("No se recibió el nombre de la imagen subida.");
      }

      return { localUrl, filename };
    }),
  );

export const replaceMdxImageUrls = (content, uploadedImages = []) => {
  const updatedContent = uploadedImages.reduce(
    (currentContent, { localUrl, filename }) =>
      currentContent.replaceAll(localUrl, filename),
    content || "",
  );

  return normalizeMdxImageUrls(updatedContent);
};
