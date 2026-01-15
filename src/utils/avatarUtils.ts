export const getSafeAvatarUrl = (url?: string) => {
  if (!url) return undefined;
  // Check for euc.li URLs and replace them with ENS metadata service to avoid CORS errors
  if (url.includes('euc.li')) {
    return url.replace('https://euc.li', 'https://metadata.ens.domains/mainnet/avatar');
  }
  return url;
};