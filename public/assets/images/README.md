# Images Folder

यहाँ सभी blog post images, featured images, और अन्य images store करें।

## Image Path Examples

### Blog Post Images:
- Go posts: `/assets/images/go-intro.jpg`
- React posts: `/assets/images/react-intro.jpg`
- Python posts: `/assets/images/python-intro.jpg`

### In Markdown Frontmatter:
```yaml
image: "/assets/images/go-intro.jpg"
```

### In Next.js Components:
```tsx
<Image 
  src="/assets/images/go-intro.jpg"
  alt="Go Introduction"
  width={1200}
  height={630}
/>
```

## Recommended Image Sizes

- **Featured/Banner Images:** 1200x630px (for social sharing)
- **Post Thumbnails:** 800x450px
- **Category Images:** 400x300px
- **In-content Images:** Max width 800px

## File Naming Convention

Use descriptive, kebab-case names:
- ✅ `go-introduction.jpg`
- ✅ `react-hooks-guide.png`
- ✅ `python-basics-tutorial.webp`
- ❌ `img1.jpg`
- ❌ `photo.png`

## Image Optimization Tips

1. Compress images before uploading
2. Use WebP format when possible
3. Keep file sizes under 500KB
4. Use appropriate dimensions (don't upload 4000px images if you only need 800px)

