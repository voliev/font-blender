export const initialShowcaseState = {
  text: {
    isVisible: true
  },
  fontPreview: {
    isVisible: false,
    family: undefined
  },
  styles: {
    isVisible: false
  }
};

export const showcaseState = {
  ...initialShowcaseState,
  text: {
    isVisible: false
  }
};
