// implementation of a function that works like jquery's $. It should:
// - implement css method that sets the css property (if value presented) or
// returns the value (if value not given in the func),
// - return selected element,
// - allow for subsequent calls .css().css()... ,
export default function $(selector) {
  const selectedElement = document.querySelector(selector);

  return {
    css: function (prop, value) {
      // no value we are checking the property value and returning it to user
      if (value === undefined) {
        // no matching elements.
        if (selectedElement == null) return undefined;

        const value = element.style[prop];
        // checking if given property is set (if not we are returning the undefined)
        return value === "" ? undefined : value;
      }

      // when we found the element and the value is present we can set the property
      if (selectedElement != null) {
        selectedElement.style[prop] = value;
      }

      // we return this to be able to repeatedly call the function
      return this;
    }
  };
}
