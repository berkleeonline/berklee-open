import Stack from './cms';
import type { HeaderProps } from "../type/layout";

const liveEdit = import.meta.env.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';

export const getHeaderRes = async ():Promise<HeaderProps> => {
  const response = await Stack.getEntry({
    contentTypeUid: 'header',
  }) as [[HeaderProps]];
  return response[0][0];
};