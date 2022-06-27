export const useDocumentTitle = () => {
  const setTitle = title => {
    if (title) {
      try {
        document.title = title;
      } catch (e) {
        console.warn('Document is undefined');
      }
    }
  };

  return setTitle;
};
