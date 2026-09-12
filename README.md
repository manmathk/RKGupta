# Rajkumar Gupta — Art Archive

A simple, static gallery for Rajkumar Gupta. Built with plain HTML, CSS and JavaScript so it can run directly on GitHub Pages.

## Add artwork

1. Put artwork images in `assets/art/` using the GitHub upload button (for example `assets/art/village-morning.jpg`).
2. Open `artworks.js`.
3. Add an entry to `ARTWORKS`:

```js
{
  title: "Village Morning",
  year: "1998",
  medium: "Watercolor",
  category: "Landscape",
  image: "assets/art/village-morning.jpg",
  description: "A short description of the artwork."
}
```

You can copy an existing entry and change its values.

## GitHub Pages

In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

The site will use the repository's GitHub Pages URL.
