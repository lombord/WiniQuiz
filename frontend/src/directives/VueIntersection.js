export default {
  name: "int",
  mounted(el, { value }) {
    function callback([entry], observer) {
      if (!entry.isIntersecting) return;
      const stop = value(el, entry);
      stop && observer.unobserve(el);
    }
    const observer = new IntersectionObserver(callback);
    observer.observe(el);
  },
};
