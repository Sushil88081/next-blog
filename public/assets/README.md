# Assets Folder

यह folder सभी static assets (images, icons, etc.) को store करने के लिए है।

## Folder Structure

```
public/assets/
├── images/          # Blog post images, featured images
├── icons/           # Icon files (SVG, PNG)
└── README.md        # This file
```

## How to Use Images

### In Markdown Posts (Frontmatter):
```yaml
image: "/assets/images/go-intro.jpg"
```

### In React Components:
```tsx
import Image from 'next/image'

<Image 
  src="/assets/images/example.jpg" 
  alt="Description"
  width={800}
  height={600}
/>
```

### In Regular HTML/CSS:
```html
<img src="/assets/images/example.jpg" alt="Description" />
```

## Image Paths

- **Full path in code:** `/assets/images/filename.jpg`
- **Physical location:** `public/assets/images/filename.jpg`
- Next.js automatically serves files from `public/` folder

## Best Practices

1. ✅ Use descriptive filenames (e.g., `go-introduction.jpg` not `img1.jpg`)
2. ✅ Optimize images before uploading (compress, resize)
3. ✅ Use appropriate formats:
   - JPG for photos
   - PNG for graphics with transparency
   - SVG for icons and logos
   - WebP for modern browsers (recommended)
4. ✅ Keep file sizes reasonable (< 500KB for blog images)
5. ✅ Use Next.js Image component for automatic optimization

## Image Organization

You can organize images by category:
```
images/
├── go/
│   ├── go-intro.jpg
│   ├── go-variables.jpg
│   └── go-functions.jpg
├── react/
│   ├── react-intro.jpg
│   └── react-hooks.jpg
└── general/
    └── default-featured.jpg
```

## Free Image Sources

- **Unsplash** - https://unsplash.com
- **Pexels** - https://pexels.com
- **Pixabay** - https://pixabay.com

Remember to check licensing before using images!

