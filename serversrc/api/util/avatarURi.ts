export const decodeAvatarURI = function (row: any) {
  if (row.avatar.data) {
    return `data:${row.avatar.contentType};base64,${row.avatar.data.toString(
      'base64'
    )}`;
  } else return '/placeholder-shelter.png';
};
