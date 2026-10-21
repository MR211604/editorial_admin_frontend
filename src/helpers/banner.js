const providers = [
  { name: "YouTube", hosts: ["youtube.com", "youtu.be"] },
  { name: "TikTok", hosts: ["tiktok.com"] },
  { name: "Facebook", hosts: ["facebook.com", "fb.watch"] },
  { name: "Instagram", hosts: ["instagram.com"] },
];

export const getBannerPlatform = (resourceURL) => {
  try {
    const hostname = new URL(resourceURL).hostname.toLowerCase();
    return (
      providers.find(({ hosts }) =>
        hosts.some(
          (host) => hostname === host || hostname.endsWith(`.${host}`),
        ),
      )?.name || "No compatible"
    );
  } catch {
    return "No compatible";
  }
};

export const isSupportedVideoURL = (resourceURL) => {
  try {
    const url = new URL(resourceURL);
    if (!["http:", "https:"].includes(url.protocol)) return false;

    const platform = getBannerPlatform(resourceURL);
    switch (platform) {
      case "YouTube":
        return (
          Boolean(url.searchParams.get("v")) ||
          /^\/[\w-]{11}\/?$/.test(url.pathname) ||
          /^\/(?:shorts|embed|live)\/[\w-]{11}/.test(url.pathname)
        );
      case "TikTok":
        return /\/@[^/]+\/video\/\d+/.test(url.pathname);
      case "Facebook":
        return (
          isFacebookWatchURL(url) ||
          /\/(?:videos|reel)\/[^/]+/.test(url.pathname) ||
          /\/share\/(?:v|r)\/[^/]+/.test(url.pathname)
        );
      case "Instagram":
        return /\/(?:reel|p|tv)\/[\w-]+/.test(url.pathname);
      default:
        return false;
    }
  } catch {
    return false;
  }
};

const isFacebookWatchURL = (url) =>
  url.searchParams.has("v") || url.hostname.toLowerCase() === "fb.watch";
